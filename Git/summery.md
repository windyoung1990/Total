*git commit之前，运行git status看看当前仓库的状态  
*git diff可以查看修改内容。  
*git log --pretty=oneline log日志单行显示  
git reset --hard 3628164  回退代码到某一个版本  
git reflog 历史操作记录 包括reset后的操作  
git diff HEAD -- readme.txt命令可以查看工作区和版本库里面最新版本的区别  
git checkout -- file可以丢弃工作区的修改  
Fast-forward信息，Git告诉我们，这次合并是“快进模式”，也就是直接把master指向dev的当前提交，所以合并速度非常快。  
Git还提供了一个stash功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作,git stash list命令看看,工作现场还在，Git把stash内容存在某个地方了，但是需要恢复一下，有两个办法：一是用git stash apply恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除；另一种方式是用git stash pop，恢复的同时把stash内容也删了.  
如果要丢弃一个没有被合并过的分支，可以通过git branch -D <name>强行删除  
*要查看远程库的信息，用git remote  
