<script setup>
const props = defineProps({
    notifications: {
        type: Array,
        required: true
    }
})


</script>
<template>
    <div class="">
        <NotificationsItem v-for="notification in notifications "
            :key="notification.id" :notification="notification">
        </NotificationsItem>
    </div>
</template>