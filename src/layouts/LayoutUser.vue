<template lang="">
    <v-container>
        <v-row>
            <v-col>
                <NavbarUser/>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <router-view />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <FooterUser/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import FooterUser from '../components/FooterUser.vue';
import NavbarUser from '../components/NavbarUser.vue'

export default {
    components: {
        FooterUser,
        NavbarUser
    }
}
</script>