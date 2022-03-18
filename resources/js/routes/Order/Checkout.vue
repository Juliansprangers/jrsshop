<template>
    <div>
        <div class="container">
            <form @submit.prevent="submitOrder" class="mt-3">
                <h2>Klantgegevens</h2>
                <div v-if="errors">
                    <div class="alert alert-danger" role="alert">
                        <div v-for="error in errors">{{ error[0] }}</div>
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col-12 col-md mb-2 mt-2">
                        <div class="form-outline">
                            <input type="text" name="email" class="form-control" v-model="customer.first_name"
                                   placeholder="Voornaam"/>
                        </div>
                    </div>
                    <div class="col-12 col-md mb-2 mt-2">
                        <div class="form-outline">
                            <input type="text" name="last_name" class="form-control" v-model="customer.last_name"
                                   placeholder="Achternaam"/>
                        </div>
                    </div>
                    <div class="col-12 col-md mb-2 mt-2">
                        <div class="form-outline">
                            <input type="email" name="email" class="form-control" v-model="customer.email"
                                   placeholder="Email"/>
                        </div>
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col-12 col-md mb-2 mt-2">
                        <div class="form-outline">
                            <input type="text" name="address" class="form-control" v-model="customer.address"
                                   placeholder="Adres + huisnummer"/>
                        </div>
                    </div>
                    <div class="col-12 col-md mb-2 mt-2">
                        <div class="form-outline">
                            <input type="text" name="zipcode" class="form-control" v-model="customer.zipcode"
                                   placeholder="Postcode"/>
                        </div>
                    </div>
                    <div class="col-12 col-md mb-2 mt-2">
                        <div class="form-outline">
                            <input type="text" name="city" class="form-control" v-model="customer.city"
                                   placeholder="Plaats"/>
                        </div>
                    </div>
                    <div class="col-12 col-md mb-2 mt-2">
                        <div class="form-outline">
                            <input type="text" name="country" class="form-control" v-model="customer.country"
                                   placeholder="Land"/>
                        </div>
                    </div>
                </div>
                <h2>Producten</h2>
                <table class="table table-striped table-dark mt-3">
                    <thead>
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Aantal</th>
                        <th scope="col">Prijs</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in cart">
                        <td>{{ item.name }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ formatProductPrice(item) }}</td>
                        <td>
                            <button @click="$store.commit('removeFromCart', index)" class="btn btn-danger float-sm-end">
                                Verwijderen
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th>Totaal</th>
                        <th>{{ totalQuantity }}</th>
                        <th>{{ totalPrice }}</th>
                        <th></th>
                    </tr>
                    </tbody>
                </table>

                <button type="submit" class="btn btn-success btn-block mb-4"
                        v-text="processing ? 'Verwerken' : 'Plaats order'"></button>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Checkout',
    data() {
        return {
            errors: null,
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
        cart() {
            return this.$store.state.cart;
        },
        totalQuantity() {
            return this.cart.reduce((cart, item) => cart + item.quantity, 0);
        },
        totalPrice() {
            let price = this.cart.reduce((cart, item) => cart + (item.price * item.quantity), 0);

            return Number(price).toLocaleString('nl-NL', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            });
        },
    },
    methods: {
        formatProductPrice(item) {
            let price = (item.price * item.quantity);

            return Number(price).toLocaleString('nl-NL', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            });
        },
        submitOrder() {
            this.processing = true;
            axios.post('/api/purchase', {
                products: this.cart,
                customer: this.customer,
                totalPrice: this.totalPrice,
            })
            .then((response) => {
                this.processing = false;
                this.$store.commit('updateOrder', response.data);
                this.$store.dispatch('clearCart');
                this.$router.push({name: 'orderSummary'});
            })
            .catch((error) => {
                this.processing = false;
                this.errors = error.response.data.errors;
            });
        }
    }
}
</script>
