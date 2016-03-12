---
title: "List is a reserved word"
date: 2016-03-11 21:46:58 +0000
category: PHP
layout: post
---
In the years I've worked with PHP I never paid attention to how many
[reserved words](http://php.net/manual/en/reserved.keywords.php) there were.
Today I learned that `list` is a reserved word and cannot be used as a method name.

{% highlight php %}
<?php

class ReservedWords
{
    public function list()
    {
    }
}
{% endhighlight %}

This will result in the following syntax error:

```
Parse error: syntax error, unexpected 'list' (T_LIST), expecting identifier (T_STRING)
```
