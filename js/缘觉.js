// 发布页 https://www.bdys.me/
var rule = {
    title: '缘觉影视',
    host: 'https://www.yjys.me',
	url: '/s/all/fypage?type=fyclassfyfilter',
	filter_url:'&{{fl.area}}&{{fl.year}}&{{fl.by}}',
	filter:'H4sIAAAAAAAAA+2Vy04qQRCGX8X0mkU13k14khMXY5yVt4REE2JYCcSjIt4JatTEGyYaxkiOwAnwMnQP8xb2OD1NdeHW3Sz7+/8UM98U6YltBmzhzzZbcXNsgTlZ12Eptu6sueokrj1x0FHnLWd10/2urSs8aJWD2lGI1YHlUzF9E1dd8fAc1Eo6C6dlLG6Xg6eabDXGy5qTyRVPtns/TI54XPZ7hwrimiZxYbj/TgqaxAVZfZTXr7igSVwIbl/IBE3MhI9zUtAkLoiyJzpPuKCJKfQ+yQRNzFs89v3Km/+3Zr2IgeZJChVlXuy+WA9joKn1PiIy6FxaTcxNuXGmiKz+s5oGmg9xfCOKLetDRMS8QvlTFD3r+SMy+u7twLakibG0dyf3++oJLVEGmjn9gt+tygt70wzML4bFaP9zrpNF+99uDv53x/ZfFOvBTp3ufxrSk5qFUzLfZxSmSZjGISchxyGQEFDI5+1QnVE4R8I5HM6ScBaHMyScweE0CadxOEXCKRwSQxwb4sQQx4Y4McSxIU4McWwIiCHAhoAYAmwIiCHAhoAYAmwIiCHAhoAYAmwIiCHAhoAYAmwIiCHAhoAYUme89ku50dLLwxPRqYwtvbxqygtP/cGDalPP2sguu9nMyPXwveSf3g8bBbFbsio8/LHFFOPJTZPcNMlNk9w0yU2T3DS/eNPkvwAO/xis1gwAAA==',
    class_name: '电影&电视',
    class_url: '0&1',
    searchUrl: '/search/**/fypage',
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    play_parse: true,
    lazy: $js.toString(() => {
        input = {
            parse: 1,
            url: input,
            sniff: 'tos-cn|/tos/|/obj/|m3u8|mp4',
            header:{'User-Agent':'MOBILE_UA','Cookie':''}
        }
    }),
    double: true,
    推荐:'.row-cards;.card-link;*;img&&data-src;*;*',
    一级:'.row-cards&&.card-link;h3&&Text;img&&src;p&&Text;a&&href',
    二级:{
    	"title":"h2&&Text;.mt-1&&Text",
    	"img":".col-md-auto img&&src",
    	"desc":";;;.mb-md-2:eq(3)&&Text;.mb-md-2:eq(1)&&Text",
    	"content":"#synopsis .card-body&&Text",
    	"tabs":".card-header:eq(1) h3",
    	"lists":"#play-list:eq(#id) a"
	},
    搜索:'.row-cards .row-0;.d-inline-block&&title;img&&src;.d-inline-block&&Text;a&&href',
}