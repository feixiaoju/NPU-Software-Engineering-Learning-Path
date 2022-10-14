#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#define MAXSIZE 400
#define null NULL
typedef int Datatype;



typedef struct
{
    Datatype ele;
    int i,j;
}Triple;

typedef struct
{
    Triple data[MAXSIZE];
    int mu,nu,tu;
    int rpos[21];
}TSMatrix;



void TSMatrix_tranverse(const TSMatrix *m1,TSMatrix *m2)
{
    m2->tu=m1->tu;
    m2->mu=m1->nu;
    m2->nu=m1->mu;
    int i,j0=1,j=0;
    for(j0=1;j0<=m1->mu;j0++)
    {
        for(i=0;i<m1->tu;i++)
       {
           if(m1->data[i].j==j0)
          {
            m2->data[j].i=j0;
            m2->data[j].j=m1->data[i].i;
            m2->data[j].ele=m1->data[i].ele;
            j++;
          }
       }
    }

}
void TSMatrix_print(const TSMatrix a)
{
    int i=0;
    for(i=0;i<a.tu;i++)
        printf("%d %d %d\n",a.data[i].i,a.data[i].j,a.data[i].ele);
}


void TSMatrix_Multi(TSMatrix A,TSMatrix B,TSMatrix*C)
{
    int arow,brow,ccol,p,q;
    float ctemp[100];
    memset(ctemp,0,sizeof(ctemp));
    C->mu=A.mu;
    C->nu=B.nu;
    C->tu=0;
    C->rpos[0]=0;
    if(A.tu*B.tu!=0)
    {
        for(arow=1;arow<=A.mu;arow++)
        {
            memset(ctemp,0,sizeof(ctemp));
            C->rpos[arow]=C->tu;
            for(p=A.rpos[arow];p<A.rpos[arow+1];p++)
            {
                brow=A.data[p].j;
                for(q=B.rpos[brow];q<B.rpos[brow+1];q++)
                {
                    ccol=B.data[q].j;
                    ctemp[ccol]+=A.data[p].ele*B.data[q].ele;
                }
            }
            for(ccol=0;ccol<=C->nu;ccol++)
            {
                if(ctemp[ccol])
                {
                    C->data[C->tu].i=arow;
                    C->data[C->tu].j=ccol;
                    C->data[C->tu].ele=ctemp[ccol];
                    C->tu++;

                }
            }
        }
    }
}
int main()
{
    TSMatrix m1,m2,m3;
    int m,n;
    int row,t;
    int num[21];// number of element which isnt 0 in every row
    scanf("%d %d",&m,&n);
    m1.mu=m;
    m1.nu=n;
    m1.tu=0;
    m2.tu=0;
    int i,j,k;
    scanf("%d %d %d",&i,&j,&k);
    while(i)
    {
        m1.data[m1.tu].i=i;
        m1.data[m1.tu].j=j;
        m1.data[m1.tu].ele=k;
        m1.tu++;
        scanf("%d %d %d",&i,&j,&k);
    }
    //****m1.rpos
    memset(num,0,sizeof(num));
    for(t=0;t<m1.tu;t++)
    {
        num[m1.data[t].i]++;
    }
    m1.rpos[0]=0;
    for(row=1;row<=m1.mu;row++)
    {
        m1.rpos[row]=num[row-1]+m1.rpos[row-1];
    }
    m1.rpos[row]=m1.tu;

    scanf("%d %d",&m,&n);
    m2.mu=m;
    m2.nu=n;
    scanf("%d %d %d",&i,&j,&k);
    while(i)
    {
        m2.data[m2.tu].i=i;
        m2.data[m2.tu].j=j;
        m2.data[m2.tu].ele=k;
        m2.tu++;
        scanf("%d %d %d",&i,&j,&k);
    }
    //******m2.rpos
     memset(num,0,sizeof(num));
    for(t=0;t<m2.tu;t++)
    {
        num[m2.data[t].i]++;
    }
    m2.rpos[0]=0;
    for(row=1;row<=m2.mu;row++)
    {
        m2.rpos[row]=num[row-1]+m2.rpos[row-1];
    }
    m2.rpos[row]=m2.tu;
    TSMatrix_Multi(m1,m2,&m3);
    TSMatrix_print(m3);
    return 0;
}
