<template>
    <v-row justify="center">
        <v-dialog v-model="localDialog" persistent max-width="400" @update:model-value="handleDialogClose">
            <v-card class="py-8 px-6 text-center mx-auto " elevation="12" max-width="400" width="100%">
                <h3 class="text-h6 mb-4">Verifica Tu Cuenta</h3>

                <div class="text-body-2 mb-4">
                    Te hemos envíado a tu correo un código al número anteriormente indicado.
                    <br />
                    Para completar la verificación de tu correo, por favor, ingresa el código de activación de 6 dígitos.
                </div>

                <v-sheet color="surface">
                    <v-otp-input v-model="otp" length="6" type="number" :disabled="validating"></v-otp-input>
                </v-sheet>

                <v-btn class="my-4" color="primary" height="40" variant="flat" width="70%" :loading="validating"
                    :disabled="otp.length < 6 || loading" @click="onClick">Verificar</v-btn>

                <div class="text-caption">
                    ¿No resibiste tu codigo? <a href="#" @click.prevent="otp = ''">Reenviar</a>
                </div>
                <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="2000" top>
                    {{ text }}
                </v-snackbar>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import AuthServices from "../modules/auth/AuthServices"
const { confirmAccount } = AuthServices;
export default {
    props: {
        dialog: {
            type: Boolean,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            confirmEmail: this.email,
            loading: false,
            localDialog: this.dialog,
            otp: '',
            validating: false,
            text: '',
            snackbar: false,
            snackbarColor: 'warning',
        }
    },
    watch: {
        dialog(newVal) {
            this.localDialog = newVal
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
        async onClick() {
            try {
                this.validating = true;
                const result = await confirmAccount(this.confirmEmail, this.otp);
                console.log(result);
                if ( result.response.data.statusCode === 200 ) {
                    return this.closeDialog()
                }
                this.validating = false;
                this.text = result.response.data.message;
                this.snackbar = true;
            } catch (err) {
                console.log(err);
            } finally {
                this.otp = ''
            }
        },
    }
}
</script>