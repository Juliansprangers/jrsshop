<template>
    <div>
        <navbar></navbar>
        <div class="container">
            <router-view></router-view>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Navbar from './Navbar'
import Footer from './Footer'
export default {
    name: 'App',
    components: {Navbar, Footer},
    computed:{
        categories(){
            return this.$store.state.categories;
        },
    },
}
</script>
