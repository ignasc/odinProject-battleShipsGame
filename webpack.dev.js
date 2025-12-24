import { merge } from "webpack-merge";
import commonWebpack from "./webpack.common.js";

export default merge(commonWebpack, {
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        watchFiles: [".scr/template.html"],
    },
});
