<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">Теги</h1>
      <button
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <PlusIcon class="h-5 w-5 mr-2" />
        Новый тег
      </button>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="tag in tags"
        :key="tag.id"
        class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
      >
        <div class="p-6">
          <div class="flex items-center">
            <HashtagIcon class="h-8 w-8 text-indigo-600" />
            <div class="ml-4">
              <h3 class="text-lg font-medium text-gray-900">
                {{ tag.name }}
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                {{ tag.bookmarkCount }} закладок
              </p>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-6 py-4">
          <div class="flex justify-between">
            <button
              class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Показать закладки
            </button>
            <button
              class="text-gray-400 hover:text-gray-500"
            >
              <PencilIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HashtagIcon, PlusIcon, PencilIcon } from '@heroicons/vue/24/outline'

const tags = ref([
  {
    id: 1,
    name: 'Дизайн',
    bookmarkCount: 12
  },
  {
    id: 2,
    name: 'Разработка',
    bookmarkCount: 8
  },
  {
    id: 3,
    name: 'Инструменты',
    bookmarkCount: 15
  },
  {
    id: 4,
    name: 'Вдохновение',
    bookmarkCount: 6
  }
])
</script>