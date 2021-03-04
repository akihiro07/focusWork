<template>
  <div
    :class="$style.wrapper"
    @mouseenter="changeHoverFlag(true)"
    @mouseleave="changeHoverFlag(false)"
  >
  <picture>
    <img src="@/assets/images/sample.jpg" alt="" :class="$style.img" />
  </picture>

    <div :class="$style.detail">
      <div :class="$style.title">サヨナラのゆくえ</div>
      <div :class="$style.artist">azure</div>
      <div :class="$style.time">時間：4:32</div>
    </div>

    <div :class="$style.iconBox">
      <div class="iconTimerStart" :class="$style.startIcon" />
    </div>

    <!-- hover時表示 -->
    <div v-if="isHover" :class="$style.remove">×</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const isHover = ref(true)

    const changeHoverFlag = (flag: boolean) => {
      isHover.value = flag
    }

    return {
      isHover,
      changeHoverFlag
    }
  },
})
</script>

<style lang="scss" module>
.wrapper {
  position: relative;
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

.iconBox {
  display: grid;
  place-items: center;
}

.startIcon {
  font-size: 1.625rem;
}

.remove {
  position: absolute;
  top: 0;
  right: 0.25rem;

  &:hover {
    cursor: pointer;
  }
}
</style>