<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">IAmConfused - Career Finder</h1>

    <!-- Input Section -->
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <Multiselect
        v-model="selectedSkills"
        :options="allSkills"
        placeholder="Select your skills"
        multiple
        :close-on-select="false"
        :clear-on-select="false"
        class="w-full"
      />

      <Multiselect
        v-model="selectedInterests"
        :options="allInterests"
        placeholder="Select your interests"
        multiple
        :close-on-select="false"
        :clear-on-select="false"
        class="w-full"
      />
      <button
        @click="searchCareers"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>

    <!-- Results Section -->
    <div v-if="filteredJobs.length">
      <h2 class="text-xl font-semibold mb-4">Suggested Careers</h2>
      <ul class="space-y-4">
        <li
          v-for="job in filteredJobs"
          :key="job.id"
          class="border p-4 rounded hover:shadow-md cursor-pointer"
        >
          <h3 class="font-bold text-lg">{{ job.title }}</h3>
          <p><strong>Skills:</strong> {{ job.skills.join(', ') }}</p>
          <p><strong>Interests:</strong> {{ job.interests.join(', ') }}</p>
        </li>
      </ul>
    </div>

    <div v-else>
      <p class="text-gray-500">No results found. Try different skills or interests.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import jobs from './data/jobs.json'

// Reactive selections
const selectedSkills = ref([])
const selectedInterests = ref([])

// Extract all unique skills and interests
const allSkills = ref([...new Set(jobs.flatMap((job) => job.skills))])
const allInterests = ref([...new Set(jobs.flatMap((job) => job.interests))])

// Filtered results (reactive)
const filteredJobs = ref([])

// Filter careers based on selected skills/interests
function searchCareers() {
  filteredJobs.value = jobs.filter(
    (job) =>
      job.skills.some((skill) => selectedSkills.value.includes(skill)) ||
      job.interests.some((interest) => selectedInterests.value.includes(interest)),
  )
}
</script>

<style scoped></style>
