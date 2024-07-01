<template>
    <v-container>
        <h1>Usuarios</h1>
        <v-row>
            <v-col cols="12" md="4" class="align-self-center">
                <v-text-field v-model="text" placeholder="Buscar Usuario" outlined prepend-inner-icon="mdi-magnify"/>
            </v-col>
            <v-col cols="12" md="2">
                <v-select class="mt-2" :items="headers" label="Filtro" dense outlined prepend-icon="mdi-filter-outline"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-data-table :headers="headers" :items="vehicles" :items-per-page="5" class="elevation-2"></v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                headers: [
                    { text: 'ID', align: 'center', sortable: false, value: 'id_user' },
                    { text: 'Imagen', align: 'center', value: 'img' },
                    { text: 'Nombre Completo', align: 'center', value: 'name' },
                    { text: 'Correo electrónico', align: 'center', value: 'email' },
                    { text: 'Rol', align: 'center', value: 'role' },
                    { text: 'Estado', align: 'center', value: 'status' },
                    { text: 'Acciones', align: 'center', value: 'actions' },
                ],
                vehicles: [
                    {
                        id_user: '1',
                        img: 'img',
                        name: 'Karel Salgado',
                        email: '20213tn000@utez.edu.mx',
                        role: 'Usuario',
                        status: 'Activo',
                    }
                ]
            }
        }
    }
</script>

<style scope>
    h1 {
        color: #000;
    }
</style>