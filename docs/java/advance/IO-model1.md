---
title: I/O模型总结
date: 2023-02-09
---


## 1 BIO

当给BIO的accept和read方法加上超时机制后，可以在代码层面解决阻塞问题，但这不是真正的非阻塞，通常我们说的非阻塞是指的操作系统层面的非阻塞，就是当accept通过jni调用native方法后，最终系统不会一直被阻塞。真正的非阻塞是操作系统增加非阻塞功能后，java同步添加java.nio出现以后才有的，因此通过java实现非阻塞，需要调用nio中的类。

## 2 NIO

## 3 IO多路复用

## 4 异步IO

## 5 事件驱动的io

## 6 reactor线程模型

reactor线程模型可参考[Scalable IO in java](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/nio.pdf)，该书作者也是java.nio的作者

::: danger 注意
注意reactor线程模型并不是5种io模型之一，它是一种经典的事件驱动的线程模型，它是基于IO多路复用模型衍生出来的：

Reactor线程模式 = Reactor(I/O多路复用)+ 线程池

Reactor负责监听和分配事件，线程池负责处理事件
:::

根据Reactor的数量和线程池的数量，又可以将Reactor分为三种模型

- 单Reactor单线程模型 (固定大小为1的线程池)
- 单Reactor多线程模型
- 多Reactor多线程模型 (一般是主从2个Reactor)

reactor模型中有三种角色，分别是：
> Acceptor：处理客户端新连接，并分派请求到处理器链中  
> Reactor：负责监听和分配事件，将I/O事件分派给对应的Handler  
> Handler: 事件处理，如编码、解码等  

### 6.1 单reactor单线程

应用：redis4.0

![20230209155247](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230209155247.png)

源码示例：

~~~java
//------------------------reactor------------------
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.Iterator;
import java.util.Set;

class Reactor implements Runnable {
    final Selector selector;
    final ServerSocketChannel serverSocket;

    Reactor(int port) throws IOException {
        selector = Selector.open();
        serverSocket = ServerSocketChannel.open();
        serverSocket.socket().bind(
                new InetSocketAddress(port));
        serverSocket.configureBlocking(false);
        SelectionKey sk =
                serverSocket.register(selector,
                        SelectionKey.OP_ACCEPT);
        System.out.println("listen to " + port );
        sk.attach(new Acceptor());
    }

    /*
    Alternatively, use explicit SPI provider:
    SelectorProvider p = SelectorProvider.provider();
    selector = p.openSelector();
    serverSocket = p.openServerSocketChannel();
    */
// class Reactor continued
    public void run() { // normally in a new Thread
        try {
            while (!Thread.interrupted()) {
                System.out.println("进入reactor run");
                selector.select();
                Set selected = selector.selectedKeys();
                Iterator it = selected.iterator();
                while (it.hasNext())
                    dispatch((SelectionKey) (it.next()));
                selected.clear();
            }
        } catch (IOException ex) { /* ... */ }
    }

    void dispatch(SelectionKey k) {
        System.out.println("进入reactor dispatch");
        Runnable r = (Runnable) (k.attachment());
        if (r != null)
            r.run();
    }
    // class Reactor continued
    class Acceptor implements Runnable { // inner
        public void run() {
            System.out.println("进入Acceptor run");
            try {
                SocketChannel c = serverSocket.accept();
                if (c != null) {
                    new Handler(selector, c);
                }
            } catch (IOException ex) { /* ... */ }
        }
    }
}

//------------------------handler------------------

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.SocketChannel;

final class Handler implements Runnable {
    final SocketChannel socket;
    final SelectionKey sk;
    ByteBuffer input = ByteBuffer.allocate(1024);
    ByteBuffer output = ByteBuffer.allocate(1024);
    static final int READING = 0, SENDING = 1;
    int state = READING;

    Handler(Selector sel, SocketChannel c)
            throws IOException {
        System.out.println("进入handler 处理");
        socket = c;
        c.configureBlocking(false);
// Optionally try first read now
        sk = socket.register(sel, 0);
        sk.attach(this);
        sk.interestOps(SelectionKey.OP_READ);
        sel.wakeup();
    }

    boolean inputIsComplete() { /* ... */
        return true;
    }

    boolean outputIsComplete() { /* ... */
        return true;
    }

    void process() { /* ... */ }

    // class Handler continued
    public void run() {
        try {
            if
            (state == READING) read();
            else if (state == SENDING) send();
        } catch (IOException ex) { /* ... */ }
    }

    void read() throws IOException {
        socket.read(input);
        if (inputIsComplete()) {
            process();
            state = SENDING;
// Normally also do first write now
            sk.interestOps(SelectionKey.OP_WRITE);
        }
    }

    void send() throws IOException {
        socket.write(output);
        if (outputIsComplete()) sk.cancel();
    }
}

//-----------------------main-----
import java.io.IOException;

/**
 * 单reactor单线程模型
 */
public class Main {
    public static void main(String[] args) throws IOException {
        Reactor reactor = new Reactor(6666);
        new Thread(reactor).start();
    }
}

~~~

### 6.2 单reactor多线程

![20230209155305](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230209155305.png)

### 6.3 主从（多）reactor多线程

应用：netty

![20230209155722](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230209155722.png)
