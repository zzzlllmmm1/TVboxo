import { Crypto, _ } from 'assets://js/lib/cat.js';

let host = 'http://154.219.117.219:8080/dev_webvip';
let siteKey = '';
let siteType = 0;
let siteJx = {};

// 嗅探匹配规则
const snifferMatch = /http((?!http).){26,}?\.(m3u8|mp4|flv|avi|mkv|rm|wmv|mpg)\?.*|http((?!http).){26,}\.(m3u8|mp4|flv|avi|mkv|rm|wmv|mpg)|http((?!http).){26,}\/m3u8\?pt=m3u8.*|http((?!http).)*?default\.ixigua\.com\/.*|http((?!http).)*?cdn-tos[^\?]*|http((?!http).)*?\/obj\/tos[^\?]*|http.*?\/player\/m3u8play\.php\?url=.*|http.*?\/player\/.*?[pP]lay\.php\?url=.*|http.*?\/playlist\/m3u8\/\?vid=.*|http.*?\.php\?type=m3u8&.*|http.*?\/download.aspx\?.*|http.*?\/api\/up_api.php\?.*|https.*?\.66yk\.cn.*|http((?!http).)*?netease\.com\/file\/.*/;

// 默认解析接口配置
let jxConfig = {
    "蓝光NBY": "http://43.248.100.143:6888/api/index.php?key=fvMh1lGDYHrnvkUBdM&url=",
    "暴风": "http://43.248.100.143:6888/api/adv/index.php?key=fvMh1lGDYHrnvkUBdM&url="
};

// 分类映射
const typeMap = {
    "0": "推荐",
    "1": "电影",
    "2": "电视剧", 
    "3": "综艺",
    "4": "动漫",
    "22": "纪录片",
    "24": "少儿",
    "26": "短剧"
};

// ==================== 新增解析功能 ====================

/**
 * 提取中间文本 - 对应Python中的extract_middle_text
 * @param {string} text - 源文本
 * @param {string} startStr - 开始标记
 * @param {string} endStr - 结束标记
 * @param {number} mode - 模式：0=普通提取，1=正则匹配，2=数组连接，3=复杂处理
 * @param {string} regexPattern - 正则模式（mode=1,2,3时使用）
 * @param {string} extraParam - 额外参数
 * @returns {string} 提取结果
 */
function extractMiddleText(text, startStr, endStr, mode = 0, regexPattern = '', extraParam = '') {
    if (!text || !startStr || !endStr) return "";
    
    // 模式3：复杂处理（多段提取）
    if (mode === 3) {
        const results = [];
        let searchText = text;
        
        while (true) {
            const startIndex = searchText.indexOf(startStr);
            if (startIndex === -1) break;
            
            const endIndex = searchText.indexOf(endStr, startIndex + startStr.length);
            if (endIndex === -1) break;
            
            const middleText = searchText.substring(startIndex + startStr.length, endIndex);
            results.push(middleText);
            
            // 移除已处理的部分
            searchText = searchText.substring(endIndex + endStr.length);
        }
        
        if (results.length > 0 && regexPattern) {
            let output = "";
            for (let i = 0; i < results.length; i++) {
                const matches = results[i].match(new RegExp(regexPattern, 'g'));
                if (matches) {
                    for (let match of matches) {
                        // 简化处理：提取数字和URL
                        const numberMatch = match.match(/(?:^|[^0-9])(\d+)(?:[^0-9]|$)/);
                        const number = numberMatch ? numberMatch[1] : "0";
                        
                        // 提取名称和URL（简化逻辑）
                        const nameMatch = match.match(/['"]([^'"]*)['"]/);
                        const name = nameMatch ? nameMatch[1] : "未知";
                        
                        const urlMatch = match.match(/(https?:\/\/[^\s'"]+)/);
                        let url = urlMatch ? urlMatch[0] : "";
                        
                        if (url && !url.includes('http')) {
                            url = "https://www.acfun.cn" + url;
                        }
                        
                        output += `#${name}$${number}${url}`;
                    }
                }
            }
            return output ? output.substring(1) : "";
        }
        return results.join("$$$");
    }
    
    // 普通提取
    const startIndex = text.indexOf(startStr);
    if (startIndex === -1) return "";
    
    const endIndex = text.indexOf(endStr, startIndex + startStr.length);
    if (endIndex === -1) return "";
    
    let middleText = text.substring(startIndex + startStr.length, endIndex).replace(/\\/g, "");
    
    // 模式1：正则匹配
    if (mode === 1 && regexPattern) {
        const matches = middleText.match(new RegExp(regexPattern, 'g'));
        return matches ? matches.join(' ') : "";
    }
    
    // 模式2：数组连接
    if (mode === 2 && regexPattern) {
        const matches = middleText.match(new RegExp(regexPattern, 'g'));
        if (matches) {
            return matches.join('$$$');
        }
    }
    
    return middleText;
}

/**
 * 提取第N个匹配的中间文本 - 对应Python中的extract_nth_middle_text
 * @param {string} text - 源文本
 * @param {string} startStr - 开始标记
 * @param {string} endStr - 结束标记
 * @param {number} n - 第几个匹配（从0开始）
 * @returns {string} 提取结果
 */
function extractNthMiddleText(text, startStr, endStr, n = 0) {
    if (!text || !startStr || !endStr) return null;
    
    const results = [];
    let startIndex = 0;
    
    while (true) {
        startIndex = text.indexOf(startStr, startIndex);
        if (startIndex === -1) break;
        
        startIndex += startStr.length;
        const endIndex = text.indexOf(endStr, startIndex);
        if (endIndex === -1) break;
        
        const middleText = text.substring(startIndex, endIndex).replace(/\\/g, "");
        results.push(middleText);
        
        startIndex = endIndex + endStr.length;
    }
    
    return n >= 0 && n < results.length ? results[n] : null;
}

/**
 * 解析视频信息 - 对应Python中的parse_video_info
 * @param {string} html - HTML内容
 * @returns {Object} 视频信息对象
 */
function parseVideoInfo(html) {
    let content, director, actor, remarks;
    
    try {
        // 解析描述
        content = extractMiddleText(html, "description-container'>", "<", 0);
        if (!content) {
            content = "";
        } else {
            content = '' + content;
        }
    } catch (e) {
        content = "";
    }
    
    try {
        // 解析播放量（导演字段）
        director = extractMiddleText(html, "class='viewsCount'>", "<", 0);
        if (!director || director.trim() === '') {
            director = "无信息";
        } else {
            director += "播放";
        }
    } catch (e) {
        director = "无信息";
    }
    
    try {
        // 解析点赞量（演员字段）
        actor = extractMiddleText(html, 'likeCount">', "<", 0);
        if (!actor || actor.trim() === '') {
            actor = "无信息";
        } else {
            actor += "点赞";
        }
    } catch (e) {
        actor = "无信息";
    }
    
    try {
        // 解析标签（备注字段）- 简化实现
        const tagMatch = html.match(/<div[^>]*class=["'][^"']*tag[^"']*["'][^>]*>([^<]*)<\/div>/);
        remarks = tagMatch ? tagMatch[1].trim() : "未知";
    } catch (e) {
        remarks = "未知";
    }
    
    return {
        content,
        director, 
        actor,
        remarks
    };
}

// ==================== 原有功能保持不变 ====================

async function init(cfg) {
    siteKey = cfg.skey;
    siteType = cfg.stype;
    if (cfg.ext && cfg.ext.host) {
        host = cfg.ext.host.replace(/\/+$/, '');
    }
    // 初始化解析配置 - 适配您的NBY数组格式
    if (cfg.ext && cfg.ext.NBY && Array.isArray(cfg.ext.NBY) && cfg.ext.NBY.length > 0) {
        jxConfig["蓝光NBY"] = cfg.ext.NBY[0];
    }
}

async function home() {
    // 构建分类
    const classes = Object.entries(typeMap).map(([type_id, type_name]) => ({
        type_id: type_id,
        type_name: type_name
    }));

    // 构建筛选条件
    const filters = {
        "year": [
            {"n": "全部", "v": ""},
            {"n": "2027", "v": "2027"}, {"n": "2026", "v": "2026"}, {"n": "2025", "v": "2025"},
            {"n": "2024", "v": "2024"}, {"n": "2023", "v": "2023"}, {"n": "2022", "v": "2022"},
            {"n": "2021", "v": "2021"}, {"n": "2020", "v": "2020"}, {"n": "2019", "v": "2019"},
            {"n": "2018", "v": "2018"}, {"n": "2017", "v": "2017"}, {"n": "2016", "v": "2016"}
        ],
        "area": [
            {"n": "全部", "v": ""},
            {"n": "大陆", "v": "大陆"}, {"n": "香港", "v": "香港"}, {"n": "台湾", "v": "台湾"},
            {"n": "美国", "v": "美国"}, {"n": "韩国", "v": "韩国"}, {"n": "日本", "v": "日本"},
            {"n": "泰国", "v": "泰国"}, {"n": "英国", "v": "英国"}, {"n": "法国", "v": "法国"}
        ]
    };

    const result = {
        class: classes
    };

    // 为每个分类添加筛选条件（推荐类型0不需要筛选）
    classes.forEach(cls => {
        if (cls.type_id !== "0") {
            result[`filters_${cls.type_id}`] = [
                {key: "year", name: "年份", value: filters.year},
                {key: "area", name: "地区", value: filters.area}
            ];
        }
    });

    return JSON.stringify(result);
}

async function homeVod() {
    try {
        // 获取首页推荐数据 - 使用type=0
        let url = `${host}/v4/app/homeListNew?type=0`;
        let res = await request(url);
        let data = JSON.parse(res);
        
        if (data.code === 100 && data.data && data.data.length > 0) {
            let videos = [];
            
            // 处理所有数据部分
            data.data.forEach(section => {
                if (section.dataInfoList && section.dataInfoList.length > 0) {
                    section.dataInfoList.forEach(item => {
                        if (item.vName && item.vPic) {
                            videos.push({
                                vod_id: item.vDetailId ? item.vDetailId.toString() : (item.id ? item.id.toString() : ''),
                                vod_name: item.vName,
                                vod_pic: item.vPic,
                                vod_remarks: getUpdateInfo(item.vRemake) || item.vYear || '',
                                vod_year: item.vYear,
                                vod_area: item.vArea,
                                vod_score: item.vScore
                            });
                        }
                    });
                }
            });
            
            // 限制数量，避免过多
            videos = videos.slice(0, 12);
            
            return JSON.stringify({
                list: videos
            });
        }
    } catch (e) {
        console.log("获取首页推荐失败:", e);
    }
    
    // 失败时返回空数据
    return JSON.stringify({
        list: []
    });
}

async function category(tid, pg, filter, extend) {
    try {
        // 推荐类型使用homeListNew接口
        if (tid === "0") {
            return await getRecommendCategory(pg, extend);
        }
        
        // 其他分类使用homeListNew接口，传入对应的type
        let url = `${host}/v4/app/homeListNew?type=${tid}&page=${pg}&limit=18`;
        
        let res = await request(url);
        let data = JSON.parse(res);
        
        if (data.code === 100 && Array.isArray(data.data)) {
            let videos = [];
            
            // 处理所有数据部分
            data.data.forEach(section => {
                if (section.dataInfoList && section.dataInfoList.length > 0) {
                    section.dataInfoList.forEach(item => {
                        if (item.vName && item.vPic) {
                            videos.push({
                                vod_id: item.vDetailId ? item.vDetailId.toString() : (item.id ? item.id.toString() : ''),
                                vod_name: item.vName,
                                vod_pic: item.vPic,
                                vod_remarks: getUpdateInfo(item.vRemake) || item.vYear || '',
                                vod_year: item.vYear,
                                vod_area: item.vArea,
                                vod_score: item.vScore,
                                vod_content: item.vBlurb || item.vContent || ''
                            });
                        }
                    });
                }
            });
            
            return JSON.stringify({
                page: parseInt(pg),
                pagecount: 999,
                limit: 18,
                total: 999,
                list: videos
            });
        }
    } catch (e) {
        console.log(`获取分类${tid}数据失败:`, e);
    }
    
    return JSON.stringify({
        page: parseInt(pg),
        pagecount: 1,
        limit: 18,
        total: 0,
        list: []
    });
}

// 获取推荐分类的特殊处理
async function getRecommendCategory(pg, extend) {
    try {
        let url = `${host}/v4/app/homeListNew?type=0&page=${pg}&limit=18`;
        
        let res = await request(url);
        let data = JSON.parse(res);
        
        if (data.code === 100 && Array.isArray(data.data)) {
            let videos = [];
            
            data.data.forEach(section => {
                if (section.dataInfoList && section.dataInfoList.length > 0) {
                    section.dataInfoList.forEach(item => {
                        if (item.vName && item.vPic) {
                            videos.push({
                                vod_id: item.vDetailId ? item.vDetailId.toString() : (item.id ? item.id.toString() : ''),
                                vod_name: item.vName,
                                vod_pic: item.vPic,
                                vod_remarks: getUpdateInfo(item.vRemake) || item.vYear || '',
                                vod_year: item.vYear,
                                vod_area: item.vArea,
                                vod_score: item.vScore,
                                vod_content: item.vBlurb || item.vContent || ''
                            });
                        }
                    });
                }
            });
            
            return JSON.stringify({
                page: parseInt(pg),
                pagecount: 999,
                limit: 18,
                total: 999,
                list: videos
            });
        }
    } catch (e) {
        console.log("获取推荐分类失败:", e);
    }
    
    return JSON.stringify({
        page: parseInt(pg),
        pagecount: 1,
        limit: 18,
        total: 0,
        list: []
    });
}

async function detail(id) {
    try {
        // 直接使用传入的ID来获取播放源
        let vod = {
            vod_id: id,
            vod_name: '正在加载...',
            vod_pic: '',
            vod_content: '加载中...',
            vod_year: '',
            vod_area: '',
            vod_actor: '',
            vod_director: '',
            vod_remarks: '',
            vod_score: '0.0'
        };
        
        // 获取播放源信息
        await getPlaySources(vod, id);
        
        // 如果获取到了播放源，再尝试获取影片详情
        if (vod.vod_play_from && vod.vod_play_url) {
            // 尝试从各个分类接口获取影片详情
            for (let typeId of Object.keys(typeMap)) {
                try {
                    let url = `${host}/v4/app/homeListNew?type=${typeId}&page=1&limit=50`;
                    let res = await request(url);
                    let data = JSON.parse(res);
                    
                    if (data.code === 100 && Array.isArray(data.data)) {
                        for (let section of data.data) {
                            if (section.dataInfoList && Array.isArray(section.dataInfoList)) {
                                let item = section.dataInfoList.find(vodItem => 
                                    (vodItem.vDetailId && vodItem.vDetailId.toString() === id) || 
                                    (vodItem.id && vodItem.id.toString() === id)
                                );
                                
                                if (item) {
                                    vod.vod_name = item.vName;
                                    vod.vod_pic = item.vPic;
                                    vod.vod_content = item.vBlurb || item.vContent || '暂无简介';
                                    vod.vod_year = item.vYear || '';
                                    vod.vod_area = item.vArea || '';
                                    vod.vod_actor = item.vActor || '';
                                    vod.vod_director = item.vWriter || '';
                                    vod.vod_remarks = getUpdateInfo(item.vRemake) || item.vYear || '';
                                    vod.vod_score = item.vScore || '0.0';
                                    break;
                                }
                            }
                        }
                    }
                } catch (e) {
                    continue;
                }
            }
        }
        
        return JSON.stringify({
            list: [vod]
        });
        
    } catch (e) {
        console.log("获取详情失败:", e);
    }
    
    // 返回空数据
    return JSON.stringify({
        list: []
    });
}

async function getPlaySources(vod, id) {
    try {
        // 尝试获取播放源信息 - 使用传入的ID
        let playUrl = `${host}/v1/typeNameList/totalList?vDetailId=${id}&vUrlType=9`;
        let playRes = await request(playUrl);
        let playData = JSON.parse(playRes);
        
        if (playData.code === 100 && playData.data) {
            // 构建播放源
            let playFrom = [];
            let playUrl = [];
            
            if (playData.data.vipTypeUrlNames) {
                playData.data.vipTypeUrlNames.forEach(source => {
                    playFrom.push(source.typeUrlName);
                    let urls = [];
                    
                    if (playData.data.videoUrlLists) {
                        playData.data.videoUrlLists
                            .filter(episode => episode.vUrlType === source.vUrlType)
                            .sort((a, b) => parseInt(a.vTitle) - parseInt(b.vTitle))
                            .forEach(episode => {
                                urls.push(`${episode.vTitle}$${episode.vUrl}`);
                            });
                    }
                    
                    playUrl.push(urls.join('#'));
                });
            }
            
            if (playFrom.length > 0) {
                vod.vod_play_from = playFrom.join('$$$');
                vod.vod_play_url = playUrl.join('$$$');
            }
        }
    } catch (e) {
        console.log("获取播放源失败:", e);
    }
}

async function play(flag, id, flags) {
    try {
        // 直接播放视频链接
        if (isVideoUrl(id)) {
            return JSON.stringify({
                parse: 0,
                url: id,
                header: getHeaders()
            });
        }
        
        // 处理加密的播放地址 - NBY-XMYAES格式
        if (id.startsWith('NBY-XMYAES')) {
            let finalUrl = await parseNBYUrl(flag, id);
            if (finalUrl) {
                return JSON.stringify({
                    parse: isVideoUrl(finalUrl) ? 0 : 1,
                    url: finalUrl,
                    header: getHeaders()
                });
            }
        }
        
        // 其他类型地址
        return JSON.stringify({
            parse: 1,
            url: id
        });
        
    } catch (e) {
        console.log("播放处理失败:", e);
    }
    
    return JSON.stringify({
        parse: 1,
        url: id
    });
}

async function parseNBYUrl(flag, encryptedUrl) {
    try {
        // 根据播放源类型选择解析接口
        let jxApi = jxConfig[flag];
        if (!jxApi) {
            // 如果没有特定解析接口，使用默认的蓝光NBY解析
            jxApi = jxConfig["蓝光NBY"];
        }
        
        if (jxApi) {
            // 构建解析URL
            let parseUrl = jxApi + encodeURIComponent(encryptedUrl) + '&timeOut=15';
            console.log("解析URL:", parseUrl);
            
            let res = await request(parseUrl, {
                'Referer': 'http://43.248.100.143/'
            });
            
            // 尝试解析返回结果
            try {
                let jsonData = JSON.parse(res);
                if (jsonData && jsonData.url) {
                    return jsonData.url;
                }
            } catch (e) {
                // 如果不是JSON，直接返回内容
                console.log("解析返回:", res);
                return res;
            }
            
            return res;
        }
    } catch (e) {
        console.log("解析NBY地址失败:", e);
    }
    
    return null;
}

async function search(wd, quick) {
    try {
        // 使用正确的搜索接口 - POST请求，参数为name
        let url = `${host}/v2/app/getVideoListType`;
        let postData = `name=${encodeURIComponent(wd)}`;
        
        let res = await req(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'okhttp/3.10.0',
                'Accept-Encoding': 'gzip',
                'Connection': 'Keep-Alive'
            },
            body: postData
        });
        
        let data = JSON.parse(res.content);
        
        if (data.code === 100 && Array.isArray(data.data)) {
            let videos = data.data.map(item => ({
                // 关键修改：搜索返回的数据中，使用 vDetailId 作为 vod_id
                vod_id: item.vDetailId ? item.vDetailId.toString() : item.id.toString(),
                vod_name: item.vName,
                vod_pic: item.vPic,
                vod_remarks: getUpdateInfo(item.vRemake) || item.vYear || '',
                vod_year: item.vYear,
                vod_area: item.vArea,
                vod_score: item.vScore
            }));
            
            return JSON.stringify({
                list: videos
            });
        }
    } catch (e) {
        console.log("搜索失败:", e);
    }
    
    return JSON.stringify({
        list: []
    });
}

// 工具函数
async function request(url, headers = {}) {
    const defaultHeaders = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': host,
        'Accept': 'application/json, text/plain, */*'
    };
    
    let res = await req(url, {
        method: 'GET',
        headers: { ...defaultHeaders, ...headers }
    });
    
    return res.content;
}

function isVideoUrl(url) {
    return typeof url === 'string' && snifferMatch.test(url);
}

function getHeaders() {
    return {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': host
    };
}

function getUpdateInfo(vRemake) {
    if (!vRemake) return '';
    try {
        let remakeData = JSON.parse(vRemake);
        if (Array.isArray(remakeData) && remakeData.length > 0) {
            return remakeData[0].remake || '';
        }
    } catch (e) {
        // 解析失败，返回原始字符串或空
    }
    return '';
}

export function __jsEvalReturn() {
    return {
        init: init,
        home: home,
        homeVod: homeVod,
        category: category,
        detail: detail,
        play: play,
        search: search
    };
}