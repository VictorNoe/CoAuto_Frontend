<template>
    <v-container>
        <h1>Usuarios</h1>
        <v-row>
            <v-col cols="12" md="4" class="align-self-center">
                <v-text-field v-model="searchtext" placeholder="Buscar Usuario" outlined
                    prepend-inner-icon="mdi-magnify" />
            </v-col>
            <v-col cols="12" md="2">
                <v-select class="mt-2" :items="filterOptions" v-model="selectedFilter" label="Filtro" dense outlined
                    prepend-icon="mdi-filter-outline" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-progress-linear v-if="loading" indeterminate color="blue"></v-progress-linear>
                <div v-if="!loading && filteredUsers.length === 0" class="col-12">
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
                                    <h3>Nombre Completo</h3>
                                </th>
                                <th class="text-left">
                                    <h3>Correo Electrónico</h3>
                                </th>
                                <th class="text-left">
                                    <h3>Rol</h3>
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
                            <tr v-for="item in filteredUsers" :key="item.id_user">
                                <td>{{ item.id_user }}</td>
                                <td>
                                    <v-avatar size="36" color="grey">
                                        <img v-if="item?.profile_image !== null && item?.profile_image !== ''"
                                            :src="item?.profile_image" :alt="item?.name" />
                                        <v-icon dark
                                            v-if="item?.profile_image === null || item?.profile_image === ''">mdi-account-circle</v-icon>
                                    </v-avatar>
                                </td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.email }}</td>
                                <td><v-chip outlined>{{ getRolText(item.id_role) }}</v-chip></td>
                                <td><v-chip :color="getColor(item.status)" dark>{{ getStatusText(item.status)
                                        }}</v-chip></td>
                                <td>
                                    <v-menu bottom left :close-on-click="true">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn icon color="grey" v-bind="attrs"
                                                v-on="on"><v-icon>mdi-dots-horizontal</v-icon></v-btn>
                                        </template>
                                        <v-card>
                                            <v-list>
                                                <v-list-item>
                                                    <v-list-item-action>
                                                        <v-btn text x-small @click="openEditDialog(item)"><v-icon left
                                                                dark>mdi-pencil-outline</v-icon>Editar</v-btn>
                                                    </v-list-item-action>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-action>
                                                        <v-btn text x-small @click="desActivateUser(item)"><v-icon left
                                                                dark>mdi-toggle-switch-off-outline</v-icon>Desactivar</v-btn>
                                                    </v-list-item-action>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-action>
                                                        <v-btn text x-small><v-icon left
                                                                dark>mdi-message-outline</v-icon>Comentarios</v-btn>
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
        <EditUser :dialog.sync="editDialog" :userData="selectedUser" @update:dialog="editDialog = $event"
            @user-updated="handleUserUpdated" />
    </v-container>
</template>

<script>
import UserServices from './UserServices'; // Importa el servicio para manejar usuarios
import EditUser from './components/EditUser.vue'; // Importa el componente para editar usuarios

export default {
    components: {
        EditUser
    },
    data() {
        return {
            filterOptions: [
                'Nombre Completo',
                'Correo electrónico',
                'Rol',
                'Estado'
            ],
            users: [], // Lista de usuarios
            filteredUsers: [], // Lista de usuarios filtrados
            searchText: '', // Texto de búsqueda
            selectedFilter: '', // Filtro seleccionado
            editDialog: false, // Estado del diálogo para editar usuarios
            selectedUser: {}, // Usuario seleccionado para editar
            loading: false, // Indicador de carga
        }
    },
    watch: {
        searchText: 'filterUsers', // Llama a filterUsers cuando cambia searchText
        selectedFilter: 'filterUsers' // Llama a filterUsers cuando cambia selectedFilter
    },
    async mounted() {
        await this.getUsers(); // Obtiene la lista de usuarios al montar el componente
    },
    methods: {
        async handleUserUpdated(value) {
            await this.getUsers(); // Refresca la lista de usuarios después de actualizar uno
            this.editDialog = value;
        },
        async getUsers() {
            this.loading = true;
            try {
                const { statusCode, data } = await UserServices.getAllUsers();
                if (statusCode === 200) {
                    this.users = data; // Asigna los usuarios obtenidos a la lista
                    this.filterUsers(); // Filtra la lista de usuarios
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                this.loading = false;
            }
        },
        filterUsers() {
            this.filteredUsers = this.users.filter(user => {
                const value = this.searchText.toLowerCase();
                if (!value) return true;
                switch (this.selectedFilter) {
                    case 'Nombre Completo':
                        return user.name.toLowerCase().includes(value);
                    case 'Correo Electrónico':
                        return user.email.toLowerCase().includes(value);
                    case 'Rol':
                        return this.getRolText(user.id_role).toLowerCase().includes(value);
                    case 'Estado':
                        return this.getStatusText(user.status).toLowerCase().includes(value);
                    default:
                        return Object.values(user).some(val => val.toString().toLowerCase().includes(value));
                }
            })
        },
        getColor(status) {
            // Retorna el color basado en el estado del usuario
            return status === 1 ? 'green' : 'red';
        },
        getStatusText(status) {
            // Retorna el texto del estado del usuario
            return status === 1 ? 'Activo' : 'Inactivo';
        },
        getRolText(rol) {
            // Retorna el texto del rol del usuario
            return rol === 1 ? 'Administrador' : 'Cliente';
        },
        openEditDialog(user) {
            this.selectedUser = { ...user }; // Copia el usuario seleccionado
            this.editDialog = true; // Abre el diálogo de edición
        },
        async desActivateUser(item) {
            try {
                this.loading = true;
                const updateUser = {
                    id_user: item.id_user,
                    id_status: item.status === 1 ? 2 : 1,
                }
                const response = await UserServices.deleteUser(updateUser);
                if (response && response.statusCode === 200) {
                    await this.getUsers();
                }
            } catch (error) {
                this.loading = false;
            } finally {
                this.loading = false;
            }
            // Función para desactivar un usuario (implementación necesaria)
        }
    }
}
</script>

<style scope>
h1 {
    color: #000;
}
</style>