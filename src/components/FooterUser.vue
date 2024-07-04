<template>
  <v-footer
    color="white"
    padless
  >
    <v-divider></v-divider>
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        class="lighten-2 py-4 text-center white--text"
        cols="12"
      >
        <v-btn
          v-for="link in links"
          :key="link"
          color="#828282"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
      </v-col>
      <v-col
        class="py-4 d-flex flex-column justify-space-between align-center"
        cols="12"
      >
        <v-img
            class="bg-white"
            src="../assets/svg/coauto-logo.svg"
            max-height="58.6"
            max-width="135.64"
        ></v-img>
      </v-col>
      <h2 class="grey--text py-4">Redes sociales</h2>
      <v-col
        class="lighten-2 py-4 text-center white--text"
        cols="12"
      >
        <v-btn
              v-for="icon in icons"
              :key="icon"
              color="#828282"
              icon
            >
              <v-icon size="30px">
                {{ icon }}
              </v-icon>
          </v-btn>
      </v-col>
      <v-col
        class="py-4 text-center grey--text"
        cols="12"
      >
        <strong>Copyright © {{ new Date().getFullYear() }} | CoAuto. Reservados todos los derechos.</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      links: [
        'Características',
        'Contactos',
        'Comentarios'
      ],
      icons: [
        'mdi-facebook',
        'mdi-youtube',
        'mdi-twitter',
        'mdi-instagram',
      ],
    }),
  }
</script>