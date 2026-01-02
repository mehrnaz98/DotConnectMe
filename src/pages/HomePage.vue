<template>
  <div class="flex flex-col min-h-screen bg-white text-[#1A1A1A]">
    <AppHero />

    <!-- Brief About / Guide -->
    <section class="px-6 py-16 max-w-5xl mx-auto text-center bg-gray-50 rounded-xl shadow mb-12">
      <h2 class="text-3xl font-bold text-blue-900 mb-4">Welcome to DotConnectMe</h2>
      <p class="text-gray-700 max-w-3xl mx-auto">
        DotConnectMe is a simple tool that helps you discover career paths that match your skills,
        interests, and values. Choose your path and get personalized suggestions instantly.
      </p>
      <p class="mt-4 text-gray-600">
        You can start by selecting your skills and interests, or take the Ikigai quiz to figure out
        what truly motivates you.
      </p>
    </section>
  </div>
</template>

<script setup>
import AppHero from '../components/AppHero.vue'
</script>
