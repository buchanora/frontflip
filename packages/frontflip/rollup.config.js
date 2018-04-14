import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import ugliest from "uglify-es";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

const config = {
  input: "src/index.js",
  name: "FieldStack",
  globals: {
    react: "React",
    'react-redux': 'react-redux',
    'redux': 'redux'
  },
  external: ["react", "redux" ,"react-redux"],
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    resolve({
      customResolveOptions: {
        moduleDirectory: ["../../node_modules", "../"]
      }
    }),
    commonjs({
      include: /node_modules/,
      namedExports: {
        'draft-js': [
          'Editor',
          'ContentState',
          'EditorState',
          'RichUtils',
          'convertFromHTML',
          'convertToRaw',
          'convertFromRaw'
        ],
        'prop-types': [
          'PropTypes'
        ]
      }
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ]
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(uglify({warnings: 'verbose'}, ugliest.minify));
}

export default config;