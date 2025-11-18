<template>
  <div class="p-6 max-w-4xl mx-auto">
    <!-- Navigation Bar -->
    <nav class="flex items-center justify-between p-4 bg-white shadow-md">
      <div class="text-xl font-bold text-blue-900">IAmConfused</div>
      <ul class="flex gap-6">
        <li>Home</li>
        <li>About</li>
        <li>How It Works</li>
        <li>Contact</li>
      </ul>
      <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Get Started
      </button>
    </nav>

    <!-- Hero Section -->
    <div class="flex">
      <div>
        <h1 class="text-3xl font-bold mb-6 text-center">Find your path.<br />Finally.</h1>
        <p>
          A simple tool that helps you discover careers, majors, and project ideas based on yout
          interests.
        </p>
        <button class="">Start Exploring</button>
      </div>
      <div>SVG</div>
    </div>

    <!-- Input / Filter Section -->
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

    <!-- Details Panel (optional for now) -->

    <!-- About Section -->
    <!-- Footer Section -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
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
