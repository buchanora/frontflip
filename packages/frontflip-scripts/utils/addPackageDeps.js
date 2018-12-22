const fs = require('fs-extra');
const path = require('path');

module.exports = (rootPath, dependencies)=>{
    const jsonPath = path.resolve(rootPath, 'package.json');
    const packageDotJson = fs.readJsonSync(jsonPath);

    dependencies.core && (packageDotJson.dependencies = dependencies.core)
    dependencies.dev && (packageDotJson.devDependencies = dependencies.dev)
    dependencies.peer && (packageDotJson.peerDependencies = dependencies.peer)

    fs.writeFileSync(
        jsonPath,
        JSON.stringify(packageDotJson, null, 2)
    );
}