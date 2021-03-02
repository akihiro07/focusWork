<template>
  <button v-if="el === 'button'" :class="$style.button">
    <slot />
  </button>

  <nuxt-link v-else-if="el === 'link'" :class="$style.button" to="/">
    <slot />
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    el: {
      type: String,
      default: 'button'
    }
  },

  setup () {
    return {}
  }
})
</script>

<style lang="scss" module>
.button {
  background-color: $green;
  border-radius: 25px;
  color: $white;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 8px 15px;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
  }
}
</style>