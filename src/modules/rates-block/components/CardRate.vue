<template lang="">
    <v-row>
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
                            @click="alert(comment.id_rate)"
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
    </v-row>
</template>
<script>
import RateServices from '../RateServices';
import Alert from '@/utils/Alert';
const { getByIdRate } = RateServices;
export default {
    data() {
        return {
            page: 1,
            rating: 1,
            comments: [],
            itemsPerPage: 3,
            id_rate: 0,
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
            return this.comments.slice(start, end);
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
            }
        },
        alert(id) {
            Alert.Toast("info", id)
        },
    },
};
</script>
<style lang="">
</style>