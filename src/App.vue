<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">IAmConfused - Career Finder</h1>

    <!-- Input Section -->
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <input
        v-model="skillsInput"
        type="text"
        placeholder="Enter your skills"
        class="border p-2 rounded w-full"
      />
      <input
        v-model="interestsInput"
        type="text"
        placeholder="Enter your interests"
        class="border p-2 rounded w-full"
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

// Inputs
const skillsInput = ref('')
const interestsInput = ref('')

// Filtered results (reactive)
const filteredJobs = ref([])

// Function to filter careers
function searchCareers() {
  filteredJobs.value = jobs.filter(
    (job) =>
      job.skills.some((skill) => selectedSkills.value.includes(skill)) ||
      job.interests.some((interest) => selectedInterests.value.includes(interest)),
  )
}
</script>

<style scoped></style>
