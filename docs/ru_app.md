# App

Глобальный объект синглтон. Т.к. в большинстве случаев приложение чаще всего представляет собой набор вкладок сцен, `App` наследуется от `TabsHead`

###Оглавление


<a href="#Публичные-свойства">`Публичные свойства`</a>
* <a href="#currentscene">`currentScene`</a>

<a href="#Публичные-методы">`Публичные методы`</a>
* <a href="#setscenescontainer">`setScenesContainer(bodiesContainer)`</a>
* <a href="#setHeader">`setHeader($header, headsSelector)`</a>
* <a href="#addScene">`setHeader(prototype)`</a>
* <a href="#setScene">`setScene(name)`</a>
* <a href="#show">`show(index)`</a>


##Публичные свойства

###`currentScene`

*Scene*: текущая видимая сцена.

* * *


## Публичные методы

###`setScenesContainer(bodiesContainer)`

Задает контейнер сцен. Должен быть вызван после `SB.ready`

####Аргументы

`bodiesContainer` *jQuery*: jQuery объект или селектор в котором содержатся сцены.

* * *


###`setHeader($header, headsSelector)`

Задает шапку которая переключает сцены. Должен быть вызван после `SB.ready`

####Аргументы

`$header` *jQuery*: jQuery объект или селектор, контейнер шапки.

`headsSelector` *String*: селектор ссылок. По клику на эти ссылки будут переключаться сцены.

* * *

###`addScene(prototype)`

Добавляет новую сцену. Должен быть вызван перед `SB.ready`

####Аргументы

`prototype` *PlainObject*: объект прототип расширяющий класс `Scene`.

####Пример

```js
App.addScene({
    name: 'videos',
    isDefault: true,
    el: '.js-scene-video'
});

App.addScene({
    name: 'input',
    el: '.js-scene-input',
});

App.addScene({
    name: 'navigation',
    el: '.js-scene-navigation',
});

SB(function () {
    App.setScenesContainer('.scenes-wrapper');
    App.setHeader('.menu-items', '.menu-item');
});

```

* * *

###`setScene(name)`

Показывает сцену с заданным названием.

####Аргументы

`name` *String*: название сцены.

* * *

###`show(index)`

Показывает сцену с заданным индексом.

####Аргументы

`index` *Number*: индекс сцены в порядке добавления.

* * *