import Vue from 'vue'

var app = new Vue({
    el: '#app',
    data: {
        hello: 'Hello fucking world!!!',
        stock: 1000
    },
    methods: {
        addToStock: function (){
            this.stock +=1;
        }
    }
});