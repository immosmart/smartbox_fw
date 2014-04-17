var TabContent = Backbone.Epoxy.View.extend({
    //for lazy init
    isInited: false,

    /**
     * Начальный активный элемент
     * @type {*|jQuery|HTMLElement}
     */
    startEl: null,


    lazyParseBinds: false,

    initialize: function () {
        this.$el.data('tabContent', this);
    },
    init: function () {
    },


    //voiceSettings: undefined,
    /**
     * Установка фокуса для сцены, фокусировка на любом из:
     *    - начальный активный элемент this.startEl,
     */
    focus: function () {

        if (!this.isInited) {
            this.init();
            /*if (this.lazyParseBinds) {
                this.parse();
            }
            this.isInited = true;*/
        }

        //this.navContainer.voiceLink(this.voiceSettings);
    },
    blur: function () {
    }
});


var TabsHead = Backbone.Epoxy.View.extend({
    heads: [],
    bodies: [],
    views: [],
    highlightClass: 'cur',
    currentIndex: undefined,
    bodiesContainer: undefined,
    events: {},
    onClick: function (e) {
        this.show($(e.currentTarget).index());
    },
    constructor: function (headsContainer, bodiesContainer, headsSelector) {
        this.events['click ' + headsSelector] = 'onClick';
        this.heads = [];
        this.bodies = [];
        this.views = [];
        this.el = headsContainer;
        Backbone.Epoxy.View.prototype.constructor.apply(this);
        var self = this;
        this.bodiesContainer = $(bodiesContainer);
        var bodiesChildren = this.bodiesContainer.children();

        _.each($(headsContainer).children(), function (head, index) {
            self.add($(head), $(bodiesChildren[index]));
        });
        this.show(0);
    },
    add: function (head, body) {
        body.detach();
        if (head)
            this.heads.push(head);
        this.bodies.push(body);
        this.views.push(body.data('tabContent'));
    },
    show: function (index) {
        if (this.currentIndex !== undefined) {
            if (this.heads[this.currentIndex])
                this.heads[this.currentIndex].removeClass(this.highlightClass);
            this.bodies[this.currentIndex].detach();
            if (this.views[this.currentIndex])
                this.views[this.currentIndex].blur();
        }

        if (this.heads[index])
            this.heads[index].addClass(this.highlightClass);
        this.bodies[index].appendTo(this.bodiesContainer);


        if (this.views[index]){
            this.views[index].focus();

            var startEl = this.views[index].startEl;
            if (startEl) {
                $$nav.current(startEl);
            } else {
                $$nav.findSome();
            }
        }


        this.currentIndex = index;


    }
});