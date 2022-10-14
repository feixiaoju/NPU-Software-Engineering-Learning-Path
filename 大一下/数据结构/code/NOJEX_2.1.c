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
}TSMatrix;



void TSMatrix_FastTranspose(const TSMatrix *m1,TSMatrix *m2)
{
    m2->tu=m1->tu;
    m2->mu=m1->nu;
    m2->nu=m1->mu;
    if(m1->tu==0)
    {
        printf("wrong in Fast Transpose");
        return ;
    }
    int col,i,q=0;
    int cpos[30],num[30];
    cpos[0]=0;
    num[0]=0;
    for(i=0;i<m1->tu;i++)
        num[m1->data[i].j]++;
    for(col=1;col<=m1->nu;col++)
    {
        cpos[col]=cpos[col-1]+num[col-1];
    }
    for(i=0;i<m1->tu;i++)
    {
        col=m1->data[i].j;
        q=cpos[col];
        m2->data[q].i=m1->data[i].j;
        m2->data[q].j=m1->data[i].i;
        m2->data[q].ele=m1->data[i].ele;
        cpos[col]++;
    }


}
void TSMatrix_print(const TSMatrix a)
{
    int i=0;
    for(i=0;i<a.tu;i++)
        printf("%d %d %d\n",a.data[i].i,a.data[i].j,a.data[i].ele);
}

int main()
{
    TSMatrix m1,m2;
    int m,n;
    scanf("%d %d",&m,&n);
    m1.mu=m;
    m1.nu=n;
    m1.tu=0;
    int i,j,k;
    scanf("%d %d %d",&i,&j,&k);
    while(i!=0||k!=0||j!=0)
    {
        m1.data[m1.tu].i=i;
        m1.data[m1.tu].j=j;
        m1.data[m1.tu].ele=k;
        m1.tu++;
        scanf("%d %d %d",&i,&j,&k);


    }
    TSMatrix_FastTranspose(&m1,&m2);
    TSMatrix_print(m2);
    return 0;
}
