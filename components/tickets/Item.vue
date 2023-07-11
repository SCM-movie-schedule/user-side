<script setup>

const props = defineProps({
    ticket: {
        type: Object,
        required: true
    }
})

function getDate(date){
    return date.split('T')[0]
}
</script>

<template>
    <div class=" p-2 border border-gray-light justify-between rounded-md  flex items-center mb-6 mr-3" >
        <div class="w-1/3 " >
            <div class="flex  items-center">
                <NuxtLink  class="  block" :to="`/movies/${ticket.movie.id}`">
                    <img class=" w-16 rounded-lg object-cover block h-10 "  :src="ticket.movie.image.url" :alt="ticket.movie.title">
                </NuxtLink>
                <div class="mx-1">
                    <p class="">Title: {{ ticket.movie.title }}</p>
                    <p class=" ">Duration: {{ ticket.movie.duration }}</p>
                </div>

            </div>
        </div>
        <div class=" pl-16  w-1/3 " >
            <p class=" ">Issue Date: {{getDate(ticket.date)}}</p>
            <p class=" ">Movie Date: {{ getDate(ticket.movie.date) }}</p>
            <!-- <div class=" py-5 px-2 bg-gray-dark text-white">  
            </div> -->
        </div>
        <div class=" pl-16 w-1/3 ">
            <p class=" ">Seat: {{ ticket.seat_number }}</p>
            <p class=" ">Price: {{ ticket.price }}</p>
            
        </div>
    </div>
</template>