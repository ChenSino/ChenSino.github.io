---
title: ELK 部署
date: 2024-08-05
author: chensino
publish: true
isOriginal: true
---

### 1. 目录结构

~~~shell
elk
├── config
│   ├── es
│   │   ├── config
│   │   └── plugins
│   ├── kibana
│   │   └── config
│   └── logstash
│       ├── config
│       └── pipeline
├── data
│   ├── es
│   │   └── data
│   └── logstash
│       ├── data
└── logs
    └── logstash
~~~

### 2. docker-compose

~~~yaml
version: "3"
services:
   elasticsearch: 
     restart: always
     image: docker.elastic.co/elasticsearch/elasticsearch:8.11.3
     container_name: elasticsearch
     hostname: elasticsearch
     privileged: true
     ulimits:
      memlock:
        soft: -1
        hard: -1
     environment:
      - "ES_JAVA_OPTS=-Xms3192m -Xmx3192m"
      - "http.host=0.0.0.0"
      - "node.name=es_node01"
      - "cluster.name=es_cluster"
      - "discovery.type=single-node"
     networks:
        - custom
     ports:
      - "9200:9200"
      - "9300:9300"
     volumes:
       - "./config/es/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml"  
       - "./config/es/plugins:/usr/share/elasticsearch/plugins:rw"
       - "./data/es/data:/usr/share/elasticsearch/data:rw" 
   kibana:
    restart: always
    container_name: kibana
    image: docker.elastic.co/kibana/kibana:8.11.3
    environment:
      - XPACK_MONITORING_COLLECTION_ENABLED="true"
    networks:
        - custom
    ports:
      - "5601:5601"
    volumes:
      - "./config/kibana/config:/usr/share/kibana/config"
      
   logstash:
     image: docker.elastic.co/logstash/logstash:8.11.3
     container_name: logstash
     networks:
        - custom
     ports:
       - "9600:9600"
     restart: always
     volumes:
       - "./config/logstash/config:/usr/share/logstash/config"
       - "./config/logstash/pipeline:/usr/share/logstash/pipeline"
       - "./data/logstash:/usr/share/logstash/data"
       - "./logs/logstash:/usr/share/logstash/logs"     


networks:
  custom:
    driver: bridge
    ipam:
      config:
        - subnet: 172.15.0.0/16
          gateway: 172.15.0.1
~~~

~~~shell
#启动命令
docker compose up
~~~

elasticsearch地址：<http://localhost:9200>
kibana地址：<http://localhost:5601>

### 3. 初始化密码

> elastic通过docker启动后，需要进入容器设置默认的密码，会分别给elastic，
> logstash，kibana等提供对应账号，以及默认密码，设置方式如下：

~~~shell
#进入容器
docker exec -it <容器名字> /bin/bash
# 设置默认密码
./bin/elasticsearch-setup-passwords interactive
~~~

如下图，会分别设置多个默认密码，对应不同系统使用
![20240919164025](https://ddns.chensina.cn:29000/afatpig/blog/20240919164025.png)

密码设置参考
<https://blog.csdn.net/ju_362204801/article/details/125426228>

### 4. 安装IK中文分词器

#### 4.1 安装

1. 下载ik分词器插件
    下载地址：<https://github.com/infinilabs/analysis-ik/releases/download/v8.11.3/elasticsearch-analysis-ik-8.11.3.zip>
2. 将ik分词器插件解压到`config/es/plugins`目录下，改为目录改名字为ik
3. 重启容器`docker restart elasticsearch`

#### 4.2 测试分词

打开kibana，进入控制台：

~~~shell
GET /_analyze
{
  "analyzer": "ik_max_word",
  "text": "开立生物医疗信息科技有限公司"
}
~~~

结果：

~~~json
{
  "tokens": [
    {
      "token": "开立",
      "start_offset": 0,
      "end_offset": 2,
      "type": "CN_WORD",
      "position": 0
    },
    {
      "token": "立生",
      "start_offset": 1,
      "end_offset": 3,
      "type": "CN_WORD",
      "position": 1
    },
    {
      "token": "生物",
      "start_offset": 2,
      "end_offset": 4,
      "type": "CN_WORD",
      "position": 2
    },
    {
      "token": "医疗",
      "start_offset": 4,
      "end_offset": 6,
      "type": "CN_WORD",
      "position": 3
    },
    {
      "token": "信息",
      "start_offset": 6,
      "end_offset": 8,
      "type": "CN_WORD",
      "position": 4
    },
    {
      "token": "科技",
      "start_offset": 8,
      "end_offset": 10,
      "type": "CN_WORD",
      "position": 5
    },
    {
      "token": "有限公司",
      "start_offset": 10,
      "end_offset": 14,
      "type": "CN_WORD",
      "position": 6
    },
    {
      "token": "有限",
      "start_offset": 10,
      "end_offset": 12,
      "type": "CN_WORD",
      "position": 7
    },
    {
      "token": "公司",
      "start_offset": 12,
      "end_offset": 14,
      "type": "CN_WORD",
      "position": 8
    }
  ]
}
~~~

#### 4.4 ik分词器扩展

1. 在IKAnalyzer.cfg.xml配置文件内容添加：

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
        <comment>IK Analyzer 扩展配置</comment>
        <!--用户可以在这里配置自己的扩展字典-->
        <entry key="ext_dict">ext.dic</entry>
         <!--用户可以在这里配置自己的扩展停止词字典  *** 添加停用词词典-->
        <entry key="ext_stopwords">stopword.dic</entry>
</properties>
~~~

2. 分别添加词典文件：ext.dic stopword.dic

### 5. 安装拼音分词器

#### 5.1 安装

1. 下载拼音分词器插件<https://github.com/infinilabs/analysis-pinyin/releases/download/v8.11.3/elasticsearch-analysis-pinyin-8.11.3.zip>
2. 复制到`config/es/plugins`目录下，改名为`analysis-pinyin`
3. 重启容器`docker restart elasticsearch`

#### 5.2 测试分词

~~~json
//新建索引库设置自定义分词器
PUT /sono
{
  "settings": {
    "analysis": {
      "analyzer": { 
        "my_analyzer": { //自定义分词器名字
          "tokenizer": "ik_max_word",
          "filter": "py"
        }
      },
      "filter": { // 自定义tokenizer filter
        "py": { // 过滤器名称
          "type": "pinyin", // 过滤器类型，这里是pinyin
    "keep_full_pinyin": false,
          "keep_joined_full_pinyin": true,
          "keep_original": true,
          "limit_first_letter_length": 16,
          "remove_duplicated_term": true,
          "none_chinese_pinyin_tokenize": false
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "name": {
        "type": "text",
        "analyzer": "my_analyzer",
        "search_analyzer": "ik_smart"
      }
    }
  }
}


//测试拼音分词器
post /sono/_analyze
{
  "text": ["开立医疗生物科技有限公司"],
  "analyzer": "my_analyzer"
}
~~~

结果：

~~~json

{
  "tokens": [
    {
      "token": "开立",
      "start_offset": 0,
      "end_offset": 2,
      "type": "CN_WORD",
      "position": 0
    },
    {
      "token": "kaili",
      "start_offset": 0,
      "end_offset": 2,
      "type": "CN_WORD",
      "position": 0
    },
    {
      "token": "kl",
      "start_offset": 0,
      "end_offset": 2,
      "type": "CN_WORD",
      "position": 0
    },
    {
      "token": "医疗",
      "start_offset": 2,
      "end_offset": 4,
      "type": "CN_WORD",
      "position": 1
    },
    {
      "token": "yiliao",
      "start_offset": 2,
      "end_offset": 4,
      "type": "CN_WORD",
      "position": 1
    },
    {
      "token": "yl",
      "start_offset": 2,
      "end_offset": 4,
      "type": "CN_WORD",
      "position": 1
    },
    {
      "token": "生物科技",
      "start_offset": 4,
      "end_offset": 8,
      "type": "CN_WORD",
      "position": 2
    },
    {
      "token": "shengwukeji",
      "start_offset": 4,
      "end_offset": 8,
      "type": "CN_WORD",
      "position": 2
    },
    {
      "token": "swkj",
      "start_offset": 4,
      "end_offset": 8,
      "type": "CN_WORD",
      "position": 2
    },
    {
      "token": "生物",
      "start_offset": 4,
      "end_offset": 6,
      "type": "CN_WORD",
      "position": 3
    },
    {
      "token": "shengwu",
      "start_offset": 4,
      "end_offset": 6,
      "type": "CN_WORD",
      "position": 3
    },
    {
      "token": "sw",
      "start_offset": 4,
      "end_offset": 6,
      "type": "CN_WORD",
      "position": 3
    },
    {
      "token": "科技",
      "start_offset": 6,
      "end_offset": 8,
      "type": "CN_WORD",
      "position": 4
    },
    {
      "token": "keji",
      "start_offset": 6,
      "end_offset": 8,
      "type": "CN_WORD",
      "position": 4
    },
    {
      "token": "kj",
      "start_offset": 6,
      "end_offset": 8,
      "type": "CN_WORD",
      "position": 4
    },
    {
      "token": "有限公司",
      "start_offset": 8,
      "end_offset": 12,
      "type": "CN_WORD",
      "position": 5
    },
    {
      "token": "youxiangongsi",
      "start_offset": 8,
      "end_offset": 12,
      "type": "CN_WORD",
      "position": 5
    },
    {
      "token": "yxgs",
      "start_offset": 8,
      "end_offset": 12,
      "type": "CN_WORD",
      "position": 5
    },
    {
      "token": "有限",
      "start_offset": 8,
      "end_offset": 10,
      "type": "CN_WORD",
      "position": 6
    },
    {
      "token": "youxian",
      "start_offset": 8,
      "end_offset": 10,
      "type": "CN_WORD",
      "position": 6
    },
    {
      "token": "yx",
      "start_offset": 8,
      "end_offset": 10,
      "type": "CN_WORD",
      "position": 6
    },
    {
      "token": "公司",
      "start_offset": 10,
      "end_offset": 12,
      "type": "CN_WORD",
      "position": 7
    },
    {
      "token": "gongsi",
      "start_offset": 10,
      "end_offset": 12,
      "type": "CN_WORD",
      "position": 7
    },
    {
      "token": "gs",
      "start_offset": 10,
      "end_offset": 12,
      "type": "CN_WORD",
      "position": 7
    }
  ]
}
~~~
