<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <button
          @click="router.back()"
          class="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon class="h-5 w-5" />
        </button>
        <h1 class="text-2xl font-semibold text-gray-900">{{ folder?.name }}</h1>
      </div>
      <button
        @click="isNewBookmarkModalOpen = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusIcon class="h-5 w-5 mr-2" />
        Добавить закладку
      </button>
    </div>

    <draggable 
      v-model="bookmarks"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      item-key="id"
      :animation="200"
      ghost-class="opacity-50"
    >
      <template #item="{ element: bookmark }">
        <div
          class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200 cursor-move"
        >
          <div class="aspect-w-16 aspect-h-9 bg-gray-100">
            <img
              :src="bookmark.preview"
              :alt="bookmark.title"
              class="object-cover w-full h-full"
              @error="handleImageError"
            />
          </div>
          <div class="p-4">
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              {{ bookmark.title }}
            </h3>
            <p class="text-sm text-gray-500 mb-4">
              {{ bookmark.description }}
            </p>
            <div class="flex justify-between items-center">
              <a
                :href="bookmark.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Открыть ссылку
                <ArrowTopRightOnSquareIcon class="h-4 w-4 inline ml-1" />
              </a>
              <button
                @click="deleteBookmark(bookmark.id)"
                class="text-gray-400 hover:text-red-500"
              >
                <TrashIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </template>
    </draggable>

    <!-- New Bookmark Modal -->
    <TransitionRoot appear :show="isNewBookmarkModalOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Добавить закладку
                </DialogTitle>

                <form @submit.prevent="createBookmark" class="mt-4 space-y-4">
                  <div>
                    <label for="url" class="block text-sm font-medium text-gray-700">
                      URL
                    </label>
                    <input
                      type="url"
                      id="url"
                      v-model="newBookmark.url"
                      class="mt-1 block w-full"
                      required
                    />
                  </div>

                  <div>
                    <label for="title" class="block text-sm font-medium text-gray-700">
                      Название
                    </label>
                    <input
                      type="text"
                      id="title"
                      v-model="newBookmark.title"
                      class="mt-1 block w-full"
                      required
                    />
                  </div>

                  <div>
                    <label for="description" class="block text-sm font-medium text-gray-700">
                      Описание
                    </label>
                    <textarea
                      id="description"
                      v-model="newBookmark.description"
                      rows="3"
                      class="mt-1 block w-full"
                    ></textarea>
                  </div>

                  <div class="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      @click="closeModal"
                      class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Добавить
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  PlusIcon,
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import draggable from 'vuedraggable'

const route = useRoute()
const router = useRouter()
const isNewBookmarkModalOpen = ref(false)

interface Bookmark {
  id: number
  title: string
  description: string
  url: string
  preview: string
}

interface Folder {
  id: number
  name: string
  description: string
  bookmarkCount: number
  icon: any
}

const folder = ref<Folder | null>(null)
const bookmarks = ref<Bookmark[]>([
  {
    id: 1,
    title: 'Vue.js Documentation',
    description: 'The official Vue.js documentation',
    url: 'https://vuejs.org',
    preview: 'https://vuejs.org/images/og.png'
  },
  {
    id: 2,
    title: 'GitHub',
    description: 'Where the world builds software',
    url: 'https://github.com',
    preview: 'https://github.githubassets.com/images/modules/site/social-cards/campaign-social.png'
  }
])

const newBookmark = ref({
  url: '',
  title: '',
  description: ''
})

onMounted(() => {
  // In a real application, fetch folder and bookmarks data from an API
  folder.value = {
    id: Number(route.params.id),
    name: 'Разработка',
    description: 'Ресурсы для программирования',
    bookmarkCount: bookmarks.value.length,
    icon: null
  }
})

function closeModal() {
  isNewBookmarkModalOpen.value = false
  newBookmark.value = {
    url: '',
    title: '',
    description: ''
  }
}

function createBookmark() {
  const bookmark: Bookmark = {
    id: bookmarks.value.length + 1,
    title: newBookmark.value.title,
    description: newBookmark.value.description,
    url: newBookmark.value.url,
    preview: `https://api.microlink.io?url=${encodeURIComponent(newBookmark.value.url)}&screenshot=true&meta=false&embed=screenshot.url`
  }
  
  bookmarks.value.push(bookmark)
  closeModal()
}

function deleteBookmark(id: number) {
  const index = bookmarks.value.findIndex(b => b.id === id)
  if (index !== -1) {
    bookmarks.value.splice(index, 1)
  }
}

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement
  img.src = 'https://placehold.co/600x400?text=No+Preview'
}
</script>