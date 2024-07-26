<script setup lang="ts">
/**
 * App.vue - The highest level SPA component.
 * (c) Cels Teknologi Indonesia
 */

import { provide } from 'vue';
import { fontawesome, FAStyles } from '@/helpers';
import { InjectionKeys as K } from '@/vue-constants';

provide(K.FontAwesome, fontawesome([
  FAStyles.Solid,
  FAStyles.Brands,
]));
</script>

<template>
  <slot />
</template>
