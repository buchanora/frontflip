const Promise = require('bluebird');
const utils = require('../utils/');
module.exports = (type, config, cli) => {
    return new Promise((resolve, reject) => {
        try {
            const adapter = utils.getAdapter(type)(config);
            const builder = adapter.getBuilder && typeof adapter.getBuilder === 'function'
                ? adapter.getBuilder(type)
                : adapter;
            builder
                .getContext(config, cli)
                .then(context => {
                    console.log(builder);
                    const paths = utils.getPaths(adapter.scaffoldRoot, adapter.templateRoot, builder.definition);
                    if (builder.hooks && builder.hooks.preBuild) {
                        return Promise.each(builder.hooks.preBuild, (hook, index, hooks) => {
                            return hook(paths, context, cli)
                        });
                    }
                })
                .then(() => {
                    if (builder.filters.build) {
                        return builder
                            .filters
                            .build(paths, config.project.dir, context, utils.build)
                    } else {
                        return utils.build(paths, config.project.dir, context);
                    }
                })
                .then(() => {
                    if (builder.hooks && builder.hooks.postBuild) {
                        return Promise.each(builder.hooks.postBuild, (hook, index, hooks) => {
                            return hook(paths, context, cli)
                        });
                    }
                })
                .then(() => {
                    resolve()
                })
                .catch(error => {
                    reject(error)
                });
        } catch (error) {
            reject(error)
        }
    });
}