<template>
  <section class="bg-[#F2F6FA] py-16 px-6">
    <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
      <!-- Hero Text -->
      <div class="flex-1">
        <h1 class="text-5xl font-bold leading-tight text-[#294E89] mb-6">
          Connect The Dots ...<br />
          Find Your Path.
        </h1>
        <p class="text-gray-700 mb-6 text-lg">
          A simple tool that helps you make sense of your abilities, interests, and finally, life
          and career goals.
        </p>

        <div class="flex flex-col md:flex-row gap-4">
          <button
            @click="$router.push('/career-filter')"
            class="bg-[#294E89] text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition duration-200"
          >
            I Know My Skills & Interests
          </button>

          <button
            @click="$router.push('/ikigai')"
            class="bg-[#59B2AC] text-white px-6 py-3 rounded-lg hover:bg-[#3ABFAB] transition duration-200"
          >
            I’m Not Sure What I Want
          </button>
        </div>
      </div>

      <!-- SVG Placeholder -->
      <div class="flex-1 flex justify-center">
        <img src="../connectthedots.png" alt="Hero illustration" class="w-80 h-auto" />
      </div>
    </div>
  </section>
</template>
