(function () {
    "use strict";

    App.addScene({
        name: 'navigation',
        el: '.js-scene-navigation',
        init: function () {
            var $info;
            $info = this.$el.find('.navigation-info');
            this.$el
                .find('.navigation-item')
                .on(
                {
                    'nav_focus': function () {
                        $info.html('Item with text "' + this.innerHTML + '" focused');
                    },
                    'nav_blur': function () {
                        $info.html('');
                    }
                });
        }
    });


})();