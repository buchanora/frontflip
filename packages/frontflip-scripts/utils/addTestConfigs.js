const fs = require('fs-extra');
const path = require('path');

module.exports = (rootPath, ans)=>{
    const jsonPath = path.resolve(rootPath, 'package.json');
    const packageDotJson = fs.readJsonSync(jsonPath);
    switch (ans.testSuite && ans.testSuite.key) {
        case "jest":
          packageDotJson.jest = {
            "collectCoverage": true,
            "testRegex": "__tests__/.*\\.spec|snap.js$",
            "modulePaths": [
              "app"
            ],
            "moduleNameMapper": {
              "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
              "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js"
            },
            "coveragePathIgnorePatterns": [
              "/node_modules/",
              "/.vscode/",
              "/webpack.config.js",
              "/lib/",
              "/package.json",
              "/package-lock.json",
              "/coverage/"
            ]
          }
            break;
        default:
            break;
    }
    fs.writeFileSync(
        jsonPath,
        JSON.stringify(packageDotJson, null, 2)
    );
}