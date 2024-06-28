<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-row>
      <v-col cols="12" md="6" class="d-flex justify-center d-sm-none">
        <v-img class="bg-white" src="../../assets/svg/coauto-logo.svg" max-height="58.6" max-width="135.64"></v-img>
      </v-col>
      <v-col cols="12" md="6" class="align-self-center">
        <v-form @submit.prevent="submit" class="form-container">
          <v-container>
            <v-row>
              <v-col cols=12>
                <FromResgister />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
      <v-col cols="12" md="6" class="align-self-center d-none d-md-block">
        <v-img class="bg-white" src="../../assets/svg/undraw_meet_the_team_re_4h08.svg"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FromResgister from './components/FromResgister.vue'
export default {
  components: {
    FromResgister,
  }
}
</script>
