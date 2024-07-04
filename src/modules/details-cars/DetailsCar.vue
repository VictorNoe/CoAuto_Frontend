<template lang="">
    <v-container>        
        <div>
            <v-breadcrumbs
            large
            :items="items"
            divider=">"
            >
            </v-breadcrumbs>
        </div>
        <v-row class="mb-8">
            <v-col cols="12" sm="7">
                <v-row>
                    <v-col sm="12" md="2">
                        <v-row>
                            <v-col cols="4" sm="3" md="12" v-for="(image, i) in limitedItems" :key="i"                        
                            >
                            <div class="responsive-img-wrapper">
                                <v-img
                                :src="image.src"
                                v-bind:class="[outOfRangeImages && i == 3 ? 'image-thumbnail blur-img': 'image-thumbnail']"
                                @click.stop="() => {dialog = true; imgIndex = i}"
                                >
                                <h1
                                v-if="i == 3 && outOfRangeImages"
                                >
                                    + {{ outOfRangeImages}}
                                </h1>
                                </v-img>
                            </div>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col sm="12" md="10">
                        <v-carousel hide-delimiters v-model="imagesIndex"
                        height=""
                        >
                            <v-carousel-item
                            v-for="(image,i) in images"
                            :key="i"
                            :src="image.src"
                            @click.stop="() => {dialog = true; imgIndex = i}"
                            ></v-carousel-item>
                        </v-carousel>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" sm="5">
                <v-card elevation="0" class="info-card">
                    <h1 class="heading">{{ exampleVehicle.model }}</h1>
                    <div class="rate-container my-4" >
                        <v-icon
                        large
                        color="yellow"
                        >
                            mdi-star
                        </v-icon>
                        <h3 class="rate-font ms-1">
                            {{ rate }} / 5.0
                        </h3>
                    </div>
                    <h2>
                        {{ exampleVehicle.price }}
                    </h2>
                    {{exampleVehicle.description}}
                </v-card>
            </v-col>
        </v-row>
        <v-card class="my-4" flat >
            <v-row class="d-flex justify-space-between">
                <v-col cols="12" sm="6">
                    <v-list class="font-bold">
                        <v-list-item class="stripped">
                            <v-list-item-title class="d-flex justify-space-between">
                                <div class="w-100">Modelo</div>
                                <div class="w-100">A5</div>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title class="d-flex justify-space-between">
                                <div class="w-100">Marca</div>
                                <div class="w-100">Audi</div>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item class="stripped">
                            <v-list-item-title class="d-flex justify-space-between">
                                <div class="w-100">Año</div>
                                <div class="w-100">2010</div>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title class="d-flex justify-space-between">
                                <div class="w-100">Tipo</div>
                                <div class="w-100">Electrico</div>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-list class="font-bold">
                        <v-list-item class="stripped">
                            <v-list-item-title class="d-flex justify-space-between">
                                <div class="w-100">Combustible</div>
                                <div class="w-100">Electrico</div>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title class="d-flex justify-space-between">
                                <div class="w-100">Puertas</div>
                                <div class="w-100">4</div>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item class="stripped">
                            <v-list-item-title class="d-flex justify-space-between">
                                <div class="w-100">Motor</div>
                                <div class="w-100">V6</div>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title class="d-flex justify-space-between">
                                <div class="w-100">Medidas</div>
                                <div class="w-100">4.697 x 1.384 x 2.764</div>
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
            <v-list-item v-for="(comment, i) in comments" :key="i">
                <v-card class="w-100 my-4 pa-3">
                    <v-row>
                        <v-col cols="1">
                            <v-avatar
                            >
                                <img :src="comment.user.img" alt="alt">
                            </v-avatar>
                        </v-col>
                        <v-col cols="11">
                            <div>
                                <v-card-title class="pa-0">
                                    {{comment.user.name}}
                                </v-card-title>
                                <v-rating
                                empty-icon="$ratingFull"
                                color="yellow darken-3"
                                background-color="grey darken-1"
                                size="21"
                                :value="comment.value"
                                readonly
                                ></v-rating>
                            </div>
                        </v-col>
                    </v-row>


                </v-card>
            </v-list-item>
        </v-list>
        <v-dialog
        v-model="dialog"
        content-class="no-boxShadow"      
        >
            <v-row class="no-margin justify-center">
                <v-col cols="12" md="8  ">
                    <v-card style="margin:0">
                        <v-carousel hide-delimiters v-model="imgIndex"
                        height=""
                            >
                            <v-carousel-item
                            v-for="(image, i) in images"
                            :key="i"
                            :src="image.src"
                            ></v-carousel-item>
                        </v-carousel>
                    </v-card>
                </v-col>
            </v-row>
        </v-dialog>
    </v-container>
</template>
<script>
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
            images: [
                {
                    src: 'https://wallpapercave.com/wp/XtJjBZT.jpg',
                    i: 0,                    
                },
                {
                    src: 'https://wallpapercave.com/wp/toBW8HX.jpg',
                    i: 1,
                },
                {
                    src: 'https://wallpapercave.com/wp/jLYUjUj.jpg',
                    i: 2,
                },
                {
                    src: 'https://wallpapercave.com/wp/tvlmgf1.jpg',
                    i: 3,
                },
                {
                    src: 'https://wallpapercave.com/wp/yzkqOsa.jpg',
                    i: 3,
                },

                
            ],            
            exampleVehicle:
            {
                id: 1,
                model: 'A5',
                brand: 'Audi',
                price: '$79,999.99',
                description: 'Osea es audi compralo pobre',
                image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
            },
            rate: 4.8,
            comments:[
                {
                    user: {
                        img: 'https://cdn-icons-png.freepik.com/512/145/145894.png',
                        name: 'Karel Salgado'
                    },
                    value: 3,
                    body: "asomre que pinshi carro tan brgas, psss es audi nmms que riko"
                },
                {
                    user: {
                        img: 'https://cdn-icons-png.freepik.com/512/145/145894.png',
                        name: 'Karel Salgado'
                    },
                    value: 3,
                    body: "Nullam sed nisl ut nisl congue eleifend efficitur a tellus. Suspendisse interdum rhoncus luctus. Morbi vel elit sodales, luctus massa et, condimentum velit. Proin eu lobortis velit, rhoncus placerat velit. Vivamus risus odio, finibus vitae nunc sit amet, elementum sodales quam. Curabitur aliquet non sem at malesuada. Nullam commodo mi sit amet risus vestibulum varius. Donec purus velit, eleifend eu congue non, mattis finibus est. Maecenas sit amet sem arcu. Praesent at commodo mi. Proin in felis ac eros posuere dignissim at a urna."
                },
                {
                    user: {
                        img: 'https://cdn-icons-png.freepik.com/512/145/145894.png',
                        name: 'Karel Salgado'
                    },
                    value: 3,
                    body: "asomre que pinshi carro tan brgas, psss es audi nmms que riko"
                },
            ]
            ,
            dialog: false,
            imgIndex: 0,
        }
    },
    computed: {
        limitedItems() {
            return this.images.slice(0,4);
        },
        outOfRangeImages() {
            return this.images.length - 4;
        },
    }
}
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

.blur-img h1{
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


</style>