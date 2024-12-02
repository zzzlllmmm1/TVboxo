var rule ={
            title: '秋霞电影',
            host: 'https://www.wjfxgame.com/',
            url: '/filmlist/fyclass-fypage.html',
            searchUrl: '/filmsearch/**----------fypage---.html',
//https://www.wjfxgame.com/filmsearch/%E6%96%97----------2---.html
            class_parse: '.swiper-wrapper li;a&&Text;a&&href;.*/(.*?).html',
            searchable: 2,
            quickSearch: 0,
            filterable: 0,
            headers: {
                'User-Agent': 'MOBILE_UA',
            },
            play_parse: true,
            lazy: '',
            limit: 6,
            推荐: '.tab-content;li;h5&&a&&title;img&&src;.text-right&&Text;a&&href',
            double: true,
            一级: '.macplus-vodlist__bag;a&&title;.lazyload&&data-original;.text-right&&Text;a&&href',
            二级: {
                title: 'h1&&Text;.detail_list&&ul:eq(1)&&li&&a:eq(2)&&Text',
                img: '.vodlist_thumb&&data-original',
                desc: '.play-ail&&p:eq(5)&&Text;.play-ail&&p:eq(0)&&Text;.play-ail&&p:eq(1)&&Text;.play-ail&&p:eq(2)&&Text;.play-ail&&p:eq(3)&&Text;.play-ail&&p:eq(4)&&Text;.play-ail&&p:eq(6)&&Text',
                content: '.detail-intro&&Text',
                tabs: '.nav-tabs li',
                lists: '.macplus-content__playlist:eq(#id) a',
            },
            搜索: '.macplus-vodlist__media&&li;.lazyload&&title;.lazyload&&data-original;.text-right&&Text;a&&href;.detail p:eq(2)&&Text;.detail p:eq(0)&&Text;.detail p:eq(3)&&Text;.detail p:eq(1)&&Text',
        }