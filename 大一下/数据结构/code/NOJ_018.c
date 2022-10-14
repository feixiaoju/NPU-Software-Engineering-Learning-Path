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


void Separate(char *PreOrder,char*InOrder,char*pre_left,char*pre_right,char*in_left,char*in_right)
{
    unsigned long  head;
    // sever InOrder
    for ( head = 0; head < strlen(InOrder); head++)
    {   

        if(InOrder[head]==PreOrder[0])break;
        in_left[head]=InOrder[head];
    }
    in_left[head]='\0';
    unsigned long j=++head;
    for(;head<strlen(InOrder);head++)
    {
        in_right[head-j]=InOrder[head];
    }
    in_right[head-j]='\0';
    // sever PreOrder
    unsigned long i;
    for ( i = 1; i <=strlen(in_left); ++i)
    {
        pre_left[i-1]=PreOrder[i];
    }
    pre_left[i-1]='\0';
    int k=0;
    while(i<strlen(PreOrder))
    {
        pre_right[k]=PreOrder[i];
        k++;i++;
    }
    pre_right[k]='\0';

}

// this function calls separate() to realize the recursion
// use preorder and inorder output to reconstruct the Bin Tree
void BinTree_Reconsturction_Pre(PBinTree *T,char* PreOrder,char *InOrder)
{   
    if(strlen(InOrder)==0)
    {
        *T=NULL;
        return ;
    }
    else
    {
        *T=(PBinTreeNode)malloc(sizeof(BinTreeNode));
        if(!(*T)){printf("wrong in  bin tree reconstruct 1\n");return;}
        else
        {
            if(strlen(PreOrder)==1)
            {
                (*T)->info=PreOrder[0];
                (*T)->Lchild=(*T)->Rchild=NULL;
            }
            else
            {   
                (*T)->info=PreOrder[0];
                char pre_left[50],pre_right[50],in_left[50],in_right[50];
                Separate(PreOrder,InOrder,pre_left,pre_right,in_left,in_right);
                BinTree_Reconsturction_Pre(&((*T)->Lchild),pre_left,in_left);
                BinTree_Reconsturction_Pre(&((*T)->Rchild),pre_right,in_right);
            }
        }
    }

}


void BinTree_PostOrderTranverse(PBinTree T)
{
    if(T)
    {
        BinTree_PostOrderTranverse(T->Lchild);
        BinTree_PostOrderTranverse(T->Rchild);
        printf("%c",T->info );
    }
}

int main()
{
    PBinTree T;

    char PreOrder[50];
    char InOrder[50];
    gets(PreOrder);
    gets(InOrder);
 
    BinTree_Reconsturction_Pre(&T,PreOrder,InOrder);
    BinTree_PostOrderTranverse(T);

    return 0;
}


