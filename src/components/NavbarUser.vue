<template lang="">
  <div v-if="showNav">
      <v-app-bar app
        color="white"
      >
        <v-toolbar-title>
          <v-img
            class="bg-white"
            src="../assets/svg/coauto-logo.svg"
            max-height="43.6"
            max-width="80"
          ></v-img>
        </v-toolbar-title>
        <router-link class="ml-7" :to="{ name: this.tabLinkName1 }">
          <div
            style="cursor:pointer;"
            class="text-button font-weight-bold text-decoration-none text-decoration-underline"
            v-text="tab1()"
            @click="scrollToTop"
          ></div>
        </router-link>
        <router-link class="ml-7" :to="{ name: this.tabLinkName2 }">
          <div
            style="cursor:pointer;"
            class="text-button font-weight-bold text-decoration-none text-decoration-underline"
            v-text="tab2()"
            @click="scrollToTop"
          ></div>
        </router-link>
        <v-spacer></v-spacer>
        <v-avatar color="#2570EB">
          <img v-if="user?.image !== null && user?.image !== ''"
            :src="user?.image"
            :alt="user?.name"
          >
          <v-icon dark v-if="user?.image === null || user?.image === ''">
            mdi-account-circle
          </v-icon>
        </v-avatar>
        <v-menu 
          offset-y
          min-width="200px"
          :close-on-click="false"
        >
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
            id="profile"
            title="Title"
            icon
            @click="show = !show"
            :disabled="loading"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>{{show ? 'mdi-chevron-down' : 'mdi-chevron-up'}}</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                color="#2570EB"
              >
                <img v-if="user?.image !== null"
                  :src="user?.image"
                  :alt="user?.name"
                >
                <v-icon dark v-if="user?.image === null">
                  mdi-account-circle
                </v-icon>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                :to="{ name: 'profile' }"
              >
                Perfil
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                @click="logout"
              >
                Cerrar Sesión
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
      </v-app-bar>
  </div>
</template>
<script>
import store from '../utils/store';
import apiGateway from '../utils/Http.gateway'
export default {
  data() {
    return {
      showNav: false,
      show: true,
      loading: true,
      tabLinkName1: null,
      tabLinkName2: null,
      user: {
        fullName: '',
        email: '',
        image: '',
      },
    }
  },
  created() {
    const isAuthenticated = store.getters.isAuthenticated;
    if (isAuthenticated) {
      const data = this.info()
      this.showNav = data
    }
  },
  methods: {
    async info() {
      try {
        const response = await apiGateway.doPost('https://ovxtk6zcwf.execute-api.us-east-1.amazonaws.com/Prod/get_user');
        const data = response.data.userInfo;  
        this.user.fullName = data.nameUser;
        this.user.email = data.email;
        this.user.image = data.profile_image;
        return true;                          
      } catch (error) {
          console.error('Error agregando car', error);
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({name: 'login'})
    },
    tab1() {
      const role = this.$store.getters.userRole;
      if (role == ['AdminUserGroup']) {
        this.tabLinkName1 = 'vehicles';
        return "Vehiculos";
      }
      if (role == ['ClientUserGroup']) {
        this.tabLinkName1 = 'home';
        return "Inicio";
      }
    },
    tab2() {
      const role = this.$store.getters.userRole;
      if (role == ['AdminUserGroup']) {
        this.tabLinkName2 = 'users';
        return "Usuarios";
      }
      if (role == ['ClientUserGroup']) {
        this.tabLinkName2 = 'vehicles_search';
        return "Explorar";
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  },
}
</script>
<style scoped>
color-link {
  color: #828282;
  text-decoration: none;
}
</style>        