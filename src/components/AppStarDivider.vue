<template>
    <div class="star-divider">
        <IconStar />
    </div>
</template>
<style lang="postcss">
.star-divider {
    @apply flex items-center justify-center gap-3 drop-shadow;
    &::before,
    &::after {
        @apply flex-grow h-1 bg-copper;
        content: '';
    }
}
</style>
