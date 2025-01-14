<template>
    <div class="space-y-6 sm:space-y-8">
        <!-- 헤더 섹션 -->
        <div class="text-center">
            <h1
                class="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 bg-clip-text text-transparent">
                UTC 시간 변환
            </h1>
            <p class="mt-2 sm:mt-3 text-gray-600 text-base sm:text-lg">
                전세계 시간대를 한눈에 확인하고 변환하세요
            </p>
        </div>

        <!-- 메인 시계 섹션 -->
        <div
            class="relative bg-gradient-to-br from-blue-600 to-indigo-800 rounded-xl sm:rounded-3xl shadow-xl p-4 sm:p-8 overflow-hidden">
            <!-- 배경 장식 -->
            <div class="absolute inset-0 bg-pattern opacity-10"></div>

            <!-- 현재 시간 그리드 -->
            <div class="relative grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
                <!-- UTC 시간 -->
                <div
                    class="backdrop-blur-md bg-white/10 rounded-lg sm:rounded-2xl p-4 sm:p-6 flex flex-col items-center">
                    <div class="text-white/80 mb-1 sm:mb-2 font-medium text-sm sm:text-base">UTC</div>
                    <div class="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                        {{ currentUTCTime }}
                    </div>
                </div>

                <!-- 로컬 시간 -->
                <div
                    class="backdrop-blur-md bg-white/10 rounded-lg sm:rounded-2xl p-4 sm:p-6 flex flex-col items-center">
                    <div class="text-white/80 mb-1 sm:mb-2 font-medium text-sm sm:text-base">현지 시간</div>
                    <div class="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                        {{ currentLocalTime }}
                    </div>
                    <div class="mt-2 text-white/80 text-xs sm:text-sm">
                        {{ localTimeZone }}
                    </div>
                </div>

                <!-- 시차 정보 -->
                <div
                    class="backdrop-blur-md bg-white/10 rounded-lg sm:rounded-2xl p-4 sm:p-6 flex flex-col items-center">
                    <div class="text-white/80 mb-1 sm:mb-2 font-medium text-sm sm:text-base">UTC와의 시차</div>
                    <div class="text-2xl sm:text-3xl font-bold text-white">
                        {{ utcOffset }}
                    </div>
                </div>
            </div>
        </div>

        <!-- 시간 변환기 카드 -->
        <div class="bg-white rounded-xl sm:rounded-3xl shadow-lg p-4 sm:p-8 transition duration-300 hover:shadow-xl">
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 text-center">KST ↔ UTC 변환</h2>

            <!-- 변환 방향 선택 -->
            <div class="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                <button @click="conversionMode = 'KST_TO_UTC'"
                    class="px-4 py-2 rounded-lg transition-colors duration-200 w-full sm:w-auto"
                    :class="[conversionMode === 'KST_TO_UTC' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']">
                    한국 시간 → UTC
                </button>
                <button @click="conversionMode = 'UTC_TO_KST'"
                    class="px-4 py-2 rounded-lg transition-colors duration-200 w-full sm:w-auto"
                    :class="[conversionMode === 'UTC_TO_KST' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']">
                    UTC → 한국 시간
                </button>
            </div>

            <!-- 시간 입력 섹션 -->
            <div class="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <h3 class="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 flex items-center">
                    <span
                        class="bg-blue-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-sm mr-2">1</span>
                    {{ conversionMode === 'KST_TO_UTC' ? '한국 시간을 입력하세요' : 'UTC 시간을 입력하세요' }}
                </h3>

                <!-- 입력 방식 탭 -->
                <div class="border-b border-gray-200 mb-4">
                    <nav class="flex space-x-4" aria-label="입력 방식">
                        <button @click="inputMode = 'direct'"
                            class="px-3 py-2 text-sm font-medium border-b-2 transition-colors duration-200"
                            :class="[inputMode === 'direct' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
                            직접 입력
                        </button>
                        <button @click="inputMode = 'select'"
                            class="px-3 py-2 text-sm font-medium border-b-2 transition-colors duration-200"
                            :class="[inputMode === 'select' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
                            선택하기
                        </button>
                    </nav>
                </div>

                <!-- 직접 입력 모드 -->
                <div v-if="inputMode === 'direct'" class="space-y-3 sm:space-y-4">
                    <!-- 복사/붙여넣기 입력 -->
                    <div class="space-y-2">
                        <input v-model="timeText" type="text"
                            class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            :placeholder="conversionMode === 'KST_TO_UTC' ? '예: 2024-01-14 15:30 또는 20240114 1530' : '예: 2024-01-14 15:30'" />
                        <p class="text-xs sm:text-sm text-gray-500">다양한 형식을 붙여넣을 수 있습니다 (YYYY-MM-DD HH:mm, YYYYMMDDHHmm
                            등)</p>
                    </div>

                    <!-- 현재 시각 사용 옵션 -->
                    <div class="flex justify-end">
                        <button @click="useCurrentTime"
                            class="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                            현재 시각 사용
                        </button>
                    </div>
                </div>

                <!-- 선택 모드 -->
                <div v-else class="space-y-3 sm:space-y-4">
                    <!-- 날짜 선택 -->
                    <div class="grid grid-cols-3 gap-2">
                        <select v-model="selectedYear" class="rounded-lg border-gray-300 text-sm sm:text-base">
                            <option v-for="year in years" :key="year" :value="year">{{ year }}년</option>
                        </select>
                        <select v-model="selectedMonth" class="rounded-lg border-gray-300 text-sm sm:text-base">
                            <option v-for="month in 12" :key="month" :value="month">{{ month }}월</option>
                        </select>
                        <select v-model="selectedDay" class="rounded-lg border-gray-300 text-sm sm:text-base">
                            <option v-for="day in daysInMonth" :key="day" :value="day">{{ day }}일</option>
                        </select>
                    </div>

                    <!-- 시간 선택 -->
                    <div class="grid grid-cols-2 gap-2">
                        <select v-model="selectedHour" class="rounded-lg border-gray-300 text-sm sm:text-base">
                            <option v-for="hour in 24" :key="hour - 1" :value="hour - 1">
                                {{ (hour - 1).toString().padStart(2, '0') }}시
                            </option>
                        </select>
                        <select v-model="selectedMinute" class="rounded-lg border-gray-300 text-sm sm:text-base">
                            <option v-for="minute in 60" :key="minute - 1" :value="minute - 1">
                                {{ (minute - 1).toString().padStart(2, '0') }}분
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- 변환 결과 -->
            <div v-if="convertedTime"
                class="mt-4 sm:mt-6 bg-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-blue-200">
                <h3 class="text-base sm:text-lg font-medium text-blue-900 mb-2 flex items-center">
                    <span
                        class="bg-blue-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-sm mr-2">2</span>
                    변환 결과
                </h3>
                <div class="text-xl sm:text-2xl font-bold text-blue-900 text-center">
                    {{ convertedTime }}
                </div>
                <p class="text-sm sm:text-base text-blue-600 text-center mt-2">
                    {{ conversionMode === 'KST_TO_UTC' ? 'UTC (협정세계시)' : 'KST (한국 표준시)' }}
                </p>
            </div>
        </div>

        <!-- 전세계 주요 도시 현재 시각 -->
        <div class="bg-white rounded-xl sm:rounded-3xl shadow-lg p-4 sm:p-8">
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">주요 도시 현재 시각</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div v-for="city in majorCities" :key="city.timezone"
                    class="p-3 sm:p-4 rounded-lg sm:rounded-xl transition duration-300 hover:bg-gray-50"
                    :class="[city.timezone === localTimeZone ? 'bg-blue-50' : 'bg-gray-50']">
                    <div class="flex items-center space-x-3">
                        <div class="flex-1">
                            <p class="font-medium text-gray-900 text-sm sm:text-base">{{ city.name }}</p>
                            <p class="text-xs sm:text-sm text-gray-500">{{ getTimezoneAbbr(city.timezone) }}</p>
                        </div>
                        <div class="text-base sm:text-lg font-semibold text-gray-900 tabular-nums">
                            {{ getCityTime(city.timezone) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SEO 콘텐츠 -->
        <div class="prose max-w-none bg-white rounded-xl sm:rounded-3xl shadow-lg p-4 sm:p-8">
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">UTC(협정 세계시)란?</h2>
            <p class="text-sm sm:text-base text-gray-600">
                UTC(Coordinated Universal Time)는 세계 표준시로 사용되는 시간 체계입니다.
                이전에 사용되던 GMT(Greenwich Mean Time)를 대체하여 현재는 국제 표준으로 사용되고 있으며,
                전 세계의 시간대는 UTC를 기준으로 정의됩니다.
            </p>

            <div class="mt-4 sm:mt-6 bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">주요 시간대 정보</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <p class="font-medium text-gray-900 text-sm sm:text-base">아시아/태평양</p>
                        <ul class="list-disc list-inside text-gray-600 text-sm sm:text-base">
                            <li>한국(KST): UTC+9</li>
                            <li>일본(JST): UTC+9</li>
                            <li>중국(CST): UTC+8</li>
                        </ul>
                    </div>
                    <div class="space-y-2">
                        <p class="font-medium text-gray-900 text-sm sm:text-base">유럽/아메리카</p>
                        <ul class="list-disc list-inside text-gray-600 text-sm sm:text-base">
                            <li>영국(GMT/BST): UTC+0/+1</li>
                            <li>미국 동부(EST/EDT): UTC-5/-4</li>
                            <li>미국 서부(PST/PDT): UTC-8/-7</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface City {
    name: string;
    timezone: string;
}

// 기본 상태
const currentUTCTime = ref<string>('')
const currentLocalTime = ref<string>('')
const localTimeZone = ref<string>('')
const utcOffset = ref<string>('')
const timeInput = ref<string>('')
const timeText = ref<string>('')
const convertedTime = ref<string>('')
const conversionMode = ref<'KST_TO_UTC' | 'UTC_TO_KST'>('KST_TO_UTC')
const inputMode = ref<'direct' | 'select'>('direct')

// 날짜 선택을 위한 상태
const now = new Date()
const selectedYear = ref(now.getFullYear())
const selectedMonth = ref(now.getMonth() + 1)
const selectedDay = ref(now.getDate())
const selectedHour = ref(now.getHours())
const selectedMinute = ref(now.getMinutes())

// 연도 범위 계산 (현재 ±10년)
const years = computed(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 21 }, (_, i) => currentYear - 10 + i)
})

// 선택된 월의 일수 계산
const daysInMonth = computed(() =>
    new Date(selectedYear.value, selectedMonth.value, 0).getDate()
)

// 현재 시간 업데이트
const updateCurrentTimes = () => {
    const now = new Date()
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }

    currentUTCTime.value = now.toLocaleTimeString('ko-KR', { ...timeOptions, timeZone: 'UTC' })
    currentLocalTime.value = now.toLocaleTimeString('ko-KR', timeOptions)
    localTimeZone.value = Intl.DateTimeFormat().resolvedOptions().timeZone

    // UTC 오프셋 계산
    const offset = -now.getTimezoneOffset()
    const hours = Math.abs(Math.floor(offset / 60))
    const minutes = Math.abs(offset % 60)
    utcOffset.value = `UTC${offset >= 0 ? '+' : '-'}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

// Date 객체로 시간 설정
const setTimeByDate = (date: Date) => {
    if (isNaN(date.getTime())) {
        convertedTime.value = '유효하지 않은 날짜입니다'
        return
    }

    timeInput.value = date.toISOString().slice(0, 16)
    selectedYear.value = date.getFullYear()
    selectedMonth.value = date.getMonth() + 1
    selectedDay.value = date.getDate()
    selectedHour.value = date.getHours()
    selectedMinute.value = date.getMinutes()

    timeText.value = date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
}

// 현재 시간 사용
const useCurrentTime = () => {
    const now = new Date()
    const timezone = conversionMode.value === 'KST_TO_UTC' ? 'Asia/Seoul' : 'UTC'
    setTimeByDate(new Date(now.toLocaleString('en-US', { timeZone: timezone })))
}

// 시간 변환
const convertTime = () => {
    if (!timeInput.value) {
        convertedTime.value = ''
        return
    }

    try {
        const date = new Date(timeInput.value)
        const options: Intl.DateTimeFormatOptions = {
            timeZone: conversionMode.value === 'KST_TO_UTC' ? 'UTC' : 'Asia/Seoul',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }
        convertedTime.value = date.toLocaleString('ko-KR', options)
    } catch {
        convertedTime.value = '유효하지 않은 시간입니다'
    }
}

// 도시별 현재 시각
const getCityTime = (timezone: string) => {
    const now = new Date()
    return now.toLocaleTimeString('ko-KR', {
        timeZone: timezone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    })
}

// 시간대 약어
const getTimezoneAbbr = (timezone: string) => {
    try {
        const date = new Date()
        return new Intl.DateTimeFormat('en', {
            timeZone: timezone,
            timeZoneName: 'short'
        }).formatToParts(date).find(part => part.type === 'timeZoneName')?.value || timezone
    } catch {
        return timezone
    }
}

// Watchers
watch(timeText, (newValue) => {
    if (!newValue) {
        convertedTime.value = ''
        return
    }

    try {
        const numbers = newValue.replace(/[^0-9]/g, '')
        let date: Date | null = null

        if (numbers.length >= 12) {
            date = new Date(
                parseInt(numbers.slice(0, 4)),
                parseInt(numbers.slice(4, 6)) - 1,
                parseInt(numbers.slice(6, 8)),
                parseInt(numbers.slice(8, 10)),
                parseInt(numbers.slice(10, 12))
            )
        } else {
            date = new Date(newValue)
        }

        if (date && !isNaN(date.getTime())) {
            setTimeByDate(date)
        }
    } catch {
        convertedTime.value = '유효하지 않은 날짜 형식입니다'
    }
})

watch([selectedYear, selectedMonth, selectedDay, selectedHour, selectedMinute], () => {
    const date = new Date(
        selectedYear.value,
        selectedMonth.value - 1,
        selectedDay.value,
        selectedHour.value,
        selectedMinute.value
    )
    timeInput.value = date.toISOString().slice(0, 16)
})

watch([timeInput, conversionMode], convertTime)

// 주요 도시 목록
const majorCities = computed<City[]>(() => [
    { name: '서울', timezone: 'Asia/Seoul' },
    { name: '도쿄', timezone: 'Asia/Tokyo' },
    { name: '뉴욕', timezone: 'America/New_York' },
    { name: '런던', timezone: 'Europe/London' },
    { name: '파리', timezone: 'Europe/Paris' },
    { name: '시드니', timezone: 'Australia/Sydney' },
    { name: '로스앤젤레스', timezone: 'America/Los_Angeles' },
    { name: '싱가포르', timezone: 'Asia/Singapore' },
    { name: '베이징', timezone: 'Asia/Shanghai' }
])

// 컴포넌트 라이프사이클
onMounted(() => {
    updateCurrentTimes()
    const timer = setInterval(updateCurrentTimes, 1000)

    onUnmounted(() => {
        clearInterval(timer)
    })
})
</script>

<style scoped>
.bg-pattern {
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.tabular-nums {
    font-variant-numeric: tabular-nums;
}

/* 카드 호버 효과 */
.time-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.time-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* 그라데이션 애니메이션 */
@keyframes gradientFlow {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.gradient-animated {
    background-size: 200% 200%;
    animation: gradientFlow 15s ease infinite;
}

/* 모바일 최적화 */
@media (max-width: 640px) {
    .text-3xl {
        font-size: 1.5rem;
    }

    .p-8 {
        padding: 1.5rem;
    }
}
</style>