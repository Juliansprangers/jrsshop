<template>
    <div>
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark ps-3 pe-3">
                <a class="navbar-brand" href="#">JRSShop</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar"
                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbar">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                               aria-expanded="false">Categorieen</a>
                            <ul class="dropdown-menu">
                                <li v-for="category in categories">
                                    <router-link class="dropdown-item" :to="{ name: 'category', params: { slug: category.slug }}">
                                        {{ category.name }}
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'orderCheckout' }">
                                Winkelwagen ({{ $store.state.cart.length }}) producten
                            </router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    </div>
</template>
<script>
export default {
    name: 'Navbar',
    computed:{
        categories(){
            return this.$store.state.categories;
        },
    },
}
</script>
