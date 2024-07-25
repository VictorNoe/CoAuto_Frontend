<template>
    <v-container>
      <v-row>
        <v-col md="3" sm="12">
          <v-card class="filter-card my-2">
            <v-card-title>Buscar auto</v-card-title>
            <v-card-text>
              <v-text-field v-model="searchText" placeholder="Buscar Auto" outlined prepend-inner-icon="mdi-magnify" />
              <v-divider></v-divider>
              <v-subheader>Filtros</v-subheader>
              <v-checkbox v-model="filters.model" label="Modelo" @change="selectFilter('model')" />
              <v-checkbox v-model="filters.brand" label="Marca" @change="selectFilter('brand')" />
              <v-checkbox v-model="filters.year" label="Año" @change="selectFilter('year')" />
              <v-checkbox v-model="filters.doors" label="Puertas" @change="selectFilter('doors')" />
              <v-checkbox v-model="filters.price" label="Precio" @change="selectFilter('price')" />
              <v-checkbox v-model="filters.status" label="Estado" @change="selectFilter('status')" />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col md="9" sm="12">
          <v-row>
            <v-col v-if="loading" class="d-flex justify-center align-center" style="height: 300px;">
              <v-progress-circular indeterminate></v-progress-circular>
            </v-col>
            <v-col v-else v-for="vehicle in paginatedItems" :key="vehicle.id_auto" class="my-2" lg="4" md="6" sm="12">
              <v-card class="vehicle-card" @click="redirectCar(vehicle.id_auto)">
                <v-img :src="vehicle.images[0]" height="150px" contain></v-img>
                <v-card-title>{{ vehicle.model }}</v-card-title>
                <v-card-subtitle>{{ vehicle.brand }}</v-card-subtitle>
                <v-card-text>
                  <p class="font-weight-bold p-color">${{ vehicle.price }}</p>
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
  import VehicleServices from '../vehicles/VehiclesServices';

  export default {
    name: 'VehiclesSearch',
    data() {
      return {
        vehicles: [],
        filteredVehicles: [],
        searchText: '',
        filters: {
          model: false,
          brand: false,
          year: false,
          doors: false,
          price: false,
          status: false,
        },
        page: 1,
        itemsPerPage: 6,
        loading: false,
      };
    },
    watch: {
      searchText: 'applyFilters',
      filters: {
        handler: 'applyFilters',
        deep: true,
      },
    },
    methods: {
      async loadVehicles() {
        this.loading = true;
        try {
          const { statusCode, data } = await VehicleServices.getAllCars();
          if (statusCode === 200) {
            this.vehicles = data;
            this.applyFilters();
          }
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false;
        }
      },
      applyFilters() {
        this.filteredVehicles = this.vehicles.filter(vehicle => {
          const value = this.searchText.toLowerCase();

          let match = true;
          if (value) {
            match = Object.keys(this.filters).some(key => {
              if (this.filters[key]) {
                return vehicle[key].toString().toLowerCase().includes(value);
              }
              return false;
            });
          }

          if (this.filters.model && !vehicle.model.toLowerCase().includes(value)) match = false;
          if (this.filters.brand && !vehicle.brand.toLowerCase().includes(value)) match = false;
          if (this.filters.year && !vehicle.year.toString().includes(value)) match = false;
          if (this.filters.doors && !vehicle.doors.toString().includes(value)) match = false;
          if (this.filters.price && !vehicle.price.toString().includes(value)) match = false;
          if (this.filters.status && !this.getStatusText(vehicle.status).toLowerCase().includes(value)) match = false;

          return match;
        });
      },
      selectFilter(selectedFilter) {
        Object.keys(this.filters).forEach(key => {
          if (key !== selectedFilter) {
            this.filters[key] = false;
          }
        });
        this.applyFilters();
      },
      redirectCar(vehicleId) {
        this.$router.push({ name: 'details_car', params: { id: vehicleId } });
      },
      getStatusText(status) {
        return status === 1 ? 'Activo' : 'Inactivo';
      }
    },
    mounted() {
      this.loadVehicles();
    },
    computed: {
      pageCount() {
        return Math.ceil(this.filteredVehicles.length / this.itemsPerPage);
      },
      paginatedItems() {
        const start = (this.page - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredVehicles.slice(start, end);
      },
    }
  };
  </script>

  <style scoped>
  .filter-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1em 0 1em 0;
    font-weight: bold;
  }
  .vehicle-card {
    cursor: pointer;
  }
  </style>
