---
title: "Refactoring legacy code"
date: 2016-03-30 12:32:00 +0100
category: Testing
layout: post
---
Previously I wrote about how to use a [proxy method to allow mocking of functions](/til/testing/2016/03/29/unit-testing-legacy-code/) from legacy procedural code.
It's a nice trick, but long term it's not the best solution for improving a code base. Another way to approach testing of legacy code is to wrap the old code in a new class
with a better design that will allow mocking, then gradually refactor the old code away.

The example class below queries a search API that returns the results as an RSS feed. The results are processed to provide
inline help for the given page name. The function that handles the API request is `parseExternalFeedItems`. Unit testing is difficult as the
function cannot be mocked.

```php
<?php

class InlineHelpRetriever
{
    public function getHelpForPage($name)
    {
        $query = $this->getSearchQueryForPage($name);
        $items = parseExternalFeedItems('http://app.com/search.xml?query=' . urlencode($query));

        $articles = array();

        foreach ($items as $item) {
            if (preg_match('#/article/(\d+)#i', $item->link, $matches)) {
                $articleId = $matches[1];

                $articles[] = new Article($articleId, $this->processArticleContent($item->description));
            }
        }

        return $articles;
    }

    // ...
}
```

To improve the design and make testing easier the legacy code is wrapped in a new class with a nicer API.

```php
<?php

class FeedReader
{
    public function fetchItems($url)
    {
        return parseExternalFeedItems($url);
    }
}
```

The help class can now be updated to utilise the new `FeedReader` class and unit tests written.

```php
<?php

class InlineHelpRetriever
{
    protected $feedReader;

    public function __construct(FeedReader $feedReader)
    {
        $this->feedReader = $feedReader;
    }

    public function getHelpForPage($name)
    {
        $query = $this->getSearchQueryForPage($name);
        $items = $this->feedReader->fetchItems('http://app.com/search.xml?query=' . urlencode($query));

        // ...
    }

    // ...
}
```

```php
<?php

use Mockery;

class InlineHelperRetrieverTest extends PHPUnit_Framework_TestCase
{
    private $feedReader;
    private $helpRetriever;

    public function setUp()
    {
        $this->feedReader = Mockery::mock('FeedReader');
        $this->helpRetriever = new InlineHelpRetriever($this->feedReader);
    }

    public function testGetHelpForPage()
    {
        // ...

        $this->feedReader->shouldReceive('fetchItems')
            ->with('http://app.com/search.xml?query=account,billing,payments')
            ->andReturn($feedItems)
            ->once();

        $articles = $this->helpRetriever->getHelpForPage('account');

        // ...
    }
}
```

The same refactoring technique could be applied to other use of the legacy function to gradually improve the code base.

1. Write a functional test for the `FeedReader` class and refactor it to remove the use of `parseExternalFeedItems`.
1. Gradually refactor all other uses of `parseExternalFeedItems` within the code base to use the new class.
1. Remove the unused `parseExternalFeedItems` function.
1. Celebrate!
