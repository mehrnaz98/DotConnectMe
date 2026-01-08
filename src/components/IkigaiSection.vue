<template>
  <section class="px-6 py-16 max-w-4xl mx-auto bg-gray-50 rounded-xl shadow">
    <!-- INTRO -->
    <div class="mb-10 text-center">
      <h2 class="text-3xl font-bold text-blue-900 mb-4">Discover Your Ikigai</h2>
      <p class="text-gray-700">
        Answer honestly. There are no right answers. This helps clarify what kind of work actually
        fits you.
      </p>
    </div>

    <!-- QUESTIONS -->
    <div v-if="!showResult">
      <div v-for="q in questions" :key="q.id" class="mb-10">
        <h3 class="text-lg font-semibold text-blue-800 mb-4">
          {{ q.question }}
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            v-for="opt in q.options"
            :key="opt.text"
            @click="toggleAnswer(q.id, opt)"
            :class="[
              'border rounded-lg px-4 py-3 text-left transition',
              isSelected(q.id, opt.text)
                ? 'bg-blue-200 border-blue-400'
                : 'bg-white hover:bg-blue-100',
            ]"
          >
            {{ opt.text }}
          </button>
        </div>
      </div>

      <!-- Show button only if all questions answered -->
      <button
        @click="showResult = true"
        :disabled="!allAnswered"
        class="mt-6 px-6 py-3 rounded-lg transition text-white disabled:bg-gray-400 disabled:cursor-not-allowed bg-[#294E89] hover:bg-blue-900"
      >
        See My Result
      </button>

      <p v-if="!allAnswered" class="text-gray-500 mt-2 text-sm">
        Please answer all questions so we can give you helpful insights!
      </p>
    </div>

    <!-- RESULT -->

    <div v-else>
      <div
        v-for="(answer, index) in selectedAnswers"
        :key="index"
        class="bg-white p-6 rounded-xl shadow-md mb-6 border border-gray-100"
      >
        <!-- Question -->
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          {{ index + 1 }}. {{ answer.question }}
        </h3>

        <!-- Choices -->
        <div
          v-for="(choice, i) in answer.choices"
          :key="i"
          class="mb-4 pl-4 border-l-4 border-indigo-400"
        >
          <p class="text-sm text-gray-500 mb-1">Your choice</p>

          <p class="font-medium text-indigo-700 mb-1">
            {{ choice.text }}
          </p>

          <p class="text-gray-700 text-sm leading-relaxed">
            {{ choice.explanation }}
          </p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow">
        <h3 class="text-2xl font-bold text-blue-800 mb-4">What this says about you</h3>

        <p class="text-gray-700 mb-6">
          You are most drawn toward:
          <strong>{{ topInterests.join(', ') }}</strong>
        </p>

        <p class="text-gray-600 mb-8">
          This means you tend to enjoy problems and roles that align with these interests. The next
          step is to narrow things down using real-world skills.
        </p>

        <div class="mt-6 flex flex-col sm:flex-row gap-4">
          <button
            @click="goToFilter"
            class="w-full sm:w-auto bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
          >
            Explore Careers Based on This
          </button>

          <button
            @click="resetQuiz"
            class="w-full sm:w-auto border border-blue-700 text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Take the quiz again
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import questions from '@/data/ikigaiQuestions.json'

const router = useRouter()

// answers: { questionId: [options] }
const answers = ref({})
const showResult = ref(false)

function toggleAnswer(questionId, option) {
  if (!answers.value[questionId]) {
    answers.value[questionId] = []
  }

  const idx = answers.value[questionId].findIndex((o) => o.text === option.text)

  if (idx === -1) {
    answers.value[questionId].push(option)
  } else {
    answers.value[questionId].splice(idx, 1)
  }
}

function isSelected(questionId, optionText) {
  return answers.value[questionId]?.some((o) => o.text === optionText)
}

// checks if all questions have at least one selected option
const allAnswered = computed(() => questions.every((q) => answers.value[q.id]?.length > 0))

// UPDATED: group answers by question (no repetition)
const selectedAnswers = computed(() => {
  return Object.entries(answers.value).map(([qId, opts]) => {
    const q = questions.find((q) => q.id === qId)
    return {
      question: q.question,
      choices: opts.map((opt) => ({
        text: opt.text,
        explanation: opt.explanation,
        interests: opt.interests,
      })),
    }
  })
})
/*
Purpose of this computed property:
- Take the raw `answers` object
- Group selected answers by question
- Avoid repeating the same question multiple times in the UI
- Produce a clean, human-readable structure for the result section

Raw `answers.value` looks like:
{
  energy_source: [option1, option2],
  problem_style: [option3]
}

Step-by-step what happens here:

1) Object.entries(answers.value)
   Converts the object into an array so we can loop:
   [
     ['energy_source', [option1, option2]],
     ['problem_style', [option3]]
   ]

2) .map(([qId, opts]) => { ... })
   - qId  → the question ID (e.g. "energy_source")
   - opts → array of selected options for that question
   We now handle ONE question at a time.

3) const q = questions.find(q => q.id === qId)
   Finds the full question object from ikigaiQuestions.json
   This gives us the human-readable question text.

4) return { question, choices }
   We build ONE object per question.
   This is what prevents question repetition in the UI.

5) choices: opts.map(opt => ({ ... }))
   For this one question, loop over all selected answers.
   Each selected option becomes one "choice" with:
   - text → what the user selected
   - explanation → human-friendly explanation
   - interests → tags used later for scoring

Final structure produced by this computed:
[
  {
    question: 'When you are tired but still need to do something...',
    choices: [
      { text, explanation, interests },
      { text, explanation, interests }
    ]
  },
  {
    question: 'Which kind of problem do you naturally take responsibility for?',
    choices: [
      { text, explanation, interests }
    ]
  }
]

This structure is ideal for:
- Clean UI rendering
- No duplicate questions
- Clear separation of logic and presentation
*/

// calculate interest scores
const interestScores = computed(() => {
  const scores = {}

  // go through all selected answers
  Object.values(answers.value)
    .flat() // flatten arrays of answers for all questions
    .forEach((opt) => {
      // count each interest
      opt.interests.forEach((i) => {
        scores[i] = (scores[i] || 0) + 1 // scores[i] → current count for interest i, (scores[i] || 0) → 0 if first time, +1 → increment, scores[i] = ... → save updated count
      })
    })

  return scores
})

// take top interests
const topInterests = computed(() => {
  return Object.entries(interestScores.value) // convert scores object to array
    .sort((a, b) => b[1] - a[1]) // sort by frequency descending
    .slice(0, 3) // take top 3 interests
    .map(([key]) => key) // just keep the interest names
})

// route to filter with preselected interests
function goToFilter() {
  router.push({
    name: 'CareerFilter',
    query: {
      interests: topInterests.value.join(','),
    },
  })
}

function resetQuiz() {
  showResult.value = false
  answers.value = {}
}
</script>
