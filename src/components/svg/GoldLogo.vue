<script setup lang="ts">
const props = defineProps<{
  light?: boolean
}>()

const router = useRouter()
const isLoading = ref(false)

router.beforeEach(() => {
  isLoading.value = true
})
router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 200)
})
</script>

<template>
  <svg
    id="OBJECTS"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 128 128"
    style="enable-background: new 0 0 128 128"
    xml:space="preserve"
    :class="[props.light && 'is-light']"
  >
    <g :class="[isLoading && 'is-roll']">
      <rect
        x="57.33"
        y="31.28"
        transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 153.7618 63.725)"
        class="top-r"
        width="12.71"
        height="64.85"
      />
      <rect
        x="57.33"
        y="31.28"
        transform="matrix(0.7071 0.7071 -0.7071 0.7071 63.7004 -26.3712)"
        class="bot-r"
        width="12.71"
        height="64.85"
      />
      <path
        class="bot-r"
        d="M99.42,126.09c-14.68,0-26.61-11.94-26.61-26.61s11.94-26.61,26.61-26.61c14.67,0,26.61,11.94,26.61,26.61 S114.09,126.09,99.42,126.09z M99.42,85.59c-7.65,0-13.88,6.23-13.88,13.88s6.23,13.88,13.88,13.88c7.65,0,13.88-6.23,13.88-13.88 S107.07,85.59,99.42,85.59z"
      />
      <path
        class="top-r"
        d="M99.44,55.14c-14.67,0-26.61-11.94-26.61-26.61c0-14.67,11.94-26.61,26.61-26.61s26.61,11.94,26.61,26.61 C126.06,43.2,114.12,55.14,99.44,55.14z M99.44,14.65c-7.65,0-13.88,6.23-13.88,13.88c0,7.65,6.23,13.88,13.88,13.88 s13.88-6.23,13.88-13.88C113.32,20.87,107.09,14.65,99.44,14.65z"
      />
      <path
        class="top-r"
        d="M28.56,126.09c-14.68,0-26.61-11.94-26.61-26.61s11.94-26.61,26.61-26.61c14.67,0,26.61,11.94,26.61,26.61 S43.23,126.09,28.56,126.09z M28.56,85.59c-7.65,0-13.88,6.23-13.88,13.88s6.23,13.88,13.88,13.88c7.65,0,13.88-6.23,13.88-13.88 S36.21,85.59,28.56,85.59z"
      />
      <path
        class="bot-r"
        d="M28.58,55.14c-14.67,0-26.61-11.94-26.61-26.61c0-14.67,11.94-26.61,26.61-26.61S55.2,13.85,55.2,28.53 C55.2,43.2,43.26,55.14,28.58,55.14z M28.58,14.65c-7.65,0-13.88,6.23-13.88,13.88c0,7.65,6.23,13.88,13.88,13.88 s13.88-6.23,13.88-13.88C42.46,20.87,36.23,14.65,28.58,14.65z"
      />
    </g>
  </svg>
</template>

<style lang="scss" scoped>
.top-r {
  fill: var(--warning);
}

.bot-r {
  fill: var(--warning-light-20);
}

.is-roll,
svg:hover {
  .right {
    animation: is-roll-right 8s ease infinite;
    animation-fill-mode: forwards;
    animation-delay: 0s;
  }

  .left {
    animation: is-roll-left 8s ease infinite;
    animation-fill-mode: forwards;
    animation-delay: 0s;
  }

  .bottom {
    animation: is-roll-bottom 8s ease infinite;
    animation-fill-mode: forwards;
    animation-delay: 0s;
  }
}

.is-light {
  .top-r {
    fill: #fffc;
    animation: none;
  }

  .bot-r {
    fill: #fffa;
    animation: none;
  }
}

@keyframes is-roll-right {
  0% {
    fill: var(--warning-dark-7);
  }

  33% {
    fill: var(--warning-light-8);
  }

  66% {
    fill: var(--warning-light-40);
  }

  100% {
    fill: var(--warning-dark-7);
  }
}

@keyframes is-roll-bottom {
  0% {
    fill: var(--warning);
  }

  33% {
    fill: var(--warning-light-24); // darken(#1ee8c0, 7%);
  }

  66% {
    fill: var(--warning-light-20);
  }

  100% {
    fill: var(--warning);
  }
}

@keyframes is-roll-left {
  0% {
    fill: var(--warning-light-15);
  }

  33% {
    fill: var(--warning-light-12); // lighten(#1ee8c0, 15%);
  }

  66% {
    fill: var(--warning-light-15);
  }

  100% {
    fill: var(--warning-light-15);
  }
}
</style>
