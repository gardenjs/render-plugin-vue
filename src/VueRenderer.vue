<script setup>
import { onMounted } from 'vue'

const props = defineProps([
  'selectedExample',
  'das',
  'component',
  'decorators',
  'afterRenderHook',
])

onMounted(async () => {
  await props.afterRenderHook?.()
})
</script>

<template>
  <component v-if="props.decorators?.length > 0" :is="props.decorators[0]">
    <VueRenderer
      :selectedExample="props.selectedExample"
      :das="props.das"
      :component="props.component"
      :afterRenderHook="props.afterRenderHook"
      :decorators="props.decorators.slice(1)"
    />
  </component>
  <component
    v-else-if="props.component"
    :is="props.component"
    v-bind="{ ...props.selectedExample.input }"
  />
</template>
