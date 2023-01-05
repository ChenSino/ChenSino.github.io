---
title: 子类和父类（或者父接口）实现同一个接口
date: 2023-01-03
tag:
    - oauth
    - sso
---

## 1、背景

今天看Securfity的源码，其中`org.springframework.security.config.annotation.web.builders.HttpSecurity`类的UML看着很奇怪，如下图所示，命名其父类和父接口都实现过SecurityBuilder,为什么自己要再次实现呢？

![20230105160622](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230105160622.png)

## 2、探索

我一开始注意力被泛型吸引了，想着是不是因为用了不同的泛型类的原因，为此我还专门去复习了一下泛型的东西。后来确定和泛型没关系，然后百度了一下，找到了以下网友的博客，为此我还专门写demo验证了他的博客内容，发现确实如此。
![20230105161007](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230105161007.png)

### 2.1 demo验证

~~~java
//接口
public interface Animal {
    public void sayHi();
}
//第一层实现
public class Human implements Animal{
    @Override
    public void sayHi() {
        System.out.println("I am Human");
    }
}

//第二层实现
public class Male extends Human{
    @Override
    public void sayHi() {
        System.out.println("I am male");
    }
}


//测试
public class Client {
    public static void main(String[] args) {
        Animal human = new Human();
        Animal male = new Male();

        testInterfaces(human);
        testInterfaces(male);
    }

    public static void testInterfaces(Animal animal) {
        animal.sayHi();

        Class<?>[] interfaces = animal.getClass().getInterfaces();
        if (interfaces.length > 0) {
            Arrays.stream(interfaces).forEach(interface1 -> {
                System.out.println(interface1.getName());
            });
        }
        System.out.println("----------------后置分割线----------------");
    }
}


~~~

~~~shell
### 测试结果
## 第一次Male未实现Animal接口，则反射时一个male对象是无法获取到Animal类型的，但是Human因为直接实现了Animal所以能获取到Animal接口

I am Human
org.example.Animal
----------------后置分割线----------------
I am male
----------------后置分割线----------------
~~~

![20230105161843](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230105161843.png)

~~~shell
#第二次测试，让Male也实现Animal接口，再执行测试代码，则male也可以获取到了Animal
I am Human
org.example.Animal
----------------后置分割线----------------
I am male
org.example.Animal
----------------后置分割线----------------
~~~

![20230105161911](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230105161911.png)

### 2.2  回到security源码验证

我下载了Security的源码，然后直接在源码中删除了HttpSecurity中对SecurityBuilder的实现，重新编译，编译没报错，

## 3、结论

子类和父类实现同一个接口，这种写法是为了保证反射获取到接口类型时能正常获取到其实现的接口类型。
