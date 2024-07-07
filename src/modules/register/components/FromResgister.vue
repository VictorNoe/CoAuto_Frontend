<template lang="">
    <div>
        <h1>Crear Cuenta</h1>
        <p class="mb-8">¿Ya tienes una cuenta? <router-link :to="{ name: 'login' }">Iniciar Sesión</router-link></p>

        <div class="text-subtitle-1 text-medium-emphasis">Nombre(s)</div>
        <v-text-field
          :loading="loading"
          :disabled="loading"
          placeholder="example"
          outlined
          required
        ></v-text-field>
        
        <div class="text-subtitle-1 text-medium-emphasis">Apellido(s)</div>
        <v-text-field
          :loading="loading"
          :disabled="loading"
          placeholder="example"
          outlined
          required
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Correo electronico</div>
        <v-text-field
          :loading="loading"
          :disabled="loading"
          placeholder="example"
          outlined
          required
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Contraseña</div>
        <v-text-field
          :loading="loading"
          :disabled="loading"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          placeholder="Ingresa almenos 8 caracteres o más"
          outlined
          required
          @click:append="show1 = !show1"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Confirmar contraseña</div>
        <v-text-field
          :loading="loading"
          :disabled="loading"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          placeholder="Ingresa almenos 8 caracteres o más"
          outlined
          required
          @click:append="show2 = !show2"
        ></v-text-field>

        <v-btn
          :loading="loading"
          class="mt-2"
          type="submit"
          variant="tonal"
          color="primary"
          @click="load"
          block
        >
          INICIAR SESIÓN
        </v-btn>  
        <ConfirmAccount
          :dialog.sync="dialog"
          @close-dialog="handleDialogClose"
        />
    </div>
</template>
<script>

import ConfirmAccount from '../../../components/ConfirmAccount.vue'
export default {
  data() {
    return {
      show1: false,
      show2: false,
      loading: false,
      dialog: false,
      email: '',
      password: '',
      checkbox: false,
      rulesEmail: [
        value => !!value || 'Requiere llenar campo.',
        value => (value || '').length <= 20 || '20 caracteres maximo.',
        value => (value || '').length >= 8 || '8 caracteres minimo.',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Correo invalido.'
        },
      ],
    }
  },
  components: {
    ConfirmAccount
  },
  methods: {
    load() {
      this.loading = true
      setTimeout(() => {
        this.dialog = true
        this.loading = false
      }, 1000)
    },
    handleDialogClose(value) {
      this.dialog = value;
    }
  },
}
</script>