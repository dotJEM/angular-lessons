angular.module('dotjem.lessons')
    .service('scriptLoader', [function () {
        var $service = {};
        var loaded = {};

        $service.LoadScript = function (url) {
            if (!(url in loaded)) {
                $.ajax(url, {
                    dataType: "script",
                    success: function () {
                        loaded[url] = url;
                    },
                    async: false,
                    cache: true
                });
            }
        };

        return $service;
    }]);
