   �����ֽ��ļ���labwork����e(����)�̸�Ŀ¼�£�

 1.����jdkװ��e�̸�Ŀ¼�£�java����(��java,javac�ȿ�ִ���ļ�)
   ��ִ�������û�������path

  ���ַ�����  
   ����һ���ҵĵ���-���ԡ��߼�-ϵͳ����path����ӣ�    
                        E:\jdk1.5.0\bin;
  
   ��������set path=E:\jdk1.5.0\bin;%path%
          ע�����Ե�ǰ��dos������Ч

  
 2.ִ������  java -version
  ���Բ鿴��װ��jdk�汾��Ϣ

 3.java �����ִ��.class�ļ�ʱ������Ҫ�ҵ���.class�ļ���
   �������Ѱ��.class�ļ��ģ�
  
   4.1   java������ҳ���������CLASSPATH;
       
         CLASSPATH����һ������Ŀ¼��
         ÿ��Ŀ¼����Ϊ.class�ļ��Ĳ�����㡣

   4.2   ���û��CLASSPATH���������������Ĭ��CLASSPATH=.  
         
         ��˼�ǲ������Ϊ��ǰ�Ĺ���Ŀ¼

 5. ����ı䵱ǰ�Ĺ���Ŀ¼Ϊ cd E:\labwork\
 
  ���롢ִ�е�ǰ����Ŀ¼�µ��ļ���
 
  javac ArraySize.java

  java  ArraySize
 
 6. ��5.�еĵ�ǰ����Ŀ¼�ı䵽������Ŀ¼���� cd c:��
    ��ʱ��ǰ�Ĺ���Ŀ¼ΪC:,��Ҫ���롢ִ�зǵ�ǰ����Ŀ¼           E:\labwork\�µ��ļ�������Ҫִ���������

     javac E:\labwork\ArraySize.java

     java  E:\labwork\ArraySize

     �����ִ�зǵ�ǰ����Ŀ¼�µ��࣬�����������ַ���6.1,6.2

   6.1 ����CLASSPATH����������

        ���û��CLASSPATH���������������Ĭ��CLASSPATH=.
        �����CLASSPATH��������������Ͳ�����Ĭ��ֵCLASSPATH=.
        ���������һĿ¼��Ϊ����һ�����������㣬����
        ��CLASSPATH�������Ӧ�Ĺ���Ŀ¼.  
     
     ����CLASSPATH���������ķ��������֣����������ǽ�Ŀ¼          E:\labwork\�͵�ǰ����Ŀ¼.��Ϊ��Ĳ�����㡣     

     ����һ��
     �ҵĵ���-���ԡ��߼�-��������-
     �û�����������༭������ӱ���CLASSPATH=E:\labwork\;.��
     
     ��������
     set CLASSPATH=E:\labwork\;.
     ���Ե�ǰ��DOS������Ч     
    
     ��ִ�����

     javac E:\labwork\ArraySize.java

     java  ArraySize     


   6.2  Ҳ���Բ��軷��������ͨ��ʹ������������������� 
       
       java -cp Ѱ��class��Ŀ¼Ҫִ�е�.class�ļ�
  
 
      ��ִ�����

        javac E:\labwork\ArraySize.java

        java  -cp E:\labwork ArraySize     

   7.������������ִ�����
      e: 
      cd E:\labwork\    

     javac ICarnegieInfoDemo.java

     java ICarnegieInfoDemo

    �������������ӵĲ�֮ͬ�����ڣ�
    һ����ICarnegieInfoDemoʹ������һ����ICarnegieInfo��
    ʵ������������ICarnegieInfo�Ķ���
    
    8.������������ִ�����c:

      
     ����α���ִ��E:\labwork\ICarnegieInfoDemo.java ��
     
     javac  E:\labwork\ICarnegieInfoDemo.java     
    
     �ڱ���ICarnegieInfoDemo.java��ʱ����Ҫ������ICarnegieInfo
     ���������⣬����취��
     
     8.1  ������·��  classpath=E:\labwork\;.
    
      javac  E:\labwork\ICarnegieInfoDemo.java
      java   ICarnegieInfoDemo
  
     8.2  ���߲�������·����Ҳ����ͨ����������

      javac -classpath E:\labwork\   E:\labwork\ICarnegieInfoDemo.java

      java -cp E:\labwork\  ICarnegieInfoDemo

    9.  ִ������
      e:
      cd e:\labwork\  
      
     java���CLASSPATH�е���㿪ʼ������package�����е�ÿ������滻Ϊб�ߣ�
    
     javac LibTest.java

     java  LibTest

   10. �ı乤��Ŀ¼  
   
      c:
      javac E:\labwork\LibTest.java
    
      �����⣬����취
     
     10.1  ������·��  classpath=E:\labwork\;.
    
      javac  E:\labwork\LibTest.java
      java   LibTest
  
     10.2  ���߲�������·����Ҳ����ͨ����������

      javac -classpath E:\labwork\  E:\labwork\LibTest.java

      java -cp E:\labwork\  LibTest







���벢���ɰ�
�ڵ�ǰĿ¼�����ɰ�
 javac �Cd . Test.java 
��ָ��Ŀ¼�����ɰ�
 javac �Cd E:\unit1 Test.java 

ʹ��jar�ļ���
ѹ���� jar -cf �µ�jar�ĵ�   ѹ����Ŀ¼
       jar -cvf �µ�jar�ĵ�   ѹ����Ŀ¼
��ѹ��jar -xfv

�鿴jar�ļ������������ݣ�
      jar -tf jar�ĵ�
          -tvf ����ϸ������
          
