<template>
    <v-dialog v-model="localDialog" max-width="600" @click:outside="close">
        <v-card>
            <v-card-title>
                <span class="headline">Editar Usuario</span>
            </v-card-title>
            <v-card-text>

                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="user.name" label="Nombre" required :rules="nameRules"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>

            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="save" :disabled="!validForm">Guardar</v-btn>
                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import Alerts from '../../../utils/Alert';
import UserServices from '../UserServices'; // Servicio para manejar usuarios

export default {
    props: {
        dialog: {
            type: Boolean,
            required: true
        },
        userData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            localDialog: this.dialog,
            user: { ...this.userData }, // Datos del usuario a editar
        };
    },
    computed: {
        validForm() {
                // Validación del formulario: nombre, correo y vista previa de imagen deben estar presentes y no debe haber error de tamaño
                return ( this.user.name && this.user.email  );
            },
        nameRules() {
            // Reglas de validación para el nombre
            return [
                value => !!value || 'El nombre es requerido',
                value => /^[a-zA-Z\s]+$/.test(value) || 'El nombre no debe contener caracteres especiales'
            ];
        },
    },
    watch: {
        dialog(val) {
            this.localDialog = val;
            if (val) {
                this.user = { ...this.userData };
            } else {
                this.resetForm();
            }
        }
    },
    methods: {
        close() {
            // Cierra el diálogo y resetea el formulario
            this.resetForm();
            this.localDialog = false;
            if (!this.localDialog) {
                this.step = 1;
                this.$emit('close-dialog-edit',false)

            }
        },
        resetForm() {
            // Resetea los datos del formulario a los valores originales
            this.user = { ...this.userData };
        },

        async save() {
            try {
                if (!this.validForm) return;
                Alerts.loading(true);
                // Llamada al servicio de actualización de usuario
                const response = await UserServices.updateUser(this.user);
                if(response.statusCode == 200) {
                    this.$emit('user-updated', false);
                    this.close();
                }
          
            } catch (error) {
                console.error('Error', error);
            } finally {
                Alerts.loading(false);
            }
        }
    }
};
</script>
