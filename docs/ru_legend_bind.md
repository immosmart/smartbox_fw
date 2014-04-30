# Бинд легенды

Позволяет декларативно задавать поведение легенды в html разметке.

`legend` специальный бинд epoxy.js. В нем описывается состояние легенды с синтаксисом `key1: value1[, key2: value2]`.

`keyN`: ключ - название кнопки.

`valueN`: описание которое появится в легенде.

Если внутри этого элемента есть `nav-item` элемент и он попадет в фокус легенда поменяется в соответсвии с заданным описанием.

Пример использования:

```html
<div class="scene" data-bind="legend: 'red: Do some work'">
    <ul class="menu" data-bind="legend: 'enter: Show content, blue: Show/hide menu'">
        <li data-content='video' class="nav-item">Videos</li>
        <li data-content='input' class="nav-item">Inputs</li>
        <li data-content='navigation' class="nav-item">Navigation</li>
    </ul>
    <div data-bind="legend: 'red: Never be shown'">
        <div class="nav-item">Button</div>
    </div>
</div>
```

При фокусе на `Videos` и других элементов в `.menu` легенда будет содержать 3 элемента: `enter`, `blue`, `red` с соответствующими описаниями.

При фокусе на `Button` легенда будет содержать только один элемент `red` с подписью `Do some work`.
Вышестоящие по DOM элементы переопределяют нижестоящие. Таким образом текст `Never be shown` никогда не будет показан.
Если необходимо более сложное поведение, рекомендуется не использовать атрибут `legend`, а использовать объект `window.$$legend` напрямую.
