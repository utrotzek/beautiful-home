import toCurrency from "./toCurrency";

export default {
    install(Vue) {
        Vue.filter("toCurrency", toCurrency);
    }
};
