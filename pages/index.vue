<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 class="text-4xl font-bold text-blue-600 mb-4">
            기본 페이지
        </h1>
        <p class="text-gray-700 text-lg">
            이 페이지는 <strong>/</strong> 경로에서 보여지는 기본 페이지입니다.
        </p>
        <NuxtLink to="/timestamp" class="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Timestamp 변환 페이지로 이동
        </NuxtLink>
    </div>
</template>

<script setup>
</script>

<style>
body {
    margin: 0;
}
</style>
