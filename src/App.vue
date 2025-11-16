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

const skillsInput = ref('')
const interestsInput = ref('')

function searchCareers() {
  console.log('Skills:', skillsInput.value)
  console.log('Interests:', interestsInput.value)
  alert('Search triggered!')
}
</script>
