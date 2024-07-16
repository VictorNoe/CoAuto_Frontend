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
                <v-progress-linear v-if="loading" indeterminate color="blue"></v-progress-linear>
                <div v-if="!loading && users.length === 0" class="col-12">
                    <p>No hay registros disponibles.</p>
                </div>
                <v-simple-table class="elevation-2">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left"><h3>ID</h3></th>
                                <th class="text-left"><h3>Imagen</h3></th>
                                <th class="text-left"><h3>Nombre Completo</h3></th>
                                <th class="text-left"><h3>Correo electrónico</h3></th>
                                <th class="text-left"><h3>Rol</h3></th>
                                <th class="text-left"><h3>Estado</h3></th>
                                <th class="text-left"><h3>Acciones</h3></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in users" :key="item.id_user">
                                <td>{{ item.id_user }}</td>
                                <td><v-avatar size="36"><img :src="item.profile_image" :alt="item.name"></v-avatar></td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.email }}</td>
                                <td><v-chip outlined>{{ getRolText(item.id_role) }}</v-chip></td>
                                <td><v-chip :color="getColor(item.status)" dark >{{ getStatusText(item.status) }}</v-chip></td>
                                <td>
                                    <v-menu bottom left :close-on-click="true">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn icon color="grey" v-bind="attrs" v-on="on"><v-icon>mdi-dots-horizontal</v-icon></v-btn>
                                        </template>
                                        <v-card>
                                            <v-list>
                                                <v-list-item>
                                                    <v-list-item-action>
                                                        <v-btn text x-small><v-icon left dark>mdi-pencil-outline</v-icon>Editar</v-btn>
                                                    </v-list-item-action>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-action>
                                                        <v-btn text x-small><v-icon left dark>mdi-toggle-switch-off-outline</v-icon>Desactivar</v-btn>
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
    </v-container>
</template>

<script>
    import UserServices from './UserServices';

    export default {
        data () {
            return {
                headers: [
                    'ID',
                    'Imagen',
                    'Nombre Completo',
                    'Correo electrónico',
                    'Rol',
                    'Estado'
                ],
                users: [],
                loading: false
            }
        },
        async mounted() {
            this.getUsers();
        },
        methods: {
            async getUsers() {
                this.loading = true;
                try {
                    const {statusCode, data} = await UserServices.getAllUsers();
                    if (statusCode === 200) {
                        this.users = data;
                    }
                } catch (error) {
                    console.error('Error fetching users:', error);
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
            getRolText(rol) {
                return rol === 1 ? 'Administrador' : 'Cliente';
            }
        }
    }
</script>

<style scope>
    h1 {
        color: #000;
    }
</style>