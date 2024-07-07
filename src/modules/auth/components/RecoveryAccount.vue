<template>
    <v-row justify="center">
        <v-dialog v-model="localDialog" persistent max-width="400" @update:model-value="handleDialogClose">
            <v-card class="py-8 px-6 text-center mx-auto " elevation="12" max-width="400" width="100%">
                <h3 class="text-h6 mb-4">Recuperar cuenta</h3>

                <div class="text-body-2 mb-4">
                    Ingresa tu correo electronico asociado a tu cuenta.
                </div>
                <v-text-field 
                    :disabled="validating" 
                    :rules="rulesEmail"
                    label="Correo electronico" 
                    v-model="email" 
                    outlined type="email"
                    required
                ></v-text-field>

                <v-btn class="my-1" color="primary" height="40" variant="flat" width="70%" :loading="validating"
                    :disabled="!isEmailValid" @click="onClick">Verificar</v-btn>

                <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="2000" top>
                    {{ text }}
                </v-snackbar>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    props: {
        dialog: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            localDialog: this.dialog,
            email: '',
            validating: false,
            text: '',
            snackbar: false,
            snackbarColor: 'warning',
            rulesEmail: [
                value => !!value || 'Requiere llenar campo.',
                value => (value || '').length <= 50 || '20 caracteres maximo.',
                value => (value || '').length >= 8 || '8 caracteres minimo.',
                value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Correo invalido.'
                },
            ],
        }
    },
    computed: {
        isEmailValid() {
            return this.rulesEmail.every(rule => typeof rule === 'function' ? rule(this.email) === true : rule)
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
        onClick() {
            this.validating = true

            setTimeout(() => {
                this.validating = false
                if (this.email === '111111') {
                    this.closeDialog()
                }
                this.otp = ''
                this.text = `Codigo invalido`
                this.snackbar = true
            }, 2000)
        },
    }
}
</script>