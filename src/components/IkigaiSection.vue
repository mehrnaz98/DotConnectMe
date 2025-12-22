<template>
  <section class="px-6 py-16 max-w-5xl mx-auto bg-gray-50 rounded-xl shadow">
    <h2 class="text-3xl font-bold text-blue-900 mb-8 text-center">Discover Your Ikigai</h2>

    <!-- IKIGAI QUIZ -->
    <div v-for="(pillar, index) in pillars" :key="index" class="mb-8">
      <h3 class="text-xl font-semibold text-blue-800 mb-4">{{ pillar.title }}</h3>
      <p class="text-gray-700 mb-4">{{ pillar.question }}</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          v-for="option in pillar.options"
          :key="option"
          @click="toggleSelection(pillar.key, option)"
          :class="[
            'border rounded-lg px-4 py-2 text-left hover:bg-blue-100 transition',
            selections[pillar.key].includes(option) ? 'bg-blue-200 border-blue-400' : 'bg-white',
          ]"
        >
          {{ option }}
        </button>
      </div>
    </div>

    <!-- SHOW SUMMARY BUTTON -->
    <button
      @click="showSummary = true"
      class="mt-6 bg-[#294E89] text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition"
    >
      Show My Summary & Suggested Careers
    </button>

    <!-- IKIGAI SUMMARY -->
    <div v-if="showSummary" class="mt-8 p-6 bg-white rounded-xl shadow">
      <h3 class="text-2xl font-bold text-blue-800 mb-4">Your Ikigai Summary</h3>

      <!-- User Selections -->
      <div v-for="pillar in pillars" :key="pillar.key" class="mb-4">
        <h4 class="font-semibold text-blue-900">{{ pillar.title }}:</h4>
        <p class="text-gray-700" v-if="selections[pillar.key].length">
          {{ selections[pillar.key].join(', ') }}
        </p>
        <p class="text-gray-400" v-else>None selected</p>
      </div>

      <!-- Career Suggestions -->
      <div class="mt-6">
        <h4 class="font-semibold text-blue-900 mb-2">Suggested Careers:</h4>
        <ul class="list-disc ml-6">
          <li v-for="job in suggestedCareers" :key="job.id">
            <strong>{{ job.title }}</strong> — {{ job.description }}
          </li>
        </ul>
        <p v-if="suggestedCareers.length === 0" class="text-gray-500">No matching careers found.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import jobs from '../data/jobs.json'

// IKIGAI QUESTIONS
const pillars = [
  {
    key: 'passion',
    title: 'Passion – What You Love',
    question: 'Which activities make you feel excited or fulfilled?',
    options: [
      'Creating art, music, or writing',
      'Solving puzzles or analyzing problems',
      'Helping people or volunteering',
      'Building or fixing things',
      'Leading and organizing projects',
      'Learning new topics continuously',
    ],
  },
  {
    key: 'profession',
    title: 'Profession – What You Are Good At',
    question: 'Which of these describe your strongest abilities?',
    options: [
      'Creative thinking (design, art, writing)',
      'Logical analysis & problem-solving',
      'Communication & teamwork',
      'Technical skills (coding, engineering, mechanics)',
      'Leadership & decision-making',
      'Adaptability & learning new skills quickly',
    ],
  },
  {
    key: 'mission',
    title: 'Mission – What The World Needs',
    question: 'What kind of contribution would you like to make in the world?',
    options: [
      'Inspire and educate others',
      'Solve pressing technical or scientific challenges',
      'Support and improve people’s lives',
      'Build products or services that improve society',
      'Create opportunities and lead communities',
      'Explore and share knowledge',
    ],
  },
  {
    key: 'vocation',
    title: 'Vocation – What You Can Be Paid For',
    question: 'Which fields or careers would you consider working in?',
    options: [
      'Arts, content creation, media',
      'Technology, data, engineering',
      'Healthcare, education, social work',
      'Business, management, entrepreneurship',
      'Research, innovation, science',
      'Consulting, advising, training',
    ],
  },
]

// STORE USER SELECTIONS
const selections = reactive({
  passion: [],
  profession: [],
  mission: [],
  vocation: [],
})

// SHOW SUMMARY FLAG
const showSummary = ref(false)

// TOGGLE USER SELECTIONS
function toggleSelection(pillarKey, option) {
  const index = selections[pillarKey].indexOf(option)
  if (index === -1) selections[pillarKey].push(option)
  else selections[pillarKey].splice(index, 1)
}

// COMPUTE SUGGESTED CAREERS BASED ON SELECTIONS
const suggestedCareers = computed(() => {
  // Flatten all selections into one array
  const selectedTags = Object.values(selections)
    .flat()
    .flatMap((option) => ikigaiTagMap[option] || [])

  // Filter jobs.json for any overlap with skills or interests
  return jobs.filter((job) => job.tags?.some((tag) => selectedTags.includes(tag)))
})
</script>

<style scoped>
button:focus {
  outline: none;
}
</style>
