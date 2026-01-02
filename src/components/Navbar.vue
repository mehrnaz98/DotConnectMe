<template>
  <nav class="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
    <!-- Logo -->
    <div class="text-xl flex items-center space-x-3 font-bold text-blue-900">
      <img src="/connect-favicon.png" alt="logo" class="w-8 h-8" />
      <span>DotConnectMe</span>
    </div>

    <!-- Desktop Links -->
    <ul class="hidden md:flex gap-8 text-slate-600">
      <li>
        <router-link to="/" class="hover:text-blue-700">Home</router-link>
      </li>
      <li class="hover:text-blue-700 cursor-pointer">About</li>
      <li class="hover:text-blue-700 cursor-pointer">How It Works</li>
      <li class="hover:text-blue-700 cursor-pointer">Contact</li>
    </ul>

    <!-- Get Started Button -->
    <button
      class="hidden md:block bg-[#59B2AC] text-white px-4 py-2 rounded-lg shadow hover:bg-[#3ABFAB]"
    >
      Get Started
    </button>

    <!-- Hamburger for Mobile -->
    <div class="md:hidden">
      <button @click="isOpen = !isOpen" class="focus:outline-none">
        <svg
          class="w-6 h-6 text-blue-900"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  </nav>

  <!-- Mobile Menu -->
  <div v-if="isOpen" class="md:hidden bg-white shadow-sm px-6 py-4">
    <ul class="flex flex-col gap-4 text-slate-600">
      <li><router-link to="/" class="hover:text-blue-700">Home</router-link></li>
      <li class="hover:text-blue-700 cursor-pointer">About</li>
      <li class="hover:text-blue-700 cursor-pointer">How It Works</li>
      <li class="hover:text-blue-700 cursor-pointer">Contact</li>
      <li>
        <button
          class="w-full bg-[#59B2AC] text-white px-4 py-2 rounded-lg shadow hover:bg-[#3ABFAB]"
        >
          Get Started
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>
