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
        <v-row>
            <v-col sm="12" md="6">
                <v-carousel hide-delimiters>
                    <v-carousel-item
                    v-for="(image,i) in images"
                    :key="i"
                    :src="image.src"
                    ></v-carousel-item>
                </v-carousel>
            </v-col>
            <v-col sm="12" md="6" >
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
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name: 'DetailsCar',
    data() {
        return {
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
                    src: 'https://wallpapercave.com/wp/XtJjBZT.jpg'
                },
                {
                    src: 'https://wallpapercave.com/wp/toBW8HX.jpg'
                },
                {
                    src: 'https://wallpapercave.com/wp/jLYUjUj.jpg'
                },
                {
                    src: 'https://wallpapercave.com/wp/WddMJvc.jpg'
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
            rate: 4.8
        }
    }
}
</script>
<style scoped>
.heading {
    color: #22272F;
    size: 3rem;
    font-weight: 450;
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
</style>