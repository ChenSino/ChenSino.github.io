---
title: 自定义类加载器
date: 2023-01-31
---

## 1、自定义类加载器

自定义类加载器比较简单，只需要继承ClassLoader重写findClass方法即可，因为原ClassLoader中并未实现findClass方法，在方法体中直接抛出了ClassNotFoundException

```java

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.nio.ByteBuffer;
import java.nio.channels.Channels;
import java.nio.channels.FileChannel;
import java.nio.channels.WritableByteChannel;

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
