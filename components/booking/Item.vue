<script setup>

const props = defineProps({
    booking: {
        type: Object,
        required: true
    }
})
const loading = ref(false)
const unbook = inject('unbook')
function unBookMovie(id){
    loading.value = true
    unbook(id)
    setTimeout(() => {
        loading.value = false
    }, 3000);
}
</script>

<template>
    <div class=" mb-6 mr-3" >
        <NuxtLink  class=" block" :to="`/movies/${booking.movie.id}`">
            <img class=" block h-80 w-72"  :src="booking.movie.image.url" :alt="booking.movie.title">
        </NuxtLink>
        <div class=" flex flex-nowrap justify-between p-2 bg-gray-dark text-white">
            <h1 class=" font-bold">{{ booking.movie.title }}</h1>
            <div class="relative">
                <button @click="unBookMovie(booking.id)" class=" uppercase text-yellow-bright font-bold">Unbook</button>
                <span v-if="loading" a class=" absolute left-3 -top-1 animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent  text-white rounded-full" role="status" aria-label="loading"></span>
            </div>
        </div>
    </div>
</template>