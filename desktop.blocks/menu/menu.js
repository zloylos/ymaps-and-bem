modules.define('menu', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

  provide(BEMDOM.decl(
    this.name,
    {
    onElemSetMod: {
        // Будем реагировать на изменение состояния элемента item
        'item': {
            // когда у него будет меняться модификатор state,
            'state': function (elem, modName, modVal) {
                // Когда мы получили состояние объекта, нам нужно оповестить другие блоки о том, что
                // произошло. Для этого мы вызываем trigger и говорим, что произошло событие menuItemClick,
                // заодно передаём важные параметры: элемент и его идентификатор метки.
                this.emit('menuItemClick', {
                    domElem : elem,
                    group: this.elemParams(elem).group
                });
            }
        },
        // и элемента content
        'content': {
            'state': function (elem, modName, modVal) {
                this.emit('menuGroupClick', {
                    domElem : elem,
                    group: this.elemParams(elem.parent()).group,
                });
            }
        }
    },

    onTriggerElemClick: function (e) {
        e.preventDefault();
        var el = e.currentTarget;
        // Потом точечно включим у того, по которому нажали.
        this.toggleMod(el, 'state', 'active');
    },

    onTriggerGroupClick: function (e) {
        e.preventDefault();
        var el = e.currentTarget,
            groupEl = this.elem('content'),
            groupId = this.elemParams(el).group;

        // Сворачиваем группу.
        groupEl.slideToggle();
        this.toggleMod(groupEl, 'state', 'fold');
        // Выделяем заголовок группы.
        this.toggleMod(el, 'state', 'fold');
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

        this.on('menuItemClick', function (e, data) {
            // Педалька.
            // Почему-то не срабатывает delMod.
            var activeState = this.buildSelector('item', 'state', 'active').substr(1);
            this.lastSelected && this.lastSelected.removeClass(activeState);
            this.lastSelected = data.domElem;
        });
    }
}
    ));
});

