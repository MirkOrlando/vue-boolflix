<template>
  <div class="loading-view">
    <p>Loading...</p>
    <div class="circle_bg">
      <div class="circle_sm"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingComponent",
};
</script>

<style lang="scss" scoped>
/* loading */
.loading-view {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;

  [class^="circle"] {
    border-radius: 50%;
    aspect-ratio: 1/1;
  }

  .circle_bg {
    margin: 1rem;
    background-color: #3a4242;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: getBigger 2s linear infinite;

    .circle_sm {
      background-color: #212121;
      width: 40px;
      animation: getSmaller 2s linear infinite;
    }
  }
}

/* animation */
@keyframes getSmaller {
  50% {
    transform: scale(0.4);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes getBigger {
  50% {
    transform: scale(1.3);
  }

  100% {
    transform: scale(1);
  }
}
</style>