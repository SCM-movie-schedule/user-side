<script setup>

import {useAuthStore} from '@/stores/modules/auth'
const authStore = useAuthStore()
const router = useRouter()
const logout = () => {
    authStore.logout()
    router.push('/')
}


definePageMeta({
    layout: "userpanel",
    middleware:["user"]
});


</script>

<template>
    <div v-if="authStore.getUser" class=" lg:ml-6  w-full">
        <p class=" text-primary9">Hello {{ authStore.getUser.firstName + ' '+ authStore.getUser.lastName }} (not {{ authStore.getUser.firstName }} ? <span @click="logout" class=" text-yellow-bright">Logout</span>) </p>
        <div class=" my-8 text-primary9">
            <p>
                From your account dashboard you can view <span class=" text-yellow-bright">your recent tickets</span> , 
                manage your bookings,
                 and<span class=" text-yellow-bright"> edit your password and account details.</span> 
            </p>
        </div>
    </div>
    <BaseSpinner v-else></BaseSpinner>

</template>