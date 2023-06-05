<script setup>

import deleteNotification from '~/graphql/notifications/delete.gql'
import { useAuthStore } from '~/stores/modules/auth';
const authStore = useAuthStore();
const isloading = ref(true)
definePageMeta({
    layout: "userpanel",
    middleware:["user"]
});

const {mutate, onDone, loading, onError } = mutation(deleteNotification, 'user');
provide('deleteNotification',  (id) => {
    mutate({id})
}) 
onDone((result) => {
    authStore.removeNotification(result.data.delete_notifications_by_pk.id)
     
});

onError((error) => {
    console.log(error)
    window.alert('Something went wrong')
}); 
</script>

<template>
    
    <NotificationsList v-if="authStore.getUser" :notifications="authStore.getUser?.users_notifications"></NotificationsList>
    <BaseSpinner v-else-if="isloading && !authStore.getUser"></BaseSpinner>
    <div v-else   class=" max-w-lg border-t-4 border-t-yellow-bright items-center  flex px-6 w-full justify-between py-8 bg-gray-dark">
        <p class=" text-white">oofs there is no notifications</p>
    </div>
</template>

<!-- The message and contact part should finshed today -->