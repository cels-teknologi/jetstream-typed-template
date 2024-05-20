<script setup lang="ts">
/**
 * App.vue - The highest level SPA component.
 * (c) Cels Teknologi Indonesia
 */

import { provide } from 'vue';
import { fontawesome, FAStyles } from '@/helpers';
import { Keys } from '@/injections';

provide(Keys.FontAwesome, fontawesome([
  FAStyles.Solid,
  FAStyles.Brands,
]));
</script>

<template>
  <slot />
</template>
