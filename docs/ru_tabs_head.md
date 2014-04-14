# TabsHead

Класс описывающий группу вкладок и шапку с ссылками для переключения.

###Оглавление


<a href="#Публичные-свойства">`Публичные свойства`</a>
* <a href="#highlightclass">`highlightClass`</a>
* <a href="#currentindex">`currentIndex`</a>

<a href="#публичные-методы">`Публичные методы`</a>
* <a href="#tabsheadheadscontainer-bodiescontainer-headsselector">`TabsHead(headsContainer, bodiesContainer, headsSelector)`</a>
* <a href="#addhead-body">`add(head, body)`</a>
* <a href="#showindex">`show(index)`</a>




##Публичные свойства

###`highlightClass`

*String*: css класс который будет добавлен к элементу.

Значение по умолчанию: `cur`

* * *


###`currentIndex`

*Number*: индекс текущей открытой вкладки. Readonly.

* * *



## Публичные методы

###`TabsHead(headsContainer, bodiesContainer, headsSelector)`

Конструктор. Удаляет из DOM всех детей `bodiesContainer` кроме первого.
Клики по `headsSelector` будут переключать отображение детей `bodiesContainer` согласно их индексам(первая ссылка показывает первый элемент, вторая - второй)


#### Аргументы
`headsContainer` *jQuery*: HTML элемент который должен содержать список меню.

`bodiesContainer` *jQuery*: HTML элемент который должен содержать сами вкладки и их контент. Пример:


```html
<div class="bodies_container">
    <div class="tab_content"></div>
    <div class="tab_content"></div>
    <div class="tab_content"></div>
</div>
```

`bodiesContainer` *String*: jQuery селектор списка меню. Пример:

```html
<div class="tabs_head">
    <div class="link"></div>
    <div class="link"></div>
    <div class="link"></div>
</div>
```

```js
new TabsHead('.tabs_head', '.bodies_container', '.link');
 ```


* * *

###`add(head, body)`

Добавляет новую вкладку к группе.

#### Аргументы
`head` *jQuery object*: ссылка, которая соответсвует вкладке и будет получать класс `headsSelector`. Элемент не будет добавлен в `headsContainer`

`body` *jQuery object*: контент вкладки.

* * *


###`show(index)`

Переключает вкладку на заданный индекс.

#### Аргументы
`index` *Number*: новый индекс

* * *
