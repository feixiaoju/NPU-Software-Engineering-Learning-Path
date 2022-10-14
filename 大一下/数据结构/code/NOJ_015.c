#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#define MAXSIZE 10000
#define null NULL


// NOJ 015

typedef char DataType;

typedef struct BinTreeNode
{
    DataType info;
    struct BinTreeNode *Lchild;
    struct BinTreeNode *Rchild;
}BinTreeNode,*PBinTreeNode,BinTree,*PBinTree;


void BinTree_sever(char* sub,char * Lsub,char*Rsub) // 不具备一般性，使用时注意调整
{  // 将sub去掉根节点和括号
    int n=strlen(sub);
    int i=2,k=0;

    while(i<n&&(k!=0||sub[i]!=','))
    {
        if(sub[i]=='(')k++;
        if(sub[i]==')')k--;
        i++;
    };
    if(i<n)
    {
        strncpy(Lsub,sub+2,i-2);
        Lsub[i-2]='\0';
        strncpy(Rsub,sub+i+1,strlen(sub)-i-2);
        Rsub[strlen(sub)-i-2]='\0';
    }
    else
    {
        printf("wrong in BinTree Sever\n");
    }
}




void BinTree_creat(PBinTree* L,char *s)
//  用#表 示 空  注意针对不同的字符串的定义方法，算法应有不同的调整
{

    *L=(PBinTreeNode)malloc(sizeof(BinTreeNode));
    if(!L){printf("wrong in PBinTreeNode creating 1\n");return;}
    else
    {
        if(strlen(s)==1)
        {
               (*L)->info=s[0];(*L)->Lchild=(*L)->Rchild=NULL;

        }
        else
        {
            (*L)->info=s[0];
            char Lsub[100],Rsub[100];
            BinTree_sever(s,Lsub,Rsub);
            BinTree_creat(&((*L)->Lchild),Lsub);
            BinTree_creat(&((*L)->Rchild),Rsub);
        }
    }

}


void BinTree_PreOrderTraverse(PBinTree L)
{
    if(L)
    {
        printf("%c",L->info);
        BinTree_PreOrderTraverse( L->Lchild);
        BinTree_PreOrderTraverse(L->Rchild);

    }
}


int main()
{

    char s[]="A(B(#,D),C(E(#,F),#))";
    PBinTree T;
    BinTree_creat(&T,s);
    BinTree_PreOrderTraverse(T);
    return 0;

}















