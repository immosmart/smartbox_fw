SB(function () {
    $$nav.on();

    window.App = TabsHead.create({
        el: 'body',
        scenesIndexes: {},
        constructor: function () {

            var self = this;
            ViewModel.prototype._constructor.apply(self, arguments);


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
            this.scenesIndexes[prototype.name] = this.views.length;
            var scene = Scene.create(prototype);
            this.add(null, scene.$el);

            if (prototype.isDefault) {
                this.setScene(prototype.name);
            }

        },
        setScene: function (name) {
            this.show(this.scenesIndexes[name]);
        },
        show: function (index) {
            this._super(index);
            this.currentScene = this.views[index];
            var startEl = this.currentScene.startEl;
            if (startEl) {
                $$nav.current(startEl);
            } else {
                $$nav.findSome();
            }
        }
    });


    window.Scene = TabContent.extend({

        isDefault: false,
        /**
         * Название сцены
         * @type {String}
         */
        name: '',


        backScene: false,


        startEl: undefined,

        initialize: function () {
            this._super();
            var self = this;

        },

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
});

