<script setup>

import deleteNotification from '~/graphql/notifications/delete.gql'
import getNotifications from '~/graphql/notifications/getNotifications.gql'
import { useAuthStore } from '~/stores/modules/auth';
const authStore = useAuthStore();
definePageMeta({
    layout: "userpanel",
    middleware:["user"]
});

const {onResult, onError, loading, refetch} = authQuery(getNotifications, {})
const notifications  = ref([])

onResult(result=>{
    console.log('the result ia', result.data)
    // notifications.value = result.data.notifications
    result.data.notifications.forEach(notification => {
        notifications.value.push(notification)
    });
})
onError(error=>{
    console.log(error, 'when gettnig notifications')
})

const {mutate, onDone,  loading:deleteLoading, onError:deleteOnError } = mutation(deleteNotification, 'user');
provide('deleteNotification',  (id) => {
    mutate({id})
}) 
onDone((result) => {
    console.log(result.data.delete_notifications_by_pk)
    notifications.value = notifications.value.filter( notification => result?.data?.delete_notifications_by_pk.id != notification.id)
});

deleteOnError((error) => {
    console.log(error)
    window.alert('Something went wrong')
}); 
</script>

<template>
    
    <BaseSpinner v-if="loading"></BaseSpinner>
    <NotificationsList v-if="notifications.length > 0" :notifications="notifications"></NotificationsList>
    <div v-if="notifications.length == 0 && !loading"  class=" max-w-lg border-t-4 border-t-yellow-bright items-center  flex px-6 w-full justify-between py-8 bg-gray-dark">
        <p class=" text-white">oofs there is no notifications</p>
    </div>
</template>
