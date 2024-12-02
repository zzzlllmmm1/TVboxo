Object.assign(muban.mxone5.二级,{
    lists: '.module-row-one:eq(#id)&&a.module-row-text',
    list_text:'h4&&Text',
    list_url:'a&&data-clipboard-text',
    list_url_prefix:'push://'
});
var rule = {
  title: '玩你老哥[盘]',
  模板:'mxone5',
  host: 'https://tv.yydsys.top',
  url: '/index.php/vod/show/id/fyclass/page/fypage.html',
  searchUrl: '/index.php/vod/search/wd/**.html',
  filter_url:'{{fl.cateId}}{{fl.area}}{{fl.by or "/by/time"}}{{fl.class}}{{fl.lang}}{{fl.letter}}/page/fypage{{fl.year}}',
  filter:'H4sIAAAAAAAAA+2aW08bRxTHn5NPUfmZyruQ+1vu9/s9VR6cyGqjUioBrYQiJMDYMQRsg4gd1+bWcC/G5lIKpsZfxrNrf4uuPeOzs/9FtZHIQ+k8+vf/+8zMmfH6nN19f/KER/dc+O6950d/j+eC5227r6vL0+Lp8P3ktz6yoUUjELQ+/+pr/8Vf83VUcXCpEliqYuuDp7dF0Hja8gvqrUXyCla3mOF1Ec+2CFa3GP0xoy/utAhGAw0vlQppGIgzGmhxjO3uwUCcURRamxSFM5pL+HMpPwRz4axuKWcW2MiK0yIYzWU4axbAIpi0InNiz7WiKiPL/AfXigSj6WYWSvszMF3OKEpovJJchiicUZSpFWuNEIWzQ+yRMbBqxsfAwhlZAsPGwG9g4YxStxdlwR1IHWd1S2Vy3Pg877QIRgPFP5SH8jAQZ5SX/TVz4k9WWIfUECZjdK78BU8NZ2SJhFh0Ayyc0akpxqzthVPDmb1TaWNyDHeqxsgyWDT/gKULRgksjJl76YOW5lB6X1e/wC8Bvk6/T7oCpHNsJN/sFWBusZIM1cepBvIKRLu1kDR2sg6HQHaCc8buvjMGR7Sm/QhLFRwOgWjDNz+hQyDagI/r6BCIYiTmjfSqMwZHtJbpZYwhkH2q/kKHQPZMc+6Z5hwxRnMsv+CMwRHFGIxaWWbhZWcYorTm+aIZzZhDSeeyidoXoxnjY9H6snNQouQLbpf24k4TR/Jxavd1fG8fp3I2U17qa/Y4pQqWvz5ANZBXIGkb0SEQHZaNOXQIRNuYKLDRBJpsKm23y8SRdGTQIZB0MF0OjqQj41ozR1La2VrA6eBITnuP39dpp91IbFcSW02mvVVrPVUPXw3jrQFJbUO1TVZbUW2VVR1VXVY1VDVJ1c+DagFJPYfqOVk9i+pZWT2D6hlZPY3qaVnFXOlyrnTMlS7nSsdc6XKudMyVLudKx1zpcq40zJUm50rDXGlyrjTMlSbnSsNcaXKuNMyVJudKw1xpcq40zJUm50rDXGlyrjTMlSbnSsNcWcBxjfJ3d/ulnwvLJIzsaJM/l4v0U6xF8V4k5RIol0i5DMplUq6AcoWUq6BcJeUaKNdIuQ7KdVJugHKDlJug3CTlFii3SLkNym1S7oByh5S7oNwl5R4o90i5D8p9Uh6A8oCUh6A8JOURKI9IeQzKY1KegPKElKegPCXlGSjPSHkOynNSXoDygpSXoLwk5RUor0jRvj0PWpXIP4E3PdK/RWSc5aOu42//iVTjvOnxdr+z7PUhSvm8kZuQ1B/edXfZf9TZQRYOSWrX2587/dUZvG45+Y2n9aha0MbVeRM9HW8fWP82C0QPaiyEcoi+l61ts3wGLJwdrkts1Pc20SU20fc20cE00ZmVdmddHYxgdgsYNJJZ2AzOaC6fQq52VDCpyXFtgGAH16oiirtYVb2P6n1U7/N1eh/Vt6i+RfUtqm9RfYvqW45H33LC03ZEfUulb8hc7INegzO5VB6cdpfKFqPJrhXLubDTIhhFGc8Yw/DIQDD7nzxo7EBlL5hdDmyWdmMwXc6kQrXyBaYrGFnyK2xtCiyc0VxSG+4nN5xRlIlpYwuf9HFGUXZ2jHC0lB93PXNxKJTGrd+tTgbSyBlFXB8o949ALM6Oqp0IBS2/s8DkyF5V1moOnHUvR1JNZlVpWMZXETlWF61NcTo4UmWsKmNVGavKWFXGqjJWlbHHvIw9dURlbBM1ahMvZpmBTHkWimHBaKDIkhkLwUCckSU2Za7iC0ic2TVWw5ehyrHJcgSeFghGA83MshTc2xeMBmp8495I591vXXFGc2n80lATDzdYzkr2FsyFM9kyv+m2WIz2aG6/9De8uyUYRYlMs3AKonBmH9oNloE+QjAaKDVsJKEDEMzO7jorJjC7NSYVbV/79n+qUMrDXWOOpNKywU31f6nGD1yHuu2s6nVVr6t6XdXrql6XFFWvH/d63brOq/dl1Psy/+33ZRre4Fbvyxz2fRkjnmPDM2xy1mkiqtoI1UaoNkK1EaqNUG2EaiP+121E7z8eoxmt+j0AAA==',
  cate_exclude:'短剧|全部影片',
    搜索: '.module-items&&.module-search-item;a&&title;img&&data-src;.video-serial&&Text;.video-info-footer&&a&&href',
}