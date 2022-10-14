#include <stdio.h>
#include <stdlib.h>
#include <math.h>
int main()
{
   int a,b,p,q,p1,q1;
   scanf("%d%d",&a,&b);
   p=1,q=0;
   for(q1=1;q1<=b;q1++)
     {
       p1=(double)(q1*a)/(double)b+0.5;
       if(q*abs(a*q1-b*p1)<q1*abs(a*q-b*p))
         {
           q=q1;
           p=p1;
           printf("%d/%d\n",p,q);
         }
       if(a*q==b*p)
         break;
     }
   return 0;
}
