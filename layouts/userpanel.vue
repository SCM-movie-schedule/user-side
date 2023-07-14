
<template>
    <LayoutHeader></LayoutHeader>
    <div class=" pt-28  lg:pt-48 pb-32 container mx-auto">
        <div class=" flex items-start flex-col lg:flex-row">
            <LayoutSideBar></LayoutSideBar>
            <div class=" sm:py-4 lg:py-0 px-4 w-full  lg:w-2/3">
                <slot/>
            </div>
        </div>
    </div>
    <layout-footer></layout-footer>
</template>

<style scoped>


</style>

