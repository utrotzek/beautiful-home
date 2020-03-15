import toCurrency from "./toCurrency";
import formatDate from "./formatDate";

export default {
    install(Vue) {
        Vue.filter("toCurrency", toCurrency);
        Vue.filter("formatDate", formatDate);
    }
};
