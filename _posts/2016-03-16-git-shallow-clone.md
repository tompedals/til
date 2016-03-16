---
title: "Shallow clone a Git repository"
date: 2016-03-16 21:12:00 +0000
category: Git
layout: post
---
When cloning a repository it is possible to specify the depth. For example the following command
will only clone the current HEAD of the repository.

```
git clone --depth 1 https://github.com/symfony/symfony.git symfony
```

On larger projects this will significantly speed up the cloning process and use less disk space.
Very useful if you don't need the entire history!
