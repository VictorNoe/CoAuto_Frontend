<template>
    <v-container padding="8" class="fill-height d-flex align-center justify-center">
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
          <v-form @submit.prevent="submit" class="form-container">
            <v-container>
              <v-row>
                <v-col 
                  cols=12
                >
                  <h1>Iniciar Sesión</h1>
                  <p class="mb-8">¿Aun no tienes una cuenta? <a>Crear Cuenta</a></p>
                  <div class="text-subtitle-1 text-medium-emphasis">Correo electronico</div>
                  <v-text-field
                    v-model="email"
                    :loading="loading"
                    :disabled="loading"
                    :rules="rulesEmail"
                    placeholder="johndoe@gmail.com"
                    outlined
                    required
                  ></v-text-field>

                  <div class="text-subtitle-1 text-medium-emphasis">Contraseña</div>
                  <v-text-field
                    v-model="password"
                    :loading="loading"
                    :disabled="loading"
                    :rules="rulesPassword"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    placeholder="Ingresa almenos 8 caracteres o más"
                    outlined
                    required
                    @click:append="show1 = !show1"
                  ></v-text-field>

                  <v-checkbox
                    :disabled="loading"
                    v-model="checkbox"
                    label="Recordar cuenta"
                    required
                  ></v-checkbox>
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
                  <p class="text-center mt-4">¿No recuerdas tu contraseña? <a>Recuperar Cuenta</a></p>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script>
  export default {
    data() {
      return {
        show1: false,
        loading: false,
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
        rulesPassword: [
        value => !!value || 'Requiere llenar campo.',
        value => (value || '').length <= 20 || '20 caracteres maximo.',
          value => (value || '').length >= 8 || '8 caracteres minimo.',
          value => {
            const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?])\S+$/
            return pattern.test(value) || 'Contraseña invalida.'
          },
        ],
      }
    },
    methods: {
      load () {
        this.loading = true
        setTimeout(() => (this.loading = false), 3000)
      },
    }
  }
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
