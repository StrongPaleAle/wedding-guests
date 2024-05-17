<script setup lang="ts">
import { useScriptTag } from '@vueuse/core'
import { onMounted } from 'vue'
declare const Twitch: any

const options = {
    width: '100%',
    height: '100%',
    channel: 'erissfalchinelli'
}
useScriptTag(
    'https://player.twitch.tv/js/embed/v1.js',
    // on script tag loaded.
    () => {
        const player = new Twitch.Player('twitch-embed', options)
        player.setVolume(0.5)
    }
)
</script>
<template>
    <div id="twitch-embed" class="aspect-video w-full max-w-7xl"></div>
</template>
