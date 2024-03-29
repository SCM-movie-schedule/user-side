<script setup>
import { Form, Field } from 'vee-validate';
import signupMutation from '@/graphql/auth/signup.gql'
import authentication from '@/composables/authentication'
import * as Yup from 'yup';
import { ref, watch} from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave} from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'
const authToken = useCookie('auth-token',  { path: '/' }, { expires: 60 * 60 * 24 * 10 })
const router = useRouter();
const authStore = useAuthStore();
 
// vee-validate

const schema = Yup.object().shape({
  fullName: Yup.string("must be letter").
      matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for name ")
      .required('Full name is required'),
  email:Yup.string()
    .required('Email is required')
    .email("email is invalid "),
  password: Yup.string()
    .required('Password is required')
    .min(6, "password must be greater than 6")
    .max(16, "password must be less than 16 letter"),
  confirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please Confirm Password'),
});

// reactive datas
const invalidCredential = ref(false);
const variables = ref({email: "",password: "", fullName:""});
const someThingWrong = ref(false);

const {mutate, onDone, loading, onError } = authentication(signupMutation)
// on done the user data has to setted so on done setAuthData is called
onDone((result) => {
    authToken.value = 'Bearer '+ result.data.signup.token
    authStore.setUserId(result.data.signup.id)
    authStore.setToken(userToken.value)
    router.push('/user')
});

// on error the type of error is checked from error message
// if error messge includes the word Invalid then the error is the result of invalid data
// else the error come for diffirent reasons such internet connection, server erros and so on

onError((error) => {
    if(error.message.includes('Invalid')){
        invalidCredential.value = true
    }else{
        someThingWrong.value = true
    }
    console.log(error , "When signup")
});   

// function to handle mutate
function handleSignUp() {
    // split fullName
    variables.value.firstName = variables.value.fullName.split(' ')[0]
    variables.value.lastName = variables.value.fullName.split(' ')[1]
    console.log(variables, 'from signup')

    const data = {
        email: variables.value.email,
        password: variables.value.password,
        firstName: variables.value.fullName.split(' ')[0],
        lastName: variables.value.fullName.split(' ')[1]
    }

    mutate({data})
} 
// layout
definePageMeta({
  layout: "movies", 
});
 </script>
<template>
  <div class="register pt-16 ">
    <base-dialog :show="someThingWrong" @close="someThingWrong = false" title="Some thing Went Wrong"></base-dialog>
    <div id="detail-header-container" class="auth     md:bg-primary3 bg-no-repeat bg-cover bg-center relative  py-6 md:py-12">
      <div class="back absolute opacity-75 inset-0 z-0" ></div>
       <div class="md:min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div class="flex justify-center self-center w-full md:w-auto z-10">
          <div class="p-6 bg-white  w-full md:w-80 md:rounded-3xl ">
            <div class="mb-4">
              <h3 class="font-semibold text-2xl ">Sign up</h3>
              <p class="text-gray-500">Please fill the form to register.</p>
            </div> 
            <!-- :validation-schema="schema" -->
            <Form @change="invalidCredential = false" class="space-y-5" @submit="handleSignUp" :validation-schema="schema" v-slot="{ errors }">
            <div class="space-y-3">
                <!-- Full Name -->
              <div class="space-y-1 flex flex-col">
                <label for="fullName"  class=" text-lg font-medium text-gray-700 tracking-wide"> Full Name </label>
                <Field name="fullName"  v-model="variables.fullName" type="text" class="w-full text-base px-4 py-2 border border-gray rounded-lg  focus:border-yellow-bright "  placeholder="Your Full Name" :class="{ 'border-red': errors.fullName }" />
                 <transition name="error">
                    <span class="text-red text-sm" >{{errors.fullName}}</span>
                </transition>
              </div>
              <!-- Email -->
              <div class="space-y-2 flex flex-col">
                 <label class="text-sm font-medium text-gray-700 tracking-wide">Email *</label>
                  <Field name="email" v-model="variables.email" type="email" class="w-full text-base px-4 py-2 border border-gray rounded-lg  focus:border-yellow-bright "  placeholder="Your email" :class="{ 'border-red': errors.email }" />
                  <transition name="error">
                     <span class="text-red text-sm" >{{errors.email}}</span>
                 </transition>
             </div>
             <!-- Password -->
             <div class="space-y-2 flex flex-col">
                 <label class=" text-sm font-medium text-gray-700 tracking-wide">
                     Password *
                 </label>
                  <Field name="password"  v-model="variables.password" type="password" class="w-full text-base px-4 py-2 border border-gray rounded-lg    focus:border focus:border-yellow-bright focus:border-solid "  placeholder="Your Password" :class="{ 'border-red': errors.password }" />
                  <transition name="error">
                     <span class="text-red text-sm" >{{errors.password}}</span>
                 </transition>
             </div>
             <div class="space-y-2 flex flex-col">
                 <label class=" text-sm font-medium text-gray-700 tracking-wide">
                     Confirm Password *
                 </label>
                  <Field name="confirm"   type="password" class="w-full text-base px-4 py-2 border border-gray rounded-lg    focus:border focus:border-yellow-bright focus:border-solid "  placeholder="Confirm Password" :class="{ 'border-red': errors.password }" />
                  <transition name="error">
                     <span class="text-red text-sm" >{{errors.confirm}}</span>
                 </transition>
             </div>
              
              <div class="" v-show="invalidCredential">
                <p class="text-red-700">The email is already used  </p>
              </div>
              <div  class="flex justify-center">
                <button  :disabled="loading" type="submit" :class="{'bg-yellow-orange':loading, 'hover:bg-orange-00':loading,}" class=" w-44 flex justify-center bg-yellow-bright  hover:opacity-100 text-white  p-3  rounded-full  tracking-wide font-semibold shadow-lg  cursor-pointer transition  ease-in duration-400 ">
                     Sign up
                    <span v-if="loading" a class=" absolute animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                </button>
              </div>
            </div>
              </Form>
            <div class="mt-4">
              <p class="hover:text-orange-500 text-orange-400">
                <NuxtLink class=" text-yellow-bright font-bold" to="/auth/login">Have already an account</NuxtLink>
              </p>
            </div>
            <div class="pt-5 text-center text-gray-400 text-xs">
                <span>
                    Copyright © 2023
                    <a href="" rel="" target="_blank" title="Ajimon" class=" text-yellow-bright font-bold">SDflx</a>
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 
</template>

<style>
#detail-header-container{
    background-image: url(@assets/img/movie_details_bg.jpg);
 }
@media (max-width: 660px) {
  .back {
    display: none;
    }
  }
 .auth{
    background-image:url("");
  }
</style>