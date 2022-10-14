#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#define MAXSIZE 400
#define null NULL
typedef int DataType;

typedef struct BinTreeNode
{
    DataType info;
    struct BinTreeNode *Lchild;
    struct BinTreeNode *Rchild;
} BinTreeNode, *PBinTreeNode, BinTree, *PBinTree;

// this fun is for NOJ 016
void BinTree_Creat2(PBinTree *T, int *s, int num)
{
    static int loc = 0;
    if(num<=0)
    {
        *T=NULL;
        return;
    }
    if (num > loc)
    {
        if (s[loc] == -1)
        {
            *T = NULL;
            return;
        }
        else
        {
            *T = (PBinTreeNode)malloc(sizeof(BinTreeNode));
            if (*T != NULL)
            {
                (*T)->info = s[loc];
                loc++;
                BinTree_Creat2(&((*T)->Lchild), s, num);
                loc++;
                BinTree_Creat2(&((*T)->Rchild), s, num);
            }
            else
            {
                printf("wrong in BinTree_creat2 1\n");
            }
        }
    }
}



int flag=1;
int min=0;
int BinTree_isBinSearchTree(PBinTree T)
{
    if(T!=NULL)
    {
        BinTree_isBinSearchTree(T->Lchild);
        if(min>T->info) flag=0;
        min=T->info;
        BinTree_isBinSearchTree(T->Rchild);
    }
    

}

int main()
{
    PBinTree T;
    char s;

    int key[100];
    memset(key, 0, sizeof(key));
    int i, cnt = 0;

    for (i = 0; s!='\n'; i++)
    {
       scanf("%d",&key[i]);
       s=getchar();
       cnt++;
    }

    BinTree_Creat2(&T, key, cnt);
    BinTree_isBinSearchTree(T);
    if (flag)
    {
        printf("yes");
    }
    else
    {
        printf("no");
        
    }
    
    
    return 0;
}
