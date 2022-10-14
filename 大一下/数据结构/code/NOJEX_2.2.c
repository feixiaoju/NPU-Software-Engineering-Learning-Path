


#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#define MAXSIZE 10000
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

void Assign(Triple *a,Triple b) //a=b
{
    a->ele=b.ele;
    a->i=b.i;
    a->j=b.j;
}

Triple add(Triple a,Triple b)
{
    Triple c;
    c.ele=a.ele+b.ele;
    c.i=a.i;
    c.j=a.j;
    return c;
}

void TSMatrix_print(const TSMatrix a)
{
    int i=0;
    for(i=0;i<a.tu;i++)
        printf("%d %d %d\n",a.data[i].i,a.data[i].j,a.data[i].ele);
}
int main()
{
    TSMatrix A,B,C;
    int num1,num2;
    int m,n;
    scanf("%d %d",&m,&n);
    A.mu=B.mu=C.mu=m;
    A.nu=B.nu=C.nu=n;
    scanf("%d %d",&num1,&num2);
    int i=0;
     //input
    for(;i<num1;i++)
    {
        scanf("%d %d %d",&A.data[i].i,&A.data[i].j,&A.data[i].ele);
    }

    for(i=0;i<num2;i++)
    {
        scanf("%d %d %d",&B.data[i].i,&B.data[i].j,&B.data[i].ele);
    }
    // ��������
    int a=0,b=0,c=0;
    while(a<num1&&b<num2)
    {
        if(A.data[a].i<B.data[b].i)
        {
            Assign(&C.data[c],A.data[a]);
            c++;a++;
        }
        else if(A.data[a].i>B.data[b].i)
        {
            Assign(&C.data[c],B.data[b]);
            c++;b++;
        }
        else if(A.data[a].i==B.data[b].i)
        {
                if(A.data[a].j<B.data[b].j)
                {
                    Assign(&C.data[c],A.data[a]);
                    c++;a++;
                }
                else if(A.data[a].j>B.data[b].j)
                {
                    Assign(&C.data[c],B.data[b]);
                    c++;b++;
                }
                else
                {   if(add(A.data[a],B.data[b]).ele!=0)
                    {
                        Assign(&C.data[c],add(A.data[a],B.data[b]));
                        c++;
                    }
                    a++;b++;
                }
        }
    }
    while(a<num1)
    {
        Assign(&C.data[c],A.data[a]);
        c++;a++;
    }
    while(b<num2)
    {
        Assign(&C.data[c],B.data[b]);
        c++;b++;
    }
    C.tu=c;
    TSMatrix_print(C);

    return 0;
}
