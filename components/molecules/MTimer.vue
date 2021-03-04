<template>
  <div>
    <div :class="$style.title">timer</div>

    <div :class="$style.timerBlock">
      <div :class="$style.count">25:00</div>

      <div :class="$style.operation">
        <div class="iconTimerReload" :class="$style.icon" />
        <div class="iconTimerStart" :class="$style.icon" />
      </div>
    </div>

    <div :class="$style.buttonsBlock">
      <AButton el="button" :class="$style.button">Work</AButton>
      <AButton el="button" :class="$style.button">Short Break</AButton>
      <AButton el="button" :class="$style.button">Long Break</AButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    return {}
  }
})
</script>

<style lang="scss" module>
.title,
.timerBlock,
.buttonsBlock {
  font-weight: 700;
}

.title {
  text-align: left;
  color: #797979;
  font-size: 1.75rem;
}

// timerBlock
.timerBlock {
  margin-top: 15px;
}

.count {
  font-size: 2.625rem;
}

.operation {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}

.icon {
  font-size: 2.5rem;

  &:not(:first-child) {
    margin-left: 30px;
  }
}

// buttonsBlock
.buttonsBlock {
  margin-top: 30px;
  display: grid;
  place-items: center;
  grid-row-gap: 20px;
}

.button {
  width: 75%;
}
</style>
