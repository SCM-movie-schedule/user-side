<script setup>
// graphql queris to fetch data
import getBookings from '@/graphql/bookings/getBookings.gql'
import query from '@/composables/query.js'
import { useAuthStore } from '~/stores/modules/auth';
import mutation from "~/composables/mutation";
import unBookMovie from "~/graphql/bookings/unbook.gql"

const authStore  = useAuthStore()

// fetch user data with movies
definePageMeta({
    layout: "userpanel",
    middleware:["user"]
});
const {onResult, onError, loading, refetch} = authQuery(getBookings, {})
const bookings  = ref([])

onResult(result=>{
    result.data.bookings.forEach(booking => {
        bookings.value.push(booking)
    });
})
const movieUnBooked = ref(false)
// unbooking
const {mutate, onDone, loading:unbookLoading, onError:unbookError } = mutation(unBookMovie, 'user');

const deletedBookingId = ref(null)

provide('unbook', (id) => {
    deletedBookingId.value = id
    mutate({id})
})

onDone((result) => {
    movieUnBooked.value = true
    bookings.value = bookings.value.filter( booking => deletedBookingId.value != booking.id)
    setTimeout(() => {
        movieUnBooked.value = false
    }, 2000);   
});

onError((error) => {
    console.log(error)
    window.alert('Something went wrong')
});

const isloading = ref(true)

</script>
<template> 

    
    <BaseSpinner v-if="loading"></BaseSpinner>
    <BookingList v-if="bookings?.length > 0"  :bookings="bookings"></BookingList>
    <div v-else-if="bookings.length == 0" class=" border-t-4 border-t-yellow-bright items-center  flex px-6 w-full justify-between py-8 bg-gray-dark">
        <p class=" text-white">No Movie has been Booked yet</p>
        <div class=" border border-yellow-bright rounded-full ">
            <NuxtLink class="p-2 text-white block" to="/">Browse Movies</NuxtLink>
        </div>
    </div>

    <teleport to="body">
        <transition name="book">
            <div v-if="movieUnBooked"
                class=" top-28 right-4 text-white font-bold bg-gray-dark p-4 fixed ">
                <p>Movie is Unbooked Successfull</p>
            </div>
        </transition>
    </teleport>  
</template>

<style scoped>
  
 
</style>