<template>
  <section class="px-6 py-16 max-w-5xl mx-auto bg-gray-50 rounded-xl shadow">
    <!-- INTRO -->
    <div class="mb-12 text-center">
      <h2 class="text-3xl font-bold text-blue-900 mb-4">Discover Your Ikigai</h2>
      <p class="text-gray-700 max-w-3xl mx-auto">
        In Japan, people don’t ask “What do you do?” They ask “Why do you get up in the morning?”
        <br /><br />
        Studies on purpose show that when your “why” is clearer, effort feels lighter and discipline
        becomes easier.
        <br /><br />
        This isn’t about choosing a perfect career. It’s about understanding what kind of effort
        feels worth it to you.
      </p>
    </div>

    <!-- ANCHOR QUESTION -->
    <div class="mb-16">
      <h3 class="text-xl font-semibold text-blue-800 mb-4">
        When life gets difficult, what usually keeps you going?
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          v-for="option in purposeOptions"
          :key="option"
          @click="togglePurpose(option)"
          :class="[
            'border rounded-lg px-4 py-2 text-left hover:bg-blue-100 transition',
            purposeSelections.includes(option) ? 'bg-blue-200 border-blue-400' : 'bg-white',
          ]"
        >
          {{ option }}
        </button>
      </div>
    </div>

    <!-- IKIGAI QUIZ -->
    <div v-for="pillar in pillars" :key="pillar.key" class="mb-12">
      <h3 class="text-xl font-semibold text-blue-800 mb-2">
        {{ pillar.title }}
      </h3>
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

    <!-- SUMMARY -->
    <div v-if="showSummary" class="mt-10 p-6 bg-white rounded-xl shadow">
      <h3 class="text-2xl font-bold text-blue-800 mb-6">Your Ikigai Summary</h3>

      <!-- PURPOSE -->
      <div class="mb-6">
        <h4 class="font-semibold text-blue-900">What keeps you going:</h4>
        <p class="text-gray-700" v-if="purposeSelections.length">
          {{ purposeSelections.join(', ') }}
        </p>
        <p class="text-gray-400" v-else>Not specified</p>
      </div>

      <!-- IKIGAI SELECTIONS -->
      <div v-for="pillar in pillars" :key="pillar.key" class="mb-4">
        <h4 class="font-semibold text-blue-900">{{ pillar.title }}:</h4>
        <p class="text-gray-700" v-if="selections[pillar.key].length">
          {{ selections[pillar.key].join(', ') }}
        </p>
        <p class="text-gray-400" v-else>None selected</p>
      </div>

      <!-- CAREERS -->
      <div class="mt-8">
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
import { reactive, ref, computed, watch } from 'vue'
import jobs from '../data/jobs.json'

/* PURPOSE QUESTION */
const purposeOptions = [
  'Seeing progress in something I’m building',
  'Knowing I’m helping someone',
  'Mastering a skill deeply',
  'Having freedom and autonomy',
  'Feeling useful or needed',
  'Creating something meaningful or beautiful',
]

const purposeSelections = ref([])

function togglePurpose(option) {
  const index = purposeSelections.value.indexOf(option)
  if (index === -1) purposeSelections.value.push(option)
  else purposeSelections.value.splice(index, 1)
}

/* IKIGAI QUESTIONS */
const pillars = [
  {
    key: 'passion',
    title: 'Passion – What You Love',
    question: 'What activities naturally pull your attention?',
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
    question: 'Which abilities feel most natural to you?',
    options: [
      'Creative thinking (design, art, writing)',
      'Logical analysis & problem-solving',
      'Communication & teamwork',
      'Technical skills (coding, engineering)',
      'Leadership & decision-making',
      'Learning new skills quickly',
    ],
  },
  {
    key: 'mission',
    title: 'Mission – What The World Needs',
    question: 'What kind of impact feels meaningful to you?',
    options: [
      'Inspiring or educating others',
      'Solving technical or scientific problems',
      'Improving people’s quality of life',
      'Building useful products or services',
      'Leading communities or initiatives',
      'Advancing knowledge',
    ],
  },
  {
    key: 'vocation',
    title: 'Vocation – What You Can Be Paid For',
    question: 'Which areas could you realistically work in?',
    options: [
      'Arts, content creation, media',
      'Technology, data, engineering',
      'Healthcare, education, social work',
      'Business, management, entrepreneurship',
      'Research and innovation',
      'Consulting or training',
    ],
  },
]

/* USER SELECTIONS */
const selections = reactive({
  passion: [],
  profession: [],
  mission: [],
  vocation: [],
})

const showSummary = ref(false)

/* TOGGLE IKIGAI SELECTIONS */
function toggleSelection(pillarKey, option) {
  const index = selections[pillarKey].indexOf(option)
  if (index === -1) selections[pillarKey].push(option)
  else selections[pillarKey].splice(index, 1)
}

/* TAG MAP */
const ikigaiTagMap = {
  'Creating art, music, or writing': ['creativity', 'content'],
  'Solving puzzles or analyzing problems': ['problem-solving', 'analysis'],
  'Helping people or volunteering': ['social impact', 'helping'],
  'Building or fixing things': ['engineering', 'hands-on'],
  'Leading and organizing projects': ['leadership'],
  'Learning new topics continuously': ['learning'],

  'Creative thinking (design, art, writing)': ['design', 'creativity'],
  'Logical analysis & problem-solving': ['analysis'],
  'Communication & teamwork': ['communication'],
  'Technical skills (coding, engineering)': ['coding', 'engineering'],
  'Leadership & decision-making': ['leadership'],
  'Learning new skills quickly': ['learning'],

  'Inspiring or educating others': ['education'],
  'Solving technical or scientific problems': ['technology'],
  'Improving people’s quality of life': ['social impact'],
  'Building useful products or services': ['product'],
  'Leading communities or initiatives': ['community'],
  'Advancing knowledge': ['research'],

  'Arts, content creation, media': ['content', 'design'],
  'Technology, data, engineering': ['technology', 'coding'],
  'Healthcare, education, social work': ['health', 'education'],
  'Business, management, entrepreneurship': ['business'],
  'Research and innovation': ['research'],
  'Consulting or training': ['consulting'],
}

/* CAREER MATCHING */
const suggestedCareers = computed(() => {
  const selectedTags = Object.values(selections)
    .flat()
    .flatMap((option) => ikigaiTagMap[option] || [])

  return jobs.filter((job) => job.tags?.some((tag) => selectedTags.includes(tag)))
})

const emit = defineEmits(['update:selectedCareers'])

watch(suggestedCareers, (val) => {
  emit('update:selectedCareers', val)
})
</script>

<style scoped>
button:focus {
  outline: none;
}
</style>
