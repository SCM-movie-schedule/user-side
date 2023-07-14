<template>
    <h1>Selamu Dawit</h1>
</template>

<script setup>
import { Form, Field } from 'vee-validate';
import loginMutation from '@/graphql/auth/login.gql'
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
const variables = ref({email: "",password: "", fullName});
const someThingWrong = ref(false);

const {mutate, onDone, loading, onError } = authentication(loginMutation)
// on done the user data has to setted so on done setAuthData is called
onDone((result) => {
    userToken.value = 'Bearer '+ result.data.login.token
    authStore.setAuthData(result.data.login.id, result.data.login.role )
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
    console.log(error , "When Login")
});   

// function to handle mutate
function handleSignUp() {
    console.log(variables, 'from signup')
    mutate({data: {...variables.value}})
} 
// layout
definePageMeta({
  layout: "movies", 
});
 </script>