<template>
  <div class="min-h-screen flex flex-col bg-white text-[#1A1A1A]">
    <!-- Navbar is always visible -->
    <Navbar />

    <!-- Page content -->
    <router-view />

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import AppFooter from './components/AppFooter.vue'
</script>
