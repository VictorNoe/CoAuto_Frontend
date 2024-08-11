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
                v-text="!state ? `${validateFirsName} ${validateLastName}` : 'Cargando...'"
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
              <v-text-field outlined required dense label="Nombre(s)" :rules="rulesName" :loading="state || loadingBtn" :disabled="state || stateRole || loadingBtn" v-model="firstName"></v-text-field>
            </v-col>
            <v-col cols="12" xl="5" lg="5" md="6" sm="6" xs="12">
              <v-text-field required outlined dense label="Apellido(s)" :rules="rulesLastName" :loading="state || loadingBtn" :disabled="state || stateRole || loadingBtn" v-model="lastName"></v-text-field>
            </v-col>
            <v-col cols="12" xl="2" lg="2" md="12" sm="12" xs="12" class="text-md-right text-center">
              <v-btn color="primary" @click="updateInfo" :disabled="state || !validateName" :loading="loadingBtn" block>Editar</v-btn>
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
import Alert from '@/utils/Alert';
const {getInfo, updateInfo} = ProfileServices;
export default {
  data() {
    return {
      id_user: 0,
      firstName: '',
      lastName: '',
      validateFirsName: '',
      validateLastName: '',
      stateRole: false,
      loadingBtn: false,
      email: 'example@gamil.com',
      password: '********',
      state: true,
      dialog: false,
      rulesName: [
        value => !!value || 'Requiere llenar campo.',
        value => (value || '').length <= 30 || '30 caracteres maximo.',
        value => (value || '').length >= 3 || '3 caracteres minimo.',
        value => !/\d/.test(value) || 'No se permiten números en el nombre.',
        value => {
          const pattern = /^[a-zA-z ]+$/
          return pattern.test(value) || 'Nombre(s) invalido'
        },
      ],
      rulesLastName: [
        value => !!value || 'Requiere llenar campo.',
        value => (value || '').length <= 30 || '30 caracteres maximo.',
        value => (value || '').length >= 3 || '3 caracteres minimo.',
        value => !/\d/.test(value) || 'No se permiten números en el nombre.',
        value => {
          const pattern = /^[a-zA-z ]+$/
          return pattern.test(value) || 'Apellido(s) invalido'
        },
      ],
    };
  },
  components: {
    ChangePassword
  },
  computed: {
    validateName() {
      return (
        (this.firstName !== this.validateFirsName || this.lastName !== this.validateLastName) &&
        this.rulesName.every(rule => typeof rule === 'function' ? rule(this.firstName) === true : rule) &&
        this.rulesLastName.every(rule => typeof rule === 'function' ? rule(this.lastName) === true : rule) 
      )
    },
  },
  created() {
    const isAuthenticated = store.getters.isAuthenticated;
    if (isAuthenticated) {
      this.getInfo()
      const role = store.getters.userRole;
      if (role == ['AdminUserGroup']) {
        this.stateRole = true;
      }
    }
  },
  methods: {
    async getInfo() {
      try {
        const data = await getInfo();
        this.id_user = data.id_user;
        this.firstName = data.nameUser;
        this.lastName = data.lastname;
        this.validateFirsName = data.nameUser;
        this.validateLastName = data.lastname;
        this.email = data.email;
      } catch (error) {
        console.error('Error agregando car', error);
      } finally {
        this.state = false;
      }
    },
    async updateInfo() {
      try {
        this.loadingBtn = true;
        const data = await updateInfo(this.id_user, this.firstName, this.lastName); 
        if (data.data.statusCode === 200) {
          Alert.Toast('success', 'Se actualizo el nombre')
          await this.getInfo();
        } else {
          Alert.Toast('error', 'No se actualuzo el nombre')
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.loadingBtn = false;
      }
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