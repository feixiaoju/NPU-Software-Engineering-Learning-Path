#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#define MAXSIZE 10000
#define null NULL
typedef int Datatype;


typedef struct OLNode  // 十字表的节点
{
    Datatype ele;
    int i,j;
    struct OLNode *down,*right;
}OLNode,*POLNode;


typedef struct   // 用十字表构成的稀疏矩阵
{
    POLNode *rHead;// 行头指针
    POLNode *cHead;//列头指针
    int mu,nu,tu;// 行、列、元素个数
}OLSMatrix;

void  OLSMatrix_creat(OLSMatrix *M,int m,int n,int k)  //m要求已经有存储空间。m行n列k个元素
                                                        //这个函数用于输入相应的稀疏矩阵
{
    M->mu=m;M->nu=n;M->tu=k;
    M->rHead=(POLNode*)malloc((m+1)*sizeof(OLNode));
    M->cHead=(POLNode*)malloc((n+1)*sizeof(OLNode));
    memset(M->rHead,0,(m+1)*sizeof(OLNode));
    memset(M->cHead,0,(n+1)*sizeof(OLNode));
    if(NULL==M->rHead||NULL==M->cHead)
    {
        printf("wrong in OLSMatrix creating1\n");
        exit(1);
    }
    else
    {
        int i=0;
        for(i=1;i<=k;i++)
        {
            POLNode p=(POLNode)malloc(sizeof(OLNode));
            if(p==NULL)
            {
                printf("wrong in OLSMatrix creating2\n");
                exit(1);
            }
            else
            {
                scanf("%d %d %d",&p->i,&p->j,&p->ele);
                // 把 p 插入到矩阵M合适位置中
                if(M->rHead[p->i]==NULL||M->rHead[p->i]->j>p->j)
                {
                    p->right=M->rHead[p->i];
                    M->rHead[p->i]=p;
                }
                else
                {
                    POLNode q;
                    for(q=M->rHead[p->i];(q->right)&&(q->right->j<p->j);q=q->right);
                    p->right=q->right;
                    q->right=p;
                }   // finish row insert

                if(M->cHead[p->j]==NULL||M->cHead[p->j]->i>p->i)
                {
                    p->down=M->cHead[p->j];
                    M->cHead[p->j]=p;
                }
                else
                {
                    POLNode q;
                    for(q=M->cHead[p->j];(q->down)&&(q->down->i<p->i);q=q->down);
                    p->down=q->down;
                    q->down=p;
                } //finish column insert
            }
        }

    }

}

void OLSMatrix_insert(OLSMatrix *M,POLNode p)
{
        if(M->rHead[p->i]==NULL||M->rHead[p->i]->j>p->j)
        {
            p->right=M->rHead[p->i];
            M->rHead[p->i]=p;
        }
        else
        {
            POLNode q;
            for(q=M->rHead[p->i];(q->right)&&(q->right->j<p->j);q=q->right);
            p->right=q->right;
            q->right=p;
        }   // finish row insert

        if(M->cHead[p->j]==NULL||M->cHead[p->j]->i>p->i)
        {
            p->down=M->cHead[p->j];
            M->cHead[p->j]=p;
        }
        else
        {
            POLNode q;
            for(q=M->cHead[p->j];(q->down)&&(q->down->i<p->i);q=q->down);
            p->down=q->down;
            q->down=p;
        } //finish column insert

}
void  OLSMatrix_travel(const OLSMatrix M,void (*OLNode_visit)(POLNode p))  // 按行遍历
{
    int i=1;
    while(i<=M.mu)
    {
        POLNode p=M.rHead[i];
        while(p)
        {
            OLNode_visit(p);
            p=p->right;
        }
        i++;


    }

}
void OLNode_print( POLNode p) // 节点的输出
{
    printf("%d %d %d\n",p->i,p->j,p->ele);
}

void Assign(POLNode r,POLNode p)
{
    r->i=p->i;
    r->j=p->j;
    r->ele=p->ele;
}
POLNode Add(POLNode p,POLNode q)
{
    POLNode r=(POLNode)malloc(sizeof(OLNode));
    r->ele=p->ele+q->ele;
    r->i=q->i;
    r->j=q->j;
    return r;
}

void OLSMatrix_Add(const OLSMatrix M1,const OLSMatrix M2,OLSMatrix*   M3 )
{
    //   ****initialize the M3***************************************
    M3->mu=M1.mu;M3->nu=M1.nu;M3->tu=0;
    M3->rHead=(POLNode*)malloc((M3->mu+1)*sizeof(OLNode));
    M3->cHead=(POLNode*)malloc((M3->nu+1)*sizeof(OLNode));
    memset(M3->rHead,0,(M3->mu+1)*sizeof(OLNode));
    memset(M3->cHead,0,(M3->nu+1)*sizeof(OLNode));
    POLNode r;
    //   ***********travel M1********row first**********   //
    int i=1;


    while(i<=M1.mu)//  按行 相加
    {
        POLNode p=M1.rHead[i];
        POLNode q=M2.rHead[i];
        while(p&&q)
        {
            if(p->j<q->j)
            {
                r=(POLNode)malloc(sizeof(OLNode));
                Assign(r,p);
                OLSMatrix_insert(M3,r);
                M3->tu++;
                p=p->right;
            }
            else if(p->j>q->j)
            {
                r=(POLNode)malloc(sizeof(OLNode));
                Assign(r,q);
                OLSMatrix_insert(M3,r);
                M3->tu++;
                q=q->right;
            }
            else
            {

                r=Add(p,q);

                if(r->ele!=0)
                {
                    OLSMatrix_insert(M3,r);
                    M3->tu++;
                }
                else
                {
                    free(r);
                }
                p=p->right;
                q=q->right;

            }
        }
        while(p)
        {
            r=(POLNode)malloc(sizeof(OLNode));
            Assign(r,p);
            OLSMatrix_insert(M3,r);
            M3->tu++;
            p=p->right;
        };
        while(q)
        {
            r=(POLNode)malloc(sizeof(OLNode));
            Assign(r,q);
            OLSMatrix_insert(M3,r);
            M3->tu++;
            q=q->right;
        }
        i++;
    }

}


int main()
{
    int row,col,num1,num2;
    OLSMatrix M1,M2,M3;
    scanf("%d %d %d %d",&row,&col,&num1,&num2);
    OLSMatrix_creat(&M1,row,col,num1);
    OLSMatrix_creat(&M2,row,col,num2);
    OLSMatrix_Add( M1,M2,&M3);

    OLSMatrix_travel(M3,OLNode_print);
    return 0;
}















