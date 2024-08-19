<template lang="">
    <v-container class="my-12 pa-6">
        <h2 class="text-center">Vehículos recientes</h2>
        <div v-if="loading">
          <SkeletonVeiches/>
        </div>
        <v-row>
          <v-col 
              v-for="vehicle in vehicles" 
              :key="vehicle.id_auto" 
              cols="12" xl="3" lg="4" md="4" sm="6" xs="12"
          >
            <v-hover
              v-slot="{ hover }"
            >
              <v-card 
                class="mx-auto"
                max-width="344"
                :elevation="hover ? 16 : 2"
                @click="redirectCar(vehicle.id_auto)"
              >
                <v-img 
                  :src="vehicle.images[0]" 
                  height="200px" 
                  aspect-ratio="2" 
                  contain
                ></v-img>
                
                <v-card-title>
                  {{ vehicle.model }}
                </v-card-title>
                    
                <v-card-subtitle>
                  {{ vehicle?.brand }}
                  <div
                    class="text-subtitle-1 font-weight-bold "
                    v-text="divisa(vehicle.price) "
                    color="primary"
                  ></div>
                </v-card-subtitle>
                
                <v-card-text>
                  <div
                    class="text-subtitle-1 font-weight-bold "
                    v-text="'Descripción'"
                  ></div>
                  <div
                    class="text-subtitle-1 text--secondary text-truncate"
                    v-text="vehicle.description"
                  ></div>
                </v-card-text>
                <v-expand-transition>
                  <v-card
                    v-if="hover"
                    class="transition-fast-in-fast-out v-card--reveal"
                    style="height: 80%"
                  >
                    <v-card-text>
                      <div
                        class="text-subtitle-1 font-weight-bold "
                        v-text="'Descripción'"
                      ></div>
                      <div
                        class="text-subtitle-1 text--secondary"
                        v-text="vehicle.description"
                      ></div>  
                    </v-card-text>
                  </v-card>
                </v-expand-transition>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
        <div class="my-12 text-center" v-if="!loading">
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
import SkeletonVeiches from './SkeletonVeiches.vue';
const { getAllCars } = LadingServices;
export default {
  name: 'RecentVehicles',
  data() {
    return {
      overlay: false,
      vehicles: [],
      loading: true,
    };
  },
  components: {
    SkeletonVeiches
  },
  async mounted() {
    this.getAll();
  },
  methods: {
    async getAll() {
      try {
        const { statusCode, data } = await getAllCars();
        if (statusCode === 200) {
          this.vehicles = data.filter(vehicle => vehicle.status === 1).slice(0, 6);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false
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
    },
    redirectCar(vehicleId) {
      this.$router.push({ name: 'details_car', params: { id: vehicleId } });
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

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>