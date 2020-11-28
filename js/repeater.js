jQuery.fn.extend({
    createRepeater: function (options = {}) {
        var hasOption = function (optionKey) {
            return options.hasOwnProperty(optionKey);
        };

        var option = function (optionKey) {
            return options[optionKey];
        };

        var generateId = function (string) {
            return string
                .replace(/\[/g, '_')
                .replace(/\]/g, '')
                .toLowerCase();
        };

        var itemsInputsValue = function(){
            jQuery('input').on('keyup', function(){
                jQuery(this).attr('value', jQuery(this).val());
            });
        }

        var removeItemParent = function () {
            jQuery('.remove-btn').on('click', function(){
                jQuery(this).parents('.items').remove();
            
                var items = repeater.find(".items");
                var key = 0;
            
                items.each(function (index, item) {
                    items.remove();
                    if (items.length >= 1) {
                        addItem($(item), key, 'off');
                    }
                    key++;
                });
            })
        }

        var addItem = function (items, key, fresh = true) {
            var itemContent = items;
            var group = itemContent.data("group");
            var item = itemContent;
            var input = item.find('input,select,textarea');

            input.each(function (index, el) {
                var attrName = $(el).data('name');
                var skipName = $(el).data('skip-name');
                if (skipName != true) {
                    $(el).attr("name", group + "[" + key + "]" + "[" + attrName + "]");
                } else {
                    if (attrName != 'undefined') {
                        $(el).attr("name", attrName);
                    }
                }
                if (fresh == true) {
                    $(el).attr('value', '');
                } else if(fresh == false) {
                    if (key > 0) {
                        var prevName = "#"+group+"_"+(key-1)+"_"+attrName;
                    }
                    $(el).attr('value', $(prevName).val());
                } else {
                    $(el).attr('value', $('#'+attrName).val());
                }

                $(el).attr('id', generateId($(el).attr('name')));
                $(el).parent().find('label').attr('for', generateId($(el).attr('name')));
            })

            var itemClone = items;

            /* Handling remove btn */
            var removeButton = itemClone.find('.remove-btn');

            if (key == 0) {
                removeButton.attr('disabled', true);
            } else {
                removeButton.attr('disabled', false);
            }

            var newItem = $("<div class='items' data-group='"+group+"'>" + itemClone.html() + "<div/>");
            newItem.attr('data-index', key)

            newItem.appendTo(repeater);

            removeItemParent(); 
            itemsInputsValue(); 
        };

        /* find elements */
        var repeater = this;
        var items = repeater.find(".items");
        var key = 0;
        var addButton = repeater.find('.repeater-add-btn');
        var cloneButton = repeater.find('.repeater-clone-btn');
      
        items.each(function (index, item) {
            items.remove();
            if (hasOption('showFirstItemToDefault') && option('showFirstItemToDefault') == true) {
                addItem($(item), key, false);
                key++;
            } else {
                if (items.length > 1) {
                    addItem($(item), key, false);
                    key++;
                }
            }
        });

        /* handle click and add items */
        addButton.on("click", function () {
            addItem($(items[0]), key);
            key++;
        });

        cloneButton.on("click", function () {
            addItem($(items[0]), key, false);
            key++;
        });
    }
});