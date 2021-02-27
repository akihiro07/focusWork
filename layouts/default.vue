<template>
  <div class="min-h-screen" :class="$style.background">
    <Nuxt />
  </div>
</template>

<style lang="scss" module>
.background {
  background-color: $bg-primary;
}
</style>
