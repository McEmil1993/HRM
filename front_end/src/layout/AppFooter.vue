<script setup>
// import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';

// const { layoutConfig } = useLayout();

const logoUrl = computed(() => {
    return `/icons/logo1.png`;
});

const logoUrl2 = computed(() => {
    return `/icons/logo.png`;
});
</script>

<template>
    <div class="layout-footer">
        <!-- <img :src="logoUrl" alt="Logo" height="20" class="mr-2" /> -->
        Copyright
        ©
        <span class="font-medium ml-2">
            HR Monitoring System
            <!-- <img :src="logoUrl2" alt="Logo" height="20" class="mr-2" /> 
            CORPORATION -->
        </span>
    </div>
</template>
<style lang="scss" scoped></style>
