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
        <v-btn text color="white" :to="{ name: 'login' }">Inicio</v-btn>
        <v-spacer></v-spacer>
        <v-avatar>
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          >
        </v-avatar>
        <v-btn 
          icon
          @click="show = !show"
        >
          <v-icon>{{show ? 'mdi-chevron-down' : 'mdi-chevron-up'}}</v-icon>
        </v-btn>
      </v-app-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true
    }
  },
}
</script>
<style lang="">

</style>