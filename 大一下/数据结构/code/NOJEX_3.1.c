//  huffman code  for NOJEX_3.1
//  this is an imperfect version
//  finished creating huffman tree and creating  the huffman code
//  need to improve  input 

// this problem cost a lot of time
// just because max difine too small
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include<ctype.h>
#define max 500
typedef char DataType;

typedef struct HtNode
{
    int weight;
    int parent, lchild, rchild;
    DataType ele;
} HtNode;

typedef struct HtTree
{
    HtNode node[200];
    int root;
    int NumOfLeaf;
} HtTree, *PHtTree;

void HtTree_create_select(PHtTree pht, int pos, int *x1, int *x2)
{
    int i;
    int min1 = max, min2 = max;
    for (i = 1; i < pos; i++)
    {
        if (pht->node[i].weight < min1 && pht->node[i].parent == 0)
        {
            min2=min1;
            *x2=*x1;
            min1 = pht->node[i].weight;
            *x1 = i;
        }
        else
        {
            if (pht->node[i].weight < min2 && pht->node[i].parent == 0)
            {
                min2 = pht->node[i].weight;
                *x2 = i;
            }
        }
    }
}

PHtTree HfTree_create(int NumOfNode, int *weight, DataType *element)
{
    PHtTree pht = (PHtTree)malloc(sizeof(HtTree));
    pht->NumOfLeaf=NumOfNode;
    int i;
    int *x1=(int*)malloc(sizeof(int)), *x2=(int*)malloc(sizeof(int));
    for (i = 1; i <= 2 * NumOfNode - 1; i++)
    {
        pht->node[i].lchild = pht->node[i].rchild = pht->node[i].parent = 0;
        if (i <= NumOfNode)
        {
            pht->node[i].weight = weight[i];
            pht->node[i].ele = element[i];
        }
        else
        {
            pht->node[i].weight = 0;
        }
    }
    for (i = 1; i < NumOfNode; i++)
    {
        HtTree_create_select(pht, i + NumOfNode, x1, x2);
        pht->node[*x1].parent = pht->node[*x2].parent = NumOfNode + i;
        pht->node[NumOfNode + i].weight = pht->node[*x1].weight + pht->node[*x2].weight;
        pht->node[NumOfNode + i].lchild = *x1;
        pht->node[NumOfNode + i].rchild = *x2; // bigger one is right
        pht->root = NumOfNode + i;
    }
    free(x1);
    free(x2);
    return pht;
}

//from 1 to numofnode.
void HfTree_codecreate(PHtTree T, char HC[][100], int n)
{
	int start,loc,i,parent;
	char cd[101];
	cd[n-1] = '\0';
    for (i = 1; i <= n; ++i) 
	{
        start = n-1;
        for ( loc = i, parent=T->node[i].parent; parent!=0 ; loc=parent, parent=T->node[parent].parent)
        {
        	if (T->node[parent].lchild == loc) 
			{
				cd[--start]='0';
			}
            else 
            {
            	cd[--start]='1';
			}
		}
        strcpy (HC[i], &cd[start]);//��cd�����е�ֵ���ƽ���HC,�� cd[start]λ�ÿ�ʼ����  
    }
}

void huffmancode_encode(char text[],char HC[][100],char codestring[],PHtTree tree)
{   
    int j;
    for (int i = 0; i < strlen(text); i++)
    {
        for ( j = 1; j <=tree->NumOfLeaf; j++)
        {
            if(tree->node[j].ele==text[i])break;
        }
        strcat(codestring,HC[j]);
    }
}

void huffmancode_decode(char codestring[],char HC[][100],PHtTree tree,char translation[])
{
    int LenOfTrans=0;
    int loc=tree->root;
    for (int i = 0; i < strlen(codestring); i++)
    {
        if(codestring[i]=='0')
        {
            loc=tree->node[loc].lchild;
            if(tree->node[loc].lchild==0)
            {
                translation[LenOfTrans]=tree->node[loc].ele;
                LenOfTrans++;
                loc=tree->root;
            }
        }
        else
        {
            loc=tree->node[loc].rchild;
            if(tree->node[loc].lchild==0)
            {
                translation[LenOfTrans]=tree->node[loc].ele;
                LenOfTrans++;
                loc=tree->root;

            }
        }
        
    }
    translation[LenOfTrans]=0;    
}
int main()
{   
    int NumOfCh;
    scanf("%d ",&NumOfCh);
    int w[101];
    char HC[101][100];
    char ele[101];
    char text[101];
    char codestring[200];
    int i;
    char translation[200];

    for ( i = 1; i <= NumOfCh; i++)
    {
        scanf("%c ",&ele[i]);
    }
    
    for ( i = 1; i <= NumOfCh; i++)
    {
        scanf("%d ",&w[i]);
    }
    // setbuf(stdin,NULL);
    gets(text);
 

    PHtTree t=HfTree_create(NumOfCh,w,ele);
    HfTree_codecreate(t,HC,NumOfCh);
    huffmancode_encode(text,HC,codestring,t);
    
    huffmancode_decode(codestring,HC,t,translation);
    printf("%s\n",codestring);
    printf("%s\n",translation);

}


