<template>
    <div class="space-y-8">
        <!-- 페이지 헤더 -->
        <div class="text-center space-y-2 sm:space-y-3">
            <h1
                class="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Unix Timestamp Converter
            </h1>
            <p class="mt-2 text-gray-700 text-base sm:text-lg">
                현재 시간을 Timestamp로 변환하거나,<br class="block sm:hidden" />
                Timestamp를 읽기 쉬운 날짜로 변환하세요
            </p>
            <p class="mt-2 text-gray-500 text-sm sm:text-base">
                (Convert current time to timestamp<br class="block sm:hidden" />
                or timestamp to readable date)
            </p>
        </div>

        <!-- 현재 시간 카드 -->
        <div
            class="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl sm:rounded-2xl shadow-lg text-white p-4 sm:p-8">
            <div class="grid grid-cols-1 gap-4 sm:gap-8">
                <div class="backdrop-blur-sm bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6">
                    <div class="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                        <svg class="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <circle cx="12" cy="12" r="10" stroke-width="2" />
                            <path stroke-width="2" d="M12 6v6l4 4" />
                        </svg>
                        <span class="font-semibold text-sm sm:text-base">현재 시간 (Current Time)</span>
                    </div>
                    <p class="text-xl sm:text-2xl font-bold">{{ currentDateTime }}</p>
                </div>
                <div class="backdrop-blur-sm bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6">
                    <div class="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                        <svg class="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" />
                        </svg>
                        <span class="font-semibold text-sm sm:text-base">현재 Timestamp (Current Timestamp)</span>
                    </div>
                    <p class="text-xl sm:text-2xl font-bold font-mono">{{ currentTimestamp }}</p>
                </div>
            </div>
        </div>

        <!-- 변환 도구 섹션 -->
        <div class="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            <!-- Timestamp → 날짜 변환 -->
            <div class="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="block sm:hidden">Timestamp to Date</span>
                    <span class="hidden sm:block">Timestamp를 날짜로 변환 (Timestamp to Date)</span>
                </h2>
                <div class="space-y-3 sm:space-y-4">
                    <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <input v-model="timestampInput" type="number" placeholder="Timestamp를 입력하세요 (Enter timestamp)"
                            class="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm" />
                        <button @click="convertTimestampToDate"
                            class="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                            Convert
                        </button>
                    </div>
                    <transition enter-active-class="transition-all duration-300 ease-out"
                        enter-from-class="opacity-0 transform translate-y-2"
                        enter-to-class="opacity-100 transform translate-y-0"
                        leave-active-class="transition-all duration-300 ease-in"
                        leave-from-class="opacity-100 transform translate-y-0"
                        leave-to-class="opacity-0 transform translate-y-2">
                        <div v-if="timestampResult" class="bg-gray-50 rounded-lg p-3 sm:p-4">
                            <p class="text-xs sm:text-sm text-gray-500 mb-1">변환 결과 (Result)</p>
                            <p class="text-base sm:text-lg font-semibold text-gray-900">{{ timestampResult }}</p>
                        </div>
                    </transition>
                </div>
            </div>

            <!-- 날짜 → Timestamp 변환 -->
            <div class="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" />
                    </svg>
                    <span class="block sm:hidden">Date to Timestamp</span>
                    <span class="hidden sm:block">날짜를 Timestamp로 변환 (Date to Timestamp)</span>
                </h2>
                <div class="space-y-3 sm:space-y-4">
                    <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <input v-model="dateInput" type="datetime-local"
                            class="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm" />
                        <button @click="convertDateToTimestamp"
                            class="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                            Convert
                        </button>
                    </div>
                    <transition enter-active-class="transition-all duration-300 ease-out"
                        enter-from-class="opacity-0 transform translate-y-2"
                        enter-to-class="opacity-100 transform translate-y-0"
                        leave-active-class="transition-all duration-300 ease-in"
                        leave-from-class="opacity-100 transform translate-y-0"
                        leave-to-class="opacity-0 transform translate-y-2">
                        <div v-if="dateResult" class="bg-gray-50 rounded-lg p-3 sm:p-4">
                            <p class="text-xs sm:text-sm text-gray-500 mb-1">변환 결과 (Result)</p>
                            <p class="text-base sm:text-lg font-semibold font-mono text-gray-900">{{ dateResult }}</p>
                        </div>
                    </transition>
                </div>
            </div>
        </div>

        <!-- 설명 섹션 -->
        <div class="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 prose max-w-none">
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Unix Timestamp란? (What is Unix Timestamp?)
            </h2>
            <div class="text-gray-600 space-y-3 sm:space-y-4">
                <p class="text-sm sm:text-base">
                    Unix Timestamp는 1970년 1월 1일 00:00:00 UTC부터 경과한 시간을 초 단위로 나타낸 값입니다.
                    개발자들이 시간을 다룰 때 자주 사용하며, 데이터베이스나 API에서 시간을 저장하고 전송하는 데 널리 활용됩니다.
                </p>
                <p class="text-sm sm:text-base">
                    (Unix Timestamp is the number of seconds elapsed since January 1, 1970 00:00:00 UTC. It's widely
                    used by developers for handling time in databases and APIs)
                </p>

                <div class="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <h3 class="text-base sm:text-xl font-semibold text-gray-900 mb-4">Common Use Cases</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        <div
                            class="bg-white rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div class="flex items-center space-x-3 sm:space-x-4">
                                <div
                                    class="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div class="min-w-0 flex-1">
                                    <h4 class="text-sm sm:text-base font-semibold text-gray-900 truncate">
                                        서버 로그의 시간 기록
                                    </h4>
                                    <p class="text-xs sm:text-sm text-gray-500 mt-0.5">
                                        Server logs
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            class="bg-white rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div class="flex items-center space-x-3 sm:space-x-4">
                                <div
                                    class="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 7v10c0 2 1.5 3 3 3h10c1.5 0 3-1 3-3V7c0-2-1.5-3-3-3H7c-1.5 0-3 1-3 3z" />
                                    </svg>
                                </div>
                                <div class="min-w-0 flex-1">
                                    <h4 class="text-sm sm:text-base font-semibold text-gray-900 truncate">
                                        데이터베이스의 생성일/수정일 저장
                                    </h4>
                                    <p class="text-xs sm:text-sm text-gray-500 mt-0.5">
                                        Database timestamps
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            class="bg-white rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div class="flex items-center space-x-3 sm:space-x-4">
                                <div
                                    class="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div class="min-w-0 flex-1">
                                    <h4 class="text-sm sm:text-base font-semibold text-gray-900 truncate">
                                        API 응답의 시간 정보
                                    </h4>
                                    <p class="text-xs sm:text-sm text-gray-500 mt-0.5">
                                        API response timestamps
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            class="bg-white rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div class="flex items-center space-x-3 sm:space-x-4">
                                <div
                                    class="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                </div>
                                <div class="min-w-0 flex-1">
                                    <h4 class="text-sm sm:text-base font-semibold text-gray-900 truncate">
                                        시스템 간 시간 동기화
                                    </h4>
                                    <p class="text-xs sm:text-sm text-gray-500 mt-0.5">
                                        System time synchronization
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const currentDateTime = ref('')
const currentTimestamp = ref(0)
const timestampInput = ref('')
const dateInput = ref('')
const timestampResult = ref('')
const dateResult = ref('')

// 현재 시간과 Timestamp 업데이트
const updateCurrentTime = () => {
    const now = new Date()
    currentDateTime.value = now.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    })
    currentTimestamp.value = Math.floor(now.getTime() / 1000)
}

// Timestamp → 날짜 변환
const convertTimestampToDate = () => {
    if (!timestampInput.value) return

    try {
        const date = new Date(parseInt(timestampInput.value) * 1000)
        timestampResult.value = date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        })
    } catch (error) {
        timestampResult.value = '유효하지 않은 Timestamp입니다'
    }
}

// 날짜 → Timestamp 변환
const convertDateToTimestamp = () => {
    if (!dateInput.value) return

    try {
        const date = new Date(dateInput.value)
        dateResult.value = Math.floor(date.getTime() / 1000).toString()
    } catch (error) {
        dateResult.value = '유효하지 않은 날짜입니다'
    }
}

// 컴포넌트 마운트 시 현재 시간 설정 및 1초마다 업데이트
onMounted(() => {
    updateCurrentTime()
    const timer = setInterval(updateCurrentTime, 1000)
    onUnmounted(() => clearInterval(timer))
})
</script>