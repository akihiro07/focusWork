<template>
  <div :class="$style.wrapper">
    <input :class="$style.input" type="text">

    <AButton el="button" size="small">{{ text }}</AButton>
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
.wrapper {
  display: grid;
  grid-template-columns: 60% max-content;
  grid-column-gap: 1.25rem;
}

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