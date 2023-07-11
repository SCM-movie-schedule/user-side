<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { ref, watch} from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave} from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'
import contactMutation from '~/graphql/contacts/contact.gql'
const userToken = useCookie('user-token',  { path: '/' }, { expires: 60 * 60 * 24 * 10 })
const router = useRouter();
const authStore = useAuthStore();

// vee-validate
const schema = Yup.object().shape({
    email: Yup.string()
    .required('email is required')
    .email("email is invalid "),
    subject: Yup.string().required('subject is required'),
    message: Yup.string().required('message is required')
});
definePageMeta({
    layout: "userpanel"
});

// define reactive variables
const email = ref('')
const subject = ref('')
const message = ref('')

const messageSent = ref(false)

const {mutate, onDone, loading, onError } = authentication(contactMutation);
const handleContactUs = ()=>{

    const data = [
            {
                email:email.value,
                subject:subject.value,
                body: message.value
            }
        ]
      
    
    mutate({data})
}




onDone((result) => {
    messageSent.value = true
    setTimeout(() => {
        messageSent.value = false
    }, 2000);
    // alert('Your message has been sent')
});

onError((error) => {
    console.log(error)
    window.alert('Something went wrong')
}); 
// import contact us mutations

definePageMeta({
    layout: "movies",
    // middleware:["user"]
});
</script>

<template>
    <!-- <div>
        <h1>Selamu dawit selemon</h1>
    </div> -->
<section class="bg-white py-12">
   
  <div class="py-16 px-4 mx-auto max-w-screen-md">
      <h2 class="mb-4 text-6xl tracking-tight font-extrabold text-center text-primary9 ">Contact Us</h2>
      <p class="mb-8 lg:mb-16 font-light text-center text-primary7  sm:text-xl">Got a technical issue? Want to send feedback about our service? Need details about our Business plan? Let us know.</p>
      <form  action="#" class="space-y-8" @submit.prevent="handleContactUs"  >
          <div>
              <label for="email" class="block mb-2 text-sm font-medium text-primary9">Your email</label>
              <input  v-model="email" name="email"  type="email" id="email" class="shadow-sm border border-gray text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="example@.com">
          </div>
          <div>
              <label for="subject" class="block mb-2 text-sm font-medium text-primary9 ">Subject</label>
              <input v-model="subject" type="text" id="subject" class="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray shadow-sm focus:ring-primary-500 focus:border-primary-500   " placeholder="Let us know how we can help you" required>
          </div>
          <div class="sm:col-span-2">
              <label for="message" class="block mb-2 text-sm font-medium text-primary9 ">Your message</label>
              <textarea  v-model="message" id="message" rows="6" class="block p-2.5 w-full text-sm  bg-gray-50 rounded-lg shadow-sm border border-gray focus:ring-primary-500 focus:border-primary-500 " placeholder="Leave a comment..."></textarea>
          </div>
          <button :disabled="loading" type="submit" class="py-3  px-5 font-bold text-center text-gray-dark  rounded-lg bg-yellow-bright sm:w-fit  focus:ring-4 focus:outline-none focus:ring-primary-300 ">Send message</button>
      </form>
      <teleport to="body">
        <transition name="book">
            <div v-if="messageSent"
                class=" top-28 right-4 text-white font-bold bg-gray-dark p-4 fixed ">
                <p>Message has been sent Successfull</p>
            </div>
        </transition>
    </teleport>  
  </div>
</section>
</template>