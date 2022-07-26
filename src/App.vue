<template>
  <div id="app">
    <SiteHeader />
    <SiteMain />
    <footer>
      <div class="container_sm">
        <div class="social-links">
          <div class="link">
            <font-awesome-icon icon="fa-brands fa-facebook-f" />
          </div>
          <div class="link">
            <font-awesome-icon icon="fa-brands fa-instagram" />
          </div>
          <div class="link">
            <font-awesome-icon icon="fa-brands fa-twitter" />
          </div>
          <div class="link">
            <font-awesome-icon icon="fa-brands fa-youtube" />
          </div>
        </div>
        <nav class="footer-items">
          <div class="row">
            <div class="col-4" v-for="(item, index) in footerItems" :key="index">
              <a href="#">{{ item }}</a>
            </div>
          </div>
        </nav>
        <div class="action">
          <a href="#" class="btn btn-secondary-outline">Codice di servizio</a>
        </div>
        <div class="copyright">&copy; 1997-2022 Boolflix, inc.</div>
      </div>
    </footer>
  </div>
</template>

<script>
import SiteHeader from "@/components/SiteHeaderComponent.vue";
import SiteMain from "@/components/SiteMainComponent.vue";

export default {
  name: "App",
  data() {
    return {
      footerItems: [
        'Audio e sottotitoli',
        'Audiodescrizione',
        'Centro assistenza',
        'Carte regolo',
        'Media Center',
        'Rapporti con gli investitori',
        'Opportunità di lavoro',
        'Condizioni di utilizzo',
        'Privacy',
        'Note legali',
        'Preferenze per i cookie',
        'Informazioni sull\'azienda',
        'Contattaci'
      ]
    }
  },
  components: {
    SiteHeader,
    SiteMain,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";

footer {
  font-size: 0.75rem;
  background-color: $darkestColor;
  color: grey;
  padding-top: 5rem;
  position: relative;

  .social-links {
    display: flex;
    margin-bottom: 0.75rem;
    color: white;
    font-size: 1.25rem;

    .link {
      margin: 0 1rem;

      &:first-child {
        margin-left: 0.75;
      }
    }
  }

  .footer-items {
    margin-bottom: 1.5rem;

    .col-4 {
      margin-bottom: 1rem;

      a:hover {
        text-decoration: underline;
      }
    }
  }

  .copyright {
    padding: 1.5rem 0 1rem;
  }
}
</style>
