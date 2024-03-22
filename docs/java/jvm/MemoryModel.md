---
title: 内存模型
date: 2023-01-31
---

> 环境jdk8

## 1、元空间

jdk8中用元空间取代了原来的方法区，元空间是没有上限，只要系统有可用内存那么jvm就能一直申请，那么元空间里放的是啥？比如类元信息，就是类加载器加载的类，就放在元空间。

以下进行测试，测试之前，需要了解一个知识点，两个class相同的前提是同一个类加载器加载的同一个类，这样得到的才是同一个Class.

```java
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    /**
     * -XX:+PrintGCDetails -Xmx30m -Xms30m -Xmn10m
     */
    public static void main(String[] args) throws IOException, InterruptedException, ClassNotFoundException {

        List<Class> list = new ArrayList<>();
        for (int i = 0; i < 500000; i++) {
            //每次都重新new,保证不是同一个类加载器，加载出来的就不是同一个类
            ClassLoader classLoader = new MyClassLoader();
            Thread.sleep(1);
            Class<?> testSocket = classLoader.loadClass("TestSocket");
            list.add(testSocket);
        }
    }

}
```

自定义类加载器
```java

public class MyClassLoader extends ClassLoader {

    @Override
    protected Class findClass(String name) throws ClassNotFoundException {
        File file = new File("/home/chenkun/Desktop/TestSocket.class");
        try {
            byte[] bytes = getClassBytes(file);
            //defineClass方法可以把二进制流字节组成的文件转换为一个java.lang.Class
            return this.defineClass(name, bytes, 0, bytes.length);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return super.findClass(name);

    }

    private byte[] getClassBytes(File file) throws Exception {
        // 这里要读入.class的字节，因此要使用字节流
        FileInputStream fis = new FileInputStream(file);
        FileChannel fc = fis.getChannel();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        WritableByteChannel wbc = Channels.newChannel(baos);
        ByteBuffer by = ByteBuffer.allocate(1024);

        while (true) {
            int i = fc.read(by);
            if (i == 0 || i == -1)
                break;
            by.flip();
            wbc.write(by);
            by.clear();
        }
        fis.close();
        return baos.toByteArray();
    }
}
```

即将被加载的外部类，编译后放到/home/chenkun/Desktop下，名字TestSocket.class，故意定义多个字段，让类被加载到内存占用更多的空间，方便观察测试。

```java
public class TestSocket {

private String name;
private String name1;


private String name2;

private String name3;

private String name4;

private String name44;

private String name444;

private String name555;

private String name5554;

private String name555as;

private String name55dd54;

private String name555d4d;

private String name5554ad;

}

```

启动主程序，使用visualvm监视，可以看到Metaspace一直在线性增长

![20230131181628](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230131181628.png)