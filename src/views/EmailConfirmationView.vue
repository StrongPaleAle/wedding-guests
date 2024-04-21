<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<template>
    <div class="min-w-80 sm:min-w-96 card p-4 md:p-8 text-center">
        <h1 class="text-3xl mb-6 font-serif">Thanks for registering!</h1>
        <p>
            Please confirm your email to finishing registering:
            {{ route.query.email }}
        </p>
    </div>
</template>
