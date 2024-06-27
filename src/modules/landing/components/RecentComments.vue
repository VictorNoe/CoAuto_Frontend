<template lang="">
    <v-container class="my-12">
        <h2 class="text-center">Comentarios recientes</h2>
        <v-row>
            <v-col v-for="comment in comments" :key="comment.id" cols="12" sm="4">
                <v-card>
                <v-card-title>
                    <v-avatar size="40">
                    <img :src="comment.avatar" alt="Avatar">
                    </v-avatar>
                    <span class="ml-3">{{ comment.name }}</span>
                </v-card-title>
                <v-card-subtitle>{{ comment.model }}</v-card-subtitle>
                <v-card-text>
                    <v-rating color="yellow" :value="comment.rating" readonly></v-rating>
                    <p>{{ comment.text }}</p>
                </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name: 'RecentComments',
  data() {
    return {
      comments: [
        {
          id: 1,
          name: 'Karel Salgado',
          model: 'New SM5',
          rating: 3,
          text: 'New SM5 nos da una probadita de su nuevo lanzamiento en México...',
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
        },
        {
          id: 2,
          name: 'Karel Salgado',
          model: 'New SM5',
          rating: 3,
          text: 'New SM5 nos da una probadita de su nuevo lanzamiento en México...',
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
        },
        {
          id: 3,
          name: 'Karel Salgado',
          model: 'New SM5',
          rating: 3,
          text: 'New SM5 nos da una probadita de su nuevo lanzamiento en México...',
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
        }
      ]
    };
  }
}
</script>
<style scope>
h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}
</style>