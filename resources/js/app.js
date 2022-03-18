require('./bootstrap');

import Vue from 'vue';

import Vuex from 'vuex'
Vue.use(Vuex);

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './routes.js';

import App from './components/App';

const router = new VueRouter({
    mode: 'history',
    routes
});

const store = new Vuex.Store({
    state: {
        products: [],
        categories: [],
        cart: [],
        order: {}
    },
    mutations: {
        setCategories(state, categories) {
            state.categories = categories;
        },
        setProducts(state, products) {
            state.products = products;
        },
        addToCart(state, product) {
            let productIndex = state.cart.findIndex(item => item.slug === product.slug);
            if (productIndex !== -1) {
                state.cart[productIndex].quantity++;
                return;
            }

            product.quantity = 1;
            state.cart.push(product);
        },
        removeFromCart(state, index) {
            state.cart.splice(index, 1);
        },
        updateOrder(state, order) {
            state.order = order;
        },
        updateCart(state, cart) {
            state.cart = cart;
        }
    },
    actions: {
        getProducts({commit}) {
            axios.get('/api/products')
                .then((response) => {
                    commit('setProducts', response.data);
                })
                .catch((error) => console.error(error));
        },
        getCategories({commit}) {
            axios.get('/api/categories')
                .then((response) => {
                    commit('setCategories', response.data);
                })
                .catch((error) => console.error(error));
        },
        clearCart({commit}) {
            commit('updateCart', []);
        }
    }
});

const app = new Vue({
    render: h => h(App),
    router,
    store,
    el: '#app',
    created() {
        store.dispatch('getProducts')
            .then(_ => {})
            .catch((error) => console.error(error));

        store.dispatch('getCategories')
            .then(_ => {})
            .catch((error) => console.error(error));
    }
});
