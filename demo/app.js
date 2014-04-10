(function () {
    "use strict";
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
            el: 'body',
            initialize: function () {
                this.$wrap = $('.wrap');
                this.parse();
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