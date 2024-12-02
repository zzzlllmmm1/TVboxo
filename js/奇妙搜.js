var rule = {
	title:'奇妙搜',
	host:'https://www.magicalsearch.top',
	homeUrl:'/',
	url: '/search?',
	filter_url:'{{fl.class}}',
	filter:{},
	搜索编码: 'utf-8',
	searchUrl: '/api/pshou/getData?type=%E9%98%BF%E9%87%8C%E7%BD%91%E7%9B%98&word=**',
	headers:{
		'User-Agent': PC_UA,
		'Accept': '*/*',
		'Referer': 'https://www.magicalsearch.top/'
	},
	timeout:5000,
	class_name:'',
	class_url:'',
	play_parse:true,
	play_json:[{
		re:'*',
		json:{parse:0,jx:0}
	}],
	lazy:'',
	limit:6,
	推荐:'',
	一级:'',
	二级:`js:
VOD.vod_play_from = "网盘";
VOD.vod_remarks = detailUrl;
VOD.vod_actor = "没有二级，只有一级链接直接推送播放";
VOD.vod_content = MY_URL;
VOD.vod_play_url = "播放$" + detailUrl;
`,
	搜索:`js:
let new_html=request(input);
//log("qimiao search result>>>>>>>>>>>>>>>" + new_html);
let json=JSON.parse(JSON.parse(new_html));
json = json.result.items;
let d=[];
for(const it in json){
	if (json.hasOwnProperty(it)){
		log("qimiao search it>>>>>>>>>>>>>>>" + JSON.stringify(json[it]));
		if (json[it].title.includes(KEY)){		
			d.push({
				title:json[it].title,
				img:'',
				content:json[it].content.title,
				desc:json[it].insert_time,
				url:'push://'+json[it].page_url
				});
		}
	}
}
setResult(d);
`,
}