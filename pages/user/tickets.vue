<script setup>
// graphql queris to fetch data
import { useAuthStore } from '~/stores/modules/auth';
const authStore  = useAuthStore()

// fetch user data with movies
definePageMeta({
    layout: "userpanel",
    middleware:["user"]
    
});

function getDate(date){
    return date.split('T')[0]
}

const loading = ref(true)

</script>
<template> 
   <TicketsList v-if="authStore.getUser?.tickets?.length > 0" :tickets="authStore.getUser.tickets"></TicketsList>
   <BaseSpinner v-else-if="loading && !authStore.getUser"></BaseSpinner>
    <div v-else  class=" border-t-4 border-t-yellow-bright items-center  flex px-6 w-full justify-between py-8 bg-gray-dark">
        <p class=" text-white">No ticket has been Buyed yet</p>
        <div class=" border border-yellow-bright rounded-full ">
            <NuxtLink class="p-2 text-white block" to="/">Browse Movies</NuxtLink>
        </div>
    </div>
</template>

