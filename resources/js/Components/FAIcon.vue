<script setup lang="ts">
import { computed, ref, inject, watch } from 'vue';
import { wrap as _w } from '@/helpers';
import { InjectionKeys as K } from '@/vue-constants';

const DEFAULT_STYLE = 'fa-duotone';
const STYLES = [
  'fa-solid',
  'fa-regular',
  'fa-light',
  'fa-duotone',
  'fa-brands',
];

const props = withDefaults(defineProps<{
  icon: string | string[];
  iconClass?: string | string[];
}>(), { iconClass: () => [] });

const changed = ref(false);
const ready = inject(K.FontAwesome);
const styled = computed(() => {
  const icon = Array.isArray(props.icon) ? props.icon : props.icon.split(' ');
  return STYLES.map((s) => icon.findIndex((v) => v === s) > -1).some((_) => _);
});

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
          ..._w(icon),
          ..._w(iconClass),
          { [DEFAULT_STYLE]: !styled },
        ]"
        aria-hidden="true"
      />
    </span>
  </span>
</template>
