<template>
    <v-container>
        <div>
            <v-breadcrumbs
                large
                :items="items"
                divider=">"
            >
            </v-breadcrumbs>
        </div>

        <v-row v-if="isLoading" class="d-flex text-center justify-center align-center" style="height: 300px;">
            <v-col>
                <v-progress-circular indeterminate></v-progress-circular>
            </v-col>
        </v-row>

        <template v-else>
            <v-row class="mb-8">
                <v-col cols="12" sm="7">
                    <v-row>
                        <v-col sm="12" md="2">
                            <v-row>
                                <v-col cols="4" sm="3" md="12" v-for="(image, i) in limitedItems" :key="i">
                                    <div class="responsive-img-wrapper">
                                        <v-img
                                            :src="image"
                                            v-bind:class="[outOfRangeImages && i == 3 ? 'image-thumbnail blur-img' : 'image-thumbnail']"
                                            @click.stop="() => { dialog = true; imgIndex = i }"
                                            @mouseover="imagesIndex = i"
                                        >
                                            <h1 v-if="i == 3 && outOfRangeImages">
                                                + {{ outOfRangeImages }}
                                            </h1>
                                        </v-img>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col sm="12" md="10">
                            <v-carousel hide-delimiters v-model="imagesIndex" height="">
                                <v-carousel-item
                                    v-for="(image, i) in exampleVehicle.images"
                                    :key="i"
                                    :src="image"
                                    @click.stop="() => { dialog = true; imgIndex = i }"
                                ></v-carousel-item>
                            </v-carousel>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" sm="5">
                    <v-card elevation="0" class="info-card">
                        <h1 class="heading">{{ exampleVehicle.model }}</h1>
                        <div class="rate-container my-4">
                            <v-icon large color="yellow">
                                mdi-star
                            </v-icon>
                            <h3 class="rate-font ms-1">
                                {{ rate ? rate + '/ 5.0' : 'Sin reseñas' }}
                            </h3>
                        </div>
                        <h2>
                            ${{ exampleVehicle.price }}
                        </h2>
                        {{ exampleVehicle.description }}
                    </v-card>
                </v-col>
            </v-row>

            <v-card class="my-4" flat>
                <v-row class="d-flex justify-space-between">
                    <v-col cols="12" sm="6">
                        <v-list class="font-bold">
                            <v-list-item class="stripped">
                                <v-list-item-title class="d-flex justify-space-between">
                                    <div class="w-100">Modelo</div>
                                    <div class="w-100">{{ exampleVehicle.model }}</div>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title class="d-flex justify-space-between">
                                    <div class="w-100">Marca</div>
                                    <div class="w-100">{{ exampleVehicle.brand }}</div>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item class="stripped">
                                <v-list-item-title class="d-flex justify-space-between">
                                    <div class="w-100">Año</div>
                                    <div class="w-100">{{ exampleVehicle.year }}</div>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title class="d-flex justify-space-between">
                                    <div class="w-100">Tipo</div>
                                    <div class="w-100">{{ exampleVehicle.type }}</div>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-list class="font-bold">
                            <v-list-item class="stripped">
                                <v-list-item-title class="d-flex justify-space-between">
                                    <div class="w-100">Combustible</div>
                                    <div class="w-100">{{ exampleVehicle.fuel }}</div>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title class="d-flex justify-space-between">
                                    <div class="w-100">Puertas</div>
                                    <div class="w-100">{{ exampleVehicle.doors }}</div>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item class="stripped">
                                <v-list-item-title class="d-flex justify-space-between">
                                    <div class="w-100">Motor</div>
                                    <div class="w-100">{{ exampleVehicle.engine }}</div>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title class="d-flex justify-space-between">
                                    <div class="w-100">Medidas (mm)</div>
                                    <div class="w-100">{{ exampleVehicle.length }} x {{ exampleVehicle.height }} x {{ exampleVehicle.width }}</div>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-card>
            <h1 class="subheading">
                Reseñas
            </h1>
            <v-list>
                <v-list-item>
                    <div class="w-100 my-4 pa-2 default-comment-card" v-if="comments.length === 0">
                        <v-card-title>
                            UPS!
                        </v-card-title>
                        <v-card-subtitle class="rate-font">
                            Parece que nadie ha dejado reseñas.
                        </v-card-subtitle>
                    </div>
                </v-list-item>
                <v-list-item v-for="(comment, i) in paginatedItems" :key="i">
                    <v-card class="w-100 my-4 pa-4">
                        <v-row align="center">
                            <v-col cols="1" class="pa-8 d-flex justify-center">
                                <v-avatar size="40">
                                    <img
                                        src="https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png"
                                        alt="User avatar"
                                    />
                                </v-avatar>
                            </v-col>
                            <v-col cols="10">
                                <v-card-title class="pa-0">
                                    {{ comment.name }} {{ comment.lastname }}
                                </v-card-title>
                                <v-rating
                                    empty-icon="$ratingFull"
                                    color="yellow darken-3"
                                    background-color="grey darken-1"
                                    size="21"
                                    :value="comment.value"
                                    readonly
                                ></v-rating>
                            </v-col>
                        </v-row>
                        <v-row class="pa-4">
                            <div>{{ comment.comment }}</div>
                        </v-row>
                    </v-card>
                </v-list-item>
            </v-list>
            <v-pagination
                v-model="page"
                :length="pageCount"
                :total-visible="5"
                class="mt-2 mb-6"
            ></v-pagination>
            <v-card class="mx-4 my-6 pa-4">
                <v-row>
                    <v-col cols="12" md="9" class="d-flex">
                        <v-avatar>
                            <img :src="user.imageProfile ? user.imageProfile : 'https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png'" alt="alt">
                        </v-avatar>
                        <v-card-title primary-title>
                            {{ user.name }}
                        </v-card-title>
                    </v-col>
                    <v-col cols="12" md="3" class="align-content-center">
                        <v-rating
                            v-if="own_comment_index === -1"
                            color="yellow darken-3"
                            background-color="grey darken-1"
                            empty-icon="$ratingFull"
                            hover
                            length="5"
                            size="21"
                            v-model="comment.value"
                        ></v-rating>
                        <v-rating
                        v-if="own_comment_index !== -1"
                        color="yellow darken-3"
                        background-color="grey darken-1"
                        empty-icon="$ratingFull"
                        hover
                        length="5"
                        size="21"
                        readonly
                        v-model="comment.value"
                    ></v-rating>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-textarea
                            :rules="commentRules"
                            v-model="comment.comment"
                            label="Comentario"
                            auto-grow
                            outlined
                            :disabled="commentLoading || own_comment_index != -1"
                        >
                        </v-textarea>
                    </v-col>
                </v-row>
                <div class="w-100 d-flex my-4">
                    <v-btn
                        color="primary"
                        class="ms-auto"
                        :disabled="!validForm || own_comment_index !== -1"
                        @click="rateCar"
                        :loading="commentLoading"
                    >Comentar</v-btn>
                </div>
            </v-card>
        <h1 class="subheading">
            Más vehículos
        </h1>
        <div class="w-100 list-vehicles d-flex overflow-auto">
            <v-card 
                class="card-vehicle" 
                v-for="(vehicle, index) in vehicles" 
                :key="index" 
                @click="redirectCar(vehicle.id_auto)" 
            >
                <v-img :src="vehicle.images[0]" height="150px" contain></v-img>
                <v-card-title>{{ vehicle.model }}</v-card-title>
                <v-card-subtitle>{{ vehicle.brand }}</v-card-subtitle>
                <v-card-text>
                    <p class="font-weight-bold p-color">{{ vehicle.price }}</p>
                    <p>{{ vehicle.description.slice(0,20) }}...3</p>
                </v-card-text>
            </v-card>
        </div>


        </template>
    </v-container>
</template>

<script>
import service from './DetailsCarService';
export default {
    name: 'DetailsCar',
    data() {
        return {
            imagesIndex: 0,
            items: [
                {
                    text: 'Explorar',
                    disabled: false,
                    href: '/vehicles_search'
                },
                {
                    text: 'Detalles',
                    disabled: true,
                }
            ],
            exampleVehicle: {
                id_auto: 0,
                model: '',
                brand: '',
                price: '',
                description: '',
                doors: 0,
                fuel: '',
                height: 0,
                width: 0,
                length: 0,
                type: '',
                year: 0,
                status: 1,
                images: [],
                engine: '',
            },
            user: {
                profileImage: null,
                name: '',
                email:  ''
            },
            page: 1,
            itemsPerPage: 3,
            rate: 0.0,
            comments: [],
            comment: {
                value: 0,
                comment: '',
                id_auto: 0,
                id_user: 0
            },
            dialog: false,
            imgIndex: 0,
            vehicles: [],
            commentLoading: false,
            carLoading: false,
            commentsLoading: false,
            allCarsLoading: false,
            own_comment_index: -1,
        }
    },
    methods: {
        redirectCar(vehicleId) {
            this.$router.push({ name: 'details_car', params: { id: vehicleId } }).then(() => {
                window.location.reload();
            });
        },
        getMeanRate() {
            this.comments.forEach(comment => {
                this.rate += comment.value;
            });
            this.rate = Number.parseFloat(this.rate / this.comments.length).toFixed(1);
        },
        getOwnComment() {
            this.own_comment_index = this.comments.map(c => c.email).indexOf(this.user.email);
            if (this.own_comment_index != -1) {
                this.comment = this.comments[this.own_comment_index];
            }
        },
        async getCar() {
            this.carLoading = true;
            try {
                const id = this.$route.params.id;
                const response = await service.getCar(id);
                this.exampleVehicle = response.data[0];
                if (this.exampleVehicle.status !== 1) {
                    this.$router.push('/vehicles_search');
                    return;
                }
                this.comments = this.exampleVehicle.reviews;
                if (this.comments && this.comments.length > 0) {
                    this.getMeanRate();
                    this.getOwnComment();
                }

                const responseGetAll = await service.getAllCars();
                this.vehicles = responseGetAll.data.filter(vehicle => vehicle.status === 1).filter(vehicle => vehicle.id_auto.toString() !== id).slice(0, 5); 
            } catch (error) {
                console.error(error);
            } finally {
                this.carLoading = false;
            }
        },
        async getComments() {
            this.commentsLoading = true;
            try {
                const id = this.$route.params.id;
                const response = await service.getComments(id);
                this.comments = response.data;
                if (this.comments.length > 0) {
                    this.getMeanRate();
                    this.getOwnComment();
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.commentsLoading = false;
            }
        },
        async rateCar() {
            try {
                if (this.validForm) {
                    this.commentLoading = true;
                    const payload = {
                        value: '' + this.comment.value,
                        comment: this.comment.comment,
                        id_auto: this.$route.params.id
                    };
                    await service.rate(payload);
                }
            } catch (error) {
                throw new Error(error.message);
            } finally {
                this.commentLoading = false;
                this.getComments();
            }
        },
        async getUser() {
            try {
                this.user = await service.getUser();
            } catch (error) {
                console.error(error);
            }
        }
    },
    computed: {
        isLoading() {
            return  this.carLoading || this.commentsLoading || this.allCarsLoading;
        },
        limitedItems() {
            return this.exampleVehicle.images.slice(0, 4);
        },
        outOfRangeImages() {
            return this.exampleVehicle.images.length - 4;
        },
        pageCount() {
            return Math.ceil(this.comments.length / this.itemsPerPage);
        },
        paginatedItems() {
            const start = (this.page - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.comments.slice(start, end);
        },
        commentRules() {
            return [
                value => !!value || 'El comentario debe incluir una opinión.',
                value => /^[a-zA-Z0-9\s.,;:?!¡¿áéíóúÁÉÍÓÚñÑ]+$/.test(value) || 'El comentario no admite caracteres especiales.',
                value => value.trim() !== '' || '🤨🤨🤨'
            ];
        },
        validForm() {
            return (
                this.comment.comment !== '' &&
                this.comment.comment.trim() !== '' &&
                /^[a-zA-Z0-9\s.,;:?!¡¿áéíóúÁÉÍÓÚñÑ]+$/.test(this.comment.comment) &&
                this.comment.value > 0
            );
        }
    },
    mounted() {
        this.getCar();
        this.getUser();
    }
};

</script>
<style scoped>
.heading {
    color: #22272F;
    size: 3rem;
    font-weight: 450;
}

.subheading {
    color: #22272F;
    font-size: 2rem;
    font-weight: 450;
    margin: 1em 0 1em 0;
}

.rate-container {
    display: flex;
    align-items: center;
}

.rate-font {
    color: #777A8B;
}

.info-card {
    display: flex;
    flex-direction: column;
    justify-content: start;
}

.images-container {
    height: 100%;
    overflow: auto;
}

.image-thumbnail {
    cursor: pointer;
}

.blur-img h1 {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #ffffff73;
    align-items: center;
}

.d-flex {
    display: flex;
}

.w-100 {
    width: 100%;
}

.font-bold {
    font-weight: bold;
}

.stripped {
    background-color: #eceef2;
}

.align-self-start {
    align-self: flex-start;
}

.no-margin {
    margin: 0 !important;
}

.image-zoom {
    position: relative;
}

.align-content-center {
    align-content: center;
}

.box-comment {
    box-sizing: border-box;
    height: 10em;
}

.comment-textarea {
    resize: none;
    width: 100%;
    outline: none;
    height: 100%;
}

.list-vehicles {
    display: flex;
    overflow: auto;
    margin: 1em 0 0 0;
}

.card-vehicle {
    margin: 0 1em 0 1em;
    cursor: pointer;
    display: inline-block;
    margin-right: 10px;
    width: 250px;
}

.default-comment-card {
    border: 1px solid #DCDCDC;
    border-radius: .5em;
}
</style>