<template>
  <aside class="bg-white p-6 rounded-xl shadow sticky top-6 h-fit">
    <h2 class="text-xl font-semibold text-blue-900 mb-4">Career Details</h2>

    <div v-if="job">
      <h3 class="text-2xl font-bold text-blue-800 mb-2">
        {{ job.title }}
      </h3>

      <p class="mb-4 text-slate-700">
        {{ job.description || 'No description available yet.' }}
      </p>

      <h4 class="font-semibold text-blue-900">Required Skills:</h4>
      <ul class="list-disc ml-6 mb-4 text-slate-700">
        <li v-for="skill in job.skills" :key="skill">{{ skill }}</li>
      </ul>

      <h4 class="font-semibold text-blue-900">Related Industries:</h4>
      <ul class="list-disc ml-6 mb-4 text-slate-700">
        <li v-for="i in job.interests" :key="i">{{ i }}</li>
      </ul>

      <h4 class="font-semibold text-blue-900">Project Ideas:</h4>
      <ul class="list-disc ml-6 mb-4 text-slate-700">
        <li v-for="i in job.projectIdeas" :key="i">{{ i }}</li>
      </ul>

      <p class="text-sm italic text-slate-600">AI roadmap coming soon…</p>
    </div>

    <div v-else class="text-slate-500">Select a career from the left to see more details.</div>
  </aside>
</template>

<script setup>
defineProps({
  job: Object,
})
</script>
