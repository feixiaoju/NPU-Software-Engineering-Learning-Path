#include <stdio.h>

typedef struct
{
    int tag;
    int key;
} HashList;
int main()
{
    int a[] = {22, 41, 53, 46, 30, 13, 1, 67};
    int h, d=0;
    HashList b[11];
    for (int i = 0; i < 11; i++)
    {
        b[i].tag = 0;
    }
    for (int i = 0; i < 8; i++)
    {
        // d=0;
        h = (a[i] * 3) % 11;
        while (b[h].tag == 1)
        {
            // h = (a[i] * 3) % 11;
            h++;
        }
        // printf("%d ",h);
        b[h].tag = 1;
        b[h].key = a[i];
    }
    int i = 0;
    while (i < 8)
    {
        h = (a[i] * 3) % 11;
        d++;
        while (b[h].key != a[i])
        {
            h++;
            d++;
        }
        i++;
    }
    printf("%d", d/8);
}

//22   41  53   46   30   13   1   67
//0    2   5    6    2    6    3   3