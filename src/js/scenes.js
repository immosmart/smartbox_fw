SB(function () {
    $$nav.on();
});

window.App = new (TabsHead.extend({
    el: 'body',
    scenesIndexes: {},
    constructor: function () {

        var self = this;

        Backbone.Epoxy.View.prototype.constructor.apply(self, arguments)
        //ViewModel.prototype._constructor.apply();


        self.heads = [];
        self.bodies = [];
        self.views = [];

        self.$el.bind('nav_key:return', function (e) {
            if (self.currentScene)
                self.currentScene.back(e);
        });
    },
    currentScene: undefined,
    setScenesContainer: function (bodiesContainer) {
        this.bodiesContainer = $(bodiesContainer);
    },
    setHeader: function ($header, headsSelector) {
        var $header = $($header);
        this.heads = _.map($header.children(), function (el) {
            return $(el);
        });
        $header.on('click', headsSelector, _.bind(this.onClick, this))
    },
    addScene: function (prototype) {
        var self = this;

        SB(function () {
            self.scenesIndexes[prototype.name] = self.views.length;
            var scene = new (Scene.extend(prototype))();
            self.add(null, scene.$el);
            if (prototype.isDefault) {
                self.setScene(prototype.name);
            }
        });


    },
    setScene: function (name) {
        this.show(this.scenesIndexes[name]);
    },
    show: function (index) {
        TabsHead.prototype.show.apply(this, arguments);
        this.currentScene = this.views[index];
    }
}))();


window.Scene = TabContent.extend({

    isDefault: false,
    /**
     * Название сцены
     * @type {String}
     */
    name: '',


    backScene: false,

    lazyParseBinds: true,

    back: function (e) {
        if (!this.backScene) {
            if (ExitPopup) {
                ExitPopup.show();
            } else {
                SB.sendReturn();
            }
        }
        else {
            App.setScene(this.backScene);
        }

        if (e) {
            e.stopPropagation();
        }
    }
});


