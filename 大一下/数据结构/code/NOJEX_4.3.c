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
    AdjType length[MAXSIZE][MAXSIZE];
    int nextvex[MAXSIZE][MAXSIZE];
} ShortPath;

PGraph Graph_create(void)
{
    int i, j;
    PGraph g = (PGraph)malloc(sizeof(Graph));
    scanf("%d", &(g->vexCount));
    for (i = 0; i < g->vexCount; i++)
    {
        g->vexs[i] = i;
        for (j = 0; j < g->vexCount; j++)
        {
            scanf("%d", &g->arcs[i][j]);
        }
    }
    return g;
}

void floyd(PGraph pgraph, ShortPath *ppath)
{
    int i, j, k;
    for (i = 0; i < pgraph->vexCount; i++)
        for (j = 0; j < pgraph->vexCount; j++)
        {
            if (pgraph->arcs[i][j] != DISCONNECTED)
                ppath->nextvex[i][j] = j;
            else
                ppath->nextvex[i][j] = -1;

            ppath->length[i][j] = pgraph->arcs[i][j];
        }
    for (k = 0; k < pgraph->vexCount; k++)
    {
        for (i = 0; i < pgraph->vexCount; i++)
        {
            for (j = 0; j < pgraph->vexCount; j++)
            {
                if ((ppath->length[i][k] >= DISCONNECTED) || (ppath->length[k][j] >= DISCONNECTED))
                {
                    continue;
                }
                if (ppath->length[i][j] > (ppath->length[i][k] + ppath->length[k][j]))
                {
                    ppath->length[i][j] = ppath->length[i][k] + ppath->length[k][j];
                    ppath->nextvex[i][j] = ppath->nextvex[i][k];
                }
            }
        }
    }
}

int main()
{
    PGraph g = Graph_create();
    ShortPath dist;
    floyd(g, &dist);
    AdjType v1[100], v2[100], m;
    scanf("%d", &m);
    int i = 0;
    while (i < m)
    {
        scanf("%d %d", &v1[i], &v2[i]);
        i++;
    }
    for (i = 0; i < m; i++)
    {
        printf("%d\n", dist.length[v1[i]][v2[i]]);
    }

    // VexType vex[100];
    // int k=0;
    // this is not perfect |||what if 0 is between beginning and ending?
}
