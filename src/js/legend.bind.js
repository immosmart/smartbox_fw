(function () {
    var keys = $$legend.keys;

    var setPairs = function (pairs) {
        _.each(pairs, function (value, key) {
            keys[key](value);
        });
    }

    ViewModel.customAttributes.legend = function ($el, value, context, addArgs) {

        $el.removeAttr('legend');
        var pairs = _.foldl(value.split(/\s*,\s*/), function (result, pair) {
            var splt = pair.split(/\s*:\s*/);
            result[splt[0]] = splt[1];
            return result;
        }, {});


        var $current = $$nav.current();
        if ($current && $.contains($el[0], $current[0])) {
            setPairs(pairs)
        }
        $el.on({
            'nav_focus': function (e) {
                setPairs(pairs);
            },
            'nav_blur': function (e) {
                _.each(pairs, function (value, key) {
                    keys[key](0);
                });
            }
        });
    };


    $(function () {
        var $body = $('body');
        $body.on('nav_focus', '#keyboard_popup', function () {

            keys.enter('Input');
            keys.number('Num input');
            keys.red('Remove symbol');
            keys.green('Complete');
            keys.ret('Hide keyboard');
        });

        $body.on('nav_blur', '#keyboard_popup', function () {

            keys.enter('');
            keys.number('');
            keys.red('');
            keys.green('');
            keys.ret('');
        });
    });

}());
