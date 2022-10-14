#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#define MAXSIZE 10000
#define null NULL

typedef char AtomType;
typedef enum{ATOM,LIST} ElemTag;

typedef struct GLNode
{
    ElemTag tag;
    union
    {
        AtomType atom;
        struct
        {
            struct GLNode *Head,*Tail;
        }ptr;
    };
}*GList,GLNode;

void sever(char* sub,char * hsub)
{
    int n=strlen(sub);
    int i=0,k=0;

    while(i<n&&(k!=0||sub[i]!=','))
    {
        if(sub[i]=='(')k++;
        if(sub[i]==')')k--;
        i++;
    };
    if(i<n)
    {
        strncpy(hsub,sub,i);
        hsub[i]='\0';
        strncpy(sub,sub+i+1,strlen(sub)-i-1);
        sub[strlen(sub)-i-1]='\0';
    }
    else
    {
        strcpy(hsub,sub);
        hsub[n]='\0';
        sub[0]='\0';
    }
}


void GList_creat(GList L,char *s)
{
    GList q,p;
    char Empty[]="()";
    if(strcmp(s,Empty)==0||strlen(s)==0) L=NULL;
    else
    {
        L=(GList)malloc(sizeof(GLNode));
        if(!L){printf("wrong in GList creating 1\n");return;}
        else
        {
            if(strlen(s)==1)
            {
                    printf("s1 is %s\n",s);
                    L->tag=ATOM;L->atom=s[0];

            }
            else
            {   char sub[100];
                L->tag=LIST;
                p=L;
                strncpy(sub,s+1,strlen(s)-2) ; // È¥À¨ºÅ
                sub[strlen(s)-2]='\0';

                printf("sub1 is %s\n",sub);//*********************

                do
                {
                    char hsub[100];
                    sever(sub,hsub);

                    printf("sub2 is %s\n",sub);
                    printf("hsub is %s\n",hsub);

                    GList_creat(p->ptr.Head,hsub);  //µÝ¹é
                    q=p;
                    if(strlen(sub)>0)
                    {
                        p=(GList)malloc(sizeof(GLNode));
                        if(!p)
                        {
                            printf("wrong in GList creating 2\n");
                            return;

                        }
                        p->tag=LIST;q->ptr.Tail=p;
                    }
                }while(strlen(sub)>0);
                q->ptr.Tail=NULL;
            }
        }
    }
}

int GList_GetDepth(const GList L)
{
    if(!L)return 1 ;
    if(L->tag==ATOM)return 0;
    int dep;
    int max;
    GList p;
    for(max=0,p=L;p;p=p->ptr.Tail)
    {
        dep=GList_GetDepth(p->ptr.Head);
        if(dep>max)max=dep;
    }
    return max+1;
}



int main()
{
    char s[]="(a,c)";

    GList L;

    GList_creat(L,s);
//    char sub[10];
//    sever(s,sub);
//    puts(s);
//    puts(sub);
//    if(!s[0])
//        printf("1");
    int i=GList_GetDepth(L);
    printf("%d",i);
    return 0;

}















