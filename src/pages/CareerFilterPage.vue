<template>
  <section class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 px-6 py-10 max-w-7xl mx-auto">
    <div>
      <CareerFilter
        :all-skills="allSkills"
        :all-interests="allInterests"
        :preselected-interests="selectedInterests"
        @search="searchCareers"
      />

      <CareerResults :jobs="filteredJobs" @select="selectJob" />
    </div>

    <CareerDetails :job="selectedJob" />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import jobs from '../data/jobs.json'
import CareerFilter from '../components/CareerFilter.vue'
import CareerResults from '../components/CareerResults.vue'
import CareerDetails from '../components/CareerDetails.vue'

const route = useRoute()

const selectedSkills = ref([])
const selectedInterests = ref([])
const filteredJobs = ref([])
const selectedJob = ref(null)

const allSkills = [...new Set(jobs.flatMap((j) => j.skills))]
const allInterests = [...new Set(jobs.flatMap((j) => j.interests))]

// Preselect interests from query
onMounted(() => {
  if (route.query.interests) {
    const preselected = route.query.interests.split(',')
    selectedInterests.value = allInterests.filter((i) => preselected.includes(i))
    // Automatically search with preselected interests
    searchCareers({ skills: [], interests: selectedInterests.value })
  }
})

function searchCareers({ skills, interests }) {
  selectedSkills.value = skills
  selectedInterests.value = interests

  const bestMatches = jobs.filter(
    (job) =>
      skills.length > 0 &&
      interests.length > 0 &&
      job.skills.some((s) => skills.includes(s)) &&
      job.interests.some((i) => interests.includes(i)),
  )

  const skillOnlyMatches = jobs.filter(
    (job) =>
      skills.length > 0 &&
      job.skills.some((s) => skills.includes(s)) &&
      !job.interests.some((i) => interests.includes(i)),
  )

  const interestOnlyMatches = jobs.filter(
    (job) =>
      interests.length > 0 &&
      job.interests.some((i) => interests.includes(i)) &&
      !job.skills.some((s) => skills.includes(s)),
  )

  filteredJobs.value = [
    ...bestMatches.map((j) => ({ ...j, matchType: 'best' })),
    ...skillOnlyMatches.map((j) => ({ ...j, matchType: 'skill' })),
    ...interestOnlyMatches.map((j) => ({ ...j, matchType: 'interest' })),
  ]

  // Do NOT auto-select first job
  selectedJob.value = null
}

function selectJob(job) {
  selectedJob.value = job
}
</script>
