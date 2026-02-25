---
title: 再见了 '#define int long long'
published: 2026-02-26T00:32:00
description: '(ノへ￣、)还是要老老实实分清类型才行呀'
image: ''
tags: [随笔 , C++ , ACM , Code]
category: 'code'
draft: false 
lang: ''
---

# 前言

今天下午训练写到一道题[CF2034C](https://codeforces.com/problemset/problem/2034/C) , 打眼一看就是一道常规的图论搜索题，于是高高兴兴的敲了一发dfs出来 ，结果喜提TLE  

> **<font color="rgb(0, 17, 114)" size=5>TLE CODE ↓</font>**

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl "\n"
int n, m;
char mp[1005][1005];
int cango[1005][1005];
inline bool dfs(int x, int y)
{
    if (x < 1 || x > n || y < 1 || y > m)
    {
        return 1;
    }
    if (cango[x][y] == -1)
    {
        cango[x][y] = 0;
        if (mp[x][y] == 'U')
        {
            if (dfs(x - 1, y))
            {
                cango[x][y] = 1;
            }
            else
            {
                cango[x][y] = 0;
            }
        }
        else if (mp[x][y] == 'D')
        {
            if (dfs(x + 1, y))
            {
                cango[x][y] = 1;
            }
            else
            {
                cango[x][y] = 0;
            }
        }
        else if (mp[x][y] == 'L')
        {
            if (dfs(x, y - 1))
            {
                cango[x][y] = 1;
            }
            else
            {
                cango[x][y] = 0;
            }
        }
        else if (mp[x][y] == 'R')
        {
            if (dfs(x, y + 1))
            {
                cango[x][y] = 1;
            }
            else
            {
                cango[x][y] = 0;
            }
        }
        else
        {
            if (dfs(x - 1, y) && dfs(x + 1, y) && dfs(x, y - 1) && dfs(x, y + 1))
            {
                cango[x][y] = 1;
            }
            else
            {
                cango[x][y] = 0;
            }
        }
    }
    return cango[x][y];
}
int32_t main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    int t;
    cin >> t;
    while (t--)
    {
        cin >> n >> m;
        memset(cango, -1, sizeof(cango));
        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= m; j++)
            {
                char c;
                cin >> c;
                mp[i][j] = c;
            }
        }
        int ans = 0;
        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= m; j++)
            {
                if (!dfs(i, j))
                {
                    ans++;
                }
            }
        }
        cout << ans << endl;
    }
}
```


但是我觉得思路没有问题，时间复杂度也没有问题（事实也是如此），所以开始了疯狂的常数优化，然而并没有什么用 `┭┮﹏┭┮`


但是在某一发突发奇想的优化后，我AC了

> **<font color="green" size=5>AC CODE ↓</font>**


```cpp
#include <bits/stdc++.h>
using namespace std;
// #define int long long
#define endl "\n"
int n, m;
char mp[1005][1005];
int cango[1005][1005];
inline bool dfs(int x, int y)
{
    if (x < 1 || x > n || y < 1 || y > m)
    {
        return 1;
    }
    if (cango[x][y] == -1)
    {
        cango[x][y] = 0;
        if (mp[x][y] == 'U')
        {
            if (dfs(x - 1, y))
            {
                cango[x][y] = 1;
            }
            else
            {
                cango[x][y] = 0;
            }
        }
        else if (mp[x][y] == 'D')
        {
            if (dfs(x + 1, y))
            {
                cango[x][y] = 1;
            }
            else
            {
                cango[x][y] = 0;
            }
        }
        else if (mp[x][y] == 'L')
        {
            if (dfs(x, y - 1))
            {
                cango[x][y] = 1;
            }
            else
            {
                cango[x][y] = 0;
            }
        }
        else if (mp[x][y] == 'R')
        {
            if (dfs(x, y + 1))
            {
                cango[x][y] = 1;
            }
            else
            {
                cango[x][y] = 0;
            }
        }
        else
        {
            if (dfs(x - 1, y) && dfs(x + 1, y) && dfs(x, y - 1) && dfs(x, y + 1))
            {
                cango[x][y] = 1;
            }
            else
            {
                cango[x][y] = 0;
            }
        }
    }
    return cango[x][y];
}
int32_t main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    int t;
    cin >> t;
    while (t--)
    {
        cin >> n >> m;
        memset(cango, -1, sizeof(cango));
        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= m; j++)
            {
                char c;
                cin >> c;
                mp[i][j] = c;
            }
        }
        int ans = 0;
        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= m; j++)
            {
                if (!dfs(i, j))
                {
                    ans++;
                }
            }
        }
        cout << ans << endl;
    }
}
```

好！现在开始找不同吧（doge）
揭晓谜底： :spoiler[其实就只是注释了 “#define int long long” 而已] 

# ll的性能影响

是不是觉得特别扯淡，开ll最多是超空间mle罢了，怎么还会超时tle呢？

## 那么来做两个测试吧！

### **test1**
```cpp
#pragma GCC optimize("O0")
#include<bits/stdc++.h>
using namespace std;
// 变量：
// #define int __int128
// #define int long long
#define endl "\n"

int32_t main(){
    clock_t start = clock();
    // test code
    vector<int> v(2000000000);
    for(int i = 0; i < 2000000000; i++){
        v[i] = i;
    }
    // end
    clock_t end = clock();
    double cpu_time_used = ((double)(end - start)) / CLOCKS_PER_SEC;
    cout << "int-CPU time used: | " << cpu_time_used <<"s |"<< endl;
}
```

在这个数组建立测试中，结果是这样的：

|       第一次测试             |            第二次测试       |          第三次测试      |
|-----------------------------|--------------------------------|------------------------|
|int32_t-CPU time used:  1.2s | int32_t-CPU time used:  1.103s |int32_t-CPU time used:  1.147s |
|ll-CPU time used:  2.637s |ll-CPU time used:  2.49s |ll-CPU time used:  2.531s |
|int128-CPU time used:  21.59s |int128-CPU time used:  22.764s |int128-CPU time used:  24.516s |


### **test2**

```cpp
#pragma GCC optimize("O0")
#include<bits/stdc++.h>
using namespace std;
// 变量
// #define int __int128
// #define int long long
#define endl "\n"

int32_t main(){
    vector<int> v;
    clock_t start = clock();
    // test code
    int sum = 0;
    for(int i = 0; i < 200000000; i++){
        sum += i;
        v.push_back(sum);
        int x = v[i];
        sum += x;
    }
    // cout << sum << endl;
    // end
    clock_t end = clock();
    double cpu_time_used = ((double)(end - start)) / CLOCKS_PER_SEC;
    cout << "int128-CPU time used: | " << cpu_time_used <<"s |"<< endl;
}
```

在这个数组读写测试中，结果是这样的：


|第一次测试|第二次测试|第三次测试|
|---|---|---|
int-CPU time used:  1.422s |       int-CPU time used:  1.471s |      int-CPU time used:  1.501s |
ll-CPU time used:   1.802s |       ll-CPU time used:   1.921s |       ll-CPU time used:  1.839s |
int128-CPU time used:  2.623s |    int128-CPU time used:  2.609s |   int128-CPU time used:  2.648s |


**两次测试均开启O0“优化”减小误差**

从结果中可以看到ll与int128相较于int的时间常数还是要打不少的，特别是在使用vector数组时，ll的时间常数缺陷会被放大


# 最后

总的来说，确实是该对“#define int long long” 说再见了  
“define ll long long”要再次发光  

养成对症下药的好习惯还是很重要的啊 `(^///^)`

"再见，#define int long long"