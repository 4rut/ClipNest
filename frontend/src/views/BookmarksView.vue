<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
      <h1 class="text-2xl font-semibold text-gray-900">Закладки</h1>
      <div class="flex space-x-4">
        <div class="relative flex-1 sm:flex-none">
          <input
            type="text"
            placeholder="Поиск закладок..."
            class="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          <MagnifyingGlassIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Добавить
        </button>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-6">
      <!-- Tags Sidebar -->
      <div class="w-full sm:w-64 space-y-4">
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="font-medium text-gray-900 mb-3">Теги</h3>
          <div class="space-y-2">
            <button
              v-for="tag in tags"
              :key="tag.id"
              :class="[
                'flex items-center w-full px-3 py-2 text-sm rounded-md',
                tag.selected
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-50'
              ]"
            >
              <HashtagIcon class="h-4 w-4 mr-2" />
              {{ tag.name }}
              <span class="ml-auto text-xs text-gray-500">{{ tag.count }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Bookmarks List -->
      <div class="flex-1 space-y-4">
        <div
          v-for="bookmark in bookmarks"
          :key="bookmark.id"
          class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center">
                <h3 class="text-lg font-medium text-gray-900">
                  {{ bookmark.title }}
                </h3>
                <StarIcon
                  v-if="bookmark.pinned"
                  class="h-5 w-5 ml-2 text-yellow-400"
                />
              </div>
              <p class="mt-1 text-sm text-gray-500">{{ bookmark.description }}</p>
              <div class="mt-2 flex flex-wrap gap-2">
                <span
                  v-for="tag in bookmark.tags"
                  :key="tag"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="ml-4 flex space-x-2">
              <button class="text-gray-400 hover:text-gray-500">
                <PencilIcon class="h-5 w-5" />
              </button>
              <button class="text-gray-400 hover:text-gray-500">
                <ShareIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  StarIcon,
  PlusIcon,
  HashtagIcon,
  ShareIcon,
  PencilIcon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline'

const tags = ref([
  { id: 1, name: 'Дизайн', count: 12, selected: true },
  { id: 2, name: 'Разработка', count: 8, selected: false },
  { id: 3, name: 'Инструменты', count: 15, selected: false },
  { id: 4, name: 'Вдохновение', count: 6, selected: false }
])

const bookmarks = ref([
  {
    id: 1,
    title: 'Figma Design System',
    description: 'Коллекция компонентов и стилей для дизайн-системы',
    url: 'https://figma.com/file/...',
    pinned: true,
    tags: ['Дизайн', 'UI/UX']
  },
  {
    id: 2,
    title: 'Vue.js Documentation',
    description: 'Официальная документация Vue 3',
    url: 'https://vuejs.org',
    pinned: false,
    tags: ['Разработка', 'Vue', 'JavaScript']
  },
  {
    id: 3,
    title: 'Design Resources',
    description: 'Подборка полезных ресурсов для дизайнеров',
    url: 'https://designresources.io',
    pinned: true,
    tags: ['Дизайн', 'Ресурсы']
  }
])
</script>