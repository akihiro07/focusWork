<template>
  <div :class="$style.wrapper">
    <OSidebar  />

    <div :class="$style.main">
      <OListBlock />
      <OSearchBlock />

      <button @click="test()">click</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { app } = useContext()

    const test = async () => {
      const recommendTraks = await app.$axios.$get('/api/reccomendList')
      console.log(recommendTraks)
    }

    return {
      test
    }
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
  margin: 3.125rem 2.8125rem 1.875rem;
  display: grid;
  grid-column-gap: 5.625rem;
  grid-template-columns: 1fr 1fr;
}
</style>
