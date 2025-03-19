import { createRouter, createWebHistory } from 'vue-router'
import FoldersView from '../views/FoldersView.vue'
import BookmarksView from '../views/BookmarksView.vue'
import TagsView from '../views/TagsView.vue'
import FolderContentView from '../views/FolderContentView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/folders'
    },
    {
      path: '/folders',
      name: 'folders',
      component: FoldersView
    },
    {
      path: '/folders/:id',
      name: 'folder-content',
      component: FolderContentView
    },
    {
      path: '/pinned',
      name: 'pinned',
      component: BookmarksView
    },
    {
      path: '/tags',
      name: 'tags',
      component: TagsView
    }
  ]
})

export default router