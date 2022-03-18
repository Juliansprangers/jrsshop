<template>
    <div>
        <footer class="text-center text-white bg-dark position-fixed w-100 bottom-0">
            <div class="text-center p-3">
                © 2022 Copyright:
                <a class="text-white" href="#">JRSShop</a>
            </div>
        </footer>
    </div>
</template>
<script>
export default {
    name: 'Footer',
    computed:{
        categories(){
            return this.$store.state.categories;
        },
    },
}
</script>
