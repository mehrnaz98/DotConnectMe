<template>
  <!-- IKIGAI SECTION -->
  <section class="px-6 py-16 max-w-5xl mx-auto bg-gray-50 rounded-xl shadow">
    <IkigaiSection v-model:selectedCareers="suggestedCareers" />
  </section>

  <!-- CAREER RESULTS -->
  <section
    v-if="suggestedCareers.length"
    class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 px-6 py-10 max-w-7xl mx-auto"
  >
    <div>
      <CareerResults :jobs="suggestedCareers" @select="selectJob" />
    </div>

    <CareerDetails :job="selectedJob" />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import CareerResults from '../components/CareerResults.vue'
import CareerDetails from '../components/CareerDetails.vue'
import IkigaiSection from '../components/IkigaiSection.vue'

const suggestedCareers = ref([]) // will get data from IkigaiSection
const selectedJob = ref(null) // job selected from CareerResults

function selectJob(job) {
  selectedJob.value = job
}
</script>
