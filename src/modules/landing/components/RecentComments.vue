<template lang="">
    <v-container class="my-12">
        <h2 class="text-center">Comentarios recientes</h2>
        <div v-if="loading">
          <SkeletonComments/>
        </div>
        <div>
          <v-row>
            <v-col v-for="comment in comments" :key="comment.id_rate" cols="12" xl="4" lg="4" md="4" sm="6" xs="12">
              <v-hover
                v-slot="{ hover }"
              >
                <v-card
                  class="px-5"
                  :elevation="hover ? 16 : 2"
                  :class="{ 'on-hover': hover }"
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
                      <div class="d-flex align-center p-0">
                        <v-rating 
                          color="yellow darken-3" 
                          background-color="grey darken-1" 
                          empty-icon="$ratingFull" 
                          :value="comment.value" 
                          readonly
                          hover
                          dense
                        ></v-rating>
                      </div>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <div
                      class="text-subtitle-1 font-weight-bold "
                      v-text="comment.model"
                    ></div>
                    <div
                      class="text-subtitle-1 text--secondary text-truncate"
                      v-text="comment.comment"
                    ></div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </div>
    </v-container>
</template>
<script>
import LadingServices from '../LadingServices';
import SkeletonComments from './SkeletonComments.vue';
const { getAllRate } = LadingServices
export default {
    name: 'RecentComments',
  data() {
    return {
      comments: [],
      isDown: false,
      startX: 0,
      scrollLeft: 0,
      loading: true
    };
  },
  components: {
    SkeletonComments
  },
  async mounted() {
    this.allRate()
  },
  methods: {
    async allRate() {
      try {
        const {statusCode, data} = await getAllRate();
        if (statusCode === 200) {
          this.comments = data.slice(0,3);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false
      }
    },
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