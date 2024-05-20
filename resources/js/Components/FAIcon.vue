<script setup lang="ts">
import { computed, ref, inject, watch } from 'vue';
import spa from '@/spa';

const DEFAULT_STYLE = 'fa-sharp fa-light';
const STYLES = ['fa-light', 'fa-solid', 'fa-brands'];

const props = withDefaults(defineProps<{
  icon: string | string[];
  iconClass?: string | string[];
}>(), { iconClass: () => [] });

const changed = ref(false);
const ready = inject(spa.InjectionKeys.FontAwesome);
const styled = computed(() => {
  const icon = Array.isArray(props.icon) ? props.icon : props.icon.split(' ');
  return STYLES.map((s) => icon.findIndex((v) => v === s) > -1).some((_) => _);
});

const _arr = (n: string | string[]) => Array.isArray(n) ? n : [n];

watch(props, () => {
  changed.value = true;
});
watch(changed, (v) => {
  if (v) {
    changed.value = false;
  }
}, { flush: 'post' });
</script>

<template>
  <span class="inline-block">
    <span v-if="ready && !changed">
      <i
        :class="[
          ..._arr(icon),
          ..._arr(iconClass),
          { [DEFAULT_STYLE]: !styled },
        ]"
        aria-hidden="true"
      />
    </span>
  </span>
</template>
