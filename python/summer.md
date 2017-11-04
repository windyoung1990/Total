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
