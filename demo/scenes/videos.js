(function () {
    "use strict";
    var _inited;
    _.templateSettings.interpolate = /\{\{([\s\S]+?)\}\}/g;

    var itemHtml = _.template('<div class="video-item nav-item">{{title}}</div>');

    App.addScene({
        name: 'videos',
        isDefault: true,
        el: '.js-scene-video',
        events: {
            'click .video-item': 'onItemClick'
        },
        init: function () {
            this.renderItems(App.videos);
            _inited = true;
        },

        // handler for click event
        onItemClick: function (e) {
            var index = $(e.currentTarget).index();
            Player.play(App.videos[index]);
        },

        // showing items from videos.js
        renderItems: function (items) {
            var html = '';

            // console.log(items, itemHtml.toString())
            for (var i = 0, len = items.length; i < len; i++) {
                html += itemHtml(items[i]);
            }

            this.$el
                .empty()
                .html(html);
        }
    });


})();