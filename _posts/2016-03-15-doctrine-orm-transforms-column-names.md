---
title: "Doctrine ORM column naming strategies"
date: 2016-03-15 12:00:00 +0000
category: PHP
layout: post
---
In MySQL it's advised [not to rely on the case of column names](http://stackoverflow.com/a/12045852) so I've always used snake case for column names.
In Doctrine ORM mappings I had always manually specified the column name, but today I learned since version 2.3 a naming strategy can be specified
so the property names will automatically be transformed.

```yaml
fields:
    saoStartNumber:
        type: string
```

Using the default `doctrine.orm.naming_strategy.underscore` naming strategy this will use the column `sao_start_number` rather than `saoStartNumber`.

This setting is defined in [the `doctrine.orm.naming_strategy` config path](https://github.com/symfony/symfony-standard/blob/v3.0.3/app/config/config.yml#L58).
