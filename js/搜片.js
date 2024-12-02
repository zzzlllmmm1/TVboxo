var rule = {
  title:'搜片',
  host:'https://soupian.pro',
  url:'/',
  searchUrl:'/search?key=%E6%96%97%E7%BD%97',
  searchable:2,
  quickSearch:0,
  filterable:1,
  filter:'',
  filter_url:'',
  filter_def:{},
  headers:{
      'User-Agent':'MOBILE_UA',
  },
  timeout:5000,
  class_parse:'#side-menu li;a&&Text;a&&href;/(.*?)\.html',
  cate_exclude:'',
  play_parse:true,
  lazy:$js.toString(()=>{
    input = {parse:1,url:input,js:''};
  }),
  double:true,
  推荐:'列表1;列表2;标题;图片;描述;链接;详情',
  一级:'列表;标题;图片;描述;链接;详情',
  二级:$js.toString(()=>{
      VOD = {};
      let html = request(MY_URL);
      if(MY_URL.includes('http://dyxs31.com')){
        VOD.vod_name = pdfh(html,'h1&&Text');
        
      }else if(MY_URL.includes('waipian28.com')){
        VOD.vod_name = pdfh(html,'h1&&Text');
        let tabs = pdfa(html,'.tab-item').map(it=>{
            return pdfh(it,'div--small&&Text')
        }).join('$$$');
        VOD.vod_play_from = tabs;
        let lists = pdfa(html,'.module-play-list-content');
        log(lists.length);
        let lists1 = [];
        for(let i in lists){
            let list2 = pdfa(lists[i],'a');
            list2 = list2.map(it=>{
                return pdfh(it,'a&&Text') +'$'+ pd(it,'a&&href',MY_URL);
            });
            lists1.push(list2.join('#'));
        }
        VOD.vod_play_url = lists1.join('$$$');

      }else if(MY_URL.includes('guanyingtai1')){
        VOD.vod_name = pdfh(html,'h1&&Text');
      }
      else if(MY_URL.includes('www.naifei6.com')){
        VOD.vod_name = pdfh(html,'h1&&Text');
      }
      else if(MY_URL.includes('languangdao1')){
        VOD.vod_name = pdfh(html,'h1&&Text');
      }


  }),
  搜索:'.tab-list&&.list-row-info;a&&title;img&&src;.list-row-title&&p&&Text;a&&href',
}