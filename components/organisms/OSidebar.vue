<template>
  <div :class="$style.wrapper">
    <!-- タイトル＆ログイン部分 -->
    <div :class="$style.topBlock">
      <div :class="$style.title">Spotify Timer</div>

      <a-button el="button" :class="$style.buttonComponent">
        Login
      </a-button>
    </div>

    <!-- タイマー部分 -->
    <div :class="$style.bottomBlock">
      <MTimer />
    </div>
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
.wrapper {
  background-color: $bg-secondary;
  text-align: center;
  display: grid;
  padding: 25px 15px 40px;
}

.title {
  text-align: left;
  color: $green;
  font-size: 1.75rem;
  font-weight: 700;
}

.buttonComponent {
  margin-top: 3.125rem;
  width: 75%;
}

.bottomBlock {
  margin: auto 0 0;
}
</style>