module.exports = function (config) {
    config.set({

        basePath: './src',

        files: [
            'lib/angular/angular.js',
            'lib/angular-route/angular-route.js',
            'lib/angular-resource/angular-resource.js',
            '../node_modules/angular-mocks/angular-mocks.js',
            {pattern: 'app/**/*js', type: 'module'}
        ],

        autoWatch: true,
        singleRun: true,

        frameworks: ['jasmine'],

        browsers: ['ChromeHeadless'],

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine'
        ]

    });
};
