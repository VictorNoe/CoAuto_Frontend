<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="pa-6">
            <v-row  align="center">
              <v-col cols="12" md="3" sm="12" lg="3" class="text-md-center text-center">
                <v-avatar size="100">
                  <img src="https://lh3.googleusercontent.com/a-/ALV-UjUFbcq8oIR6RnhsEeDLwTL99ExZ_IxYL9aclEkr-LQ8c2sTru15=s32-c" alt="Profile Picture">
                </v-avatar>
                <v-btn text small @click="updatePhoto">Actualizar foto</v-btn>
              </v-col>
              <v-col cols="12" md="8" class="text-start">
                <h3>Karel Salgado</h3>
                <p>Hola, bienvenid@ a tu perfil</p>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row class="mt-4">
              <v-col cols="12">
                <h4>Nombre completo</h4>
                <p>Por favor de llenar el nombre y el apellido</p>
              </v-col>
              <v-col cols="12" md="5">
                <v-text-field
                outlined
                required
                  label="Nombre(s)"
                  v-model="firstName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="5">
                <v-text-field
                required
                outlined
                  label="Apellido(s)"
                  v-model="lastName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2" class="text-md-right text-center">
                <v-btn color="primary" @click="saveName">Editar</v-btn>
              </v-col>
            </v-row>
            <v-divider class="my-4"></v-divider>
            <v-row>
                <h4>Correo electronico</h4>
                <p>Este es tu correo electronico y contraseña que registraste, si deseas cambiar la contraseña da click "editar"</p>
                <v-col cols="12" md="5">
                  <v-text-field
                  label="Correo electronico"
                  v-model="email"
                  readonly
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="5">
                
                <v-text-field
                  label="Contraseña"
                  v-model="password"
                  type="password"
                  readonly
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn text small @click="editEmail">Editar</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        email: 'karel@gmail.com',
        password: '********',
      };
    },
    methods: {
      updatePhoto() {

      },
      saveName() {

      },
      editEmail() {

      }
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
  