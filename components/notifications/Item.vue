<script setup>

const props = defineProps({
    notification: {
        type: Object,
        required: true
    }
})

const loading = ref(false)
const deleteNotification = inject('deleteNotification')
function deleteMessage(id){
    loading.value = true
    deleteNotification(id)
    setTimeout(() => {
        loading.value = false
    }, 3000);
}

const time = computed(() => {
    const date = new Date(props.notification.time)
    return date.toLocaleString()
})

</script>

<template>
    <div class="  max-w-2xl mb-4 p-2 bg-white flex  border border-gray rounded-md flex-nowrap justify-between items-center space-x-3">
        <!-- left -->
        <div>   
            <h2 class="  py-2">New 
                <svg xmlns="http://www.w3.org/2000/svg" 
                    width="20"
                    height="20"
                    class="text-yellow-bright inline-block cursor-pointer"
                    viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21"
                    />
                </svg>

                <span class=" mx-2">{{ time }}</span>
            </h2>
            <p class=" ">{{ notification.message }}.</p>
        </div>
        <!-- right -->
        <div class=" relative" :disabled="loading" @click="deleteMessage(notification.id)">
            <svg xmlns="http://www.w3.org/loading2000/svg" 
                    width="30"
                    height="30"
                    class="text-yellow-bright cursor-pointer"
                viewBox="0 0 24 24">
                <path
                fill="currentColor"
            d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"
                  />
                </svg>
                <span v-if="loading" class=" absolute  -top-1 animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-yellow-bright rounded-full" role="status" aria-label="loading"></span>
            </div>
        </div>
</template>