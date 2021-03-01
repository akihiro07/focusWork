<template>
  <div :class="$style.wrapper">
    <OSidebar  />

    <OMusicBlock />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.wrapper {
  display: grid;
  grid-template-columns: 20% 80%;
}
</style>
