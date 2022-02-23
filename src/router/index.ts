import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('~/pages/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.name === 'EventPage' || to.name === 'HomePage')
      return { top: 0 }
  },
})

router.beforeEach(() => { NProgress.start() })
router.afterEach(() => { NProgress.done() })

export default router
