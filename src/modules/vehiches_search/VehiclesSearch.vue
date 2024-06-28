<template lang="">
    <v-container padding="8" class="fill-height d-flex align-center justify-center">
        <v-row>
            <v-col v-for="vehicle in vehicles" :key="vehicle.id" cols="12" sm="4">
                <v-card>
                    <v-img :src="vehicle.image" height="200px" contain></v-img>
                    <v-card-title>{{ vehicle.model }}</v-card-title>
                    <v-card-subtitle>{{ vehicle.brand }}</v-card-subtitle>
                    <v-card-text>
                    <p class="font-weight-bold">{{ vehicle.price }}</p>
                    <p>{{ vehicle.description }}</p>
                </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        
    </v-container>
</template>
<script>
export default {
    name: 'VehiclesSearch',
    data() {
        return {
            vehicles: [
            {
            id: 1,
            model: 'New SM5',
            brand: 'Toyota',
            price: '$79,999.99',
            description: 'New SM5 nos da una probadita de su nuevo lanzamiento en México...',
            image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
            },
        ]
        }
    },
    methods: {
    }
}
</script>
<style scoped>
    
</style>