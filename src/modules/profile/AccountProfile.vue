<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-6">
          <v-row align="center" class="py-4">
            <v-col cols="12" md="3" sm="12" lg="3" class="text-md-center text-center">
              <v-avatar size="100" color="primary">
                <v-icon dark size="60">
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </v-col>
            <v-col cols="12" md="8" class="text-start">
              <div
                class="text-h4 mb--1 font-weight-bold"
                v-text="!state ? `${firstName} ${lastName}` : 'Cargando...'"
              ></div>
              <div
                class="text-h6 mb--1 text--secondary"
                v-text="'Hola, bienvenid@ a tu perfil'"
              ></div>
            </v-col>
          </v-row>

          <v-divider class="mb-5 mt-5" color="#828282"></v-divider>

          <v-row>
            <v-col cols="12">
              <div
                class="text-h6 font-weight-bold"
                v-text="'Nombre completo'"
              ></div>
              <div
                class="text-subtitle-1 text--secondary"
                v-text="'Por favor de llenar el nombre y el apellido'"
              ></div>
            </v-col>
            <v-col cols="12" xl="5" lg="5" md="6" sm="6" xs="12">
              <v-text-field outlined required dense label="Nombre(s)" :loading="state" :disabled="state" v-model="firstName"></v-text-field>
            </v-col>
            <v-col cols="12" xl="5" lg="5" md="6" sm="6" xs="12">
              <v-text-field required outlined dense label="Apellido(s)" :loading="state" :disabled="state" v-model="lastName"></v-text-field>
            </v-col>
            <v-col cols="12" xl="2" lg="2" md="12" sm="12" xs="12" class="text-md-right text-center">
              <v-btn color="primary" @click="saveName" :disabled="state" block>Editar</v-btn>
            </v-col>
          </v-row>

          <v-divider class="mb-5 mt-5" color="#828282"></v-divider>

          <v-row>
            <v-col cols="12">
              <div
                class="text-h6 font-weight-bold"
                v-text="'Correo electronico'"
              ></div>
              <div
                class="text-subtitle-1 text--secondary"
                v-text="'Este es tu correo electronico y contraseña que registraste, si deseas cambiar la contraseña da click en editar'"
              ></div>
            </v-col>
            <v-col cols="12" xl="5" lg="5" md="6" sm="6" xs="12">
              <v-text-field label="Correo electronico" v-model="email" readonly outlined  dense  disabled :loading="state" required></v-text-field>
            </v-col>
            <v-col cols="12" xl="5" lg="5" md="6" sm="6" xs="12">
              <v-text-field label="Contraseña" v-model="password" type="password" readonly dense outlined disabled :loading="state"
                required></v-text-field>
            </v-col>
            <v-col cols="12">
              <div
                style="cursor:pointer;"
                class="text-subtitle-1 font-weight-bold text-decoration-none text-decoration-underline"
                v-text="'Editar'"
                @click="openChangePassword"
              ></div>
            </v-col>
          </v-row>
        </v-card>
        <ChangePassword
          :dialog.sync="dialog"
          @close-dialog="closeChangePassword"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProfileServices from './ProfileServices';
import store from '@/utils/store';
import ChangePassword from './components/ChangePassword.vue';
const {getInfo} = ProfileServices;
export default {
  data() {
    return {
      id_user: 0,
      firstName: '',
      lastName: '',
      email: 'example@gamil.com',
      password: '********',
      state: true,
      dialog: false,
    };
  },
  components: {
    ChangePassword
  },
  created() {
    const isAuthenticated = store.getters.isAuthenticated;
    if (isAuthenticated) {
      this.getInfo()
    }
  },
  methods: {
    async getInfo() {
      try {
        const data = await getInfo();
        this.firstName = data.nameUser;
        this.lastName = data.lastname;
        this.email = data.email;
      } catch (error) {
        console.error('Error agregando car', error);
      } finally {
        this.state = false;
      }
    },
    updatePhoto() {

    },
    saveName() {

    },
    openChangePassword() {
      this.dialog = true;
    },
    closeChangePassword(value) {
      this.dialog = value;
    },
  }
};
</script>

<style scoped>
.text-center {
  text-align: center;
}

.text-md-left {
  text-align: left;
}

.text-md-right {
  text-align: right;
}

.pa-6 {
  padding: 24px;
}

.mt-4 {
  margin-top: 16px;
}

.my-4 {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>