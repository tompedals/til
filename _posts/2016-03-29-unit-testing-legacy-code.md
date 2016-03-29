---
title: "Unit testing legacy code"
date: 2016-03-29 21:32:00 +0100
category: Testing
layout: post
---
One way to get out of the legacy code rut is to write tests and gradually refactor. However, writing tests
for legacy code can be easier said than done. In a code base with lots of procedural code it's difficult to
mock function calls. One way to do this is to use proxy methods.

In the example below the function `queryAccess` queries the database and returns the permissions the user
has for the given page. Ideally this data access logic would be in a class and passed in to `AccessManager`
as a dependency so it could be mocked during testing.

```php
<?php

class AccessManager
{
    public function hasAccess($name, array $permissions)
    {
        $access = $this->_queryAccess($name);

        // ...
    }

    protected function _queryAccess($name)
    {
        return queryAccess($name);
    }
}
```

While the function cannot be mocked, the `_queryAccess` proxy method can be. No extra logic should be
added to the proxy method as this will not be executed by the tests.

```php
<?php

class AccessManagerTest extends PHPUnit_Framework_TestCase
{
    private $accessManager;

    public function setUp()
    {
        $this->accessManager = Mockery::mock('AccessManager')
            ->shouldAllowMockingProtectedMethods()
            ->makePartial();
    }

    public function testHasAccess()
    {
        $this->accessManager->shouldReceive('_queryAccess')
            ->with('post')
            ->andReturn(true);

        $this->assertTrue($this->accessManager->hasAccess('post', array('new', 'edit')));
    }
}
```

Another option is to use an extension such as [uopz](https://github.com/krakjoe/uopz) so the
function can be overridden in tests, however this only works in 5.4+ and the thing about legacy
code is that it often runs on legacy versions of PHP.
