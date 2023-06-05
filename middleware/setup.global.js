import {useAuthStore} from "@/stores/modules/auth"
export default defineNuxtRouteMiddleware((to, from , next) => {
    console.log('setup.global.js this is the global middleware')
    const authStore = useAuthStore()
    // if is logged in false but user has token on cookie the autoLogin will set the user to logged in
    if(!authStore.isLoggedIn){
        authStore.autoLogin()
    }
    return 
  })