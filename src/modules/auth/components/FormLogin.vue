<template lang="">
    <div>
        <v-form @submit.prevent="handleLogin" class="form-container">
            <v-container>
              <v-row>
                <v-col 
                  cols=12
                >
                  <h1>Iniciar Sesión</h1>
                  <p class="mb-8">¿Aun no tienes una cuenta? <router-link :to="{ name: 'register' }">Crear Cuenta</router-link></p>
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
                    variant="tonal"
                    color="primary"
                    type="submit"
                    block
                  >
                    INICIAR SESIÓN
                  </v-btn>
                  <p class="text-center mt-4">¿No recuerdas tu contraseña? <a>Recuperar Cuenta</a></p>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
    </div>
</template>
<script>
import {login} from "../AuthServices"
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
                value => (value || '').length <= 50 || '20 caracteres maximo.',
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
                    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%?])\S+$/
                    return pattern.test(value) || 'Contraseña invalida.'
                },
            ],
        }
    },
    methods: {
        async handleLogin() {
            try {
                this.loading = true
                const data = await login(this.email, this.password);
                localStorage.setItem('token', data.response.IdToken);
                this.$store.dispatch('login', data.response.IdToken);
                this.$router.push({ name: 'home' });
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false
            }
        }
    }
}
</script>