import { defineStore } from 'pinia'

export const useCommentStore = defineStore('home', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      commentList: [],
      commentForm: {
        id: null,
        title: '',
        body: '',
        userId: 1,
      },
      commentSelected: {},
    }
  },
  actions: {
    selectComment(data: object) {
      this.commentSelected = data
    },
  },
})
