<template lang="">
    <v-container>
        <v-row>
            <v-col>
                <div
                    class="text-h4 font-weight-bold"
                    v-text="'Auto'"
                ></div>
            </v-col>
        </v-row>
        <InfoVehicle/>
        <v-row>
            <v-col cols="12">
                <div
                    class="text-h4 font-weight-bold"
                    v-text="'Reseñas'"
                ></div>
            </v-col>
        </v-row>
        <CardRate/>
    </v-container>
</template>
<script>
import CardRate from './components/CardRate.vue';
import InfoVehicle from './components/InfoVehicle.vue';
export default {
    components: {
        CardRate,
        InfoVehicle
    },
    created() {
        if (!this.$route.params.id) {
            this.$router.push({
                name: 'vehicles',
            })
        }
    },
}
</script>
<style lang="">

</style>