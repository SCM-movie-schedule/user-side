import {useAuthStore} from "@/stores/modules/auth"
export default defineNuxtRouteMiddleware((to, from , next) => {
    const authStore = useAuthStore()
    // if is logged in false and user has no token on cookie
    if (authStore.isLoggedIn) {
        return
    }
    else {
        return navigateTo('/auth/login')
    }
  })