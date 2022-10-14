#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#define MAXSIZE 400
#define null NULL
typedef char DataType;



typedef struct BinTreeNode
{
    DataType info;
    struct BinTreeNode *Lchild;
    struct BinTreeNode *Rchild;
}BinTreeNode,*PBinTreeNode,BinTree,*PBinTree;

// this fun is for NOJ 016
void BinTree_Creat2(PBinTree *T,char** s)
{   
    if(strlen(*s)>0)
    {   if((*s)[0]=='#')
        {   *T=NULL;
            return;
        }
        else
        {
            *T=(PBinTreeNode)malloc(sizeof(BinTreeNode));
            if(*T!=NULL)
            {
                (*T)->info=(*s)[0];
                (*s)++;
                BinTree_Creat2(&((*T)->Lchild),s);
                (*s)++;
                BinTree_Creat2(&((*T)->Rchild),s);
                
            }            
            else
            {
                printf("wrong in BinTree_creat2 1\n");
            }
            
        }       
    }
}

void BinTree_InOrderTranverse(PBinTree T)
{
    if(T)
    {
        BinTree_InOrderTranverse(T->Lchild);
        printf("%c",T->info );
        BinTree_InOrderTranverse(T->Rchild);

    }
}

int main()
{
    PBinTree T;
    char tree[100];
    gets(tree);
    char *s;
    s=tree;
    BinTree_Creat2(&T,&s);
    BinTree_InOrderTranverse(T);

    return 0;
}





