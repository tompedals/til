---
title: "See outdated Composer packages"
date: 2016-11-03 22:03:00 +0000
category: PHP
layout: post
---
When jumping back in on an older project I wanted to get the dependencies up to date. Running `composer update` will fetch any updates within the required version constraints, but I wanted to see what the latest versions were.

The `composer outdated` command shows a list of installed packages that have updates available, including the current and latest versions.

https://getcomposer.org/doc/03-cli.md#outdated
