# Yandex.Maps API and BEM

One of the most frequent use case for the Yandex.Maps API is creation of a menu to show different types of PoI (Points of Interest) - geoobject collections. This menu helps an end user to choose which types of POI to see at any given time. Here is an [example](http://dimik.github.com/ymaps/examples/group-menu/menu03.html). Now we will implement all above based on [BEM methodology](http://bem.info/method/).

## Firsts steps

BEM developers created a [project-stub](http://bem.info/tutorials/project-stub/) for a quick start with BEM project. We are going to use it.

Clone the project-stub and install all required dependences:

```bash
git clone https://github.com/bem/project-stub.git shopsList
cd shopsList
npm install
```

Now we can use the project locally. To test that everything works properly, open the project folder and run `enb server`. Than check the result at [localhost:8080/desktop.bundles/index/index.html](http://localhost:8080/desktop.bundles/index/index.html) in browser:

<img src="https://raw.githubusercontent.com/bem/bem-method/bem-info-data/articles/yamapsbem/project-stub.png" alt="BEM project stub compilled page" border="0"/>

Now we can proceed to the next step.

## General description of the project

We need to create several blocks:

* `map` block for the map itself
* `sidebar` block (a left column) for a `menu` block
* `menu` block for a list of organizations by groups showing.

According to BEM methodology the blocks should not “know” about each other. So, we need to create one more intermediate block that will lister to the menu clicks and interact with the map. We will call this block `i-geo-controller`.

## Page tree description – BEMJSON declaration

We considered all details of the page structure and defined the main blocks, so it should be easy to declare the page in BEMJSON. Now we start to write all above in JSON-styled code.

The page structure is shown below:

```
    page
    == container
    ==== map
    ==== sidebar
    ====== menu
    ======== items
```

<img src="http://zloylos.me/other/imgs/ymapsbem/index_bemjson.png" alt="Page structure">

￼
An example of BEMJSON declaration:

````js
{
    block: 'page',
    content: [
        {
            block: 'container',
            content: [
                {
                    block: 'map'
                },
                {
                    block: 'sidebar',
                    content: [
                        {
                            block: 'menu',
                            content [ /* menu items */ ]
                        }
                    ]
                }
            ]
        }
    ]
}
````

You can see the source code in [desktop.bundles/index/index.bemjson.js](https://github.com/zloylos/ymaps-and-bem/blob/master/desktop.bundles/index-en/index-en.bemjson.js).

## `map` block

We start development from the main block — `map`. First of all we should connect to the API with all the needed options. We could implement this with a new block called `i-API`. But, we could also choose the more convenient way, and implement all required options in one block using modifiers. We set `api` modifier with `ymaps` value for `map` block. In the example we will use a [dynamic API](http://api.yandex.ru/maps/doc/jsapi/). However, we could use a [static API](http://api.yandex.ru/maps/doc/staticapi/) instead.

To ease our work with the map, we should design additional handy placemarks for the interface. For this, we should process `geoObjects` field with [placemarks or placemark collections](http://api.yandex.com/maps/doc/jsapi/2.x/dg/concepts/geoobjects.xml).

We create the following interface:

* For the placemark

```js
{
    coords: [],
    properties: {},
    options: {}
}
```

* For the placemark collection

```js
{
    collection: true,
    properties: {},
    options: {},
    data: []
}
```
This code covers almost 90% of all possible use cases.

## `menu` block

We should implement a two-level menu. For this, we create `menu` block to catch the clicks on the groups and elements. We need to create the following elements:

* `item` — a menu item.
* `content` — a container for the items.
* `title` — a group title.

We include one menu block into another one to build needed hierarchy.

Here is a simple menu example declared in BEMJSON:
````js
{
    block: 'menu',
    content: [
        {
            elem: 'title',
            content: 'menu title'
        },
        {
            elem: 'content',
            content: [
                {
                    elem: 'item',
                    content: 'menu-item-1'
                },
                {
                    elem: 'item',
                    content: 'menu-item-2'
                }
            ]
        }
    ]
}
````

## `i-geo-controller` block

`i-geo-controller` is a block-controller that listens to `menu` block events, such as `menuItemClick` and `menuGroupClick` to react on their behavior and make definite actions on the map.

In our example this block has the following tasks:

* If there is a click on the placemark, the controller should center the map on this placemark and open the balloon.
* If there is a click on the group, the controller should show or hide this group.

In addition to interaction with the map, the controller block must ”know“ if the map is ready for objects management. To implement all above, `map` block should emmit `map-inited` event, and the controller block should listen for this event trigger and keep a link of the map instance.

<img src="http://zloylos.me/other/imgs/ymapsbem/blocks_scheme-en.png" alt="Scheme of work blocks">


For example, [zloylos.github.io/ymapsbem/index-en.html](zloylos.github.io/ymapsbem/index-en.html).

<img src="http://zloylos.me/other/imgs/ymapsbem/ready-en.png" alt="Example">

Thus, the example implemented with BEM methodology is more verbose than without BEM, we get well-structured and easy-to-support code base. So, we get benefit from scaling and expanding it easily, with no need in code rewriting, thanks to the methodology.

Thanks to [Alexander Tarmolov](http://twitter.com/tarmolov) for advice and support.
