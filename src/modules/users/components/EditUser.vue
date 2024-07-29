<template>
    <v-dialog v-model="localDialog" max-width="600">
        <v-card>
            <v-card-title>
                <span class="headline">Editar Usuario</span>
            </v-card-title>
            <v-card-text>
                <v-stepper v-model="step">
                    <v-stepper-header>
                        <v-stepper-step :complete="step > 1" step="1">Información</v-stepper-step>
                        <v-stepper-step step="2">Imagen</v-stepper-step>
                    </v-stepper-header>
                    <v-stepper-items>
                        <!-- Step 1: Información -->
                        <v-stepper-content step="1">
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="user.name" label="Nombre" required :rules="nameRules"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="vehicle.email" label="Correo Electrónico" required :rules="emailRules"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-card-actions>
                                <v-btn color="blue darken-1" text @click="step = 2">Siguiente</v-btn>
                            </v-card-actions>
                        </v-stepper-content>
                        <!-- Step 2: Imagen -->
                        <v-stepper-content step="2">
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-file-input v-model="imageFile" label="Subir Imagen de Usuario" accept="image/*" :rules="[value => !!value || 'Por favor, selecciona una imagen']" @change="onImageChange"></v-file-input>
                                        <v-img :src="imagePreview" v-if="imagePreview" class="mt-2" max-height="200"></v-img>
                                        <v-alert v-if="imageSizeError" type="error">Imagen demasiado grande (máximo 2MB)</v-alert>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-card-actions>
                                <v-btn color="blue darken-1" text @click="step = 1">Atrás</v-btn>
                                <v-btn color="blue darken-1" text @click="save" :disabled="!validForm">Guardar</v-btn>
                            </v-card-actions>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
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
                imageFile: null, // Archivo de imagen seleccionado
                step: 1, // Estado del paso en el formulario
                imagePreview: null, // Vista previa de la imagen
                imageSizeError: false // Error si la imagen es demasiado grande
            };
        },
        computed: {
            validForm() {
                // Validación del formulario: nombre, correo y vista previa de imagen deben estar presentes y no debe haber error de tamaño
                return ( this.user.name && this.user.email && this.imagePreview && !this.imageSizeError );
            },
            nameRules() {
                // Reglas de validación para el nombre
                return [
                    value => !!value || 'El nombre es requerido',
                    value => /^[a-zA-Z\s]+$/.test(value) || 'El nombre no debe contener caracteres especiales'
                ];
            },
            emailRules() {
                // Reglas de validación para el correo electrónico
                return [
                    value => !!value || 'El correo electrónico es requerida',
                    value => /.+@.+\..+/.test(value) || 'Debe ser un correo electrónico válido'
                ];
            },
        },
        watch: {
            dialog(val) {
                this.localDialog = val;
                if (val) {
                    this.user = { ...this.userData };
                    this.loadImagePreview();
                } else {
                    this.resetForm();
                }
            }
        },
        methods: {
            close() {
                // Cierra el diálogo y resetea el formulario
                this.localDialog = false;
                this.resetForm();
            },
            resetForm() {
                // Resetea los datos del formulario a los valores originales
                this.user = { ...this.userData };
                this.imagePreview = null;
                this.imageSizeError = null;
            },
            loadImagePreview() {
                // Carga la vista previa de la imagen del usuario
                if (this.user.profile_image) {
                    if (typeof this.user.profile_image === 'string') {
                        this.imagePreview = this.user.profile_image
                    } else {
                        this.imagePreview = URL.createObjectURL(this.user.profile_image);
                    }
                }
            },
            onImageChange() {
                // Maneja el cambio de imagen, mostrando error si el tamaño excede 2MB
                const imageFile = this.imageFiles;
                if (imageFile && imageFile.size > 2 * 1024 * 1024) {
                    this.imageSizeError = true;
                } else {
                    this.imageSizeError = false;
                    this.imagePreview = URL.createObjectURL(imageFile);
                }
            },
            async save() {
                try {
                    if (!this.validForm) return;
                    Alerts.loading(true);
                    // Llamada al servicio de actualización de usuario
                    const response = await UserServices.updateUser(this.user);
                    console.log(response.data);
                    this.$emit('user-updated', false);
                    this.close();
                } catch (error) {
                    console.error('Error', error);
                } finally {
                    Alerts.loading(false);
                }
            }
        }
    };
</script>
