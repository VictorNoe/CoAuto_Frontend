<template>
    <v-container>
      <v-row>
        <v-col>
          <NavbarUser v-if="showNavbar"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <router-view/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <FooterUser v-if="showFooter"/>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import FooterUser from '../components/FooterUser.vue';
  import NavbarUser from '../components/NavbarUser.vue';
  
  export default {
    components: {
      FooterUser,
      NavbarUser
    },
    data() {
    return {
      showNavbar: false,
      showFooter: false
    };
  },
    computed: {
      ...mapGetters(['isAuthenticated']),
    },
    watch: {
      '$route'(to) {
        this.updateNavbarFooterVisibility(to);
      }
    },
    created() {
      this.updateNavbarFooterVisibility(this.$route);
    },
    methods: {
      updateNavbarFooterVisibility(route) {
        this.showNavbar = this.isAuthenticated && !route.meta.hideNavbarFooter;
        this.showFooter = this.isAuthenticated && !route.meta.hideNavbarFooter && this.$store.getters.userRole == "ClientUserGroup";
      }
    }
  }
  </script>
  