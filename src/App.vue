<template>
  <main>
    <h1>IAmConfused</h1>
    <p>Find careers that match your skills and interests.</p>

    <div>
      <label>Skills</label>
      <input v-model="skillsInput" placeholder="e.g. coding, design, writing" />

      <label>Interests</label>
      <input v-model="interestsInput" placeholder="e.g. AI, environment, teaching" />

      <button @click="searchCareers">Search</button>
    </div>

    <div>
      <h2>Results</h2>
      <p>No results yet.</p>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import jobs from './data/jobs.json'

const skillsInput = ref('')
const interestsInput = ref('')

const filteredJobs = ref([...jobsData])

function searchCareers() {
  filteredJobs.value = jobs.filter(
    (job) =>
      job.skills.some((skill) => skill.toLowerCase().includes(skillsInput.value.toLowerCase())) |
      job.interests.some((interest) =>
        interest.toLowerCase().includes(interestsInput.value.toLowerCase()),
      ),
  )
}
</script>

<style scoped>
/* Tailwind used, so no extra styles yet */
</style>
