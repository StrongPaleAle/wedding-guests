<template>
    <span class="star"></span>
</template>
<style lang="postcss">
.star {
    @apply block w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-copper;

    clip-path: polygon(50% 0%, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0% 50%, 35% 35%);
}
</style>
