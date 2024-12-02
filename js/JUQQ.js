globalThis.getAESjiem = function (word, key) {
    var srcs = word;
    if (word.charCodeAt(0)==65279)
    {
    	srcs=word.slice(1);
    }
    var decrypt = CryptoJS.AES.decrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypt.toString(CryptoJS.enc.Utf8);
}

globalThis.getxl = JSON.parse(getAESjiem(fetch('http://124.222.218.222:666/shark/api.php?action=configs', {
    method: 'POST',
    headers: {
        'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 11; Redmi Build/M2012K10C)',
        'version': '2.1.0',
        'Cache-Control': 'no-cache, no-store',
        'Content-Type': 'application/json; charset=utf-8'
    },
    body: 'username=&token='
}), CryptoJS.enc.Utf8.parse("aassddwwxxllsx1x"))).playerinfos;

globalThis.getxlsz = function (name) {
    let xl = []
    getxl.forEach(it => {
        if (it.playername === name) {
            let data = getAESjiem(it.playerjiekou, CryptoJS.enc.Utf8.parse("aassqdwwssllsm1x")).match(/data=([^&]+)/)[1]
            let jx = getAESjiem(data, CryptoJS.enc.Utf8.parse("aassqdbbssllsmhx"))
            xl.push(jx)
        }
    })
    return xl
}
globalThis.getzb = []
var rule = {
    title: 'MITO',
    host: 'http://124.222.218.222:666',
    url: '/api.php/v1.classify/content?page=fypage',
    homeUrl: '/api.php/v1.home/data?type_id=21',
    searchUrl: '/api.php/v1.search/data?wd=**&type_id=0&page=fypage',
    detailUrl: '/api.php/v1.player/details?vod_id=fyid',
    headers: {
        'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 11; Redmi Build/M2012K10C)',
        'version': '2.1.0',
        'Cache-Control': 'no-cache, no-store',
        'Content-Type': 'application/json; charset=utf-8'
    },
    searchable: 2,
    quickSearch: 1,
    filterable: 1,
    class_name: '电影&电视剧&动漫&综艺&记录&短剧',
    class_url: '20&21&22&23&24&25&26',
    play_parse: true,
    lazy: $js.toString(() => {
        log('和好的话活得好好的'+input)
        let fg = input.split('?')
        input = fg[0]
        let jx = getxlsz(fg[1])
        var key = CryptoJS.enc.Utf8.parse("aasshjwwcbllsm1x");
        let data = getAESjiem(input, key).match(/data=([^&]+)/)[1]
        var key1 = CryptoJS.enc.Utf8.parse("bbssqdbbssll25sx");
        let data1 = getAESjiem(data, key1)
        let url
        if (fg[1] === 'zhibo') {
            url = JSON.parse(fetch(data1, { withHeaders: true, redirect: false })).location
        } else if(/m3u8|mp4/.test(data1)){
            url=data1
        } else {
            for (let i = 0; i < jx.length; i++) {
                try {
                    const response = fetch(jx[i] + data1);
                    const url1 = JSON.parse(response).url;
                    if (url1) {
                        url = url1;
                        break;
                    }
                } catch (error) {

                }
            }
        }
        let header = Object.assign({}, rule.headers)
        delete header['Content-Type']
        delete header['Cache-Control']
        input = {
            url: url,
            parse: 0,
            header: header
        }
    }),
    推荐: $js.toString(() => {
        let data = fetch(input, {
            method: 'GET'
        })
        var key = CryptoJS.enc.Utf8.parse("aassddwwxxllsx1x");
        let data1 = JSON.parse(getAESjiem(data, key)).data
        let data2 = data1.banners
        data1.verLandList.forEach(it => {
            Array.prototype.push.apply(data2, it.vertical_lands)
        })
        if (data2.length > 0 && data2[0].vod_name.includes('直播')) {
            data2.shift();
        }
        VODS = data2
    }),
    一级: $js.toString(() => {
        let body = { "area": "全部地区", "rank": "按上新", "type": "全部类型", "type_id": parseInt(MY_CATE), "year": "全部年代" }
        let data = fetch(input, {
            method: 'POST',
            body: body
        })
        var key = CryptoJS.enc.Utf8.parse("aassddwwxxllsx1x");
        let data1 = JSON.parse(getAESjiem(data, key)).data.video_list
        if (MY_CATE === '23') {
            data1.forEach(it => {
                getzb.push(it.vod_id.toString())
            })
        }
        VODS = data1
    }),
    二级: $js.toString(() => {
        var key = CryptoJS.enc.Utf8.parse("aassddwwxxllsx1x");
        let data = JSON.parse(getAESjiem(request(input), key)).data.detail
        let data1 = data.play_url_list
        let xianlu = []
        let result = []
        data1.forEach(it => {
            xianlu.push(it.show.replace("（广告误信）", ""))
            let lieb = []
            let pdzb = getzb.includes(vod_id)
            let xlname = pdzb ? 'zhibo' : it.from
            it.urls.forEach(itt => {
                lieb.push(`${itt.name}$${itt.url}?${xlname}?${vod_id}`)
            })
            lieb = lieb.join('#')
            result.push(lieb)
        })
        xianlu = xianlu.reverse();
        result = result.reverse();
        log(xianlu);
        delete data.play_url_list
        data.vod_content = data.vod_content.replace(/<p[^>]*?>|<\/p>/g, ''),
        data.vod_play_from = xianlu.join('$$$'),
        data.vod_play_url = result.join('$$$')
        VOD = data

    }),
    搜索: $js.toString(() => {
        let data = fetch(input, {
            method: 'GET'
        })
        var key = CryptoJS.enc.Utf8.parse("aassddwwxxllsx1x");
        let data1 = JSON.parse(getAESjiem(data, key)).data.search_data
        VODS = data1
    }),
}