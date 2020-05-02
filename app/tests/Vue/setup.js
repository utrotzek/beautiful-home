import { vueTopprogress } from "vue-top-progress";
import Vue from "vue";
import filters from "../../resources/js/filters";
Vue.use(filters);

Vue.component("Progressbar", vueTopprogress);

window.axios = require("axios");
