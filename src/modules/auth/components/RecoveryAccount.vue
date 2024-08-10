<template>
    <v-row justify="center">
        <v-dialog v-model="localDialog" max-width="400" @click:outside="closeDisplay">
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
                    :disabled="!isEmailValid || timerVisible" @click="onClick">Verificar</v-btn>
                
                <div v-if="timerVisible" class="text-caption">
                    Puedes solicitar tu cambio de contraseña en <a>{{ formatTime(timer) }}</a>
                </div>
                <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="2000" top>
                    {{ text }}
                </v-snackbar>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import AuthServices from '../AuthServices';
const { recoveryAccount } = AuthServices;
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
            timerVisible: false,
            timer: 180,
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
    mounted() {
        const savedTimer = localStorage.getItem('recoveryAccountTimer');
        if(savedTimer) {
            const timer = parseInt(savedTimer);
            if (!isNaN(timer) && timer > 0) {
                this.timer = timer;
                this.startTimer();
            }
        }
    },
    methods: {
        handleDialogClose() {
            this.$emit('emailConfim', this.email)
            if (!this.localDialog) {
                this.$emit('close-dialog', false);
            }
            this.email = '';
        },
        closeDialog() {
            this.localDialog = false;
            this.handleDialogClose();
        },
        closeDisplay() {
            this.email = '';
            this.localDialog = false;
            if (!this.localDialog) {
                this.$emit('close-dialog', false);
            }
        },
        async onClick() {
            try {
                this.validating = true
                const data = await recoveryAccount(this.email);
                this.text = data.message
            } catch (error) {
                console.error(error);
            } finally {
                this.closeDialog()
                this.startTimer();
                this.email = ''
                this.snackbar = true
                this.validating = false
            }
        },
        startTimer() {
            this.timerVisible = true;
            this.buttonDisabled = true;

            const intervalId = setInterval(() => {
                if (this.timer > 0) {
                    this.timer--;
                    localStorage.setItem('recoveryAccountTimer', this.timer.toString());
                } else {
                    clearInterval(intervalId);
                    this.timerVisible = false;
                    this.buttonDisabled = false;
                    this.timer = 60; 
                    localStorage.removeItem('recoveryAccountTimer');
                }
            }, 1000);
        },
        formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }
    }
}
</script>