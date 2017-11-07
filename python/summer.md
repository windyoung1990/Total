网页抓取Content-Encoding:gzip的页面时，得到乱码的处理方式
```javascript
import sys
import os
import re
# from gzip import GzipFile
import gzip
from StringIO import StringIO
type = sys.getfilesystemencoding()
import urllib

def getHtml(url):
    page = urllib.urlopen(url)
    html = page.read()
    return html
def gzipFuc(data):
    buf = StringIO(data)
    f = gzip.GzipFile(fileobj=buf)
    return f.read()
html = gzipFuc(getHtml("http://m.xin.com"))
```
### site关键词对示例网站进行搜索
site:example.webscraping.com
### 在域名后面添加URL路径可以对结果进行过滤，仅显示网站的某些部分
site:example.webscraping.com/view

### pip install builtwith 查看网站构建的技术类型
### pip install python-whois 查看网站的所有者
### 爬取网站的常见方法
* 爬取网站地图  
* 遍历每个网页的数据库ID
* 跟踪网页链接
