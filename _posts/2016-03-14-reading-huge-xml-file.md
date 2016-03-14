---
title: "How to read a huge XML file"
date: 2016-03-14 19:50:00 +0000
category: PHP
layout: post
---
The [Ordance Survey AddressBase](https://www.ordnancesurvey.co.uk/business-and-government/products/addressbase-products.html) data set comes as multiple XML (GML) files of a few hundred MB in size. The total
size of the uncompressed data set is around 133 GB! This is definitely one XML file that wouldn't be wise to
throw at `simplexml_load_file`.

Instead I found a combination of [XMLReader](http://php.net/XMLReader) and [SimpleXML](http://php.net/SimpleXML) can be used to step through the XML file without
having to load the entire file into memory.

```php
<?php

class Importer
{
    public function import($file)
    {
        $reader = new XMLReader();
        $reader->open($file);

        // Read XML elements one at a time
        while ($reader->read()) {
            // Once we hit the element we want then load it into SimpleXML
            if ($reader->nodeType === XMLReader::ELEMENT &&
                $reader->name === 'abpr:BasicLandPropertyUnit') {
                $xml = new SimpleXMLElement($reader->readOuterXml());
                $uprn = (string) $xml->xpath('abpr:uprn/text()')[0];
                // Continue parsing ...
            }
        }

        $reader->close();
    }
}

$importer = new Importer();
$importer->import(__DIR__ . '/sx9090.gml');
```

Memory use now stays low and huge XML files can be processed, although it will still take a while to get through 133GB.
