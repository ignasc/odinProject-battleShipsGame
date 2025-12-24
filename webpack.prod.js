import { merge } from "webpack-merge";
import commonWebpack from "./webpack.common.js";

export default merge(commonWebpack, {
    mode: "production",
});
