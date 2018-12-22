const fs = require('fs-extra');
const path = require('path');

module.exports = (rootPath, ans)=>{
    const jsonPath = path.resolve(rootPath, 'package.json');
    const packageDotJson = fs.readJsonSync(jsonPath);
    let scripts = {
        "start": "cross-env webpack-dev-server --hot --open",
        "build": "cross-env NODE_ENV=production webpack",
        "stats": "cross-env webpack --profile --json > stats.json",
        "lint": "cross-env eslint --ext .js --ext .jsx .",
    }
    switch (ans.testSuite && ans.testSuite.name) {
        case "mocha":
            scripts = Object.assign({}, scripts, {
                "test": "cross-env NODE_ENV=test mocha --recursive test",
                "test:coverage": " ",
                "test-watch": "cross-env NODE_ENV=test mocha --watch",
                "test:unit": "mocha --recursive test/ test/ test/",
                "test:integration": "mocha --recursive test/"
            })
            break;
        case "jest":
            scripts = Object.assign({}, scripts, {
                "test": "cross-env NODE_ENV=test jest",
                "test:coverage": "cross-env NODE_ENV=test jest --coverage",
                "test-watch": "cross-env NODE_ENV=test jest --watch",
                "test:unit": "cross-env NODE_ENV=test jest",
                "test:integration": "cross-env NODE_ENV=test jest"})
        default:
            break;
    }
    
    packageDotJson.scripts = scripts;
    fs.writeFileSync(
        jsonPath,
        JSON.stringify(packageDotJson, null, 2)
    );
}