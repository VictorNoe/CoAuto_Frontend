<template lang="">
    <div>
      <v-form @submit.prevent="register" class="form-container">
        <h1>Crear Cuenta</h1>
        <p class="mb-8">¿Ya tienes una cuenta? <router-link :to="{ name: 'login' }">Iniciar Sesión</router-link></p>

        <div class="text-subtitle-1 text-medium-emphasis">Nombre(s)</div>
        <v-text-field
          v-model="user.name"
          :loading="loading"
          :disabled="loading"
          :rules="rulesName"
          type='text'
          placeholder="Ingresa tu(s) nombre(s)"
          outlined
          required
        ></v-text-field>
        
        <div class="text-subtitle-1 text-medium-emphasis">Apellido(s)</div>
        <v-text-field
          v-model="user.lastname"
          :loading="loading"
          :disabled="loading"
          :rules="rulesLastName"
          type='text'
          placeholder="Ingresa tu(s) apellido(s)"
          outlined
          required
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Correo electronico</div>
        <v-text-field
          v-model="user.email"
          :loading="loading"
          :disabled="loading"
          :rules="rulesEmail"
          type='email'
          placeholder="johndoe@gmail.com"
          outlined
          required
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Contraseña</div>
        <v-text-field
          v-model="user.password"
          :loading="loading"
          :disabled="loading"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          :rules="rulesPassword"
          placeholder="Ingresa una contraseñas"
          outlined
          required
          @click:append="show1 = !show1"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Confirmar contraseña</div>
        <v-text-field
          v-model="confirmPassword"
          :loading="loading"
          :disabled="loading"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          :rules="rulesConfirmPassword"
          placeholder="Confirma contraseña"
          outlined
          required
          @click:append="show2 = !show2"
        ></v-text-field>

        <v-btn
          :loading="loading"
          :disabled="!isPassword"
          class="mt-2"
          type="submit"
          variant="tonal"
          color="primary"
          block
        >
          Registrar
        </v-btn>  
        <ConfirmAccount
          :dialog.sync="dialog"
          @close-dialog="handleDialogClose"
          :email="user.email"
          :password="user.password"
        />
      </v-form>
    </div>
</template>
<script>
import ConfirmAccount from '../../../components/ConfirmAccount.vue'
import RegisterServices from '../RegisterServices';
import Alert from "../../../utils/Alert"
const { Register } = RegisterServices
export default {
  data() {
    return {
      show1: false,
      show2: false,
      loading: false,
      dialog: false,
      confirmPassword: '',
      user: {
        password: '',
        email: '',
        name: '',
        lastname: ''
      },
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
      rulesName: [
        value => !!value || 'Requiere llenar campo.',
        value => (value || '').length <= 30 || '30 caracteres maximo.',
        value => (value || '').length >= 3 || '3 caracteres minimo.',
        value => {
          const pattern = /^[a-zA-z ]+$/
          return pattern.test(value) || 'Nombre(s) invalido'
        },
      ],
      rulesLastName: [
        value => !!value || 'Requiere llenar campo.',
        value => (value || '').length <= 30 || '30 caracteres maximo.',
        value => (value || '').length >= 3 || '3 caracteres minimo.',
        value => {
          const pattern = /^[a-zA-z ]+$/
          return pattern.test(value) || 'Apellido(s) invalido'
        },
      ],
      rulesConfirmPassword: [
        value => !!value || 'Requiere llenar campo.',
        value => (value === this.user.password || 'Las contraseñas no coinciden.'),
      ],
    }
  },
  computed: {
    isPassword() {
      return (
        this.user.name &&
        this.user.lastname &&
        this.user.email &&
        this.user.password &&
        this.confirmPassword &&
        this.user.password === this.confirmPassword
      );
    }
  },
  components: {
    ConfirmAccount
  },
  methods: {
    async register() {
      try {
        this.loading = true;
        const result = await Register(this.user)
        console.log(result);
        if( result.statusCode === 200 ) {
          Alert.Toast('success', result.message)
          this.dialog = true
        } else if (result.response.data.statusCode === 409 ) {
          Alert.Toast('warning', 'No hemos podido registrar tu cuenta, intenta nuevamente')
        } else {
          const title = result.response.data.message;
          Alert.Toast('warning', title)
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false
      }
    },
    handleDialogClose(value) {
      this.dialog = value;
    }
  },
}
</script>