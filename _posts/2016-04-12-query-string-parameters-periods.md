---
title: "Query string parameters cannot contain periods"
date: 2016-04-12 16:45:00 +0100
category: PHP
layout: post
---
While debugging an integration with a third-party system I learned that query string parameters in PHP cannot
contain periods. If they do they will be replaced with underscores. It's not often I would use a period in a
parameter name, but in this case it wasn't me that decided on the name.

For example given the following request: `/path?param.1=test`.

The GET parameter `param.1` will not be set, but `param_1` will be set.
