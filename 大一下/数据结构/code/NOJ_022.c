#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#define MAXSIZE 1000
#define null NULL
#define DISCONNECTED 10000

typedef int AdjType;
typedef int VexType;

typedef struct EdgeNode
{
    int endvex; // 指的是在g.vex数组中的地址
    AdjType weight;
    struct EdgeNode *NextEdge;

} EdgeList, *PEdgeList, *PEdgeNode, EdgeNode;

typedef struct
{
    VexType vertex;
    PEdgeList edgeList;

} VexNode;

typedef struct GraphInlist
{
    VexNode vex[MAXSIZE];
    int VexNum, EdgeNum;
} GraphInList;

typedef struct Path
{
    int length;
    int endIndex;
} Path;

int Vex_locate(GraphInList g, VexType NodeInfo)
{
    int i;
    for (i = 0; i < g.VexNum; i++)
    {
        if (g.vex[i].vertex == NodeInfo)
            break;
    }
    return i;
}
void GraphInList_create(GraphInList *g)
{
    int i, j, k, v1, v2, weight;
    PEdgeNode p = NULL;
    scanf("%d %d", &(g->VexNum), &(g->EdgeNum));

    for (i = 0; i < g->VexNum; i++)
    {
        g->vex[i].vertex = i + 1;
        g->vex[i].edgeList = NULL;
    }
    for (k = 0; k < g->EdgeNum; k++)
    {
        scanf("%d %d %d", &v1, &v2, &weight);
        i = Vex_locate(*g, v1);
        j = Vex_locate(*g, v2);
        p = (EdgeNode *)malloc(sizeof(EdgeNode));
        if (!p)
        {
            printf("wrong in create graph 1\n");
            return;
        }
        p->endvex = j;
        p->weight = weight;
        p->NextEdge = g->vex[i].edgeList;
        g->vex[i].edgeList = p;
    }
    printf("ok\n");
}

void dijkstraInList(GraphInList g, Path dist[])
//这里的数组地址全都是g.vex中的地址
{
    
    
    // Path dist[100];
    // for (int i = 0; i < 10; i++)
    // {
    //     dist[i].length = DISCONNECTED;
    //     dist[i].endIndex = i + 1;
    // }




    int IsVisited[100];
    memset(IsVisited, 0, sizeof(IsVisited));
    int i, j, MinIndex, MinWeight = DISCONNECTED;
    PEdgeNode p = NULL;

    p = g.vex[0].edgeList;
    // j=Vex_locate(g,p->endvex);
    while (p)
    {
        dist[p->endvex].length = p->weight;
        p = p->NextEdge;
        // if (p->weight < MinWeight)
        // {
        //     MinIndex = p->endvex;
        //     MinWeight = p->weight;
        // }
    }
    IsVisited[0] = 1;
    // IsVisited[MinIndex] = 1;
    // j=Vex_locate(g,MinIndex);
    // p = g.vex[0].edgeList;
    for (i = 0; i < g.VexNum; i++)
    {
        MinWeight = DISCONNECTED;
        for (int i = 1; i < g.VexNum; i++)
        {
            if (dist[i].length < MinWeight&&IsVisited[i]!=1)
            {
                MinIndex = i;
                MinWeight = dist[i].length;
            }
        }
        IsVisited[MinIndex] = 1;
        for (j = 1; j < g.VexNum; j++)
        {
            if (IsVisited[j] == 1)
                continue;
            else
            {
                p = g.vex[MinIndex].edgeList;
                while (p)
                {
                    if (p->endvex == j&&(dist[j].length > dist[MinIndex].length + p->weight))
                    {
                        dist[j].length = dist[MinIndex].length + p->weight;
                        break;
                    }
                    p = p->NextEdge;
                }
            }
        }
    }
}

int main()
{
    GraphInList g;
    GraphInList_create(&g);
    Path dist[100];
    int i;
    for (i = 0; i < 10; i++)
    {
        dist[i].length = DISCONNECTED;
        dist[i].endIndex = i + 1;
    }
    // memset(dist,DISCONNECTED,sizeof(dist));
    int SortedPath[100];
    dijkstraInList(g, dist);
    int min = DISCONNECTED;
    int j, k1, k2;

    for (i = 1; i < g.VexNum; i++)
    {
        for (j = 1; j < g.VexNum - i; j++)
        {
            if (dist[j].length > dist[j + 1].length)
            {
                k1 = dist[j].length;
                dist[j].length = dist[j + 1].length;
                dist[j + 1].length = k1;
                k1 = dist[j].endIndex;
                dist[j].endIndex = dist[j + 1].endIndex;
                dist[j + 1].endIndex = k1;
            }
        }
    }
    for (i = 1; i < g.VexNum; i++)
    {
         if (dist[i].length != DISCONNECTED)
            printf("1 %d %d\n", dist[i].endIndex, dist[i].length);
        else
        {
            printf("1 %d -1\n", dist[i].endIndex);
        }
    }
}