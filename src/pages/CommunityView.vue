<script setup>
import { ref } from 'vue'
import initialPosts from '../data/communityPosts.json'

const posts = ref([...initialPosts])

const newPost = ref({
  title: '',
  description: '',
  category: 'Career choice',
})

const categories = [
  'Career choice',
  'Study/major confusion',
  'Skill learning path',
  'Career change',
]

function addPost() {
  if (!newPost.value.title || !newPost.value.description) return

  const post = {
    id: Date.now(),
    title: newPost.value.title,
    description: newPost.value.description,
    category: newPost.value.category,
    date: new Date().toISOString().split('T')[0],
    comments: [],
  }

  posts.value.unshift(post)

  newPost.value = {
    title: '',
    description: '',
    category: 'Career choice',
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Page Title -->
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-800">Community</h1>
        <p class="text-gray-600 mt-2">Share your confusion. Get guidance from others.</p>
      </div>

      <!-- New Post Form -->
      <div class="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 class="text-xl font-semibold text-gray-800">Post your question</h2>

        <input
          v-model="newPost.title"
          type="text"
          placeholder="Short title"
          class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <textarea
          v-model="newPost.description"
          placeholder="Describe your situation..."
          class="w-full border rounded-lg p-3 h-28 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        ></textarea>

        <select
          v-model="newPost.category"
          class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>

        <button
          @click="addPost"
          class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Post
        </button>
      </div>

      <!-- Posts List -->
      <div class="space-y-4">
        <div v-for="post in posts" :key="post.id" class="bg-white rounded-2xl shadow p-5">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
              {{ post.category }}
            </span>
            <span class="text-xs text-gray-400">{{ post.date }}</span>
          </div>

          <h3 class="text-lg font-semibold text-gray-800">
            {{ post.title }}
          </h3>

          <p class="text-gray-600 mt-2">
            {{ post.description }}
          </p>

          <!-- Comments -->
          <div class="mt-4 space-y-2">
            <div
              v-for="comment in post.comments"
              :key="comment.id"
              class="bg-gray-100 rounded-lg p-2 text-sm text-gray-700"
            >
              {{ comment.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
