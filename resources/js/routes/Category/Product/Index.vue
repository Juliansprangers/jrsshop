<template>
    <div v-if="product">
        <div class="container">
            <div class="card mt-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-5 col-md-5 col-sm-6">
                            <div class="white-box text-center"><img src="https://dummyimage.com/430x600/212529/fff" class="img-fluid"></div>
                        </div>
                        <div class="col-lg-7 col-md-7 col-sm-6">
                            <h3 class="card-title">{{ product.name }}</h3>
                            <h4 class="box-title mt-5">Product description</h4>
                            <p>{{ product.description }}</p>
                            <h2 class="mt-5">
                                {{ formatPrice(product.price) }} euro
                            </h2>
                            <button @click="$store.commit('addToCart', product)" class="btn btn-success">Toevoegen</button>
                            <h3 class="box-title mt-5">Key Highlights</h3>
                            <ul class="list-unstyled">
                                <li><i class="fa fa-check text-success"></i>Sturdy structure</li>
                                <li><i class="fa fa-check text-success"></i>Designed to foster easy portability</li>
                                <li><i class="fa fa-check text-success"></i>Perfect furniture to flaunt your wonderful collectibles</li>
                            </ul>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <h3 class="box-title mt-5">Product Info</h3>
                            <div class="table-responsive">
                                <table class="table table-striped table-product">
                                    <tbody>
                                    <tr>
                                        <td width="390">Stock</td>
                                        <td>{{ product.stock }}</td>
                                    </tr>
                                    <tr>
                                        <td>Sku</td>
                                        <td>{{ product.sku }}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    computed:{
        products(){
            return this.$store.state.products;
        },
        product(){
           return  this.products.find(product => product.slug === this.$route.params.slug);
        }
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
