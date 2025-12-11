<template>
  <div class="min-h-screen flex flex-col bg-white text-[#1A1A1A]">
    <!-- NAVBAR -->
    <Navbar />

    <!-- HERO SECTION -->
    <Hero />

    <!-- MAIN GRID: Filters + Results (2/3) | Details (1/3) -->
    <section class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 px-6 py-10 max-w-7xl mx-auto">
      <!-- LEFT SIDE: Filter Inputs + Results -->
      <div>
        <!-- FILTER AREA -->
        <div class="bg-white p-6 rounded-xl shadow mb-6">
          <h2 class="text-xl font-semibold text-blue-900 mb-4">Filter Careers</h2>

          <div class="flex flex-col md:flex-row gap-4">
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
          </div>

          <button
            @click="searchCareers"
            class="mt-4 bg-[#59B2AC] text-white px-5 py-2 rounded-lg hover:bg-[#3ABFAB] shadow"
          >
            Show suggestions
          </button>
        </div>

        <!-- RESULTS LIST -->
        <div class="bg-white p-6 rounded-xl shadow">
          <h2 class="text-xl font-semibold mb-4 text-blue-900">Suggested Careers</h2>

          <!-- Cards -->
          <div v-if="filteredJobs.length" class="space-y-4">
            <div
              v-for="job in filteredJobs"
              :key="job.id"
              @click="selectJob(job)"
              class="border p-4 rounded-lg hover:shadow-md cursor-pointer transition bg-white"
            >
              <h3 class="font-bold text-lg text-blue-800">{{ job.title }}</h3>
              <p class="text-sm text-slate-600">
                <strong>Skills:</strong> {{ job.skills.join(', ') }}
              </p>
              <p class="text-sm text-slate-600">
                <strong>Interests:</strong> {{ job.interests.join(', ') }}
              </p>
            </div>
          </div>

          <p v-else class="text-slate-500">No results found. Try different skills or interests.</p>
        </div>
      </div>

      <!-- RIGHT SIDE: DETAILS PANEL -->
      <aside class="bg-white p-6 rounded-xl shadow sticky top-6 h-fit">
        <h2 class="text-xl font-semibold text-blue-900 mb-4">Career Details</h2>

        <div v-if="selectedJob">
          <h3 class="text-2xl font-bold text-blue-800 mb-2">
            {{ selectedJob.title }}
          </h3>

          <p class="mb-4 text-slate-700">
            {{ selectedJob.description || 'No description available yet.' }}
          </p>

          <h4 class="font-semibold text-blue-900">Required Skills:</h4>
          <ul class="list-disc ml-6 mb-4 text-slate-700">
            <li v-for="skill in selectedJob.skills" :key="skill">{{ skill }}</li>
          </ul>

          <h4 class="font-semibold text-blue-900">Related Industries:</h4>
          <ul class="list-disc ml-6 mb-4 text-slate-700">
            <li v-for="i in selectedJob.interests" :key="i">{{ i }}</li>
          </ul>

          <h4 class="font-semibold text-blue-900">Example Learning Path:</h4>
          <p class="mb-4 text-slate-700 text-sm italic">Coming soon…</p>

          <h4 class="font-semibold text-blue-900">Example Projects:</h4>
          <p class="text-slate-700 text-sm italic">Coming soon…</p>
        </div>

        <div v-else class="text-slate-500">Select a career from the left to see more details.</div>
      </aside>
    </section>

    <!-- ABOUT SECTION -->
    <section class="px-6 py-16 max-w-4xl mx-auto text-center">
      <h2 class="text-3xl font-bold text-blue-900 mb-4">About</h2>
      <p class="text-slate-700 text-lg">
        DotConnectMe helps students, career changers, and curious minds discover meaningful
        directions with simple filtering and guidance.
      </p>
    </section>

    <!-- FOOTER -->
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import jobs from './data/jobs.json'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import Footer from './components/Footer.vue'

// Inputs
const selectedSkills = ref([])
const selectedInterests = ref([])

// Unique sets
const allSkills = ref([...new Set(jobs.flatMap((job) => job.skills))])
const allInterests = ref([...new Set(jobs.flatMap((job) => job.interests))])

// Results
const filteredJobs = ref([])

// Selected job for details sidebar
const selectedJob = ref(null)

function searchCareers() {
  filteredJobs.value = jobs.filter(
    (job) =>
      job.skills.some((skill) => selectedSkills.value.includes(skill)) &&
      job.interests.some((interest) => selectedInterests.value.includes(interest)),
  )
  selectedJob.value = null
}

function selectJob(job) {
  selectedJob.value = job
}
</script>

<style scoped></style>
