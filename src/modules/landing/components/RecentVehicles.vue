<template lang="">
    <v-container class="my-12">
        <h2 class="text-center">Vehículos recientes</h2>
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
        <v-btn color="primary" block>Ver más</v-btn>
    </v-container>
</template>
<script>
export default {
    name: 'RecentVehicles',
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
        {
          id: 2,
          model: 'New SM5',
          brand: 'Toyota',
          price: '$79,999.99',
          description: 'New SM5 nos da una probadita de su nuevo lanzamiento en México...',
          image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
        },
        {
          id: 3,
          model: 'New SM5',
          brand: 'Toyota',
          price: '$79,999.99',
          description: 'New SM5 nos da una probadita de su nuevo lanzamiento en México...',
          image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
        }
      ]
    };
  }
}
</script>
<style scope>
h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}
</style>