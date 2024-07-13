<template lang="">
    <v-container class="my-12">
        <h2 class="text-center">Comentarios recientes</h2>
        <v-row>
            <v-col v-for="comment in comments" :key="comment.id_rate" cols="12" xl="3" lg="4" md="4" sm="6" xs="12">
                <v-card>
                    <v-card-title>
                        <v-avatar size="50">
                          <img :src="comment.profile_image" alt="Avatar">
                        </v-avatar>
                        <span class="ml-4">{{ comment.name }}</span>
                    </v-card-title>
                    <v-card-subtitle>{{ comment.model }}</v-card-subtitle>
                    <v-card-text>
                        <v-rating color="yellow darken-3" background-color="grey darken-1" empty-icon="$ratingFull" :value="comment.value" readonly></v-rating>
                        <p>{{ comment.comment }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import LadingServices from '../LadingServices';
const { getAllRate } = LadingServices
export default {
    name: 'RecentComments',
  data() {
    return {
      comments: []
    };
  },
  async mounted() {
    this.allRate()
  },
  methods: {
    async allRate() {
      try {
        const {statusCode, data} = await getAllRate();
        if (statusCode === 200) {
          this.comments = data;
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
}
</script>
<style scope>
h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}
</style>