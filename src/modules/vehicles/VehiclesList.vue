<template>
  <v-container>
    <h1>Autos</h1>
    <v-row>
      <v-col cols="12" md="4" class="align-self-center">
        <v-text-field v-model="searchText" placeholder="Buscar Auto" outlined prepend-inner-icon="mdi-magnify" />
      </v-col>
      <v-col cols="12" md="2">
        <v-select class="mt-2" :items="filterOptions" v-model="selectedFilter" label="Filtro" dense outlined prepend-icon="mdi-filter-outline" />
      </v-col>
      <v-col cols="12" md="2">
        <v-btn class="mt-2" elevation="2" @click="dialog = true">Agregar auto</v-btn>
      </v-col>
      <AddVehicle :dialog.sync="dialog" @close-dialog="handleDialogClose" @update:dialog="dialog = $event" @car-added="handleCarAdded" />
    </v-row>
    <v-row>
      <v-col>
        <v-progress-linear v-if="loading" indeterminate color="blue"></v-progress-linear>
        <div v-if="!loading && paginatedVehicles.length === 0" class="col-12">
          <p>No hay registros disponibles.</p>
        </div>
        <v-simple-table v-else class="elevation-2">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Imagen</th>
                <th class="text-left">Modelo</th>
                <th class="text-left">Marca</th>
                <th class="text-left">Año</th>
                <th class="text-left">Puertas</th>
                <th class="text-left">Precio</th>
                <th class="text-left">Estado</th>
                <th class="text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in paginatedVehicles" :key="item.id_auto">
                <td>{{ item.id_auto }}</td>
                <td><v-avatar size="36"><img :src="item.images[0]" :alt="item.model" /></v-avatar></td>
                <td>{{ item.model }}</td>
                <td>{{ item.brand }}</td>
                <td>{{ item.year }}</td>
                <td>{{ item.doors }}</td>
                <td>${{ item.price }}</td>
                <td><v-chip :color="getColor(item.status)" dark>{{ getStatusText(item.status) }}</v-chip></td>
                <td>
                  <v-menu bottom left :close-on-click="true">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon color="grey" v-bind="attrs" v-on="on"><v-icon>mdi-dots-horizontal</v-icon></v-btn>
                    </template>
                    <v-card>
                      <v-list>
                        <v-list-item>
                          <v-list-item-action>
                            <v-btn text x-small @click="openEditDialog(item)"><v-icon left dark>mdi-pencil-outline</v-icon>Editar</v-btn>
                          </v-list-item-action>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-action>
                            <v-btn text x-small @click="deleteVehicle(item)"><v-icon left dark>mdi-toggle-switch-off-outline</v-icon>{{ getStatusAction(item.status) }}</v-btn>
                          </v-list-item-action>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-action>
                            <v-btn text x-small @click="getComments(item.id_auto)"><v-icon left dark>mdi-message-outline</v-icon>Comentarios</v-btn>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-menu>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-pagination
          v-model="currentPage"
          :length="pageCount"
          :total-visible="7"
          @input="paginate"
        ></v-pagination>
      </v-col>
    </v-row>
    <EditVehicle :dialog.sync="editDialog"  @close-dialog-edit="handleDialogCloseEdit" :vehicleData="selectedVehicle" @update:dialog="editDialog = $event" @car-updated="handleCarUpdated" />
  </v-container>
</template>

<script>
import AddVehicle from './components/AddVehicle.vue';
import VehicleServices from './VehiclesServices';
import EditVehicle from './components/EditVehicle.vue';
import VehiclesServices from './VehiclesServices';

export default {
  components: {
    AddVehicle,
    EditVehicle
  },
  data() {
    return {
      filterOptions: [
        'Modelo',
        'Marca',
        'Año',
        'Puertas',
        'Precio',
        'Estado',
      ],
      vehicles: [],
      filteredVehicles: [],
      searchText: '',
      selectedFilter: '',
      dialog: false,
      editDialog: false,
      selectedVehicle: {},
      loading: false,
      itemsPerPage: 5, 
      currentPage: 1, 
    };
  },
  computed: {
    paginatedVehicles() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredVehicles.slice(start, end);
    },
    pageCount() {
      return Math.ceil(this.filteredVehicles.length / this.itemsPerPage);
    }
  },
  watch: {
    searchText: 'filterVehicles',
    selectedFilter: 'filterVehicles'
  },
  async mounted() {
    await this.getCars();
  },
  methods: {
    handleDialogClose(value) {    
      this.dialog = value;
    },
    handleDialogCloseEdit(value) {    
      this.editDialog = value;
    },
    async handleCarAdded(value) {
      await this.getCars();
      this.dialog = value;
    },
    async handleCarUpdated(value) {
      await this.getCars();
      this.editDialog = value;
    },
    async getCars() {
      this.loading = true;
      try {
        const { statusCode, data } = await VehicleServices.getAllCars();
        if (statusCode === 200) {
          this.vehicles = data;
          this.filterVehicles();
        }
      } catch (error) {
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    filterVehicles() {
      this.filteredVehicles = this.vehicles.filter(vehicle => {
        const value = this.searchText.toLowerCase();
        if (!value) return true;
        
        switch (this.selectedFilter) {
          case 'Modelo':
            return vehicle.model.toLowerCase().includes(value);
          case 'Marca':
            return vehicle.brand.toLowerCase().includes(value);
          case 'Año':
            return vehicle.year.toString().includes(value);
          case 'Puertas':
            return vehicle.doors.toString().includes(value);
          case 'Precio':
            return vehicle.price.toString().includes(value);
          case 'Estado':
            return this.getStatusText(vehicle.status).toLowerCase().includes(value);
          default:
            return Object.values(vehicle).some(val => val.toString().toLowerCase().includes(value));
        }
      });
    },
    paginate() {
    },
    getColor(status) {
      return status === 1 ? 'green' : 'red';
    },
    getStatusText(status) {
      return status === 1 ? 'Activo' : 'Inactivo';
    },
    getStatusAction(status){
      return status === 1 ? 'Desactivar' : 'Activar';
    },
    openEditDialog(vehicle) {
      this.selectedVehicle = { ...vehicle };
      this.editDialog = true;
    },
    async deleteVehicle(item) {
      try{
        this.loading = true;
        const update ={
          id_auto: item.id_auto,
          id_status: item.status === 1 ? 4 : 3,
        }
        const res = await VehiclesServices.deleteCar(update);
        if(res && res.statusCode === 200){
          await this.getCars();
        }
      }catch(error){
        this.loading = false;
        return false;
      }finally{
        this.loading = false;
      }
    },
    getComments(id) {
      this.$router.push({
        name: 'ratesVehicles',
        params: { id: id }
      })
      
    }
  }
};
</script>

<style scoped>
h1 {
  color: #000;
}
</style>
