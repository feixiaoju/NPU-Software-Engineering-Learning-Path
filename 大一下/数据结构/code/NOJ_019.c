#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#define MAXSIZE 101
#define null NULL

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


int main()
{
    GraphInList g;
    GraphInList_create(&g);
    int v1,v2;
    scanf("%d %d",&v1,&v2);
    int i=GraphInList_isconnected(g,v1,v2);
    if(i)
    {
        printf("yes");
    }
    else
    {
        printf("no");
    }
    

    return 0;
}