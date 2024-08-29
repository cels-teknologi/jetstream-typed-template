import { useRoute } from 'ziggy-js';
import { usePage } from '@inertiajs/vue3';

export default () => useRoute({
  ...usePage<AppPageProps>().props.ziggy,
  location: new URL(usePage<AppPageProps>().props.ziggy.location),
});
