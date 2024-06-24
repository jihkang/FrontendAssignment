const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  name: "frontend-assignment",
  mode: "development", // 배포 : production
  devtool: "inline-source-map", // hidden-source-map
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: {
    app: ["./index"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: { browsers: ["last 2 chrome versions"] },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: ["react-refresh/babel"], // 추가
        },
        exclude: path.join(__dirname, "node_modules"),
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
    }),
  ], // 플러그인 장착
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
  },
  devServer: {
    devMiddleware: { publicPath: "/dist" }, // 웹팩을 생성해주는 경로
    static: { directory: path.resolve(__dirname) }, // 실제로 존재하는 정적 파일들의 경로
    hot: true,
  },
};
