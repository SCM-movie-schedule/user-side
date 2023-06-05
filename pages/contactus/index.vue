<script setup>

import contactMutation from '~/graphql/contacts/contact.gql'
import { useAuthStore } from '~/stores/modules/auth';
const authStore = useAuthStore();
const isloading = ref(true)
definePageMeta({
    layout: "userpanel",
    middleware:["user"]
});

const {mutate, onDone, loading, onError } = mutation(contactMutation);

onDone((result) => {
    authStore.removeNotification(result.data.delete_notifications_by_pk.id)
     
});

onError((error) => {
    console.log(error)
    window.alert('Something went wrong')
}); 
// import contact us mutations

definePageMeta({
    layout: "movies",
    middleware:["user"]
});
</script>

<template>
    <section class="bg-white py-12">
  <div class="py-16 px-4 mx-auto max-w-screen-md">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-primary9 ">Contact Us</h2>
      <p class="mb-8 lg:mb-16 font-light text-center text-primary7  sm:text-xl">Got a technical issue? Want to send feedback about our service? Need details about our Business plan? Let us know.</p>
      <form  action="#" class="space-y-8">
          <div>
              <label for="email" class="block mb-2 text-sm font-medium text-primary9">Your email</label>
              <input type="email" id="email" class="shadow-sm border border-gray text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="example@.com" required>
          </div>
          <div>
              <label for="subject" class="block mb-2 text-sm font-medium text-primary9 ">Subject</label>
              <input type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required>
          </div>
          <div class="sm:col-span-2">
              <label for="message" class="block mb-2 text-sm font-medium text-primary9 ">Your message</label>
              <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray bg-gray-50 rounded-lg shadow-sm border border-gray focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
          </div>
          <button type="submit" class="py-3 px-5 font-medium text-center text-white rounded-lg bg-yellow-bright sm:w-fit  focus:ring-4 focus:outline-none focus:ring-primary-300 ">Send message</button>
      </form>
  </div>
</section>
</template>