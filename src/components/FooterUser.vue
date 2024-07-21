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
        class="py-2 d-flex flex-column justify-space-between align-center"
        cols="12"
      >
        <v-img
            class="bg-white"
            src="../assets/svg/coauto-logo.svg"
            max-height="58.6"
            max-width="135.64"
        ></v-img>
      </v-col>
      <v-col
        class="py-2 d-flex flex-column justify-space-between align-center"
        cols="12"
      >
        <div class="grey--text justify-center text-h5 font-weight-bold py-2">Redes sociales</div>
      </v-col>
      <v-col
        class="lighten-2 text-center white--text"
        cols="12"
      >
        <a
              v-for="icon in icons"
              :key="icon"
              icon
              href="https://www.instagram.com/p/C8xExjJsOV5/"
              aria-label="Social media"
            >
              <v-icon size="40px" class="pl-2 pr-2 align-center" color="#2570EB">
                {{ icon }}
              </v-icon>
          </a>
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