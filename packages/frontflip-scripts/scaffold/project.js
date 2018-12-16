const app = require('./app');
module.exports = {
    files: [
        {
            name: 'webpack.config.js',
            templateDir: 'config',
            templateFile: 'webpackCore.js'
        },
        {
            name: 'postcss.config.js',
            templateDir: 'config',
            templateFile: 'postcss.js'
        }
    ],
    children: [
        {
            path: 'build',
            children: null
        },
        {
            path: 'libs',
            files:[
                {
                    name: 'webpackPartials.js',
                    templateDir: 'config',
                    templateFile: 'webpackPartials.js'
                },
                {
                    name: 'template.html',
                    templateDir: 'html',
                    templateFile: 'root.html'
                }
            ],
            children: null
        },
        app
    ]
}