<template>
  <div>
    <input :class="$style.input" type="text">

    <AButton el="button">{{ text }}</AButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    text: {
      type: String,
      require: true
    }
  },

  setup() {
    return {}
  },
})
</script>

<style lang="scss" module>
.title {
  font-size: 1.5rem;
  font-weight: 700;
}

.input {
  background-color: $bg-secondary;
  color: $white;
  border: 1px solid $border;
  padding: 0.3125rem 0.5rem;
  font-size: 0.875rem;
}
</style>