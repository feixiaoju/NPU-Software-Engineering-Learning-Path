#include"Stack.h"   
#include<stdio.h>   
void print(Item i)  
{  
    printf("�ýڵ�Ԫ��Ϊ%d\n",i);  
}  
main()  
{  
    Stack *ps = InitStack();  
    int i,item;  
  
    printf("0-9������ջ��������£�\n");  
    for(i=0;i<10;i++)  
    {  
        Push(ps,i);  
        GetTop(ps,&item);  
        printf("%d ",item);  
    }  
      
    printf("\n��ջ����ջ����������ÿ��Ԫ��ִ��print������\n");  
    StackTraverse(ps,print);  
  
    printf("ջ��Ԫ�����γ�ջ��������£�\n");  
    for(i=0;i<10;i++)  
    {  
        Pop(ps,&item);  
        printf("%d ",item);  
    }  
      
    ClearStack(ps);  
    if(IsEmpty(ps))  
        printf("\n��ջ�ÿճɹ�\n");  
    DestroyStack(ps);  
    printf("ջ�ѱ�����\n");  
          
}  
