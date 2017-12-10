/**
 * Global object of App
 */
var app = {};

/**
 * Base URL
 */
var BASE_URL = 'templates/';

/**
 * Home page URL
 */
var homeTemplateUrl = BASE_URL + 'home.html';

$(document).ready(function () {

    var $routerBlock = $('#routerBlock');

    app.renderHome = function () {
        var displayHome = function (template) {
            $routerBlock.append(template);
        };

        $.get(homeTemplateUrl)
                .then(displayHome)
                .then(includeModules);
    };

    app.renderHome();

    app.navigation = function () {

    };

    /**
     * Include modules list
     */
    function includeModules() {
        //= partials/init.js
        //= partials/fixed-header.js
        //= partials/site-guide.js
        //= partials/go-to-top.js
        //= partials/project-bg-animation.js
    }

});