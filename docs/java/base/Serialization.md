---
title: Integer常量池
date: 2019-08-08 08:00:00
sidebar: auto
author: a_fat_pig
categories: 
  - java基础
tags: 
  - 
---

#### 1、序列化、反序列化是什么？

- 序列化：把对象转化成字节码
- 反序列化：把字节码（从IO流获取或者从硬盘文件读取）转化为对象

#### 2、 举例说明作用？

只有序列化成字节码文件后，对象才能在网络中通过IO流（传输的是字节码）传输或者存到硬盘上

 ##### 2.1 实现分布式对象

   例如在RMI（Remote Method Invoke）中利用对象序列化来运行远程主机上的服务，就像执行本地的对象方法一样；

##### 2.2 Java对象序列化不仅保留一个对象的数据，而且会递归保留引用的对象

序列化时，把虚拟机内存中的对象保存到文件，反序列化时再把文件中的对象还原到内存中去

注意如果序列化Student时，Teacher类没有被序列化则会抛出异常``` java.io.NotSerializableException: com.chen.Teacher```

如果想不抛出异常有两种方法：

1. 老老实实把Teacher类也实现Serializable接口
2. 在Student类中把Teacher字段用transient修饰，则反序列化后看到的teacher是null这是和第一种方法不一样的地方

```java
//学生类实现序列化就接口，并且学生有一个老师属性字段

public class Student implements Serializable {
    private Teacher teacher = new Teacher("James Li", 33);
    private String sName;
    private String sex;

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public String getsName() {
        return sName;
    }

    public void setsName(String sName) {
        this.sName = sName;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    @Override
    public String toString() {
        return "Student{" +
                "teacher=" + teacher +
                ", sName='" + sName + '\'' +
                ", sex='" + sex + '\'' +
                '}';
    }
}

```

```java
//老师类也要实现Serializable，如果不实现的话，当序列话Student类时会抛出异常java.io.NotSerializableException: com.chen.Teacher

public class Teacher  implements  Serializable{
    private String tName;
    private Integer tAge;

    public Teacher(){}

    public Teacher(String tName, Integer tAge) {
        this.tName = tName;
        this.tAge = tAge;
    }

    public String gettName() {
        return tName;
    }

    public void settName(String tName) {
        this.tName = tName;
    }

    public Integer gettAge() {
        return tAge;
    }

    public void settAge(Integer tAge) {
        this.tAge = tAge;
    }

    @Override
    public String toString() {
        return "Teacher{" +
                "tName='" + tName + '\'' +
                ", tAge=" + tAge +
                '}';
    }
}

```

```java
//客户端验证

public class Client {
    public static void main(String[] args) {
        System.out.println(333);
        //1. object to be serialized
        Student student = new Student();
        student.setSex("man");
        student.setsName("Xiao Hong");
        student.setTeacher(new Teacher("James Li", 40));

        //2. File to store the student object
        File file = new File("/home/chenkun/IdeaProjects/MyStudy/student.ser");
        FileOutputStream fileOutputStream = null;
        try {
            fileOutputStream = new FileOutputStream(file);
            ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
            objectOutputStream.writeObject(student);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                fileOutputStream.close();

            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        //3. Test deserialize
        FileInputStream fileInputStream = null;
        try {
            fileInputStream = new FileInputStream(file);
            ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);
            Student student1 = (Student) objectInputStream.readObject();
            System.out.println("------student1-------");
            System.out.println(student1);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

```

##### 2.3 序列化把对象保存到数据库，反序列化把数据库中的数据还原到内存

##### 2.4 对象、文件、数据，有许多不同的格式，很难统一传输和保存

序列化以后就是统一的字节码文件，是一个通用的存储格式，反序列化的时候，只需要按照约定好的格式进行“解码”就可以了
