<template>
  <div :class="$style.layout">
    <Nuxt />
  </div>
</template>

<style lang="scss" module>
.layout {
  min-height: 100vh;
  background-color: $bg-primary;
}
</style>
