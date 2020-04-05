import toCurrency from "./toCurrency";
import formatDate from "./formatDate";
import toFileSize from "./toFileSize";

export default {
    install(Vue) {
        Vue.filter("toCurrency", toCurrency);
        Vue.filter("formatDate", formatDate);
        Vue.filter("toFileSize", toFileSize);
    }
};
