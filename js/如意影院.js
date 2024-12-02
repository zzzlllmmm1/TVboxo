var rule = {
    title: '如意影院',
    host: 'https://www.jspxxh.com',
    url: '/show/fyfilter.html',
    searchUrl: '/search/**----------fypage---.html',
    searchable: 1,
    quickSearch: 0,
    timeout: 5000,
    play_parse: true,
    double: true,
    class_name: '电影&电视剧&动漫&综艺',
    class_url: '1&2&4&3',
    filterable: 1,
    filter_url: '{{fl.cateId}}-{{fl.area}}-{{fl.by}}-{{fl.class}}-----fypage---{{fl.year}}',
    filter_def: {
        '1': {
            cateId: '1'
        },
        '2': {
            cateId: '2'
        },
        '3': {
            cateId: '3'
        },
        '4': {
            cateId: '4'
        }
    },
    headers: {
        'User-Agent': 'MOBILE_UA'
    },
    lazy: "js:\n  input = { parse: 1, url: input, js: '' };",
    推荐: '*',
    tab_exclude: '记录|推荐',
    一级: '.shoutu-vodlist li;a&&title;.lazyload&&data-original;.text&&Text;a&&href',
    二级: {
        title: 'h1&&Text;.shoutu-media-bd&&.tag&&Text',
        img: '.lazyload&&data-original',
        desc: '主要信息;年代;地区;演员;导演',
        desc: '.shoutu-media-bd&&.tag&&Text;.shoutu-media-bd&&.data:eq(2)&&Text;.shoutu-media-bd&&.data:eq(0)&&Text;.shoutu-media-bd&&.data:eq(1)&&Text',
        content: '.shoutu-media-bd&&.desc&&Text',
        tabs: '.panel-hd h3',
        lists: '.shoutu-playlist:eq(#id)&&li'
    },
    搜索: '*',
    filter: 'H4sIAAAAAAAAA+2Y3W4aRxTH7/sU1V67Eovz4eRVolzQCClR0lSy00pWZMk2hgBxACPHhIK/agOOYzDY1IElwMvszMJbdNg5H0PVrKhqRa0EV/zOf8/sOTM75+zsa8u2Hj56bT2PrloPrScvIisr1oL1MvJTVKFI1WQsrvjXyItfov51Lyfm+Nk4djYxK7DWFsC6V1bXgxUANS/ZgoEYUJMbObm+BxoAjZk+c/tlHFMDjVnbEd0ejqmB/ChwBrpf8oPrpPB+GlAb1ati+xw0ALpf+tLrowZgxOnt9jjOCZBWecNxAlAs9ao7OMJYNJBfIj8ufkQ/DeR3cK4iRz8NpG1eeHs7qGkgLZaWm7+hpoHy62VFvIP5aUBtvJ+XHyqgAdCYe29GKQfH1EA5DBre7h+i38I0iOmuucSogd7ul6pi9s6ejk5oFTWQlkmI7BVqGmgVhzm1BriKGnhWy3J/h2bVB9K2ht4nzBKA4uzveL3yVDJTprXHkyv1LoosRyPGJio3xbYz6yY6rY2LCQxBAy1CtSg7l7gIGniqmrI7oKnygUIfZESpj0FroMW7fs8aAE3j2xZrAORXqMjyBfppoDgPP7IfAD8Qn1kD4FiaZizNKb93TeFU0U8D+W1l1UyJJO4VZsqkMvSydS9VxGSIeQMfybdD5UZ7GJmuiN+4PSxTAOair0Yjy8aid9turz/joodD4Ttg8/8a9kW2L5r2MNvDpt1mu23aQ2wPGXb7AdnVX8O+xPYl036f7fdN+z223zPtd9l+17RzvraZr8352ma+Nudrm/nanK9t5muHfgiHQpw0Ml7xIOQv0AlcQIj60rS+9FddltqyQM+bBvNh+HGVHwWZyQsnO+OjIAs340IbrK+eqQFQcR1HNndBefrs1Qo/3ZdbIok1Y+XJz8vRSSyPF777Xv2s8G2194BiHNRSdbcQGzcilp1qIGCa5fVBNG6EU0dNw4xt+auvD0FtOej1IajxBLVQt3vMjQeA23JcFrGyA9D93ie41QMYTYnnDGDWevVvmlQirq6nHurDvEnNm9S8Sc2b1D9uUtbiLTWo8XrKq63jjtZgFtitQ6PAKqDIGsNRM4mbTgP55esyjScCAJ6FuOxgsQfg6nLtdnNUXXwwKt34BGMBIM05F40D1DTwcl4Z5ywN5Ld7KNt0FtZAfp2OTGZdJ89noikTzUP7d9WycB400BitzdHGNnpr+AbNRDUP1SYoaB+M4q7KNhf3CZB2UVMTi5qGeRmcl8H/chm8c0tlMKjUBX0y82L10TGWTwAaM3M2+S4DY2ogLXfgXdDnJg28t7/+CWuU2x9l8MwAQGMeHYsSvu8DzPJOL8uO8VlMA90v4KNQ0PlFNNU04SoDmFrl2tAU0HyeDtwv+KkNgM8QhyJZojOED/zsXIk6tg4AGrOUlkVsAQA8Ly0xLNC8+PAtzgKlvuvQC6mGWd6//7ZEz99i5+X7/1i+1/4EyQrESUYZAAA='
}