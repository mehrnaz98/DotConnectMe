<template>
  <div class="bg-white p-6 rounded-xl shadow">
    <h2 class="text-xl font-semibold mb-6 text-blue-900">Suggested Careers</h2>

    <!-- BEST MATCHES -->
    <div v-if="bestMatches.length" class="mb-8">
      <h3 class="text-lg font-bold text-green-700 mb-3">Best matches (skills + interests)</h3>

      <JobCard v-for="job in bestMatches" :key="job.id" :job="job" @select="$emit('select', job)" />
    </div>

    <!-- SKILL MATCHES -->
    <div v-if="skillMatches.length" class="mb-8">
      <h3 class="text-lg font-bold text-blue-700 mb-3">Matches based on your skills</h3>

      <JobCard
        v-for="job in skillMatches"
        :key="job.id"
        :job="job"
        @select="$emit('select', job)"
      />
    </div>

    <!-- INTEREST MATCHES -->
    <div v-if="interestMatches.length">
      <h3 class="text-lg font-bold text-purple-700 mb-3">Matches based on your interests</h3>

      <JobCard
        v-for="job in interestMatches"
        :key="job.id"
        :job="job"
        @select="$emit('select', job)"
      />
    </div>

    <p v-if="!jobs.length" class="text-slate-500 text-center mt-6">
      No results found. Try different skills or interests.
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import JobCard from './JobCard.vue'

const props = defineProps({
  jobs: Array,
})

const bestMatches = computed(() => props.jobs.filter((j) => j.matchType === 'best'))

const skillMatches = computed(() => props.jobs.filter((j) => j.matchType === 'skill'))

const interestMatches = computed(() => props.jobs.filter((j) => j.matchType === 'interest'))
</script>
