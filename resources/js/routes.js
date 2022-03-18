import Category from './routes/Category/Index.vue';
import Product from './routes/Category/Product/Index.vue';
import Checkout from './routes/Order/Checkout.vue';
import Summary from './routes/Order/Summary.vue';

const routes = [
    {
        path: '/category/:slug',
        name: 'category',
        component: Category,
    },
    {
        path: '/product/:slug',
        name: 'categoryProduct',
        component: Product,
    },
    {
        path: '/checkout',
        name: 'orderCheckout',
        component: Checkout,
    },
    {
        path: '/summary',
        name: 'orderSummary',
        component: Summary,
    }
]
export default routes
