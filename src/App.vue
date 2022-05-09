<template>
  <div id="app">
    <SiteHeader />
    <SiteMain />
    <footer>Site Footer Here</footer>
  </div>
</template>

<script>
import SiteHeader from "@/components/SiteHeaderComponent.vue";
import SiteMain from "@/components/SiteMainComponent.vue";

export default {
  name: "App",
  components: {
    SiteHeader,
    SiteMain,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
/* #region main */
main {
  min-height: 100vh;
  padding: 1rem 0;
  background-color: $darkestColor;
  border-bottom: 10px solid $liteDarkColor;
  color: $lightestColor;
}
/* #endregion main */
/* #region footer */
footer {
  text-align: center;
  padding: 1rem 0;
  background-color: $darkestColor;
  color: $lightestColor;
}
/* #endregion footer */
</style>
