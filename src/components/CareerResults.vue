<template>
  <div class="bg-white p-6 rounded-xl shadow">
    <h2 class="text-xl font-semibold mb-4 text-blue-900">Suggested Careers</h2>

    <div v-if="jobs.length" class="space-y-4">
      <div
        v-for="job in jobs"
        :key="job.id"
        @click="$emit('select', job)"
        class="border p-4 rounded-lg hover:shadow-md cursor-pointer transition bg-white"
      >
        <h3 class="font-bold text-lg text-blue-800">{{ job.title }}</h3>
        <p class="text-sm text-slate-600"><strong>Skills:</strong> {{ job.skills.join(', ') }}</p>
        <p class="text-sm text-slate-600">
          <strong>Interests:</strong> {{ job.interests.join(', ') }}
        </p>
      </div>
    </div>

    <p v-else class="text-slate-500">No results found. Try different skills or interests.</p>
  </div>
</template>

<script setup>
defineProps({
  jobs: Array,
})
</script>
