<template>
  <div class="bg-white p-6 rounded-xl shadow mb-6">
    <h2 class="text-xl font-semibold text-blue-900 mb-4">Filter Careers</h2>

    <div class="flex flex-col md:flex-row gap-4">
      <Multiselect
        v-model="localSkills"
        :options="allSkills"
        placeholder="Select your skills"
        multiple
        :close-on-select="false"
        :clear-on-select="false"
        class="w-full"
      />

      <Multiselect
        v-model="localInterests"
        :options="allInterests"
        placeholder="Select your interests"
        multiple
        :close-on-select="false"
        :clear-on-select="false"
        class="w-full"
      />
    </div>

    <button
      @click="submitFilters"
      class="mt-4 bg-[#59B2AC] text-white px-5 py-2 rounded-lg hover:bg-[#3ABFAB] shadow"
    >
      Show suggestions
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

const props = defineProps({
  allSkills: Array,
  allInterests: Array,
})

const emit = defineEmits(['search'])

const localSkills = ref([])
const localInterests = ref([])

function submitFilters() {
  emit('search', {
    skills: localSkills.value,
    interests: localInterests.value,
  })
}
</script>
