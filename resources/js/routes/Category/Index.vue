<template>
    <div>
        <div class="container" v-if="category">
            <div class="row">
                <div class="col-sm-4" v-for="product in category.products">
                    <div class="card mt-3">
                        <router-link :to="{ name: 'categoryProduct', params: { slug: product.slug }}">
                            <img class="img-fluid" src="https://dummyimage.com/600x400/212529/fff" alt="Card image cap">
                        </router-link>
                        <div class="card-body">
                            <h5 class="card-title">{{ product.name }}</h5>
                            <p class="card-text">{{ product.description }}</p>
                        </div>
                        <div class="card-body">
                            <b class="card-link">{{ formatPrice(product.price) }} euro</b>
                            <button @click="$store.commit('addToCart', product)" class="card-link btn btn-success">Toevoegen</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Navbar',
    computed:{
        categories(){
            return this.$store.state.categories;
        },
        category(){
            return this.categories.find(item => item.slug === this.$route.params.slug);
        },
    },
    methods: {
        formatPrice(price){
            return Number(price).toLocaleString('nl-NL', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            });
        },
    }
}
</script>
<style scoped>
    .container{
        padding-bottom: 5rem;
    }
</style>
