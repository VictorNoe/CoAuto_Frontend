<template lang="">
    <div>
        <v-row
            v-if="statusLoading"
            class="fill-height"
            align-content="center"
            justify="center"
        >
            <v-col
                class="text-subtitle-1 text-center"
                cols="12"
            >
                Cargando reseñas
            </v-col>
            <v-col cols="6">
                <v-progress-linear
                    color="deep-purple accent-4"
                    indeterminate
                    rounded
                    height="6"
                ></v-progress-linear>
            </v-col>
        </v-row>
        <v-row
            v-if="!statusLoading && validateCount"
            class="fill-height"
            align-content="center"
            justify="center"
        >
            <v-col
                class="text-subtitle-1 text-center"
                cols="12"
            >
                No se han encontrado reseñas
            </v-col>
        </v-row>
        <v-row v-if="!statusLoading">
            <v-col
                v-for="(comment, index) in paginatedItems"
                :key="index"
                cols="12"
            >
                <v-card
                    class="px-5"
                    elevation="2"
                    outline
                >
                    <v-card-title>
                        <v-avatar
                            color="primary"
                            size="50"
                        >
                            <v-icon dark>mdi-account-circle</v-icon>
                        </v-avatar>
                        <div class="pl-3">
                            <div
                                class="text-subtitle-1 font-weight-bold "
                                v-text="comment.name + ' ' + comment.lastname"
                            ></div>
                            <div class="d-flex align-center">
                                <v-rating
                                    v-model="rating"
                                    color="#FDD836"
                                    length="1"
                                    size="1.5rem"
                                ></v-rating>
                                <div
                                    class="text-subtitle-1 text--secondary"
                                    v-text="comment.value"
                                ></div>
                            </div>
                        </div>
                        <v-row
                            align="center"
                            justify="end"
                        >
                            <v-btn
                                icon
                                color="red"
                                @click="openDialog(comment.id_rate)"
                            >
                                <v-icon dark>mdi-delete</v-icon>
                            </v-btn>
                        </v-row>
                    </v-card-title>
                    <v-card-actions :class="[comment.show && 'd-flex align-start']">
                        <div
                            :class="[!comment.show && 'text-truncate']"
                            class="text-subtitle-1 text--secondary"
                            v-text="comment.comment"
                        ></div>
                        <v-spacer></v-spacer>
                        <v-btn
                            icon
                            @click="comment.show = !comment.show"
                        >
                            <v-icon>{{ comment.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12">
                <div class="text-center">
                    <v-pagination
                        v-model="page"
                        :length="totalPages"
                        circle
                    ></v-pagination>
                </div>
            </v-col>
            <v-col>
                <v-row justify="center">
                    <v-dialog
                        v-model="dialog"
                        persistent
                        max-width="300"
                    >
                        <template>
                            <v-card :loading="loading">
                                <v-card-title class="text-h5">
                                    Eliminar comentario
                                </v-card-title>
                                <v-card-text>
                                    Si eliminas este comentario ya no podras volver a habilitarlo en ningun momento.
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn
                                        :disabled="loading"
                                        color="green darken-1"
                                        text
                                        @click="dialog = false"
                                    >
                                        Cancelar
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        :loading="loading"
                                        color="error darken-1"
                                        text
                                        @click="deleteRate()"
                                    >
                                        Eliminar
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </v-row>
            </v-col>
        </v-row>
    </div>
    
</template>
<script>
import RateServices from '../RateServices';
import Alert from '@/utils/Alert';
const { getByIdRate, deleteByIdRate } = RateServices;
export default {
    data() {
        return {
            id_delete: 0,
            page: 1,
            rating: 1,
            comments: [],
            itemsPerPage: 3,
            id_rate: 0,
            dialog: false,
            loading: false,
            statusLoading: true,
        }
    },
    created() {
        if (this.$route.params.id) {
            this.id_rate = this.$route.params.id
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.comments.length / this.itemsPerPage);
        },
        paginatedItems() {
            const start = (this.page - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.comments.slice(start, end) && this.comments.filter(comment => comment.status === 1);
        },
    },
    async mounted() {
        this.getAllByRate();
    },
    methods: {
        async getAllByRate() {
            try {
                const data = await getByIdRate(this.id_rate);
                if (data.data.statusCode === 200) {
                    this.comments = data.data.data.map(comment => ({
                        ...comment,
                        show: false,
                    }));
                }
            } catch (err) {
                console.error(err);
            } finally {
                this.statusLoading = false
                this.validateCount()
            }
        },
        async deleteRate() {
            try {
                this.loading = true
                this.statusLoading = true
                const data = await deleteByIdRate(this.id_delete);
                if (data.data.statusCode === 200) {
                    Alert.Toast("success", "Se elimino el comentario")
                    this.getAllByRate();
                } else {
                    Alert.Toast("success", "Error al eliminar el comentario")
                }
            } catch (err) {
                console.error(err);
            } finally {
                this.dialog = false
                this.loading = false
                this.statusLoading = false
            }
        },
        openDialog(id) {
            this.dialog = !this.dialog
            this.id_delete = id
        },
        validateCount() {
            const counter = this.comments.filter(comment => comment.status === 1);
            return counter.length === 0;
        }
    },
};
</script>
<style lang="">
</style>