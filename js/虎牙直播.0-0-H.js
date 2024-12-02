var rule = {
    title:'虎牙直播',
    host:'https://www.huya.com',
    homeUrl:'/cache.php?m=LiveList&do=getLiveListByPage&gameId=6861&tagAll=0&page=1',//用于"分类获取"和"推荐获取"
    url:'/cache.php?m=LiveList&do=getLiveListByPage&gameId=fyfilter&tagAll=0&page=fypage',
    class_name:'娱乐',
    class_url:'8&1&2&3',
    detailUrl:'https://m.huya.com/fyid',//二级详情拼接链接
    filter_url: '{{fl.area}}',
    filter_def:{
        8:{area:'2135'},
        1:{area:'1'},
        2:{area:'7601'},
        3:{area:'2336'}
    },
    filter:{
        "8":[{"key":"area","name":"分类","value":[{"n":"一起看","v":"2135"},{"n":"旅游","v":"6791"},{"n":"放映厅","v":"6245"},{"n":"原创","v":"6861"},{"n":"虎牙文化","v":"4089"},{"n":"音乐","v":"3793"},{"n":"趣分享","v":"5883"},{"n":"科技","v":"2408"}] }]
    },
    searchUrl:'https://search.cdn.huya.com/?m=Search&do=getSearchContent&q=**&uid=0&v=4&typ=-5&livestate=0&rows=40&start=0',
    tab_rename:{'道长在线':'🐯虎牙直播'},  //线路名替换
    headers:{
        'User-Agent':'MOBILE_UA'
    },
    timeout:5000,
    limit:8,
    play_parse:true,
    lazy:"js:let rid=input.match(/\\/(\\d+)/)[1];function getRealUrl(live_url){let[i,b]=live_url.split('?');let r=i.split('/').pop();let s=r.replace(/\.(flv|m3u8)/,'');let c_tmp=b.split('&').filter(n=>n);let n={};let c_tmp2=[];c_tmp.forEach(function(tmp,index){if(index<3){n[tmp.split('=')[0]]=tmp.split('=')[1]}else{c_tmp2.push(tmp)}});let tmp2=c_tmp2.join('&');n[tmp2.split('=')[0]]=tmp2.split('=')[1];let fm=decodeURIComponent(n.fm).split('&')[0];let u=base64Decode(fm);let p=u.split('_')[0];let f=new Date().getTime()+'0000';let ll=n.wsTime;let t='0';let h=[p,t,s,f,ll].join('_');let m=md5(h);return(i+'?wsSecret='+m+'&wsTime='+ll+'&u='+t+'&seqid='+f+'&'+c_tmp2.pop()).replace('hls','flv').replace('m3u8','flv')}let purl=JSON.parse(request('https://mp.huya.com/cache.php?m=Live&do=profileRoom&roomid='+rid)).data.stream.flv.multiLine[0].url;input={jx:0,url:getRealUrl(purl),parse:0,header:JSON.stringify({'user-agent':'Mozilla/5.0'})}",
    推荐:'*',
    一级:'json:data.datas;introduction;screenshot;nick;profileRoom',
    二级:'*',
    搜索:'json:response.3.docs;game_roomName;game_screenshot;game_nick;room_id',
}