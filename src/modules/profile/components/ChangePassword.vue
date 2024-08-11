<template>
    <v-row justify="center">
        <v-dialog v-model="localDialog" max-width="400" @click:outside="closeDialog">
            <v-card class="py-8 px-6 text-center mx-auto " elevation="12" max-width="400" width="100%">
                <h3 class="text-h6 mb-4">Cambiar contraseña</h3>

                <div class="text-body-2 mb-4">
                    Completa el formulario para cambiar la contraseña
                </div>

                <div class="text-subtitle-1 text-medium-emphasis text-start">Contraseña Actual</div>
                <v-text-field v-model="oldPassword" :rules="rulesOldPassword" type="password" placeholder="•••••••••••" dense
                    outlined required></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis text-start">Nueva contraseña</div>
                <v-text-field v-model="newPassword" :rules="rulesNewPassword" type="password"
                    placeholder="•••••••••••" dense outlined required></v-text-field>

                <v-btn class="my-1" color="primary" height="40" variant="flat" width="70%" :loading="loading"
                    :disabled="!isPassword || validating || timerVisible" @click="onClick">Cambiar contraseña</v-btn>
                
                <div v-if="timerVisible" class="text-caption">
                    Podras solicitar tu cambio de contraseña en <a>{{ formatTime(timer) }}</a>
                </div>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import Alert from '@/utils/Alert';
import ProfileServices from '../ProfileServices';
const {changePasword} = ProfileServices;
export default {
    props: {
        dialog: {
            type: Boolean,
            required: true
        },
    },
    data() {
        return {
            localDialog: this.dialog,
            oldPassword: '',
            newPassword: '',
            loading: false,
            validating: false,
            timer: 60,
            timerVisible: false,
            rulesOldPassword: [
                value => !!value || 'Requiere llenar campo.',
                value => (value || '').length <= 20 || '20 caracteres maximo.',
                value => (value || '').length >= 8 || '8 caracteres minimo.',
                value => {
                    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%?])\S+$/
                    return pattern.test(value) || 'Contraseña invalida.'
                },
            ],
            rulesNewPassword: [
                value => !!value || 'Requiere llenar campo.',
                value => (value || '').length <= 20 || '20 caracteres maximo.',
                value => (value || '').length >= 8 || '8 caracteres minimo.',
                value => {
                    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%?])\S+$/
                    return pattern.test(value) || 'Contraseña invalida.'
                },
            ],
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
    computed: {
        isPassword() {
            return (
                this.rulesOldPassword.every(rule => typeof rule === 'function' ? rule(this.oldPassword) === true : rule) 
                &&  this.rulesNewPassword.every(rule => typeof rule === 'function' ? rule(this.newPassword) === true : rule)
            )
        }
    },
    watch: {
        dialog(newVal) {
            this.localDialog = newVal
        }
    },
    methods: {
        closeDialog() {
            this.localDialog = false;
            if (!this.localDialog) {
                this.$emit('close-dialog', false);
            }
        },
        closeDialogBottom() {
            this.startTimer();
            this.localDialog = false;
            if (!this.localDialog) {
                this.$emit('close-dialog', false);
            }
        },
        async onClick() {
            try {
                this.loading = true
                this.validating = true
                const result = await changePasword(this.oldPassword, this.newPassword);
                console.log(result);
                
                if (result.data.statusCode === 200) {
                    Alert.Toast('success', result.data.response.message)
                    this.closeDialogBottom();
                } else {
                    Alert.Toast('error', 'No se ha podido cambiar la contraseña')
                }
            } catch (err) {
                Alert.Toast('error', 'No se ha podido cambiar la contraseña')
            } finally {
                this.loading = false
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