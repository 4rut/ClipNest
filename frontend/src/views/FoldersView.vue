<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">Мои папки</h1>
      <button
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusIcon class="h-5 w-5 mr-2" />
        Новая папка
      </button>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="folder in folders"
        :key="folder.id"
        class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
      >
        <div class="p-6">
          <div class="flex items-center">
            <component
              :is="folder.icon"
              class="h-8 w-8 text-indigo-600"
            />
            <div class="ml-4">
              <h3 class="text-lg font-medium text-gray-900">
                {{ folder.name }}
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                {{ folder.description }}
              </p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center text-sm text-gray-500">
              <BookmarkIcon class="h-4 w-4 mr-1" />
              {{ folder.bookmarkCount }} закладок
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-6 py-4">
          <div class="flex justify-between">
            <button
              class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Открыть
            </button>
            <div class="flex space-x-3">
              <button
                class="text-gray-400 hover:text-gray-500"
              >
                <ShareIcon class="h-5 w-5" />
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  BookmarkIcon,
  BriefcaseIcon,
  ShareIcon,
  PencilIcon,
  PlusIcon,
  StarIcon,
  CodeBracketIcon
} from '@heroicons/vue/24/outline'

const folders = ref([
  {
    id: 1,
    name: 'Работа',
    description: 'Важные рабочие ссылки и ресурсы',
    bookmarkCount: 12,
    icon: BriefcaseIcon
  },
  {
    id: 2,
    name: 'Вдохновение',
    description: 'Дизайн и креативные идеи',
    bookmarkCount: 24,
    icon: StarIcon
  },
  {
    id: 3,
    name: 'Разработка',
    description: 'Ресурсы для программирования',
    bookmarkCount: 18,
    icon: CodeBracketIcon
  }
])
</script>