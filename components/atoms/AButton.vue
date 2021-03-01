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
  color: $white;
  background-color: $green;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 7px 20px;
  border-radius: 25px;

  &:hover {
    cursor: pointer;
  }
}
</style>