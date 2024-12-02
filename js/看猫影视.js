var rule={
            title: '看猫影视',
            host: 'https://www.kanmaoyy.com/',
            url: 'https://www.kanmaoyy.com/fyclass/pfypage.html',
            searchUrl: 'https://www.kanmaoyy.com/index.php?s=vod-search',//https://www.kanmaoyy.com/index.php?s=vod-search
            searchable: 2,//是否启用全局搜索,
            quickSearch: 0,//是否启用快速搜索,
            filterable: 0,//是否启用分类筛选,
            headers: {
                'User-Agent': 'UC_UA', // "Cookie": ""
            }, // class_parse:'.stui-header__menu li:gt(0):lt(7);a&&Text;a&&href;/(\\d+).html',
            //class_parse: '.stui-header__menu li:gt(0):lt(7);a&&Text;a&&href;.*/(.*?).html',
class_name:'电影&电视剧&综艺&动漫&短剧',
class_url:'dianying&dianshiju&zongyi&dongman&duanju',            
            play_parse: true,
            lazy: '',
            limit: 6,
            推荐: '*',
            double: true, // 推荐内容是否双层定位
            一级: '.stui-vodlist li;a&&title;.lazyload&&data-original;.pic-text&&Text;a&&href',
            二级: {
                "title": ".stui-content__detail .title&&Text;.stui-content__detail p:eq(-2)&&Text",
                "img": ".stui-content__thumb .lazyload&&data-original",
                "desc": ".stui-content__detail p:eq(0) p&&Text;.stui-content__detail p:eq(1) p&&Text;.stui-content__detail p:eq(2) p&&Text",
                "content": "#desc",
                "tabs": ".stui-player__side h3",
                "lists": ".stui-content__playlist:eq(#id) li"
            },
                       搜索: 'ul.stui-vodlist&&li;a&&title;.lazyload&&data-original;.text-muted&&Text;a&&href;.text-muted:eq(-1)&&Text',
                       
                       }