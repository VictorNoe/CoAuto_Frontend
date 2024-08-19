<template>
    <v-row>
        <v-col v-for="n in 3" :key="n" cols="12" xl="4" lg="4" md="4" sm="6" xs="12">
            <v-sheet class="pa-0">
                <v-skeleton-loader v-bind="attrs" class="mx-auto" max-width="300" type="list-item-avatar-two-line, list-item-two-line"></v-skeleton-loader>
            </v-sheet>
        </v-col>
    </v-row>
</template>
<script>
export default {
    data() {
        return {
            attrs: {
                class: 'mb-6',
                boilerplate: false,
                elevation: 2,
            },
        }
    },
}
</script>