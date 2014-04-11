(function () {
    "use strict";


    App.addScene({
        name: 'videos',
        isDefault: true,
        el: '.js-scene-video',
        events: {
            'click .video-item': 'onItemClick'
        },

        init: function () {
            this.collection = new Collection(App.videos);
        },
        // handler for click event
        onItemClick: function (e) {
            var index = $(e.currentTarget).index();
            Player.play(App.videos[index]);
        }
    });



    App.addScene({
        name: 'input',
        el: '.js-scene-input',
        init: function(){
            var $valueText = this.$el.find('.js-input-1-val');

            this.$el.find('.js-input-1')
                .on('text_change',function () {
                    $valueText.html(this.value);
                })
                .SBInput({
                    keyboard: {
                        type: 'fulltext_ru_nums'
                    }
                });

            this.$el.find('.js-input-2').SBInput({
                keyboard: {
                    type: 'email'
                }
            });

            this.$el.find('.js-input-3').SBInput({
                keyboard: {
                    type: 'num'
                },
                max: 4
            });
        }
    });



    App.addScene({
        name: 'navigation',
        el: '.js-scene-navigation',
        events: {
            'nav_focus .navigation-item': 'onFocus',
            'nav_blur .navigation-item': 'onBlur'
        },
        onFocus: function (e) {
            this.$info.html(e.currentTarget.innerHTML);
        },
        onBlur: function (e) {
            this.$info.html('');
        },
        shortcuts: {
            $info: '.navigation-info'
        }
    });



    // main app initialize when smartbox ready
    SB(function () {

        $$legend.show();

        var $bg = $('.bg');

        App.setScenesContainer('.scenes-wrapper');
        App.setHeader('.menu-items', '.menu-item');

        ViewModel.create({
            events: {
                'nav_key:blue': 'toggleView',
                'nav_key:stop': function () {
                    Player.stop();
                },
                'nav_key:pause': function () {
                    Player.togglePause();
                },
                'nav_key:return nav_key:exit nav_key:smart nav_key:smarthub': function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    SB.exit();
                }
            },
            autoParseBinds: true,
            el: 'body',
            shortcuts: {
                $wrap: '.wrap'
            },
            toggleView: function () {
                if (this.isShown) {
                    this.$wrap.hide();
                    $$legend.hide();
                } else {
                    this.$wrap.show();
                    $$legend.show();
                }
                this.isShown = !this.isShown;
            }
        });

        // toggling background when player start/stop
        Player.on('ready', function () {
            $bg.hide();
            $$log('player ready');
        });
        Player.on('stop', function () {
            $bg.show();
            $$log('player stop');
        });

    });

})();