<template>
  <v-container class="fill-height pa-12" align-center justify-center>
    <v-layout row align-center justify-center>
      <v-flex xs12 sm6 md4>
        <v-img src="../../assets/svg/undraw_towing_re_wesa.svg" class="mb-5" />
        <h1 class="display-1 font-weight-bold text-center mb-2">Página no encontrada</h1>
        <p class="text-center">Debes haber elegido un lugar equivocado porque no he podido encontrar la página que estás
          buscando.</p>
        <div class="text-center mt-5">
          <v-btn color="primary" @click="goHome" block>Ir al inicio</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>


export default {
  methods: {
    goHome() {
      const userRole = this.$store.getters.userRole;
      if (userRole == ['ClientUserGroup']) {
        window.location.href = "/home";
      } else if (userRole == ['AdminUserGroup']) {
        window.location.href = "/list_vehicles";
      } else {
        window.location.href = "/";
      }
    }
  }
}
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>