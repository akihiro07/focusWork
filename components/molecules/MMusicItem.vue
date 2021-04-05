<template>
  <div
    :class="$style.wrapper"
    @mouseenter="changeHoverFlag(true)"
    @mouseleave="changeHoverFlag(false)"
  >
  <picture>
    <img :src="image" alt="" :class="$style.img" />
  </picture>

    <div :class="$style.detail">
      <div :class="$style.title">{{ name }}</div>
      <div :class="$style.artist">{{ artist }}</div>
      <div :class="$style.time">{{ timemmss }}</div>
    </div>

    <div :class="$style.iconBox">
      <div class="iconTimerStart" :class="$style.startIcon" @click="playbackFunc" />
    </div>

    <!-- hover時表示 -->
    <div v-if="isPlaylist && isHover" :class="$style.remove">×</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    artist: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    time: {
      type: Number,
      required: true
    },
    isPlaylist: {
      type: Boolean,
      default: false
    },
    playbackFunc: {
      type: Function,
      default: () => {}
    }
  },

  setup(prop) {
    const timemmss = dayjs(prop.time).format('mm:ss')

    const isHover = ref(false)
    const changeHoverFlag = (flag: boolean) => {
      isHover.value = flag
    }

    return {
      timemmss,
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

  &:hover {
    cursor: pointer;
  }
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