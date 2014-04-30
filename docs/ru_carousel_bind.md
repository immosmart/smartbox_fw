# carouselList

 Создает бесконечный список который можно прокручивать, при этом отображается только заданное число элементов списка.

 Пример использования:

 ```html
 <div class="scene scene_video js-scene-video nav-item"
      data-bind="carouselList: {
         size: 10,
         direction: vertical,
         collection: collection,
         className: video-item,
         template: videos
      }">
     <div class="video-item" data-bind="html: title"></div>
 </div>
 ```

`size`: единственный обязательный атрибут. Показывает сколько элементов будет видно на странице.

`direction`: значение по умолчанию `vertical`, так же может быть `horizontal`. Задает клавиши пульта которые будут прокручивать список up/down или left/right.
Этот параметр не влияет на верстку списка.

`collection`: значение по умолчанию `collection`. Задает свойство ViewModel в котором лежит `Backbone.Collection` которую нужно отобразить.

`className`: значение по умолчинию берется из `className` первого ребенка,  в примере выше это так же `video-item`.
Карусель будет выделять элементы из списка при срабатывании `mouseenter` на этот `className`. Если не используется управление жестами и мышью атрибут так же можно не задавать.

`template`: опциональный атрибут. Если задать его темплейт карусели сохранится в памяти, либо если был сохранен ранее достанется из памяти и будет использоваться в данной карусели.
Примеры:
```html
<!-- Set template -->
<div data-bind="template: videos">
<div class="video-item" data-bind="html: title"></div>
</div>

<div class="scene scene_video js-scene-video nav-item"
      data-bind="carouselList: {
         size: 10,
         className: video-item,
         template: videos
      }">
</div>


<div class="another_carousel_with_same_template"
      data-bind="carouselList: {
         size: 10,
         className: video-item,
         template: videos
      }">
</div>
```

Первый пример можно сократить убрав все опциональные атрибуты:
 ```html
 <div class="scene scene_video js-scene-video nav-item"
      data-bind="carouselList: {
         size: 10
      }">
     <div class="video-item" data-bind="html: title"></div>
 </div>
 ```
 
 
 По клику на элементе в карусели в коллекцию отправляется событие `select`
 
 ```js
 App.addScene({
   init: function(){
     this.collection.on('select', function(model, index){
       
     });
   }
 });
 ```
 
