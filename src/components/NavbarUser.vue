<template lang="">
  <div>
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
        <router-link class="color-link ml-14" :to="{ name: 'home' }">Inicio</router-link>
        <router-link class="color-link ml-7" :to="{ name: 'vehicles_search' }">Explorar</router-link>
        <v-spacer></v-spacer>
        <v-avatar>
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          >
        </v-avatar>
        <v-menu 
          offset-y
          min-width="200px"
          :close-on-click="false"
        >
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
            icon
            @click="show = !show"
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
                color="brown"
              >
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                >
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
export default {
  data() {
    return {
      show: true,
      user: {
        initials: 'JD',
        fullName: 'John Doe',
        email: 'john.doe@doe.com',
        image: 'https://cdn.vuetifyjs.com/images/john.jpg',
      },
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({name: 'login'})
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