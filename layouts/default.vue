<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <!-- 글래스모피즘 효과가 적용된 헤더 -->
        <header class="sticky top-0 z-50 backdrop-blur-md bg-white/75 border-b border-gray-200/50">
            <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <!-- 로고 섹션 -->
                    <div class="flex items-center">
                        <NuxtLink to="/" class="flex items-center space-x-2">
                            <!-- 로고 이미지 -->
                            <div class="relative w-8 h-8">
                                <div class="relative w-full h-full overflow-hidden rounded-full">
                                    <img src="/logo.png" alt="Unix Timestamp Converter Logo"
                                        class="w-full h-full object-cover" width="32" height="32" />
                                </div>
                                <div
                                    class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <!-- 호버 시 보일 SVG 아이콘 -->
                                    <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                        <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <circle cx="12" cy="12" r="10" stroke-width="2" />
                                            <path stroke-width="2" d="M12 6v6l4 4" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <span
                                class="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                Unix Timestamp Converter
                            </span>
                        </NuxtLink>
                    </div>


                    <!-- 데스크톱 네비게이션 -->
                    <div class="hidden sm:flex sm:items-center sm:space-x-1">
                        <NuxtLink v-for="item in navigation" :key="item.to" :to="item.to"
                            class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200" :class="[
                                $route.path === item.to
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                            ]">
                            {{ item.name }}
                        </NuxtLink>
                    </div>

                    <!-- 모바일 메뉴 버튼 -->
                    <div class="flex items-center sm:hidden">
                        <button @click="isMenuOpen = !isMenuOpen"
                            class="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            aria-expanded="false">
                            <span class="sr-only">메뉴 열기</span>
                            <svg class="w-6 h-6" :class="[isMenuOpen ? 'hidden' : 'block']" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg class="w-6 h-6" :class="[isMenuOpen ? 'block' : 'hidden']" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- 모바일 메뉴 -->
                <transition enter-active-class="transition duration-200 ease-out"
                    enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-100 ease-in"
                    leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                    <div v-show="isMenuOpen"
                        class="sm:hidden absolute inset-x-0 top-16 bg-white border-b border-gray-200 pb-3 shadow-lg">
                        <div class="space-y-1 px-4">
                            <NuxtLink v-for="item in navigation" :key="item.to" :to="item.to"
                                class="block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                                :class="[
                                    $route.path === item.to
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-100'
                                ]" @click="isMenuOpen = false">
                                {{ item.name }}
                            </NuxtLink>
                        </div>
                    </div>
                </transition>
            </nav>
        </header>

        <!-- 메인 콘텐츠 -->
        <main class="flex-grow">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <!-- 페이지 전환 애니메이션 -->
                <transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
                    enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300"
                    leave-from-class="opacity-100" leave-to-class="opacity-0">
                    <slot />
                </transition>
            </div>
        </main>

        <!-- 푸터 -->
        <footer class="bg-white border-t border-gray-200/50">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col items-center space-y-2">
                    <!-- 로고 반복 -->
                    <div class="flex items-center space-x-2">
                        <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" stroke-width="2" />
                            <path stroke-width="2" d="M12 6v6l4 4" />
                        </svg>
                        <span class="text-sm font-semibold text-gray-900">Unix Timestamp Converter</span>
                    </div>
                    <p class="text-sm text-gray-500">
                        © 2025 Unix Timestamp Converter. 모든 시간은 브라우저 기준으로 표시됩니다.
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false)

const navigation = [
    { name: 'Timestamp 변환', to: '/timestamp' },
    { name: 'UTC 변환', to: '/utc' }
]

// 라우트 변경 시 모바일 메뉴 닫기
watch(() => useRoute().path, () => {
    isMenuOpen.value = false
})
</script>

<style>
/* 스무스 스크롤 적용 */
html {
    scroll-behavior: smooth;
}

/* 글래스모피즘 효과를 위한 추가 스타일 */
.backdrop-blur-md {
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
}
</style>