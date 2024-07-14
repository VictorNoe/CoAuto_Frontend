<template lang="">
    <v-container class="my-12 pa-6">
        <h2 class="text-center">Vehículos recientes</h2>
        <v-row>
            <v-col v-for="vehicle in vehicles" :key="vehicle.id_auto" cols="12" xl="3" lg="4" md="4" sm="6" xs="12">
                <v-card class="pa-6">
                    <v-img :src="vehicle.images[0]" height="200px" contain></v-img>
                    <v-card-title>{{ vehicle.model }}</v-card-title>
                    <v-card-subtitle>{{ vehicle?.brand }}</v-card-subtitle>
                    <v-card-text>
                        <p class="font-weight-bold p-color">{{ divisa(vehicle.price)}}</p>
                        <p>{{ vehicle.description }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <div class="my-12 text-center">
            <v-btn 
                color="primary"
                large
                x-small
                @click="car()"
            >Ver más</v-btn>
        </div>
    </v-container>
</template>
<script>
import LadingServices from '../LadingServices';
const { getAllCars } = LadingServices;
export default {
  name: 'RecentVehicles',
  data() {
    return {
      overlay: false,
      vehicles: []
    };
  },
  async mounted() {
    this.getAll();
  },
  methods: {
    async getAll() {
      try {
        const {statusCode, data} = await getAllCars();
        if (statusCode === 200) {
          this.vehicles = data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    divisa(price) {
      const formatter = Intl.NumberFormat('en-US', { 
        style: 'currency', 
        minimumFractionDigits: 2,
        currency: 'USD' 
      })
      return formatter.format(price)
    },
    car() {
      this.$router.push({ name: 'vehicles_search' });
    }
  },
}
</script>
<style scope>
h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}
p-color {
    color: #2570EB;
}
</style>