<template>
    <v-container class="my-12 d-flex align-center justify-center">
        <v-row class="d-flex justify-center">
            <v-col cols="12" md="6" >
                <h1 class="my-8">Empezar el día nunca se ha sentido mejor.</h1>
                <p class="my-8">¡Descubre todos los vehículos de tu interés, con la información más detallada en el mercado!</p>
                <div class="my-8 text-center" >
                    <v-btn color="primary" dark @click="car()">Descubre ahora</v-btn>
                </div>
            </v-col>
            <v-col cols="12" md="6" >
                <v-img 
                    src="../../../assets/svg/undraw_file_searching_re_3evy.svg" 
                    alt="Home Image"
                    max-width="398.9"
                    max-height="428.28"
                ></v-img>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    methods: {
        car() {
            this.$router.push({ name: 'vehicles_search' });
        }
    },
}
</script>
<style scope>
h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2570EB;
}

p {
  font-size: 1.25rem;
  margin: 1rem 0;
}
</style>