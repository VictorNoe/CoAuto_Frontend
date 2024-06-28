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
                <v-img :src="'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'" height="280px" contain></v-img>                
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
            exampleVehicle:
            {
                id: 1,
                model: 'New SM5',
                brand: 'Toyota',
                price: '$79,999.99',
                description: 'New SM5 nos da una probadita de su nuevo lanzamiento en México...',
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