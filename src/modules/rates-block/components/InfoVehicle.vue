<template lang="">
    <v-row>
        <v-col 
            cols="12" xl="4" lg="4" md="4" sm="6" xs="12"   
        >
            <v-img
                contain
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="200"
                max-width="300"
                :src="car[0]?.images[0]"
            ></v-img>
        </v-col>
        <v-col cols="12" xl="8" lg="8" md="8" sm="6" xs="12">
            <div
                class="text-h5 font-weight-bold"
                v-text="car[0]?.model"
            ></div>
            <div class="d-flex align-center">
                <v-rating
                    v-model="rating"
                    color="#FDD836"
                    length="1"
                    size="1.5rem"
                ></v-rating>
                <div
                    class="text-subtitle-1 text--secondary"
                    v-text="`4.0/5.0`"
                ></div>
            </div>
        </v-col>
    </v-row>
</template>
<script>
import RateServices from '../RateServices';
const {getByIdAuto} = RateServices;
export default {
    data() {
        return {
            rating: 1,
            car: [],
            id_car: 0,
        }
    },
    created() {
        if (this.$route.params.id) {
            this.id_car = this.$route.params.id
        }
    },
    async mounted() {
        this.getAllByAuto();
    },
    methods: {
        async getAllByAuto() {
            try {
                const data = await getByIdAuto(this.id_car);
                if (data.data.statusCode === 200) {
                    this.car = data.data.data;
                }
            } catch (err) {
                console.error(err);
                
            }
        }
    }
}
</script>
<style lang="">
    
</style>