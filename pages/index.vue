<template>
  <div :class="$style.wrapper">
    <OSidebar  />

    <div :class="$style.main">
      <OListBlock />
      <OSearchBlock />
    </div>
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
  min-height: 100vh;
}

.main {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
