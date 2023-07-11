<script setup>
// graphql queris to fetch data
import getTickets from '~/graphql/tickets/getTickets.gql'
// import getNotifications from '~/graphql/notifications/getNotifications.gql'

import { useAuthStore } from '~/stores/modules/auth';
const authStore  = useAuthStore()

// fetch user data with movies
definePageMeta({
    layout: "userpanel",
    middleware:["user"]
    
});

const {onResult, onError, loading, refetch} = authQuery(getTickets, {})
const tickets  = ref([])

onResult(result=>{
    result.data.tickets.forEach(ticket => {
        tickets.value.push(ticket)
    });
})

function getDate(date){
    return date.split('T')[0]
}


</script>
<template> 
   <BaseSpinner v-if="loading "></BaseSpinner>
   <TicketsList v-if="tickets && tickets?.length > 0" :tickets="tickets"></TicketsList>
    <div v-if="tickets.length == 0 && !loading"  class=" border-t-4 border-t-yellow-bright items-center  flex px-6 w-full justify-between py-8 bg-gray-dark">
        <p class=" text-white">No ticket has been Buyed yet</p>
        <div class=" border border-yellow-bright rounded-full ">
            <NuxtLink class="p-2 text-white block" to="/">Browse Movies</NuxtLink>
        </div>
    </div>
</template>

