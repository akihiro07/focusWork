<template>
  <button v-if="el === 'button'" :class="[$style.button, $style[size]]" @click="click()">
    <slot />
  </button>

  <nuxt-link v-else-if="el === 'link'" :class="[$style.button, $style[size]]" to="/">
    <slot />
  </nuxt-link>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    el: {
      type: String,
      default: 'button'
    },

    size: {
      type: String,
      default: 'medium'
    },

    click: {
      type: Function,
      default: () => {}
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
  font-weight: 700;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
  }

  &.small {
    padding: 0.3125rem 0.9375rem;
    font-size: 1.3125rem;
  }

  &.medium {
    padding: 0.5rem 0.9375rem;
    font-size: 1.5rem;
  }
}
</style>