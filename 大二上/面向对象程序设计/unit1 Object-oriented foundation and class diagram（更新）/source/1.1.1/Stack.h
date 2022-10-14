#ifndef Stack_H   
#define Stack_H   
  
typedef int Item;  
typedef struct node * PNode;  
/*����ջ�ڵ�����*/  
typedef struct node  
{  
    Item data;  
    PNode down;  
}Node;  
/*����ջ����*/  
typedef struct stack  
{  
    PNode top;  
    int size;  
}Stack;  
/*����һ����ջ*/  
Stack *InitStack();  
  
/*����һ��ջ*/  
void DestroyStack(Stack *ps);  
  
/*��ջ�ÿ�*/  
void ClearStack(Stack *ps);  
  
/*�ж��Ƿ�Ϊ��ջ*/  
int IsEmpty(Stack *ps);  
  
/*����ջ��С*/  
int GetSize(Stack *ps);  
  
/*����ջ��Ԫ��*/  
PNode GetTop(Stack *ps,Item *pitem);  
  
/*Ԫ����ջ*/  
PNode Push(Stack *ps,Item item);  
  
/*Ԫ�س�ջ*/  
PNode Pop(Stack *ps,Item *pitem);  
  
/*����ջ������visit����*/  
void StackTraverse(Stack *ps,void (*visit)());  
  
#endif  
