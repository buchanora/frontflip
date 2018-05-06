const fs = require('fs-extra');
const path = require('path');

module.exports = (rootPath)=>{
    const jsonPath = path.resolve(rootPath, 'package.json');
    const packageDotJson = fs.readJsonSync(jsonPath);
    packageDotJson.scripts = {
        "start": "webpack-dev-server --open",
        "build": "webpack",
        "stats": "webpack --profile --json > stats.json",
        "test": "NODE_ENV=test mocha --recursive test",
        "test:coverage": " ",
        "test:unit": "mocha --recursive test/ test/ test/",
        "test:integration": "mocha --recursive test/"
    }
    fs.writeFileSync(
        jsonPath,
        JSON.stringify(packageDotJson, null, 2)
    );
}