#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#define MAXSIZE 1000
#define null NULL
typedef int Datatype;//����Ϊint

typedef struct  Node
{
    Datatype info;
    struct Node *next;
    struct Node *pre;
}Node,*PNode;

typedef struct LinkList
{
    PNode head;
    PNode tail;
}LinkList,*PLinkList;

typedef struct SeqList
{
    Datatype *ele;
    int size;//�������
    int length;//ʵʱ����
}SeqList,*PSeqList;

PLinkList List_creatNULL(void) // ����ͷβ�ڵ� ѭ������
{
    PLinkList plist;
    PNode p;
    plist=(PLinkList)malloc(sizeof(LinkList));
    if(plist!=NULL)
    {
        p=(PNode)malloc(sizeof(Node));
        if(p!=NULL)
        {
            plist->head=p;
            plist->head->pre=NULL;
            p=(PNode)malloc(sizeof(Node));
            if(p)
            {
                plist->tail=p;
                plist->tail->next=plist->head;
                plist->head->next=plist->tail;
                plist->head->pre=plist->tail;
                plist->tail->pre=plist->head;
            }
        }
        else
        {
            printf("wrong");
            plist->head=NULL;
        }
    }
    else
        printf("wrong");
    return plist;
}

void Seq_Insert(PSeqList L,Datatype x)//�������
{
    int i=L->length;
    Datatype temp=(L->ele)[i-1];
    if(L->length+1>L->size)
        printf("wrong");
    else
    {   L->length++;
        while(temp>x&&i>-1)
        {
            (L->ele)[i]=(L->ele)[i-1];
            i--;
            temp=(L->ele)[i];
        };
        (L->ele)[i+1]=x;
    }


}

void Seq_Input(PSeqList L,int length)//��������
{
    int i;
    if(length>L->size)
        printf("too many numbers");
    else
    {
        for(i=0;i<length;i++)
            scanf("%d",&(L->ele)[i]);
    }
}

void List_pushback(PLinkList plist,Datatype x)//β�巨
{
    PNode q;
    q=(PNode)malloc(sizeof(Node));
    if(q==NULL)printf("wrong");
    else
    {   q->info=x;
        q->next=plist->tail;
        q->pre=plist->tail->pre;
        q->pre->next=q;
        plist->tail->pre=q;
    }

}


void List_pushfront(PLinkList plist,Datatype x)//ͷ�巨
{
    PNode q;
    q=(PNode)malloc(sizeof(Node));
    if(q==NULL)printf("wrong in push front");
    else
    {
        q->freq=0;
        q->info=x;
        q->pre=plist->head;
        q->next=plist->head->next;
        plist->head->next->pre=q;
        plist->head->next=q;

    }

}

void Seq_pushback(PSeqList L,Datatype x)//β��
{
    int i;
    if(L->length+1>L->size)printf("wrong");
    else
    {
        i=L->length;
        (L->ele)[i]=x;
        L->length++;
    }

}

void Seq_Reverse(PSeqList L)
{
    Datatype *c;
    c=(Datatype*)malloc(L->length*sizeof(Datatype));
    int i,j=0;
    for(i=0;i<L->length;i++)
        c[i]=(L->ele)[i];
    for(i--;i>-1;i--)
    {
        (L->ele)[j]=c[i];
        j++;
    }
    free(c);
}

void Seq_Print(const SeqList L)
{
    int i;
    for(i=0;i<L.length;i++)
        printf("%d ",(L.ele)[i]);
}

void List_Print(const LinkList L)
{
    PNode p=L.head->next;
    while(p!=L.tail)
    {
        printf("%d ",p->info);
        p=p->next;
    }


}

void List_Reverse(PLinkList plist)
{   ;
    PNode p=NULL;
    PNode q=plist->head;
    while(plist->head->next)
    {
        q=plist->head->next;
        plist->head->next=q->next;
        q->next=p;
        p=q;
    }
    plist->head->next=p;

}

void List_merge(LinkList la,LinkList lb,PLinkList lc)// Ҫ��lc=&la�������������ǵݼ�����
{
    PNode pa,pb,pc;
    pa=la.head->next;pb=lb.head->next;
    pc=lc->head;
    while(pa&&pb)
    {
        if(pa->info<=pb->info)
        {
            pc->next=pa;pc=pa;pa=pa->next;
        }
        else
        {
            pc->next=pb;pc=pb;pb=pb->next;
        }
    }
    pc->next=pa?pa:pb;
}

SeqList Seq_creatNull(int size)
{
    SeqList seql;
    seql.size=size;
    seql.ele=(Datatype*)malloc((seql.size*sizeof(Datatype)));
    seql.length=0;
    return seql;
}

void List_remove(PLinkList plist,Datatype x)
{
    PNode p=plist->head->next;
    PNode q=plist->head;
    while(p!=null)
    {
        if(p->info==x)
        {
            q->next=p->next;
            free(p);
            p=q->next;
        }
        else
        {   q=p;
            p=p->next;
        }
    }
}

void intersection(const LinkList la,const LinkList lb,PSeqList pseq)
        // la��lb���ǰ��ǵݼ�˳�� pseq�������潻�������Ա�
{
    PNode pa,pb;
    pa=la.head->next;pb=lb.head->next;
    while(pa&&pb)
    {
        if(pa->info<pb->info)
        {
            while(pa->next!=NULL&&pa->info==pa->next->info)pa=pa->next;
            //���˵���ͬ��ֵ
            pa=pa->next;
        }
        else if(pa->info>pb->info)
        {
            while(pb->next!=NULL&&pb->info==pb->next->info)pb=pb->next;
            pb=pb->next;
        }
        else if(pa->info==pb->info)
        {
            Seq_pushback(pseq,pa->info);
            while(pb->next!=NULL&&pb->info==pb->next->info)pb=pb->next;
            while(pa->next!=NULL&&pa->info==pa->next->info)pa=pa->next;
            pa=pa->next;
            pb=pb->next;
        }
    }

}


typedef struct LinkStack    //ע��stack�Ľڵ�Ҫ�õ��ڵ� ����ʱҪ����һ��node����
{
    PNode top;
}LinkStack,*PLinkStack;

PLinkStack LinkStack_creatNull(void)
{
    PLinkStack plstack;
    plstack=(PLinkStack)malloc(sizeof(LinkStack));
    if(!plstack) printf("wrong in creating stack");
    else
    {
        plstack->top=NULL;
    }
    return plstack;

}
void LinkStack_push(PLinkStack plstack,Datatype x)
{
    PNode p=(PNode)malloc(sizeof(Node));
    if(!p) printf("wrong in LinkStack_push");
    else
    {
        p->info=x;
        p->next=plstack->top;
        plstack->top=p;
    }
}
Datatype LinkStack_pop(PLinkStack plstack)
{
    Datatype x;
    x=plstack->top->info;
    PNode p=plstack->top;
    plstack->top=plstack->top->next;
    free(p);
    return x;
}

int LinkStack_IsEmpty(LinkStack lstack)
{
    if(lstack.top==NULL) return 1;
    else return 0;
}

//*************************************************ѭ������*****************************************
typedef struct SeqQueue  // ѭ���Ķ���  rear ָ����ǿ�λ��
{
    Datatype ele[MAXSIZE];
    int length;
    int front,rear;
}SeqQueue,*PSeqQueue;

PSeqQueue SeqQue_creatNull(int length1)
{
    if(length1>MAXSIZE)
    {
        printf("wrong in SeqQue creating");
        return NULL;
    }
    PSeqQueue p=(PSeqQueue)malloc(sizeof(SeqQueue));
    p->length=length1+1;
    p->front=p->rear=0;
    return p;
}

void SeqQueue_enQueue(PSeqQueue p,Datatype x)
{
    if((p->rear+1)%p->length==p->front)
    {
        printf("wrong in SeqQueue enQueue full\n");
        return;
    }
    else
    {
        p->ele[p->rear]=x;
        p->rear=(p->rear+1)%p->length;

    }
}

Datatype SeqQueue_deQueue(PSeqQueue p)
{
    if(p->rear==p->front)
    {
        printf("wrong in SeqQueue deQueue empty\n");
        return 0;
    }
    else
    {   int temp;
        temp=p->ele[p->front];
        p->front=(p->front+1)%p->length;
        return temp;
    }
}

void SeqQueue_print(const SeqQueue q)
{
    if(q.rear==q.front)
    {
        printf("cant print empty SeqQueue\n");
        return;
    }
    int i=q.front;
    while(q.rear!=i)
    {
        printf("%d ",q.ele[i]);
        i=(i+1)%q.length;
    }
    printf("\n");

}

/////////****************************************************************************************************

//******************************************��    Ԫ   ��************************************
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
//******************************************************************************


//        ***************************   ʮ  ��  ��   *********

 // ʮ�ֱ��Ľڵ�
typedef struct OLNode  // ʮ�ֱ��Ľڵ�
{
    Datatype ele;
    int i,j;
    struct OLNode *down,*right;
}OLNode,*POLNode;


typedef struct   // ��ʮ�ֱ����ɵ�ϡ�����
{
    POLNode *rHead;// ��ͷָ��
    POLNode *cHead;//��ͷָ��
    int mu,nu,tu;// �С��С�Ԫ�ظ���
}OLSMatrix;

void  OLSMatrix_creat(OLSMatrix *M,int m,int n,int k)  //mҪ���Ѿ��д洢�ռ䡣m��n��k��Ԫ��
                                                        //�����������������Ӧ��ϡ�����
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
                // �� p ���뵽����M����λ����
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
void  OLSMatrix_travel(const OLSMatrix M,void (*OLNode_visit)(POLNode p))  // ���б���
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
void OLNode_print( POLNode p) // �ڵ�����
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


    while(i<=M1.mu)//  ���� ���
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
//    *************************�����



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
                strncpy(sub,s+1,strlen(s)-2) ; // ȥ����
                sub[strlen(s)-2]='\0';

                printf("sub1 is %s\n",sub);//*********************

                do
                {
                    char hsub[100];
                    sever(sub,hsub);

                    printf("sub2 is %s\n",sub);
                    printf("hsub is %s\n",hsub);

                    GList_creat(p->ptr.Head,hsub);  //�ݹ�
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



//        *********************�����


//***************������

typedef struct BinTreeNode
{
    DataType info;
    struct BinTreeNode *Lchild;
    struct BinTreeNode *Rchild;
}BinTreeNode,*PBinTreeNode,BinTree,*PBinTree;


void BinTree_sever(char* sub,char * Lsub,char*Rsub) // ���߱�һ���ԣ�ʹ��ʱע�����
{  // ��subȥ�����ڵ������
    int n=strlen(sub);
    int i=2,k=0;

    while(i<n&&(k!=0||sub[i]!=','))
    {
        if(sub[i]=='(')k++;
        if(sub[i]==')')k--;
        i++;
    };
    if(i<n)
    {
        strncpy(Lsub,sub+2,i-2);
        Lsub[i-2]='\0';
        strncpy(Rsub,sub+i+1,strlen(sub)-i-2);
        Rsub[strlen(sub)-i-2]='\0';
    }
    else
    {
        printf("wrong in BinTree Sever\n");
    }
}


// *this function calls function-sever
// *null tree node is presented by"the element is #"

void BinTree_creat(PBinTree* L,char *s)
//  ��#�� ʾ ��  ע����Բ�ͬ���ַ����Ķ��巽�����㷨Ӧ�в�ͬ�ĵ���
{

    *L=(PBinTreeNode)malloc(sizeof(BinTreeNode));
    if(!L){printf("wrong in PBinTreeNode creating 1\n");return;}
    else
    {
        if(strlen(s)==1)
        {
               (*L)->info=s[0];(*L)->Lchild=(*L)->Rchild=NULL;

        }
        else
        {
            (*L)->info=s[0];
            char Lsub[100],Rsub[100];
            BinTree_sever(s,Lsub,Rsub);
            BinTree_creat(&((*L)->Lchild),Lsub);
            BinTree_creat(&((*L)->Rchild),Rsub);
        }
    }

}

// **this fun is for NOJ 016
// **null node is real null node
void BinTree_Creat2(PBinTree *T,char** s)
{   
    if(strlen(*s)>0)
    {   if((*s)[0]=='#')
        {   *T=NULL;
            return;
        }
        else
        {
            *T=(PBinTreeNode)malloc(sizeof(BinTreeNode));
            if(*T!=NULL)
            {
                (*T)->info=(*s)[0];
                (*s)++;
                BinTree_Creat2(&((*T)->Lchild),s);
                (*s)++;
                BinTree_Creat2(&((*T)->Rchild),s);
                
            }           
            else
            {
                printf("wrong in BinTree_creat2 1\n");
            }
            
        }       
    }
}


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

/*
   ** this function calls separate() to realize the recursion
   ** use preorder and inorder output to reconstruct the Bin Tree
*/
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

int BinTree_GetNumOfLeaf(const PBinTree T)
{
    int num=0;
    if(T)
    {
        if(T->Lchild==NULL&&T->Rchild==NULL) return 1;
        else
        {
            return num+BinTree_GetNumOfLeaf(T->Lchild)+BinTree_GetNumOfLeaf(T->Rchild);
        }
    }
    else return 0;
}

void BinTree_PreOrderTraverse(PBinTree L)
{
    if(L)
    {
        printf("%c",L->info);
        BinTree_PreOrderTraverse( L->Lchild);
        BinTree_PreOrderTraverse(L->Rchild);

    }
}

// three kind Tranverse of Tree . all are recursive algorithm
void BinTree_InOrderTranverse(PBinTree T)
{
    if(T)
    {
        BinTree_InOrderTranverse(T->Lchild);
        printf("%c",T->info );
        BinTree_InOrderTranverse(T->Rchild);

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


//***************������

// **************graph in list**********
typedef int AdjType;
typedef int VexType;


typedef struct EdgeNode
{
    int endvex;
    // AdjType weight;
    struct EdgeNode *NextEdge;

}EdgeList,*PEdgeList,*PEdgeNode,EdgeNode;

typedef struct
{
    VexType vertex;
    PEdgeList edgeList;

}VexNode;

typedef struct GraphInlist
{
    VexNode vex[MAXSIZE];
    int VexNum,EdgeNum;
}GraphInList;


int Vex_locate(GraphInList g,VexType NodeInfo)
{
    int i;
    for(i=0;i<g.VexNum;i++)
    {
        if(g.vex[i].vertex==NodeInfo) break;
    }
    return i;
}
void GraphInList_create(GraphInList *g)
{
    int i,j,k,v1,v2;
    PEdgeNode p=NULL;
    scanf("%d %d",&(g->VexNum),&(g->EdgeNum));

    for(i=0;i<g->VexNum;i++)
    {
        scanf("%d",&(g->vex[i].vertex));
        g->vex[i].edgeList=NULL;

    }
    for(k=0;k<g->EdgeNum;k++)
    {
        scanf("%d %d",&v1,&v2);
        i=Vex_locate(*g,v1);
        j=Vex_locate(*g,v2);
        p=(EdgeNode*)malloc(sizeof(EdgeNode));
        if(!p){printf("wrong in create graph 1\n");return;}
        p->endvex=j;
        p->NextEdge=g->vex[i].edgeList;
        g->vex[i].edgeList=p;
    }
    
}
int GraphInList_DFStraverse(GraphInList g,VexType v1,VexType v2,int *visited)
{
    int i,flag=1;
    i=Vex_locate(g,v1);
    PEdgeNode p=g.vex[i].edgeList;
    while(p)
    {   
        if(visited[p->endvex]==0)
        {
            visited[p->endvex]=1;
            if(p->endvex==v2)
            {
                flag=1;
                break;
            }
            else
            {
                flag= GraphInList_DFStraverse(g,p->endvex,v2,visited);

            }
        }
        else
        {
            p=p->NextEdge;
        }
        

    }
    return flag;

}

int GraphInList_isconnected(GraphInList g,VexType v1,VexType v2)
{
    int visited[101];
    memset(visited,0,sizeof(visited));
    return GraphInList_DFStraverse(g,v1,v2,visited);
}



//       **************graph in list above/***


//  **huffman code

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
//  **huffman code

///////***************************************************************
int main()
{
    PLinkList plist=creatNullList_link();
    int num,i,x;
    scanf("%d",&num);
    for(i=0;i<num;i++)
    {
        scanf("%d",&x);

        BackInsert_list(plist,x);
    }
    Link_print(*plist);
    printf("\n");
    remove_LinkList(plist,1);

    printf("try if my ssh key still ok\n");
    Link_print(*plist);
    return 0;
}
