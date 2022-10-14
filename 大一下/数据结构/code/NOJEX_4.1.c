#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#define MAXSIZE 101
#define null NULL
#define DISCONNECTED 10000
#define MAXVEX 100

typedef int AdjType;
typedef int VexType;

typedef struct
{
    VexType vexs[MAXVEX];
    AdjType arcs[MAXVEX][MAXVEX];
    int arcCount, vexCount;

} Graph, *PGraph;

typedef struct
{
    VexType vertex;
    AdjType length;
    int prevex;
} Path;

void dijkstra(PGraph graph,Path dist[])
{
    int i,j,minvex;
    AdjType min;
    for(i=0;i<graph->vexCount;i++)
    {
        dist[i].length=graph->arcs[0][i];
        dist[i].vertex=graph->vexs[i];
        if(dist[i].length!=DISCONNECTED)dist[i].prevex=0;
        else
        {
            dist[i].prevex=-1;
        }
        
    }
    graph->arcs[0][0]=1;
    for ( i = 0; i < graph->vexCount; i++)
    {
        min=DISCONNECTED;
        minvex=0;
        for ( j = 1; j < graph->vexCount; j++)
        {
            if ((graph->arcs[j][j]==0&&(dist[j].length<min)))
            {
                min=dist[j].length;
                minvex=j;
            }   
        }
        if(minvex==0) break;
        graph->arcs[minvex][minvex]=1;
        for(j=1;j<graph->vexCount;j++)
        {
            if(graph->arcs[j][j]==1)
            {
                continue;
            }
            if(dist[j].length>dist[minvex].length+graph->arcs[minvex][j])
            {
                dist[j].length=dist[minvex].length+graph->arcs[minvex][j];
                dist[j].prevex=minvex;
            }
        }
        
    }
    
}


PGraph Graph_create(void)
{
    int i, j;
    PGraph g = (PGraph)malloc(sizeof(Graph));
    scanf("%d", &(g->vexCount));
    for (i = 0; i < g->vexCount; i++)
    {   g->vexs[i]=i;
        for (j = 0; j < g->vexCount; j++)
        {
            scanf("%d", &g->arcs[i][j]);
        }
    }
    return g;
}

int main()
{
    PGraph g = Graph_create();
    Path dist[100];
    dijkstra(g,dist);
    for (int i = 0; i < g->vexCount; i++)
    {
        printf("%d\n",dist[i].length);
    }
    
}
