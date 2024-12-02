globalThis.getjx = []
var rule = {
    title: '旺旺影视',
    host: 'https://m.wwgz.cn',
    url: '/vod-type-id-fyclass-pg-fypage.html',
    searchUrl: '/vod-search-pg-fypage-wd-**.html',
    searchable: 2,
    quickSearch: 1,
    filterable: 1,
    headers: {        
        'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2012K10C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36'        
    },
    timeout: 5000,
    class_parse: '.swiper-wrapper li;a&&Text;a&&href;/vod-type-id-(\\d+)-.*.html',
    play_parse: true,
    lazy: $js.toString(() => {
        let head={
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'sec-ch-ua': '"Not A(Brand";v="24", "Chromium";v="110", "Microsoft Edge Simulate";v="110", "Lemur";v="110"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2012K10C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Sec-Fetch-Dest': 'document',        
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cookie': 'taokoulinb=true'
        }
        let url=""
        if(MY_FLAG==="m3u8"){
            let data=fetch("https://api.cnmcom.com/webcloud/m3u8.php?url="+input)
            url=data.match(/http.*?\.m3u8/g)[0]
        }else{
            if (getjx==0) {                        
            let html = jsp.pdfh(fetch(`https://api.cnmcom.com/webcloud/relay.php?url=${input}`), 'script:eq(-1)&&Html')
            function jx(inputString) {
                let regex = /src\s*=\s*'([^']+)'/g;
                let matches = inputString.match(regex);
                if (!matches) return [];
                return matches.slice(0, 3).map(match => match.match(/'([^']+)'/)[1]);
            }
            getjx = jx(html)
            //log(getjx)
        }        
        let index = parseInt(MY_FLAG.replace(/[^0-9]/ig, ""));
        let data = jsp.pdfh(fetch(getjx[index - 1] + input,{headers:head}), 'script:eq(-2)&&Html')
        url = data.match(/{url:\s*'(.*?)',}/)[1]
        }       
        input=url
    }),
    double: true,
    推荐: '.globalPicList;.resize_list;.sTit&&Text;img&&src;.sBottom span--em&&Text;a&&href;.sDes&&Text',
    一级: '.resize_list;.sTit&&Text;img&&src;.sBottom span--em&&Text;a&&href;.sDes&&Text',
    二级: $js.toString(() => {
        let id = input.match(/id-(\d+)/)[1]
        let data=fetch(`https://m.wwgz.cn/vod-play-id-${id}-src-1-num-1.html`)
        let pdd=data.includes("mac_from='relay'")
        let xl = jsp.pdfh(data, '.detailPosterIntro&&script:eq(0)&&Html')
        let listt = xl.match(/_url='(.*?)';/)[1].replace(/[\s\r\n]+/g, '')
        let name = ["线路1", "线路2", "线路3"]
        let list = [listt, listt, listt]
        if(!pdd){
            name=["m3u8"]
            list=[listt]
        }
        VOD = {
            vod_play_from: name.join("$$$"),
            vod_play_url: list.join("$$$")
        }
    }),
    搜索: '.ulPicTxt li;.sTit&&Text;img&&src;.sStyle&&Text;a&&href;.sDes:eq(1)--em&&Text',
}