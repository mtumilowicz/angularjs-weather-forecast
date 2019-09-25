//jshint strict: false
module.exports = function (config) {
    config.set({

        basePath: './app',

        files: [
            'lib/angular/angular.js',
            'lib/angular-route/angular-route.js',
            'lib/angular-resource/angular-resource.js',
            '../node_modules/angular-mocks/angular-mocks.js',
            'view*/**/*.js',
            'impl/**/*js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['ChromeHeadless'],

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine'
        ]

    });
};
