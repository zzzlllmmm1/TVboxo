var rule = {
    模板: '采集1',
    title: '360资源',
    host: 'https://360zy.com',
    cate_exclude: '体育|足球|篮球|未分类|伦理片|连续剧|电影|综艺|动漫|海外剧|泰国剧|脑洞悬疑|反转爽剧',
    tab_remove:['360yun'],
    parse_url: '',
    搜索: $js.toString(()=>{
    let d = [];
    // 忽略分类
    let cate_exclude = '5';
    let html = request(input);
    let list = JSON.parse(html).list;
    d = list.filter(it => !cate_exclude.includes(it.type_id))
          .map(it => ({
              title: it.vod_name,
              img: it.vod_pic,
              desc: it.vod_remarks,
              url: it.vod_id
          }));
setResult(d);}),
}