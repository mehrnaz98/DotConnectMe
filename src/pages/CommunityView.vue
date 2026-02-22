<script setup>
// We import ref from Vue to create reactive state
import { ref, watch } from 'vue'

// Check if something is saved under "community-posts"
//If yes → load it
//If no → use JSON file and Import initial data from local JSON file
const savedPosts = localStorage.getItem('community-posts')
const posts = ref(savedPosts ? JSON.parse(savedPosts) : [...initialPosts])

/*
  posts:
  This is the reactive array that holds all posts.
  We copy the JSON data into it so we can modify it.
*/
const posts = ref([...initialPosts])

/*
  newPost:
  Stores the data from the "Create Post" form.
  This object is bound to the input fields using v-model.
*/
const newPost = ref({
  title: '',
  description: '',
  category: 'Career choice',
})

/*
  categories:
  List of categories for the dropdown.
*/
const categories = [
  'Career choice',
  'Study/major confusion',
  'Skill learning path',
  'Career change',
]

/*
  newComments:
  This is an object that temporarily stores comment input text.
  Structure will look like:
  {
    1: "some comment",
    2: "another comment"
  }

  Key = post.id
  Value = comment text
*/
const newComments = ref({})

/*
  addPost():
  Called when user clicks "Post".
  - Validates input
  - Creates a new post object
  - Adds it to the top of posts array
  - Resets form
*/
function addPost() {
  if (!newPost.value.title || !newPost.value.description) return

  const post = {
    id: Date.now(), // unique ID based on timestamp
    title: newPost.value.title,
    description: newPost.value.description,
    category: newPost.value.category,
    date: new Date().toISOString().split('T')[0], // format: YYYY-MM-DD
    comments: [],
  }

  // Add new post at the beginning
  posts.value.unshift(post)

  // Reset form fields
  newPost.value = {
    title: '',
    description: '',
    category: 'Career choice',
  }
}

/*
  addComment(postId):
  - Finds correct post
  - Adds new comment to its comments array
  - Clears input field
*/
function addComment(postId) {
  const text = newComments.value[postId]
  if (!text) return

  const post = posts.value.find((p) => p.id === postId)

  post.comments.push({
    id: Date.now(),
    text: text,
    date: new Date().toISOString().split('T')[0],
  })

  // Clear input after adding
  newComments.value[postId] = ''
}

watch(
  posts,
  (newPosts) => {
    localStorage.setItem('community-posts', JSON.stringify(newPosts))
  },
  { deep: true },
)
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- PAGE TITLE -->
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-800">Community</h1>
        <p class="text-gray-600 mt-2">Share your confusion. Get guidance from others.</p>
      </div>

      <!-- CREATE NEW POST FORM -->
      <div class="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 class="text-xl font-semibold text-gray-800">Post your question</h2>

        <!-- Title Input -->
        <input
          v-model="newPost.title"
          type="text"
          placeholder="Short title"
          class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <!-- Description Input -->
        <textarea
          v-model="newPost.description"
          placeholder="Describe your situation..."
          class="w-full border rounded-lg p-3 h-28 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        ></textarea>

        <!-- Category Dropdown -->
        <select
          v-model="newPost.category"
          class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>

        <!-- Post Button -->
        <button
          @click="addPost"
          class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Post
        </button>
      </div>

      <!-- POSTS LIST -->
      <div class="space-y-4">
        <!-- Loop through posts -->
        <div v-for="post in posts" :key="post.id" class="bg-white rounded-2xl shadow p-5">
          <!-- Post header (category + date) -->
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
              {{ post.category }}
            </span>

            <span class="text-xs text-gray-400">
              {{ post.date }}
            </span>
          </div>

          <!-- Post title -->
          <h3 class="text-lg font-semibold text-gray-800">
            {{ post.title }}
          </h3>

          <!-- Post description -->
          <p class="text-gray-600 mt-2">
            {{ post.description }}
          </p>

          <!-- COMMENTS SECTION -->
          <div class="mt-4 space-y-2">
            <!-- Loop through comments of this post -->
            <div
              v-for="comment in post.comments"
              :key="comment.id"
              class="bg-gray-100 rounded-lg p-2 text-sm text-gray-700"
            >
              {{ comment.text }}
            </div>
          </div>

          <!-- ADD COMMENT INPUT -->
          <div class="mt-3 flex gap-2">
            <input
              v-model="newComments[post.id]"
              type="text"
              placeholder="Write a reply..."
              class="flex-1 border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <button
              @click="addComment(post.id)"
              class="bg-indigo-500 text-white px-3 rounded-lg hover:bg-indigo-600 transition text-sm"
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
