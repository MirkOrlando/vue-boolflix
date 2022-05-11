<template>
  <header>
    <div class="container">
      <nav>
        <div class="logo">
          <img src="@/assets/img/logo.png" alt="" />
        </div>
        <Searchbar />
      </nav>
    </div>
  </header>
</template>

<script>
import Searchbar from "@/components/SearchbarComponent.vue";

export default {
  name: "SiteHeaderComponent",
  components: {
    Searchbar,
  },
};
</script>

<style lang="scss" scoped>
header {
  text-align: center;
  padding: 1rem 0;
  background-color: $darkestColor;
  border-bottom: 10px solid $liteDarkColor;
}
</style>