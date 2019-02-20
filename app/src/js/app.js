import Vue from 'vue';

import style from '../scss/sb-admin.scss';
import bootstrap from '../libraries/bootstrap/css/bootstrap.css';

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

var app = new Vue({
    el: '#app',
    data: {
        hello: 'Hello ds world!!!',
        stock: 1000
    },
    methods: {
        addToStock: function (){
            this.stock +=1;
        }
    }
});