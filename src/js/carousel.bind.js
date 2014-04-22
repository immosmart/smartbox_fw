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
            this.viewModel.set('index', $(e.currentTarget).index());
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
            if (this.viewModel.get('canScrollBack') || this.viewModel.get('index') > 0) {
                if (this.viewModel.get('page') === 0 && this.viewModel.get('index') === 0) {
                    this.showLast(e);
                } else {
                    this.prev(e);
                }
            }
        },
        onNext: function (e) {
            var vm = this.viewModel,
                maxPage = vm.get('maxPage'),
                maxIndex,
                index = vm.get('index'),
                page = vm.get('page'), vm;


            if (vm.get('canScrollForw') || index < this.visibleLength) {
                maxIndex = vm.get('length') - maxPage - 1;

                if ((page == maxPage) && (index == maxIndex)) {
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
            if (this.viewModel.get('page') !== 0) {
                this.collection.reset(this._collection.models.slice(0, this.visibleLength));
                this.viewModel.set('page', 0);
            }
            this.viewModel.set('index', 0);
        },
        showLast: function (e) {
            if (e) {
                e.stopPropagation();
            }
            var maxIndex,
                sliceStart,
                maxPage,
                length;

            length = this.viewModel.get('length')
            maxPage = this.viewModel.get('maxPage');
            maxIndex = length - maxPage - 1;
            sliceStart = length - this.visibleLength;

            if (this.viewModel.get('page') !== maxPage) {
                this.collection.reset(this._collection.models.slice(sliceStart, length));
                this.viewModel.set('page', maxPage);
            }
            this.viewModel.set('index', maxIndex);
        },
        next: function (e) {
            if (e) {
                e.stopPropagation();
            }
            var vm = this.viewModel, index = vm.get('index');
            if (index + 1 >= this.collection.length && !vm.get('canScrollForw')) {
                return this;
            }
            if (this.visibleLength - index - 1 <= this.offsetNext) {
                this.shiftNext();
                vm.trigger('change:index', vm, index);
                return this;
            }
            if (index < this.visibleLength - 1) {
                vm.set('index', index + 1);
            }
            return this;
        },
        prev: function (e) {
            if (e) {
                e.stopPropagation();
            }
            var vm = this.viewModel, index = vm.get('index');
            if (index <= this.offsetNext) {
                this.shiftPrev();
                vm.trigger('change:index', vm, index);
                return this;
            }
            if (index > 0) {
                vm.set('index', index - 1);
            }
            return this;
        },
        shiftNext: function () {
            var vm = this.viewModel;
            if (!vm.get('canScrollForw')) {
                return this;
            }
            var page = vm.get('page');
            this.collection.push(this._collection.at(page + this.visibleLength))
            this.collection.shift();
            vm.set('page', page + 1);
            return this;
        },
        shiftPrev: function () {
            var vm = this.viewModel;
            if (!vm.get('canScrollBack')) {
                return this;
            }
            var page = vm.get('page')-1;

            //console.log(this.collection.indexOf(this._collection.at(page)));
            this.collection.unshift(this._collection.at(page));
            this.collection.pop();
            //console.log(this._collection.at(page), this.collection.length);
            vm.set('page',page);

            //console.log(this.collection.length);
            return this;
        },
        setPage: function (page) {
            var maxPage=this.viewModel.get('maxPage')
            if (page > maxPage) {
                page = maxPage;
            }
            this.collection.reset(this._collection.models.slice(page, page + this.visibleLength));
            this.viewModel.set('page', page);
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
                    this.viewModel.set('length', this._collection.length);
                },
                cut: function () {
                    this.viewModel.set('length', this._collection.length);
                },
                reset: function () {
                    this.viewModel.set('length', this._collection.length);
                    this.collection.reset(this._collection.models.slice(0, this.visibleLength));
                    self.viewModel.set('page', 0);
                    self.viewModel.set('index', 0);
                }
            }, this);


            this.viewModel = new (Backbone.Epoxy.Model.extend({
                defaults: {
                    _index: undefined,
                    page: 0,
                    length: 0
                },
                computeds: {
                    index: {
                        deps: ['_index'],
                        get: function (index) {
                            return index;
                        },
                        set: function (value) {
                            if (value < 0) {
                                value = 0;
                            }
                            if (value >= self.visibleLength) {
                                value = self.visibleLength - 1;
                            }
                            if (value >= self.collection.length) {
                                value = self.collection.length - 1;
                            }
                            return {
                                _index: value
                            }
                        }
                    },
                    maxPage: function () {
                        var val = this.get('length') - self.visibleLength;
                        return val < 0 ? 0 : val;
                    },
                    canScrollForw: {
                        deps: ['length', 'page', 'maxPage'],
                        get: function (length, page, maxPage) {
                            if (self.navLoop && length > 1) {
                                return true;
                            }
                            return page < maxPage;
                        }
                    },
                    canScrollBack: {
                        deps: ['length', 'page'],
                        get: function (length, page) {
                            if (self.navLoop && length > 1) {
                                return true;
                            }
                            return page > 0;
                        }
                    },
                    current: {
                        deps: ['page', 'index'],
                        get: function (page, index) {
                            return self.collection.at(page + index);
                        }
                    }
                }
            }))();

            this.viewModel.set('length', this._collection.length);

            this.viewModel.on('change:index', function (model, val) {
                $cur.removeClass('cur');
                $cur = self.$container.children().eq(val).addClass('cur');
            });


            _.defer(function(){
               self.viewModel.set('index', 0);
            });

            if (!this.disableVoiceRefresh) {
                this.viewModel.on('change:page', function () {
                    $$voice.refresh();
                });
            }

            if (this.enableScrollBar) {
                // this.bindScrollBar();
            }
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
                var page = self.viewModel.get('page'),
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

            this.index(this.collection.indexOf(model));
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

        }
    });


}());


