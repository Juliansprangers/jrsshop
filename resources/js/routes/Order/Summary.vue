<template>
    <div>
        <div class="mt-3">
            <h2>Bedankt voor je bestelling!</h2>
            <table class="table table-striped table-dark mt-3">
                <thead>
                <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Aantal</th>
                    <th scope="col">Prijs</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in order.products">
                    <td>{{ item.pivot.product_name }}</td>
                    <td>{{ item.pivot.quantity }}</td>
                    <td>{{ formatProductPrice(item.pivot.total_price) }}</td>
                </tr>
                <tr>
                    <th>Totaal</th>
                    <th>{{ totalQuantity }}</th>
                    <th>{{ totalPrice }}</th>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Checkout',
    data() {
        return {
            processing: false,
            customer: {
                'email': '',
                'first_name': '',
                'last_name': '',
                'address': '',
                'zipcode': '',
                'city': '',
                'country': '',
            }
        }
    },
    computed: {
        order() {
            return this.$store.state.order;
        },
        totalQuantity() {
            return this.order.products.reduce((cart, item) => cart + item.pivot.quantity, 0);
        },
        totalPrice() {
            let price = this.order.products.reduce((cart, item) => cart + Number(item.pivot.total_price), 0);

            return Number(price).toLocaleString('nl-NL', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            });
        },
    },
    methods: {
        formatProductPrice(price) {
            return Number(price).toLocaleString('nl-NL', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            });
        },
    }
}
</script>
