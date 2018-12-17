module.exports = {
    path: 'app',
    files: [
        {
            name: 'main.js',
            templateDir: 'app',
            templateFile: 'main.js'
        },
        {
            name: 'routes.js',
            templateDir: 'app',
            templateFile: 'routes.js'
        },
        {
            name: 'main.scss',
            templateDir: 'app',
            templateFile: 'main.scss'
        }
    ],
    children: [
        {
            path: 'api',
            files:[
                {
                    name: 'sampleApi.js',
                    templateDir: 'app/api',
                    templateFile: 'sampleApi.js'
                }
            ],
            children: [
                {
                    path: 'utils',
                    files: [
                        {
                            name: 'queries.js',
                            templateDir: 'app/api',
                            templateFile: 'queries.js'
                        }
                    ],
                }
            ]
        },
        {
            path: 'assets',
            children: []
        },
        {
            path: 'components',
            files: [
                {
                    name: 'styles.manifest.scss'
                }
            ],
            children: []
        },
        {
            path: 'config',
            files: [
                {
                    name: 'server.js',
                    templateDir: 'app/config',
                    templateFile: 'server.js'
                },
                {
                    name: 'store.js',
                    templateDir: 'app/config',
                    templateFile: 'store.js'
                },
            ],
        },
        {
            path: 'lib',
            files: [
                {
                    name: 'styles.manifest.scss'
                }
            ],
            children: [
                {
                    path: 'grant',
                    files: [
                        {
                            name: 'index.js',
                            templateDir: 'app/lib',
                            templateFile: 'grant.js'
                        },
                    ]
                },
            ]
        },
        {
            path: 'resources',
            children: []
        },
        {
            path: 'services',
            children: []
        },
        {
            path: 'utils',
            children: []
        },
        {
            path: 'view__pages__site',
            files: [
                {
                    name: 'styles.manifest.scss'
                }
            ],
            children: []
        },
        {
            path: 'views__partials',
            files: [
                {
                    name: 'styles.manifest.scss'
                }
            ],
            children: []
        },
        {
            path: 'views__templates',
            files: [
                {
                    name: 'styles.manifest.scss'
                }
            ],
            children: []
        },
        {
            path: 'widgets',
            files: [
                {
                    name: 'styles.manifest.scss'
                }
            ],
            children: []
        }
    ]
}