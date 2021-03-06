(function () {
    "use strict";


    var FilmModel=Backbone.Epoxy.Model.extend({
        defaults: {
            title:""
        }
    });

    App.addScene({
        name: 'videos',
        isDefault: true,
        el: '.js-scene-video',


        initialize: function () {

            var self=this;

            self.collection = new Backbone.Collection([],{
                model: FilmModel
            });
            var len=200;
            for(var i=0;i<len;i++){
                this.collection.add({
                    "title": "Big Buck Bunny "+i,
                    "url": "http://smartimmo.ru/uploaded/big_buck_bunny_480p_h264.mp4",
                    "type": "vod"
                });
            }
            self.collection.on('select', function(model){
                Player.play(model.toJSON());
            });
        },

        // handler for click event
        onItemClick: function (e) {
            var index = $(e.currentTarget).index();
            Player.play(this.collection.at(index).toJSON());
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
        initialize: function(){
            this.$info=this.$('.navigation-info');
        },
        onFocus: function (e) {
            this.$info.html(e.currentTarget.innerHTML);
        },
        onBlur: function (e) {
            this.$info.html('');
        }
    });



    // main app initialize when smartbox ready
    SB(function () {

        $$legend.show();

        var $bg = $('.bg');

        App.setScenesContainer('.scenes-wrapper');
        App.setHeader('.menu-items', '.menu-item');

        new (Backbone.View.extend({
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
        }))();

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