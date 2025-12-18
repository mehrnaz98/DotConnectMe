<template>
  <div class="min-h-screen flex flex-col bg-white text-[#1A1A1A]">
    <Navbar />
    <AppHero />
    <IkigaiSection />

    <section class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 px-6 py-10 max-w-7xl mx-auto">
      <div>
        <CareerFilter
          :all-skills="allSkills"
          :all-interests="allInterests"
          @search="searchCareers"
        />

        <CareerResults :jobs="filteredJobs" @select="selectJob" />
      </div>

      <CareerDetails :job="selectedJob" />
    </section>

    <AboutSection />
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import jobs from './data/jobs.json'

import Navbar from './components/Navbar.vue'
import AppHero from './components/AppHero.vue'
import IkigaiSection from './components/IkigaiSection.vue'
import CareerFilter from './components/CareerFilter.vue'
import CareerResults from './components/CareerResults.vue'
import CareerDetails from './components/CareerDetails.vue'
import AboutSection from './components/AboutSection.vue'
import AppFooter from './components/AppFooter.vue'

const selectedSkills = ref([])
const selectedInterests = ref([])
const filteredJobs = ref([])
const selectedJob = ref(null)

const allSkills = [...new Set(jobs.flatMap((j) => j.skills))]
const allInterests = [...new Set(jobs.flatMap((j) => j.interests))]

function searchCareers({ skills, interests }) {
  selectedSkills.value = skills
  selectedInterests.value = interests

  filteredJobs.value = jobs.filter(
    (job) =>
      job.skills.some((s) => skills.includes(s)) &&
      job.interests.some((i) => interests.includes(i)),
  )

  selectedJob.value = null
}

function selectJob(job) {
  selectedJob.value = job
}
</script>
