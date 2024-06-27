<template lang="">
    <div>
        <HomeSection/>
        <CommunitySection />
        <RecentComments />
        <RecentVehicles />
    </div>
</template>
<script>
import HomeSection from './components/HomeSection.vue'
import CommunitySection from './components/CommunitySection.vue'
import RecentComments from './components/RecentComments.vue'
import RecentVehicles from './components/RecentVehicles.vue'
export default {
    components: {
        HomeSection,
        CommunitySection,
        RecentComments,
        RecentVehicles,
    }
}
</script>
<style scope>
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
}
</style>