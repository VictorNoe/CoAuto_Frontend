<template>
    <v-container class="fill-height d-flex align-center justify-center">
      <v-row>
        <v-col cols="12" md="6" class="d-flex justify-center d-sm-none">
          <v-img
            class="bg-white"
            src="../../assets/svg/coauto-logo.svg"
            max-height="58.6"
            max-width="135.64"
          ></v-img>
        </v-col>
        <v-col cols="12" md="6" class="align-self-center d-none d-md-block">
          <v-img
            class="bg-white"
            src="../../assets/svg/undraw_order_ride_re_372k.svg"
          ></v-img>
        </v-col>
        <v-col cols="12" md="6" class="align-self-center">
          <FormLogin/>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script>
import FormLogin from './components/FormLogin.vue';
  export default {
    components: {
      FormLogin
    }
  }
</script>

<style scoped>
.fill-height {
  height: 90vh;
}
</style>
