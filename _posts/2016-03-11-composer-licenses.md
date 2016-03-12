---
title: "View licenses of installed Composer packages"
date: 2016-03-12 22:37:00 +0000
category: PHP
layout: post
---
Composer has a command to show the licenses used for all installed packages.
This is extremely useful to ensure compliance on commercial projects.

```
$ composer licenses

Name                                  Version             License
doctrine/annotations                  v1.2.7              MIT
doctrine/cache                        v1.6.0              MIT
doctrine/collections                  v1.3.0              MIT
doctrine/common                       v2.6.1              MIT
doctrine/data-fixtures                v1.1.1              MIT
```

Thankfully most projects are MIT licensed!
