<template>
  <div
    @click="$emit('select', job)"
    class="border p-4 rounded-lg hover:shadow-md cursor-pointer transition bg-white mb-3"
  >
    <h4 class="font-bold text-lg text-blue-800">{{ job.title }}</h4>
    <p class="text-sm text-slate-600"><strong>Skills:</strong> {{ job.skills.join(', ') }}</p>
    <p class="text-sm text-slate-600"><strong>Interests:</strong> {{ job.interests.join(', ') }}</p>
  </div>
</template>

<script setup>
defineProps({
  job: Object,
})
</script>
