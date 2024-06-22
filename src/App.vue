<template>
  <v-app>
    <v-main>
      <AuthUser/>
    </v-main>
  </v-app>
</template>

<script>
import AuthUser from './modules/auth/AuthUser'

export default {
  name: 'App',

  components: {
    AuthUser,
  },

  data: () => ({
    //
  }),
};
</script>
