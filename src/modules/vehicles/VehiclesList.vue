<template>
    <v-container>
        <h1>Autos</h1>
        <v-row>
            <v-col cols="12" md="4" class="align-self-center">
                <v-text-field v-model="text" placeholder="Buscar Auto" outlined prepend-inner-icon="mdi-magnify"/>
            </v-col>
            <v-col cols="12" md="2">
                <v-select class="mt-2" :items="headers" label="Filtro" dense outlined prepend-icon="mdi-filter-outline"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-data-table :headers="headers" :items="vehicles" :items-per-page="5" class="elevation-2">
                    <!-- <template v-slot:item.status="{ item }">
                        <v-chip :color="red" dark >
                            {{ item.status }}
                        </v-chip>
                    </template> -->
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                headers: [
                    { text: 'ID', align: 'center', sortable: false, value: 'id_auto' },
                    { text: 'Imagen', align: 'center', value: 'img' },
                    { text: 'Modelo', align: 'center', value: 'model' },
                    { text: 'Marca', align: 'center', value: 'brand' },
                    { text: 'Año', align: 'center', value: 'year' },
                    { text: 'Precio', align: 'center', value: 'price' },
                    { text: 'Puertas', align: 'center', value: 'doors' },
                    { text: 'Estado', align: 'center', value: 'status' },
                    { text: 'Acciones', align: 'center', value: 'actions' },
                ],
                vehicles: [
                    {
                        id_auto: 1,
                        img: 'Imagen',
                        model: 'Toyota Corolla',
                        brand: 'Toyota',
                        year: 2019,
                        price: 200000,
                        doors: 4,
                        status: 'Activo'
                    }
                ]
            }
        }
    };
</script>

<style scoped>
    h1 {
        color: #000;
    }
</style>