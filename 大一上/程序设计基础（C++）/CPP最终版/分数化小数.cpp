#include<stdio.h>
#include<stdlib.h>
#define n 10
int main()
{
    int A[n],i,j,t,k;
    for (i=0;i<n;i++) scanf("%d",&A[i]);
    for (i=0;i<n-1;i++){
        k=i;
        for (j=i+1;j<n;j++)
            if(A[j]<A[k]) k=j;
            if(i!=k)
                t=A[i],A[i]=A[k],A[k]=t;
    }
    for (i=0;i<n;i++) printf("%d ",A[i]);
    return 0;
}
