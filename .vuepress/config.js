module.exports = {
    base: '/',
    "title": "Cute baby Sino Chen",
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
        vssueConfig: {
            platform: 'github',
            owner: 'ChenSino',
            repo: 'ChenSino.github.io',
            clientId: '8730ff09031fd6fcc754',
            clientSecret: '655372b976941560dfe0e2a8e6d34ab4b162353e',
        },
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
                        text: "Java Core",
                        items: [
                            {
                                "text": "Java基础",
                                "link": "/docs/java/base/"
                            },
                            {
                                "text": "Java进阶",
                                "link": "/docs/java/advance/"
                            },
                            {
                                "text": "虚拟机",
                                "link": "/docs/java/jvm/"
                            },
                        ]
                    },
                    {
                        text: "Java FrameWork",
                        items: [
                            {
                                "text": "Spring",
                                "link": "/docs/java/framework/spring/"
                            },
                            {
                                "text": "SpringBoot",
                                "link": "/docs/java/framework/springboot/SpringBootAutoConfiguration"
                            },
                            {
                                "text": "Mybatis",
                                "link": "/docs/java/framework/mybatis/mybatis"
                            }
                        ]
                    }
                ]
            },
            {
                "text": "web前端",
                "icon": "reco-blog",
                items: [
                    {
                        "text": "javascript基础",
                        "link": "/docs/frontWeb/javascript/"
                    },
                    {
                        "text": "vue知识点",
                        "link": "/docs/frontWeb/vue/"
                    }
                ]
            },
            {
                "text": "Web通用",
                "icon": "reco-blog",
                items: [
                    {
                        "text": "Http",
                        "link": "/docs/other/web/"
                    }
                ]
            },
            {
                "text": "其他",
                "icon": "reco-blog",
                "items": [
                    {
                        "text": "git",
                        "link": "/docs/other/git/"

                    },
                    {
                        text: "数据库",
                        link: "/docs/other/database/"
                    },
                    {
                        text: "Linux",
                        link: "/docs/other/linux/"
                    },
                    {
                        text: "工具软件",
                        link: "/docs/other/tools/"
                    },
                    {
                        text: "分布式微服务",
                        link: "/docs/other/distributeservice/"
                    },
                    {
                        text: "小组分享",
                        link: "/docs/other/training/"
                    },
                    {
                        text: "随笔杂记",
                        link: "/docs/other/essay/TyporaPicgo"
                    },
                ]
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
                        "link": "https://github.com/chensino",
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
                "Serialization",
                "CustomLRU"
            ],
            //jvm
            "/docs/java/jvm/": [
                "",
                "SetObjectNull",
                "StringAdd",
                "NewObject"
            ],
            //java进阶
            "/docs/java/advance/": [
                "",
                "ProxyInjava",
                "Mysql8主从复制搭建",
                "ThreadPool",
                "ParentDelegationClassloader",
                "Collection",
                "Arthas"
            ],
            //java框架Spring
            "/docs/java/framework/spring/": [
                "",
                "SpringExtensionPoint",
                "DesignPatternInSpring",
                "SpringCache",
                "BeanPostProcessor"
            ],
            //java框架SpringBoot
            "/docs/java/framework/springboot/": [
                "SpringBootAutoConfiguration",
                "AOPLog"
            ],
            //java框架Mybatis
            "/docs/java/framework/mybatis/": [
                "mybatis"
            ],
            "/docs/frontWeb/vue/":[
                "",
                "vue-router1",
                "vue-nextTick",
                "vueExtend"
            ],
            "/docs/frontWeb/javascript/": [
                "",
                "aboutAsync",
                "throttle",
                "aboutThis",
                "lazyLoad",
                "crossDomain",
                "crossDomain2"

            ],
            "/docs/other/git/": [
                "",
                "stash",
                "GitCommands"
            ],
            "/docs/other/database/": [
                "",
                "MysqlRemoteConnect",
                "MysqlNote"
            ],
            //随笔
            "/docs/other/essay/": [
                "TyporaPicgo",
                "DeployGithubPage",
                "CDN",
                "GreatWallProxy",
                "Jenkins",
                "2022-03-18",
                "Service",
                "2022-04-12",
                "BTree",
                "CloudService",
                "ChromeDevTools"
            ],
            //linux
            "/docs/other/linux/": [
                "",
                "CommonUsedCMD",
                "Manjaro",
                "TcpDump",
                "Samba"
            ],
            "/docs/other/tools/": [
                ""
            ],
            //分布式微服务
            "/docs/other/distributeservice/": [
                "",
                "DistributeLock",
                "Nacos"
            ],
            //HTTP
            "/docs/other/web/": [
                "",
                "Restful"
            ],
            "/docs/other/training/": [
                "",
                "CloudServiceTraining"
            ],
        },
        "type": "blog",
        "blogConfig": {
            // "category": {
            //     "location": 2,
            //     "text": "Category"
            // },
            // "tag": {
            //     "location": 3,
            //     "text": "Tag"
            // }
        },
        "friendLink": [
            {
                "title": "作者CSDN",
                "desc": "来看看我的博客吧.",
                "avatar": "/avatar.jpg",
                "link": "https://blog.csdn.net/chen462488588"
            }
        ],
        "logo": "/logo.png",
        "search": true,
        "searchMaxSuggestions": 10,
        "lastUpdated": "上次更新",
        "author": "chenkun",
        "authorAvatar": "/avatar.jpg",
        "record": "Just go go go",
        "startYear": "2017"
    },
    "markdown": {
        "lineNumbers": true
    },
    plugins: ['@vuepress/last-updated', 'vuepress-plugin-mermaidjs']
}
