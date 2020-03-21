# hexo-replace
一个用来替换hexo相关文件中文本的工具
## 使用
你可以用它很快速的替换文本如：
```
hexo replace 张三 李四
```
在不加任何参数的情况下默认扫描`source`、`theme`下的文件,即`-g`
你也可以添加`-r`参数来自定义扫描路径，它可以是正规表达式（regular expression）、函数、或是一种类似于Express 的路径字串，例如：

```
posts/:id => posts/89 
posts/*path => posts/2015/title
```
更多参考[util.Pattern](https://github.com/hexojs/hexo-util#patternrule)


```bash
$ hexo replace -h
Usage: hexo replace <source> <replace>

Description:
Text substitution tool

Arguments:
  replace  New string
  source   Original string

Options:
  -g, --global  Global match string
  -r, --rule    You can use a regular expression, a function or an Express-style pattern string.
```

## Lisense
MIT