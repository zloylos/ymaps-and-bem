BEM.DOM.decl('menu', {
    onElemSetMod: {
        //Будем реагировать на изменение состояния элемента item
        'item': {
            // когда у него будет меняться модификатор state,
            'state': {
                // а точнее принимать значение  active
                'active': function (elem, modName, modVal) {
                    // Когда мы получили состояние объекта, нам нужно оповестить другие блоки о том, что 
                    // произошло. Для этого мы вызываем trigger и говорим, что произошло menuItemClick, 
                    // заодно передаём важные параметры: элемент и его идентификатор метки. 
                    this.trigger('menuItemClick', {
                        domElem : elem,
                        group: elem.data('group'),
                    });
                }
            }
        },
        // и элемента content
        'content': {
            'state': {
                'fold': function (elem, modName, modVal, groupId) {
                    this.trigger('menuGroupClick', {
                        domElem : elem,
                        group: elem.parent().data('group'),
                    });
                }
            }
        }
    },

    onTriggerElemClick: function (e) { 
        e.preventDefault();
        var el = e.data.domElem;
        console.log('clicked')
        // Сначала выключим у всех,
        console.log(this.findBlocksOutside({
            block: 'menu',
            elem: 'item',
            modName: 'state',
            modVal: 'active'
        }))
        // this.delMod(), 'state');
        // потом точечно включим тот, по которому нажали.
        this.toggleMod(el, 'state', 'active');
    },

    onTriggerGroupClick: function (e) {
        e.preventDefault();
        var el = e.data.domElem,
            groupEl = this.elem('content'),
            groupId = el.parent().data('group');

        // Сворачиваем группу.
        groupEl.slideToggle();
        // Триггаем о сворачивании.
        this.toggleMod(groupEl, 'state', 'fold')
        // Выделяем заголовок группы
        this.toggleMod(el, 'state', 'active');
    }
}, {
    live: function () {
        // Вешаем слушатель на клик.
        this.liveBindTo('item', 'click', function (e) {
            this.onTriggerElemClick(e);
        });

        this.liveBindTo('title', 'click', function (e) {
            this.onTriggerGroupClick(e);
        });
    }
});
