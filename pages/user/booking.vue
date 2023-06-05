<script setup>
// graphql queris to fetch data
import getMovies from '@/graphql/movies/query/getMovies.gql'
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

const movieBooked = ref(false)
// unbooking
const {mutate, onDone, loading, onError } = mutation(unBookMovie, 'user');


const deletedBookingId = ref(null)

provide('unbook', (id) => {
    deletedBookingId.value = id
    mutate({id})
})

onDone((result) => {
    movieBooked.value = true
    authStore.removeBooking(deletedBookingId.value)
    setTimeout(() => {
        movieBooked.value = false
    }, 5000);   
});

onError((error) => {
    console.log(error)
    window.alert('Something went wrong')
});

const isloading = ref(true)

</script>
<template> 
    <div v-if="authStore.getUser?.bookings?.length > 0" class="app relative">
        <BookingList :bookings="authStore.getUser.bookings"></BookingList>
        <teleport to="body">
            <transition name="book">
                <div v-if="movieBooked"
                    class=" top-28 right-4 text-white font-bold bg-gray-dark p-4 fixed ">
                    <p>Movie is Unbooked Successfull</p>
                </div>
            </transition>
        </teleport>  
    </div>
    <BaseSpinner v-else-if="isloading && !authStore.getUser"></BaseSpinner>
    <div v-else class=" border-t-4 border-t-yellow-bright items-center  flex px-6 w-full justify-between py-8 bg-gray-dark">
        <p class=" text-white">No Movie has been Booked yet</p>
        <div class=" border border-yellow-bright rounded-full ">
            <NuxtLink class="p-2 text-white block" to="/">Browse Movies</NuxtLink>
        </div>
    </div>
</template>

<style scoped>
  
 
</style>