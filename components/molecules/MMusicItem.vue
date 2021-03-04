<template>
  <div :class="$style.wrapper">
  <picture>
    <img src="@/assets/images/sample.jpg" alt="" :class="$style.img" />
  </picture>

    <div :class="$style.detail">
      <div :class="$style.title">サヨナラのゆくえ</div>
      <div :class="$style.artist">azure</div>
      <div :class="$style.time">時間：4:32</div>
    </div>

    <div class="iconTimerStart" :class="$style.startIcon" />

    <!-- hover時表示 -->
    <!-- <div>×</div> -->
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style lang="scss" module>
.wrapper {
  display: grid;
  grid-template-columns: 4.1rem 68% auto;
  grid-column-gap: 1rem;
}

.img {
  width: 4.1rem;
}

.detail {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;
}

.title,
.artist {
  font-size: 1rem;
}

.time {
  font-size: 0.75rem;
}

.startIcon {
  font-size: 1.625rem;
  display: grid;
  place-items: center;
}
</style>