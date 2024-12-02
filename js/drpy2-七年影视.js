var rule = {
    title:'七年影视',
    模板:'首图2',
    host:'https://www.haying.tech',
    url:'/vodshow/fyfilter.html',
    filter_url:'{{fl.cateId}}-{{fl.area}}-{{fl.by}}-{{fl.class}}-----fypage---{{fl.year}}',
    filter:'H4sIAAAAAAAAA+2Y205aQRSG7/sUzb72QlDQ9g36DI0X1JLU1NpEbBNjTLSAcqqAQSiKIlFOLSjUQ2VT5GX2zIa36MDMWmuMSUNjYpoWr/z+f6+ZNbNnfsG1J0/Vj+Ewnr9cM956V43nxrxnxfvitTFhLHneeQWz0JbdbAv+6Fn84B0+uDSQg5W+vzKQBTiM9Qkp2+Uka7Xt8LZyZtFhkYrVyZHjoppSnIWq5DhmqCidY+EyWW4qCjW5P0gO1fDNBN9Ik/OMRguX79Q4Jmm4TtJu5+zUFes0wXXrvdup9l2XhuWhL5YZ1oYV2zE3MOWGepa9Hm07cw0WM3+/nTTvabmf3VKqAvD6pSy/OVeeAqyLN3jrFuok4Epvd9hBR3kKcMx8lTwFuMpMkedqylOA3kWD6hSgl26wyDE7LICNjLNWazwa7hW7lrkPc+sSrupzg5klWJUE8HrRJnWggLrb07vb0z3RCo92xdbCsMg4crFrx+t2OAuDI8MTVjdgdzI8DS+DGGcJXrMzP0whQT8iq17PsnZEWpdWuzPiEXFOOqeVNvxV06dIn9J1J+lOXXeQ7tD1SdInNV3cANC1yyBglvRZXZ8hfUbX3aS7dd1FukvXab3iV30bX63SJvKdXWbG720iz1z3M5dqgJUF8Si+RdPkjZRy3iys+OgEnAdECCrHN/9+2TuYdW6C8tP5wPyk1yDOpmWWRVBBlpAlIop07U3wWnlwjanEpd/ZwS0mi86HiAsRDJpFR4Rf/WCnac2aHefZn+bZYfFenqE0zrNxnv3deTal59mix+fTXubwM9SIL5MnjuxaEk6qBLy33454ZAPurQT0cnnRvl1GGxnXEGiy+Ak9QUwBd8NDcZhbAt7QjTCVKsA6f5AH8lAnAftK5fllG5qSgB11E+JjIrQjgbIm2CvEMGuGQBl1YbUSmFFDwDHPur1GCMaUgL2YX1lnD3qRQBm1zWJpDKgh4JibMZYzYUwJWpb2T2DtCrS8ZDc3lJcDwDFDR70W9ikB63YqdgJOmwL0svvWT8hIBf/Zn5pxlP7bUTr9CFHKtnb72SqcIQkjxay/3iugJwHn+1Sz0zifhFGutH0Q4VmIFwVYlzPt1Heok4BraCRZ8QLWIIG+0UfF132okzBKLPHjAjuogycB5ytusxZEuQJcw06APAV4z+sp8hRg3fCfH1AnAXupl6zbY+hFwiNE3TjOxnH24Dgbptn6LxPHxHEwFAAA',
    filter_def:{
        1:{cateId:'1',by:'time'},
        2:{cateId:'2',by:'time'},
        3:{cateId:'3',by:'time'},
        4:{cateId:'4',by:'time'}
    },
    class_parse: '.stui-header__menu li:gt(0):lt(5);a&&Text;a&&href;.*/(.*?).html',
	tab_exclude:'影片|评论|榜单|网络|最新推荐',    
    parse: 'https://jx.lasi.fun/blue/index.php?url=',
    lazy: $js.toString(() => {
        let html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1])
	    let url = html.url
	    let from = html.from
	    if (html.encrypt == '1') {
		    url = unescape(url);
	    } else if (html.encrypt == '2') {
		    url = unescape(base64Decode(url));
	    }
        log('切片地址:' + url);
        
        if (url.includes('.m3u8')){
            input = url;
        }else if(from=='blue'){
            let html=request(rule.parse+url,{
                headers:{
                    'Referer':'https://www.haying.tech/',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                   
                },
                redirect: false,
                withHeaders: true})
            log(html)
            let parseurl=JSON.parse(html).location;
            log(parseurl)
            let play=JSON.parse(request(parseurl.split('?url=')[1],{
                headers:{
                    'Origin': 'https://jx.lasi.fun',
                    'Host': 'cdn.yangtuyun.cn',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
                },
                redirect: false,
                withHeaders: true})).location+'#.m3u8';
            //let playurl=fetch(play,{headers:{'Host': 'download4.caiyun.feixin.10086.cn'}})
            log(play)
            input=play

        }else{
            input
        }
    }),
    //lazy:"js:var html=JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);log(html);var url=html.url;if(html.encrypt=='1'){url=unescape(url)}else if(html.encrypt=='2'){url=unescape(base64Decode(url))}if(/m3u8|mp4/.test(url)){input=url}else{input}",
    二级: {
        "title": ".v-thumb&&title;.data--span:eq(0)&&Text",
        "img": ".lazyload&&data-original",
        "desc": ".data:eq(3)&&Text;;;.data--span:eq(1)&&Text;.data--span:eq(2)&&Text",
        "content": ".desc&&Text",
        "tabs": ".stui-pannel__head h3",
        "lists": ".stui-content__playlist:eq(#id) li"
    },
}