<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<template>
    <div>
        <h1 class="text-3xl">Thanks for registering!</h1>
        <p>
            Please confirm your email to finishing registering:
            {{ route.query.email }}
        </p>
    </div>
</template>
