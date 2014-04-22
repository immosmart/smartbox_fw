(function () {
    "use strict";


    var BindsScrollCarousel = Backbone.Epoxy.View.extend({
        events: {
            'nav_key:enter': 'onEnter'
        },
        onEnter: function (e) {
            e.stopPropagation();
            this.$el.children().eq(this.index()).click();
        },
        mouseenter: function (e) {
            this.index($(e.currentTarget).index());
        },


        itemSelector: '.sr-item',
        /**
         * Зацикливание
         */
        navLoop: true,
        /**
         * Включает Observables для размера и положения скроллбара
         */
        enableScrollBar: true,
        containerSelector: '',
        visibleLength: 7,
        offsetNext: 0,
        offsetPrev: 0,
        /*
         * слушает коллекцию на изменения
         */
        listenCollection: true,
        // запрет звука при навигации по карусели
        disableVoiceRefresh: false,
        stopPropagation: function (e) {
            e.stopPropagation();
        },
        onPrev: function (e) {
            if (this.canScrollBack() || this.index() > 0) {
                if (this.page() === 0 && this.index() === 0) {
                    this.showLast(e);
                } else {
                    this.prev(e);
                }
            }
        },
        onNext: function (e) {
            var maxIndex,
                index,
                page;

            page = this.page();
            index = this.index();
            if (this.canScrollForw() || index < this.visibleLength) {
                maxIndex = this.length() - this.maxPage() - 1;
                if ((page == this.maxPage()) && (index == maxIndex)) {
                    this.showFirst(e);
                } else {
                    this.next(e);
                }
            }
        },
        showFirst: function (e) {
            if (e) {
                e.stopPropagation();
            }
            if (this.page() !== 0) {
                this.slice.reset(this.collection.models.slice(0, this.visibleLength));
                this.page(0);
            }
            this.index(0);
            this.index.fire();
        },
        showLast: function (e) {
            if (e) {
                e.stopPropagation();
            }
            var maxIndex,
                sliceStart,
                maxPage,
                length;

            length = this.length();
            maxIndex = length - this.maxPage() - 1;
            sliceStart = length - this.visibleLength;
            maxPage = this.maxPage();

            if (this.page() !== maxPage) {
                this.slice.reset(this.collection.models.slice(sliceStart, length));
                this.page(maxPage);
            }
            this.index(maxIndex);
            this.index.fire();
        },
        next: function (e) {
            if (e) {
                e.stopPropagation();
            }
            if (this.index() + 1 >= this.slice.length && !this.canScrollForw()) {
                return this;
            }
            if (this.visibleLength - this.index() - 1 <= this.offsetNext) {
                this.shiftNext();
                this.index.fire();
                return this;
            }
            if (this.index() < this.visibleLength - 1) {
                this.index(this.index() + 1);
            }
            return this;
        },
        prev: function (e) {
            if (e) {
                e.stopPropagation();
            }
            if (this.index() <= this.offsetNext) {
                this.shiftPrev();
                this.index.fire();
                return this;
            }
            if (this.index() > 0) {
                this.index(this.index() - 1);
            }
            return this;
        },
        shiftNext: function () {
            if (!this.canScrollForw()) {
                return this;
            }
            this.slice.push(this.collection.at(this.page() + this.visibleLength)).shift();
            this.page(this.page() + 1);
            return this;
        },
        shiftPrev: function () {
            if (!this.canScrollBack()) {
                return this;
            }
            this.page(this.page() - 1);
            this.slice.unshift(this.collection.at(this.page())).pop();
            return this;
        },
        setPage: function (page) {
            if (page > this.maxPage()) {
                page = this.maxPage();
            }
            this.slice.reset(this.collection.models.slice(page, page + this.visibleLength));
            this.page(page);
        },
        initialize: function (options) {
            var self = this,
                $cur = $();


            this.itemView = Backbone.Epoxy.View.extend({
                el: options.template
            });


            if (options.size) {
                this.visibleLength = options.size;
            }

            _.extend(this.events, options.direction == 'vertical' ? {
                'nav_key:up': 'onPrev',
                'nav_key:down': 'onNext'
            } : {
                'nav_key:left': 'onPrev',
                'nav_key:right': 'onNext'
            });

            this.events['mouseenter .' + options.className] = 'mouseenter'

            this.delegateEvents();

            this.$container = this.containerSelector ? this.$(this.containerSelector) : this.$el;


            this._collection = options.collection;
            this.collection = new Backbone.Collection(this.collection.models.slice(0, this.visibleLength), {
                model: options.collection
            });


            this._collection.on({
                add: function () {
                    //this.length(this.collection.length);
                },
                cut: function () {
                    //this.length(this.collection.length);
                },
                reset: function () {
                    //this.length(this.collection.length);
                    this.collection.reset(this._collection.models.slice(0, this.visibleLength));
                    this.page(0);
                    this.index(0);
                    this.index.fire();
                }
            }, this);


            /*
             this.index = Computed({
             get: function () {
             return _index();
             },
             set: function (val) {

             if (val < 0) {
             val = 0;
             }
             if (val >= self.visibleLength) {
             val = self.visibleLength - 1;
             }
             if (val >= self.slice.length) {
             val = self.slice.length - 1;
             }

             _index(val);
             }
             });

             this.index.subscribe(function (val) {
             $cur.removeClass('cur');
             $cur = self.$container.children().eq(val).addClass('cur');
             });


             this.page = Observable(0);
             if (!this.disableVoiceRefresh) {
             this.page.subscribe(function () {
             $$voice.refresh();
             });
             }
             this.maxPage = Computed(function () {
             var val = self.length() - self.visibleLength;
             return val < 0 ? 0 : val;
             });

             this.canScrollForw = Computed(function () {
             if (self.navLoop && self.length() > 1) {
             return true;
             }
             return self.page() < self.maxPage();
             });
             this.canScrollBack = Computed(function () {
             if (self.navLoop && self.length() > 1) {
             return true;
             }
             return self.page() > 0;
             });

             this.current = Computed(function () {
             return self.collection.at(self.page() + self.index());
             });

             if (this.enableScrollBar) {
             this.bindScrollBar();
             }*/
        },
        bindScrollBar: function () {
            var self = this;
            this.scrollBarSize = Computed(function () {
                var length = self.length(),
                    visible = self.visibleLength;

                if (length > visible) {
                    return visible / length * 100 + '%';
                }
                return '0%';
            });
            this.scrollBarOffset = Computed(function () {
                var page = self.page(),
                    length = self.length();

                if (length > self.visibleLength) {
                    return page / length * 100 + '%';
                }
            });
        },
        /**
         * Отображение канала на экране
         * - если каналов много - в начале списка
         * - если каналов мало - максимально близко к началу
         * @param id {Number} id модели
         */
        navigateTo: function (id) {
            var model = this.collection.getByID(id),
                index = this.collection.indexOf(model);

            if (!index) {
                return;
            } else {
                this.setPage(index);
            }

            this.index(this.slice.indexOf(model));
            this.index.fire();
        },
        bindings: {
            ':el': 'collection:$collection'
        }
    });

    window.BindsScrollCarousel = BindsScrollCarousel;

    var views = {};


    Backbone.Epoxy.binding.addHandler('carouselList', {
        init: function ($el, value, bindings, context) {

            $el.attr('data-bind', '');
            var options = value;
            var size = options.size;
            var direction = options.direction || 'vertical';

            var className = options.className || $el.children()[0].className;


            var template = $el.html();

            $el.find('[data-bind]').attr('data-bind', 'html: ""');
            $el.empty();

            var view = new BindsScrollCarousel({
                el: $el,
                size: size,
                direction: direction,
                className: className,
                collection: bindings.$collection(),
                template: template
            });

            if ($el[0].id) {
                views[$el[0].id] = view;
            }
            //ViewModel.binds.eachModel.call(ViewModel, $el, 'slice' + (options.template ? ', ' + options.template : ''), view, addArgs);

        }
    });


}());


