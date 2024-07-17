<template>
  <v-container>
    <h1>Autos</h1>
    <v-row>
      <v-col cols="12" md="4" class="align-self-center">
        <v-text-field v-model="text" placeholder="Buscar Auto" outlined prepend-inner-icon="mdi-magnify" />
      </v-col>
      <v-col cols="12" md="2">
        <v-select class="mt-2" :items="headers" label="Filtro" dense outlined prepend-icon="mdi-filter-outline" />
      </v-col>
      <v-col cols="12" md="2">
        <v-btn class="mt-2" elevation="2" @click="dialog = true">Agregar auto</v-btn>
      </v-col>
      <AddVehicle :dialog.sync="dialog" @update:dialog="dialog = $event" @car-added="handleCarAdded" />
    </v-row>
    <v-row>
      <v-col>
        <v-progress-linear v-if="loading" indeterminate color="blue"></v-progress-linear>
        <div v-if="!loading && vehicles.length === 0" class="col-12">
          <p>No hay registros disponibles.</p>
        </div>
        <v-simple-table v-else class="elevation-2">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  <h3>ID</h3>
                </th>
                <th class="text-left">
                  <h3>Imagen</h3>
                </th>
                <th class="text-left">
                  <h3>Modelo</h3>
                </th>
                <th class="text-left">
                  <h3>Marca</h3>
                </th>
                <th class="text-left">
                  <h3>Año</h3>
                </th>
                <th class="text-left">
                  <h3>Puertas</h3>
                </th>
                <th class="text-left">
                  <h3>Precio</h3>
                </th>
                <th class="text-left">
                  <h3>Estado</h3>
                </th>
                <th class="text-left">
                  <h3>Acciones</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in vehicles" :key="item.id_auto">
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
                            <v-btn text x-small @click="deleteVehicle(item)"><v-icon left
                                dark>mdi-toggle-switch-off-outline</v-icon>Desactivar</v-btn>
                          </v-list-item-action>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-action>
                            <v-btn text x-small><v-icon left dark>mdi-message-outline</v-icon>Desactivar</v-btn>
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
      </v-col>
    </v-row>
    <EditVehicle :dialog.sync="editDialog" :vehicleData="selectedVehicle" @update:dialog="editDialog = $event" @car-updated="handleCarUpdated" />
  </v-container>
</template>

<script>
import AddVehicle from './components/AddVehicle.vue';
import VehicleServices from './VehiclesServices';
import EditVehicle from './components/EditVehicle.vue';
export default {
  components: {
    AddVehicle,EditVehicle
  },
  data() {
    return {
      headers: [
        'ID',
        'Imagen',
        'Modelo',
        'Marca',
        'Año',
        'Puertas',
        'Precio',
        'Estado',
      ],
      vehicles: [],
      dialog: false,
      editDialog: false,
      selectedVehicle: {},
      loading: false,
    };
  },
  async mounted() {
    this.getCars();
  },
  methods: {
    async handleCarAdded() {
      await this.getCars();
    },
    async handleCarUpdated() {
      await this.getCars();
    },
    async getCars() {
      this.loading = true;
      try {
        const { statusCode, data } = await VehicleServices.getAllCars();
        if (statusCode === 200) {
          this.vehicles = data;
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        this.loading = false;
      }
    },
    getColor(status) {
      return status === 1 ? 'green' : 'red';
    },
    getStatusText(status) {
      return status === 1 ? 'Activo' : 'Inactivo';
    },
    openEditDialog(vehicle) {
      this.selectedVehicle = { ...vehicle };
      this.editDialog = true;
    },
    deleteVehicle() {
    }
  }
};
</script>

<style scoped>
h1 {
  color: #000;
}
</style>
