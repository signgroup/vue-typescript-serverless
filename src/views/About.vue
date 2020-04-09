<template>
    <div class="about container-box">
        <h1>This is an about page</h1>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Home extends Vue {
        mounted() {
            console.log(1)
        }
    }

</script>
