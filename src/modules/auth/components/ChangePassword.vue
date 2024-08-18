<template>
    <v-row justify="center">
        <v-dialog v-model="localDialog" persistent max-width="400" @update:model-value="handleDialogClose">
            <v-stepper v-model="e1">
                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card class="py-8 px-6 text-center mx-auto " elevation="12" max-width="400" width="100%">
                            <h3 class="text-h6 mb-4">Cambiar contraseña</h3>

                            <div class="text-body-2 mb-4">
                                Ingresa la nueva contraseña
                            </div>

                            <div class="text-subtitle-1 text-medium-emphasis text-start">Nueva contraseña</div>
                            <v-text-field v-model="password"
                                :rules="rulesPassword" type="password" placeholder="•••••••••••" dense outlined
                                required></v-text-field>

                            <div class="text-subtitle-1 text-medium-emphasis text-start">Confirmar contraseña</div>
                            <v-text-field v-model="confirmPassword"
                                :rules="rulesConfirmPassword" type="password" placeholder="•••••••••••" dense outlined
                                required></v-text-field>

                            <v-btn class="my-1" color="primary" height="40" variant="flat" width="70%"
                                :loading="validating" :disabled="!isPassword" @click="onClick">Siguiente</v-btn>

                            <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="2000" top>
                                {{ text }}
                            </v-snackbar>
                        </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card class="py-8 px-6 text-center mx-auto " elevation="12" max-width="400" width="100%">
                            <h3 class="text-h6 mb-4">Verifica restauración</h3>

                            <div class="text-body-2 mb-4">
                                Te hemos envíado a tu correo un código para restablecer tu cuenta de CoAuto.
                            </div>

                            <v-sheet color="surface">
                                <v-otp-input v-model="otp" length="6" type="number"
                                    :disabled="validating"></v-otp-input>
                            </v-sheet>

                            <v-btn class="my-4" color="primary" height="40" variant="flat" width="70%"
                                :loading="validating" :disabled="otp.length < 6 || loading"
                                @click="verifycateOTP">Verificar</v-btn>


                            <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="2000" top>
                                {{ text }}
                            </v-snackbar>
                        </v-card>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>

        </v-dialog>
    </v-row>
</template>

<script>
import AuthServices from '../AuthServices';
import Alert from '@/utils/Alert';
const {recoveryAccountConfirm} = AuthServices;
export default {
    props: {
        dialog: {
            type: Boolean,
            required: true
        },
        email: {
            type: String,
            require: true
        }
    },
    data() {
        return {
            localDialog: this.dialog,
            e1: 1,
            otp: '',
            loading: false,
            password: '',
            confirmPassword: '',
            localEmail: this.email,
            validating: false,
            text: '',
            snackbar: false,
            snackbarColor: 'warning',
            rulesPassword: [
                value => !!value || 'Requiere llenar campo.',
                value => (value || '').length <= 20 || '20 caracteres maximo.',
                value => (value || '').length >= 8 || '8 caracteres minimo.',
                value => {
                    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%?])\S+$/
                    return pattern.test(value) || 'Contraseña invalida.'
                },
            ],
            rulesConfirmPassword: [
                value => !!value || 'Requiere llenar campo.',
                value => (value || '').length <= 20 || '20 caracteres maximo.',
                value => (value || '').length >= 8 || '8 caracteres minimo.',
                value => {
                    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%?])\S+$/
                    return pattern.test(value) || 'Contraseña invalida.'
                },
                value => (value === this.password || 'Las contraseñas no coinciden.'),
            ],
        }
    },
    computed: {
        isEmailValid() {
            return this.rulesEmail.every(rule => typeof rule === 'function' ? rule(this.email) === true : rule)
        },
        isPassword() {
            return (
                this.confirmPassword &&
                this.password === this.confirmPassword
            );
        }
    },
    watch: {
        dialog(newVal) {
            this.localDialog = newVal
        },
        email(newVal) {
            this.localEmail = newVal
        }
    },
    methods: {
        handleDialogClose() {
            this.$emit('update:dialog', this.localDialog);
            if (!this.localDialog) {
                this.$emit('close-dialog', false);
            }
        },
        closeDialog() {
            this.localDialog = false;
            this.handleDialogClose();
        },
        onClick() {
            this.e1 = 2
        },
        async verifycateOTP() {
            try {
                this.validating = true
                const data = await recoveryAccountConfirm(this.password, this.localEmail, this.otp);
                this.text = data.message
                if (data?.statusCode === 200) {
                    Alert.Toast('success', 'Se a restablecido tu contraseña')
                    this.$emit('close-dialog', false);
                    this.password = ''
                    this.confirmPassword = ''
                    this.e1 = 1
                } else if (data.response.status === 400) {
                    Alert.Toast('error', 'Codigo incorrecto')
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.validating = false
            }
        }
    }
}
</script>