<script setup>

// import contact us mutations

definePageMeta({
    layout: "movies",
    
});
</script>

<template>
    <section class="bg-white py-32">
        <h2 class=" text-3xl font-bold text-primary9 py-8 text-center">Our Pricing Plan</h2>
        <div class="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
            <div class="bg-white shadow rounded-lg p-6 w-72">
                <h2 class="text-xl font-medium mb-4">Standard Ticket</h2>
                <p class="text-gray-600 mb-4">Admission for one person</p>
                <p class="text-3xl font-bold mb-4">150.00 Birr</p>
            </div>
            <div class="bg-white shadow rounded-lg p-6 w-72">
                <h2 class="text-xl font-medium mb-4">Couples</h2>
                <p class="text-gray-600 mb-4">Admission for one couples</p>
                <p class="text-3xl font-bold mb-4">200 Birr</p>
            </div>
            <div class="bg-white shadow rounded-lg p-6 w-72">
                <h2 class="text-xl font-medium mb-4">Family Pack</h2>
                <p class="text-gray-600 mb-4">Admission for family</p>
                <p class="text-3xl font-bold mb-4">250.00 Birr</p>
            </div>
        </div>
    </section>
</template>

