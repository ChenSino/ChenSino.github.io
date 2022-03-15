module.exports = {
    base: '/',
    "title": "一头老母猪",
    "description": "Good good study ,day day up!",
    "dest": "public",
    "head": [
        [
            "link",
            {
                "rel": "icon",
                "href": "/favicon.ico"
            }
        ],
        [
            "meta",
            {
                "name": "viewport",
                "content": "width=device-width,initial-scale=1,user-scalable=no"
            }
        ]
    ],
    "theme": "reco",
    "themeConfig": {
        lastUpdated: '上次更新', // string | boolean
        subSidebar: 'auto',//在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
        "nav": [
            {
                "text": "Home",
                "link": "/",
                "icon": "reco-home"
            },
            {
                "text": "Java",
                "icon": "reco-blog",
                "items": [
                    {
                        text: "Java核心",
                        items: [
                            {
                                "text": "Java基础",
                                "link": "/docs/java/base/"
                            },
                            {
                                "text": "Jvm",
                                "link": "/docs/java/jvm/"
                            },
                            {
                                "text": "Java进阶",
                                "link": "/docs/java/advance/"
                            },
                        ]
                    },
                    {
                        text: "Java框架",
                        items: [
                            {
                                "text": "Java框架Spring",
                                "link": "/docs/java/framework/spring/"
                            }
                        ]
                    }
                ]
            },
            {
                "text": "随笔杂记",
                "link": "/docs/essay/"
            },
            {
                "text": "TimeLine",
                "link": "/timeline/",
                "icon": "reco-date"
            },
            {
                "text": "Contact",
                "icon": "reco-message",
                "items": [
                    {
                        "text": "GitHub",
                        "link": "https://github.com/chen462488588",
                        "icon": "reco-github"
                    }
                ]
            }
        ],
        "sidebar": {
            //java基础
            "/docs/java/base/": [
                "",
                "ConstantPool",
                "IntegerConstantPool",
                "String",
                "Serialization"
            ],
            //jvm
            "/docs/java/jvm/": [
                "",
                "SetObjectNull"
            ],
            //java进阶
            "/docs/java/advance/": [
                "",
                "ProxyInjava",
                "Mysql8主从复制搭建"
            ],
            //java框架
            "/docs/java/framework/spring/": [
                "",
                "SpringBootAutoConfiguration",
                "SpringExtensionPoint"
            ],
            "/docs/essay/": [
                "",
                "TyporaPicgo"
            ],
        },
        "type": "blog",
        "blogConfig": {
            "category": {
                "location": 2,
                "text": "Category"
            },
            "tag": {
                "location": 3,
                "text": "Tag"
            }
        },
        "friendLink": [
            {
                "title": "vuepress-theme-reco",
                "desc": "A simple and beautiful vuepress Blog & Doc theme.",
                "avatar": "/avatar.jpg",
                "link": "https://vuepress-theme-reco.recoluan.com"
            }
        ],
        "logo": "/logo.png",
        "search": true,
        "searchMaxSuggestions": 10,
        "lastUpdated": "Last Updated",
        "author": "a_fat_pig",
        "authorAvatar": "/avatar.jpg",
        "record": "xxxx",
        "startYear": "2017"
    },
    "markdown": {
        "lineNumbers": true
    },
    plugins: ['@vuepress/last-updated']
}
