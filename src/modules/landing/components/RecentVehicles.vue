<template lang="">
    <v-container class="my-12 pa-6">
        <h2 class="text-center">Vehículos recientes</h2>
        <v-row>
            <v-col v-for="vehicle in vehicles" :key="vehicle.id" cols="12" sm="4">
                <v-card>
                    <v-img :src="vehicle.image" height="200px" contain></v-img>
                    <v-card-title>{{ vehicle.model }}</v-card-title>
                    <v-card-subtitle>{{ vehicle.brand }}</v-card-subtitle>
                    <v-card-text>
                        <p class="font-weight-bold p-color">{{ vehicle.price }}</p>
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
            >Ver más</v-btn>
        </div>
    </v-container>
</template>
<script>
export default {
    name: 'RecentVehicles',
  data() {
    return {
      overlay: false,
      vehicles: [
        {
          id: 1,
          model: 'New SM5',
          brand: 'Toyota',
          price: '$79,999.99',
          description: 'New SM5 nos da una probadita de su nuevo lanzamiento en México...',
          image: 'https://media.istockphoto.com/id/1150931120/es/foto/ilustraci%C3%B3n-3d-del-coche-blanco-compacto-gen%C3%A9rico-vista-frontal-lateral.jpg?s=612x612&w=0&k=20&c=HtnGCDaCYHMJ8BjrSusd7FGPMC1ZEkRUmNtGimthLWU='
        },
        {
          id: 2,
          model: 'New SM5',
          brand: 'Toyota',
          price: '$79,999.99',
          description: 'New SM5 nos da una probadita de su nuevo lanzamiento en México...',
          image: 'https://media.istockphoto.com/id/1150931120/es/foto/ilustraci%C3%B3n-3d-del-coche-blanco-compacto-gen%C3%A9rico-vista-frontal-lateral.jpg?s=612x612&w=0&k=20&c=HtnGCDaCYHMJ8BjrSusd7FGPMC1ZEkRUmNtGimthLWU='
        },
        {
          id: 3,
          model: 'New SM5',
          brand: 'Toyota',
          price: '$79,999.99',
          description: 'New SM5 nos da una probadita de su nuevo lanzamiento en México...',
          image: 'https://media.istockphoto.com/id/1150931120/es/foto/ilustraci%C3%B3n-3d-del-coche-blanco-compacto-gen%C3%A9rico-vista-frontal-lateral.jpg?s=612x612&w=0&k=20&c=HtnGCDaCYHMJ8BjrSusd7FGPMC1ZEkRUmNtGimthLWU='
        },
        {
          id: 4,
          model: 'New SM5',
          brand: 'Toyota',
          price: '$79,999.99',
          description: 'New SM5 nos da una probadita de su nuevo lanzamiento en México...',
          image: 'https://media.istockphoto.com/id/1150931120/es/foto/ilustraci%C3%B3n-3d-del-coche-blanco-compacto-gen%C3%A9rico-vista-frontal-lateral.jpg?s=612x612&w=0&k=20&c=HtnGCDaCYHMJ8BjrSusd7FGPMC1ZEkRUmNtGimthLWU='
        },
        {
          id: 5,
          model: 'New SM5',
          brand: 'Toyota',
          price: '$79,999.99',
          description: 'New SM5 nos da una probadita de su nuevo lanzamiento en México...',
          image: 'https://media.istockphoto.com/id/1150931120/es/foto/ilustraci%C3%B3n-3d-del-coche-blanco-compacto-gen%C3%A9rico-vista-frontal-lateral.jpg?s=612x612&w=0&k=20&c=HtnGCDaCYHMJ8BjrSusd7FGPMC1ZEkRUmNtGimthLWU='
        },
        {
          id: 6,
          model: 'New SM5',
          brand: 'Toyota',
          price: '$79,999.99',
          description: 'New SM5 nos da una probadita de su nuevo lanzamiento en México...',
          image: 'https://media.istockphoto.com/id/1150931120/es/foto/ilustraci%C3%B3n-3d-del-coche-blanco-compacto-gen%C3%A9rico-vista-frontal-lateral.jpg?s=612x612&w=0&k=20&c=HtnGCDaCYHMJ8BjrSusd7FGPMC1ZEkRUmNtGimthLWU='
        },
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
p-color {
    color: #2570EB;
}
</style>