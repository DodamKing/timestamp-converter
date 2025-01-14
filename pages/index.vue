<template>
    <div class="space-y-8">
        <!-- 헤드라인 섹션 -->
        <div class="text-center">
            <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">
                시간 변환 도구
            </h1>
            <p class="mt-4 text-lg text-gray-600">
                Unix Timestamp 변환과 UTC 시간 변환을 한 곳에서 간편하게
            </p>
        </div>

        <!-- 메인 기능 영역 -->
        <div class="grid gap-6 md:grid-cols-2">
            <!-- Timestamp 변환 카드 -->
            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <div class="p-6">
                    <h2 class="text-2xl font-semibold text-gray-900 mb-4">
                        Unix Timestamp 변환
                    </h2>
                    <TimestampConverter />
                    <NuxtLink to="/timestamp" class="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
                        자세히 보기
                        <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </NuxtLink>
                </div>
            </div>

            <!-- UTC 변환 카드 -->
            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <div class="p-6">
                    <h2 class="text-2xl font-semibold text-gray-900 mb-4">
                        UTC 시간 변환
                    </h2>
                    <UTCConverter />
                    <NuxtLink to="/utc" class="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
                        자세히 보기
                        <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- SEO 콘텐츠 영역 -->
        <div class="prose max-w-none">
            <h2>Unix Timestamp와 UTC 시간 변환기 사용 가이드</h2>
            <p>
                이 도구는 개발자와 일반 사용자 모두를 위한 시간 변환 서비스를 제공합니다.
                Unix Timestamp를 보기 쉬운 날짜로 변환하거나,
                전 세계 여러 시간대 간의 시차를 확인할 수 있습니다.
            </p>

            <h3>주요 기능</h3>
            <ul>
                <li>현재 시간의 Unix Timestamp 확인</li>
                <li>Timestamp를 읽기 쉬운 날짜로 변환</li>
                <li>UTC와 로컬 시간 간의 변환</li>
                <li>주요 도시 시간대 정보 제공</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default'
})
</script>