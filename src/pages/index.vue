<template>
  <div class="flex tracking-widest min-h-screen max-h-screen bg-white !overflow-hidden <lg:(flex-col)">
    <div class="sidebar text-center my-auto text-xl p-5 <lg:(!shadow order-last p-3)">
      <div class="flex flex-col <lg:(grid grid-cols-3)">
        <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg  hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#profile">About</a>
        <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg  hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#comment">Comments</a>
        <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg  hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#feedback">Feedback</a>
      </div>
    </div>
    <div class="flex flex-col flex-grow overflow-auto">
      <div class="navbar flex p-5 <lg:(flex-col text-center)">
        <span class="text-xl">Jwalbli developer test</span>
        <span class="ml-auto <lg:(m-0)">Bandung, 2022</span>
      </div>
      <Profile id="profile" />
      <RecentWork />
      <CommentSection id="comment" />
    </div>
  </div>
</template>

<script setup lang="ts">

import Profile from '~/components/Profile.vue'
import RecentWork from '~/components/RecentWork.vue'
import CommentSection from '~/components/Comment.vue'

</script>

<style lang="scss">
.loading {
  width: 100%;
  animation: loading 1s linear infinite alternate;
}

@-webkit-keyframes loading {
    0% {
      background-color: hsl(200, 2%, 85%);
    }

    100% {
      background-color: hsl(200, 2%, 95%);
    }
  }

@keyframes loading {
  0% {
    background-color: hsl(200, 2%, 85%);
  }

  100% {
    background-color: hsl(200, 2%, 95%);
  }
}
</style>
