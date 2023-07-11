<script setup>

const props = defineProps({
    bookings: {
        type: Array,
        required: true
    }
})
</script>
<template> 
    <div  class="app relative">
        <div class=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
           <BookingItem v-for="booking in bookings" :key="booking.id"  :booking="booking"></BookingItem>
        </div>
    </div>
</template>

