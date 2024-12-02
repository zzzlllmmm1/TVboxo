 var rule={
            title: '碟众影院',
            host: 'https://www.dzvod.cc/',
            searchUrl: '/vodsearch/**----------fypage---.html',
   // https://www.dzvod.cc/vodsearch/%E6%96%97----------2---.html        
            url: '/vod_____show/fyclass--------fypage---.html',
            headers: {
                'User-Agent': 'MOBILE_UA'
            },
            timeout: 5000,
            class_parse: 'body&&.hl-nav li:gt(0);a&&Text;a&&href;.*/(.*?).html',
            cate_exclude: '明星|专题|最新|排行',
            limit: 40,
            play_parse: true,
            lazy: '',
            推荐: '.hl-vod-list;li;a&&title;a&&data-original;.remarks&&Text;a&&href',
            double: true,
            一级: '.hl-vod-list&&.hl-list-item;a&&title;a&&data-original;.remarks&&Text;a&&href',
            二级: {
                "title": ".hl-data-menu&&Text",
                "img": ".hl-lazy&&data-original",
                "desc": ".hl-full-box&&li:eq(10) li&&Text;.hl-full-box&&li:eq(1) li&&Text;.hl-full-box&&li:eq(2) li&&Text;.hl-full-box&&li:eq(3) li&&Text;.hl-full-box&&li:eq(4) li&&Text;.hl-full-box&&li:eq(5) li&&Text;.hl-full-box&&li:eq(6) li&&Text;.hl-full-box&&li:eq(7) li&&Text;.hl-full-box&&li:eq(10) li&&Text",
                "content": ".hl-content-text&&Text",
                "tabs": ".hl-tabs&&a",
                "lists": ".hl-plays-list:eq(#id)&&li"
            },
            搜索: '.hl-list-item;a&&title;a&&data-original;.remarks&&Text;a&&href;.hl-item-sub:eq(2)p&&Text',
            searchable: 2,//是否启用全局搜索,
            quickSearch: 0,//是否启用快速搜索,
            filterable: 0,//是否启用分类筛选,
        }
            