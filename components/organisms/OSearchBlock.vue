<template>
  <div style="background-color: blue;">
    <ATitle :class="$style.titleComponent">Search</ATitle>

    <div>hoge</div>


    <div>block</div>
  </div>
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
.titleComponent {
  text-align: center;
}
</style>
