<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">Мои папки</h1>
      <button
        @click="isNewFolderModalOpen = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusIcon class="h-5 w-5 mr-2" />
        Новая папка
      </button>
    </div>

    <draggable 
      v-model="folders"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      item-key="id"
      :animation="200"
      ghost-class="opacity-50"
    >
      <template #item="{ element: folder }">
        <div
          class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200 cursor-move"
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
              <router-link
                :to="{ name: 'folder-content', params: { id: folder.id }}"
                class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Открыть
              </router-link>
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
      </template>
    </draggable>

    <!-- New Folder Modal -->
    <TransitionRoot appear :show="isNewFolderModalOpen" as="template">
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
                  Создать новую папку
                </DialogTitle>

                <form @submit.prevent="createFolder" class="mt-4 space-y-4">
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">
                      Название
                    </label>
                    <input
                      type="text"
                      id="name"
                      v-model="newFolder.name"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label for="description" class="block text-sm font-medium text-gray-700">
                      Описание
                    </label>
                    <textarea
                      id="description"
                      v-model="newFolder.description"
                      rows="3"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    ></textarea>
                  </div>

                  <div>
                    <label for="icon" class="block text-sm font-medium text-gray-700">
                      Иконка
                    </label>
                    <select
                      id="icon"
                      v-model="newFolder.icon"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="BriefcaseIcon">Работа</option>
                      <option value="StarIcon">Избранное</option>
                      <option value="CodeBracketIcon">Код</option>
                      <option value="BookmarkIcon">Закладки</option>
                    </select>
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
                      Создать
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
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import draggable from 'vuedraggable'

const isNewFolderModalOpen = ref(false)
const iconComponents = {
  BriefcaseIcon,
  StarIcon,
  CodeBracketIcon,
  BookmarkIcon
}

const newFolder = ref({
  name: '',
  description: '',
  icon: 'BriefcaseIcon'
})

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

function closeModal() {
  isNewFolderModalOpen.value = false
  newFolder.value = {
    name: '',
    description: '',
    icon: 'BriefcaseIcon'
  }
}

function createFolder() {
  const folder = {
    id: folders.value.length + 1,
    name: newFolder.value.name,
    description: newFolder.value.description,
    bookmarkCount: 0,
    icon: iconComponents[newFolder.value.icon as keyof typeof iconComponents]
  }
  
  folders.value.push(folder)
  closeModal()
}
</script>