<template lang="">
    <v-container>
        <v-row></v-row>
        <v-row>
            <v-col  md="3" sm="12">
                <v-card class="filter-card my-2">
                    <v-card-tittle>
                        Buscar auto
                    </v-card-tittle>
                </v-card>
            </v-col>
            <v-col md="9" sm="12">
                <v-row>
                    <v-col v-for="vehicle in paginatedItems" :key="vehicle.id" class="my-2" lg="4" md="6" sm="12">
                        <v-card class="vehicle-card" @click="redirectCar(vehicle.id)" >
                            <v-img :src="vehicle.image" height="150px" contain></v-img>
                            <v-card-title>{{ vehicle.model }}</v-card-title>
                            <v-card-subtitle>{{ vehicle.brand }}</v-card-subtitle>
                            <v-card-text>
                                <p class="font-weight-bold p-color">{{ vehicle.price }}</p>
                                <p>{{ vehicle.description }}</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-pagination
                v-model="page"
                :length="pageCount"
                :total-visible="5"
                class="mt-2"
                ></v-pagination>
            </v-col>
        </v-row>        
    </v-container>
</template>
<script>
export default {
    name: 'VehiclesSearch',
    data() {
        return {
            exampleVehicle: {
                id: 1,
                model: 'New SM5',
                brand: 'Toyota',
                price: '$79,999.99',
                description: 'New SM5 nos da una probadita de su nuevo lanzamiento en México...',
                image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
            },
            vehicles: [],
            page: 1,
            itemsPerPage: 6,
        }
    },
    methods: {
        loadVehicles() {
            for(let i = 0; i<25; i++) {
                this.vehicles.push(this.exampleVehicle);
            }
        },
        redirectCar(vehicleId) {
            this.$router.push({name: 'details_car', params: {id: vehicleId}});
        }
    },
    mounted() {
        this.loadVehicles();
    },
    computed: {
        pageCount() {
            return Math.ceil(this.vehicles.length / this.itemsPerPage);
        },
        paginatedItems() {
            const start = (this.page - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.vehicles.slice(start, end);
        },
    }
}
</script>
<style scoped>
    .filter-card {
        display: flex;
        justify-content: center;
        padding: 1em 0 1em 0;
        font-weight: bold;
    }
    .vehicle-card {
        cursor: pointer;
    }
    
</style>