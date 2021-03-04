<template>
  <h2 :class="$style.title"><slot /></h2>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style lang="scss" module>
.title {
  font-size: 1.75rem;
  font-weight: 700;
}
</style>