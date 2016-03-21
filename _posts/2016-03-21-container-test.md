---
title: "Container tests"
date: 2016-03-21 17:42:00 +0000
category: Testing
layout: post
---
In large applications that use a DIC it is all too easy to forget to update the service configuration
as dependencies change. While unit tests will catch a lot of issues, I have found adding a simple integration test
that attempts to load all services really helpful.

```php
<?php

class ContainerTest extends \PHPUnit_Framework_TestCase
{
    use SymfonyKernelSetup;

    public function serviceProvider()
    {
        return [
            ['app.account_context', 'HeyUpdate\Account\AccountContext'],
        ];
    }

    /**
     * @dataProvider serviceProvider
     */
    public function testCreateService($id, $class)
    {
        $service = $this->getContainer()->get($id);
        $this->assertInstanceOf($class, $service);
    }
}
```

In this test each service is specified within a data provider, so relies on new services being added.
Another approach I have used is to check all services automatically.

```php
public function testCreateServices()
{
    foreach ($this->getContainer()->getServiceIds() as $serviceId) {
        $this->getContainer()->get($serviceId);
    }
}
```

I'm still unsure which approach works best.
