<template>
  <div class="flex flex-col">
    <h1 class="font-serif text-4xl text-center p-5">
      What people says
    </h1>

    <div class="grid grid-cols-2 <lg:(grid-cols-1)">
      <template v-if="commentStore.commentList && !loading">
        <div
          v-for="item in commentStore.commentList" :key="item.userId"
          class="card flex flex-col rounded-8px shadow cursor-pointer p-3 m-5 transition-all transform hover:(scale-105)"
          @click="selectComments(item.id)"
        >
          <div class="my-auto text-center">
            <span class="italic">"{{ item.body }}"</span>
            <div class="flex flex-col my-3">
              <span class="font-semibold">{{ item.title }}</span>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div
          v-for="handle in 7"
          :key="handle.id"
          class="card flex flex-col rounded-8px shadow cursor-pointer m-5 h-150px bg-gray-100 animate-pulse"
        />
      </template>
    </div>

    <div id="feedback" class="flex flex-col flex-grow p-5">
      <h1 class="font-serif text-3xl text-center">
        Leave feedback here
      </h1>

      <div class="mt-5">
        <form class="mx-auto w-1/2 <lg:(w-full)">
          <div class="mb-6">
            <label
              for="title"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Title</label>
            <input
              id="title"
              v-model="commentStore.commentForm.title"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required
            >
          </div>
          <div class="mb-6">
            <label
              for="comment"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Comment</label>
            <input
              id="comment"
              v-model="commentStore.commentForm.body"
              type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required
            >
          </div>

          <button
            type="submit"
            class="text-white bg-gray-400 hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm !w-full sm:w-auto px-5 py-2.5 text-center" @click.prevent="submit()"
          >
            Submit
          </button>
        </form>
      </div>
    </div>

    <div
      v-show="isOpen"
      class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
    >
      <div class="w-1/2 p-6 mx-3 bg-white rounded-md shadow-xl">
        <div class="flex items-center justify-between">
          <h3 class="text-2xl">
            Comment
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 text-red-600 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            @click="isOpen = false, isEdit = false, isUpdate = false"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div class="mt-4 text-center">
          <template v-if="!isUpdate">
            <template v-if="isEdit">
              <form class="mx-auto w-1/2 <lg:(w-full)">
                <div class="mb-6">
                  <label for="editTitle" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                  <input id="editTitle" v-model="commentStore.commentSelected.title" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>
                <div class="mb-6">
                  <label for="editComment" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Comment</label>
                  <input id="editComment" v-model="commentStore.commentSelected.body" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>
                <button class="px-6 py-2 text-blue-800 border border-blue-600 rounded" :disabled="loadingUpdate" @click.prevent="edit()">
                  Edit
                </button>
                <button class="px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded" @click.prevent="isEdit = false">
                  Cancel
                </button>
              </form>
            </template>

            <template v-else>
              <template v-if="!loadingDetail">
                <p class="mb-4 text-sm italic">
                  "{{ commentStore.commentSelected.body }}"
                </p>
                <p class="mb-4 text-sm">
                  {{ commentStore.commentSelected.title }}
                </p>
              </template>
              <template v-else>
                <div class="h-20px w-full rounded-8px animate-pulse bg-gray-200 my-3" />
                <div class="h-20px w-full rounded-8px animate-pulse bg-gray-200 my-3" />
                <div class="h-15px w-1/2 rounded-8px animate-pulse bg-gray-200 my-3 mx-auto" />
              </template>
            </template>

            <template v-if="!isEdit">
              <button class="px-6 py-2 text-blue-800 border border-blue-600 rounded" @click="isEdit = true">
                Edit
              </button>
              <button class="px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded" :disabled="loadingUpdate" @click.prevent="deleted()">
                Delete
              </button>
            </template>
          </template>

          <template v-else>
            <span class="text-2xl">{{ message.context }}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useCommentStore } from '~/store/home'
import { addComments, deleteComments, detailComments, editComments, getComments } from '~/services/comment'

const commentStore = useCommentStore()

const isOpen = ref(false)
const isEdit = ref(false)
const isUpdate = ref(false)
const message = ref({})
const loading = ref(false)
const loadingDetail = ref(false)
const loadingUpdate = ref(false)

const addComment = async(payload: object) => {
  loading.value = true
  try {
    const response = await addComments(payload)
    // success, add new value to comment list
    commentStore.commentList.push(response.data)
    // reset the form value
    commentStore.commentForm = { id: null, title: '', body: '', userId: 1 }
    loading.value = false
  }
  catch (error) {
    console.error(error)
    message.value = {
      type: 400,
      context: 'Fail on create',
    }
    isUpdate.value = true
  }
}

const detailComment = async(payload: number) => {
  loadingDetail.value = true
  try {
    // consume the api to get comment list
    const response = await detailComments(payload)
    // assign to the setup state
    commentStore.commentSelected = response.data
    loadingDetail.value = false
  }
  catch (error) {
    console.error(error)
    message.value = {
      type: 400,
      context: 'Data not found',
    }
    isUpdate.value = true
  }
}

const editComment = async(payload: object) => {
  loadingUpdate.value = true
  try {
    const response = await editComments(payload)
    message.value = {
      type: 200,
      context: 'Success edit comment',
    }
    isUpdate.value = true
    loadingUpdate.value = false
  }
  catch (error) {
    console.error(error)
    message.value = {
      type: 400,
      context: 'Fail on update',
    }
    isUpdate.value = true
  }
}

const deleteComment = async(payload: number) => {
  loadingUpdate.value = true
  try {
    const response = await deleteComments(payload)
    message.value = {
      type: 200,
      context: 'Success delete comment',
    }
    isUpdate.value = true
    loadingUpdate.value = false
  }
  catch (error) {
    console.error(error)
    message.value = {
      type: 400,
      context: 'Fail on delete',
    }
    isUpdate.value = true
  }
}

const getComment = async() => {
  loading.value = true
  try {
    // consume the api to get comment list
    const response = await getComments()
    loading.value = false
    // assign to the setup state
    commentStore.commentList = response.data
  }
  catch (error) {
    console.error(error)
  }
}

const submit = () => {
  if (!loading.value) {
    const payload = {
    // set the payload value to store state
      data: commentStore.commentForm,
    }
    addComment(payload)
  }
  // hit the addComment function execute the api
}

const edit = () => {
  const payload = {
    data: {
      id: commentStore.commentSelected.id,
      title: commentStore.commentSelected.title,
      body: commentStore.commentSelected.body,
      userId: commentStore.commentSelected.userId,
    },
  }
  editComment(payload)
}

const deleted = () => {
  deleteComment(commentStore.commentSelected.id)
}

const selectComments = (data: number) => {
  detailComment(data)
  isOpen.value = true
}

onMounted(() => {
  // on first load, execute the getComment function
  getComment()
})
</script>
