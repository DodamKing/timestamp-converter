<template>
    <div class="space-y-8">
        <!-- 헤더 섹션 -->
        <div class="text-center">
            <h1
                class="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 bg-clip-text text-transparent">
                UTC 시간 변환
            </h1>
            <p class="mt-3 text-gray-600 text-lg">
                전세계 시간대를 한눈에 확인하고 변환하세요
            </p>
        </div>

        <!-- 메인 시계 섹션 -->
        <div class="relative bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl shadow-2xl p-8 overflow-hidden">
            <!-- 배경 장식 -->
            <div class="absolute inset-0 bg-pattern opacity-10"></div>

            <!-- 현재 시간 그리드 -->
            <div class="relative grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- UTC 시간 -->
                <div class="backdrop-blur-md bg-white/10 rounded-2xl p-6 flex flex-col items-center">
                    <div class="text-white/80 mb-2 font-medium">UTC</div>
                    <div class="text-3xl font-bold text-white tabular-nums">
                        {{ currentUTCTime }}
                    </div>
                </div>

                <!-- 로컬 시간 -->
                <div class="backdrop-blur-md bg-white/10 rounded-2xl p-6 flex flex-col items-center">
                    <div class="text-white/80 mb-2 font-medium">현지 시간</div>
                    <div class="text-3xl font-bold text-white tabular-nums">
                        {{ currentLocalTime }}
                    </div>
                    <div class="mt-2 text-white/80 text-sm">
                        {{ localTimeZone }}
                    </div>
                </div>

                <!-- 시차 정보 -->
                <div class="backdrop-blur-md bg-white/10 rounded-2xl p-6 flex flex-col items-center">
                    <div class="text-white/80 mb-2 font-medium">UTC와의 시차</div>
                    <div class="text-3xl font-bold text-white">
                        {{ utcOffset }}
                    </div>
                </div>
            </div>
        </div>

        <!-- 시간 변환기 카드 -->
        <div class="bg-white rounded-3xl shadow-lg p-8 transition duration-300 hover:shadow-xl">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6 text-center">KST ↔ UTC 변환</h2>

            <!-- 변환 방향 선택 -->
            <div class="flex justify-center space-x-4 mb-6">
                <button @click="conversionMode = 'KST_TO_UTC'"
                    class="px-4 py-2 rounded-lg transition-colors duration-200" :class="[conversionMode === 'KST_TO_UTC'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200']">
                    한국 시간 → UTC
                </button>
                <button @click="conversionMode = 'UTC_TO_KST'"
                    class="px-4 py-2 rounded-lg transition-colors duration-200" :class="[conversionMode === 'UTC_TO_KST'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200']">
                    UTC → 한국 시간
                </button>
            </div>

            <!-- 시간 입력 섹션 -->
            <div class="bg-gray-50 rounded-xl p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
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
                <div v-if="inputMode === 'direct'" class="space-y-4">
                    <!-- 복사/붙여넣기 입력 -->
                    <div class="space-y-2">
                        <input v-model="timeText" type="text"
                            class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            :placeholder="conversionMode === 'KST_TO_UTC'
                                ? '예: 2024-01-14 15:30 또는 20240114 1530'
                                : '예: 2024-01-14 15:30'" />
                        <p class="text-sm text-gray-500">다양한 형식을 붙여넣을 수 있습니다 (YYYY-MM-DD HH:mm, YYYYMMDDHHmm 등)</p>
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
                <div v-else class="space-y-4">
                    <!-- 날짜 선택 -->
                    <div class="grid grid-cols-3 gap-2">
                        <select v-model="selectedYear" class="rounded-lg border-gray-300">
                            <option v-for="year in years" :key="year" :value="year">{{ year }}년</option>
                        </select>
                        <select v-model="selectedMonth" class="rounded-lg border-gray-300">
                            <option v-for="month in 12" :key="month" :value="month">{{ month }}월</option>
                        </select>
                        <select v-model="selectedDay" class="rounded-lg border-gray-300">
                            <option v-for="day in daysInMonth" :key="day" :value="day">{{ day }}일</option>
                        </select>
                    </div>

                    <!-- 시간 선택 -->
                    <div class="grid grid-cols-2 gap-2">
                        <select v-model="selectedHour" class="rounded-lg border-gray-300">
                            <option v-for="hour in 24" :key="hour - 1" :value="hour - 1">
                                {{ (hour - 1).toString().padStart(2, '0') }}시
                            </option>
                        </select>
                        <select v-model="selectedMinute" class="rounded-lg border-gray-300">
                            <option v-for="minute in 60" :key="minute - 1" :value="minute - 1">
                                {{ (minute - 1).toString().padStart(2, '0') }}분
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- 변환 결과 -->
            <div v-if="convertedTime" class="mt-6 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 class="text-lg font-medium text-blue-900 mb-2 flex items-center">
                    <span
                        class="bg-blue-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-sm mr-2">2</span>
                    변환 결과
                </h3>
                <div class="text-2xl font-bold text-blue-900 text-center">
                    {{ convertedTime }}
                </div>
                <p class="text-blue-600 text-center mt-2">
                    {{ conversionMode === 'KST_TO_UTC' ? 'UTC (협정세계시)' : 'KST (한국 표준시)' }}
                </p>
            </div>
        </div>

        <!-- 전세계 주요 도시 현재 시각 -->
        <div class="bg-white rounded-3xl shadow-lg p-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">주요 도시 현재 시각</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="city in majorCities" :key="city.timezone"
                    class="p-4 rounded-xl transition duration-300 hover:bg-gray-50"
                    :class="[city.timezone === localTimeZone ? 'bg-blue-50' : 'bg-gray-50']">
                    <div class="flex items-center space-x-3">
                        <div class="flex-1">
                            <p class="font-medium text-gray-900">{{ city.name }}</p>
                            <p class="text-sm text-gray-500">{{ getTimezoneAbbr(city.timezone) }}</p>
                        </div>
                        <div class="text-lg font-semibold text-gray-900 tabular-nums">
                            {{ getCityTime(city.timezone) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SEO 콘텐츠 -->
        <div class="prose max-w-none bg-white rounded-3xl shadow-lg p-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">UTC(협정 세계시)란?</h2>
            <p class="text-gray-600">
                UTC(Coordinated Universal Time)는 세계 표준시로 사용되는 시간 체계입니다.
                이전에 사용되던 GMT(Greenwich Mean Time)를 대체하여 현재는 국제 표준으로 사용되고 있으며,
                전 세계의 시간대는 UTC를 기준으로 정의됩니다.
            </p>

            <div class="mt-6 bg-gray-50 rounded-xl p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-3">주요 시간대 정보</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <p class="font-medium text-gray-900">아시아/태평양</p>
                        <ul class="list-disc list-inside text-gray-600">
                            <li>한국(KST): UTC+9</li>
                            <li>일본(JST): UTC+9</li>
                            <li>중국(CST): UTC+8</li>
                        </ul>
                    </div>
                    <div class="space-y-2">
                        <p class="font-medium text-gray-900">유럽/아메리카</p>
                        <ul class="list-disc list-inside text-gray-600">
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
const currentUTCTime = ref('')
const currentLocalTime = ref('')
const localTimeZone = ref('')
const utcOffset = ref('')
const timeInput = ref('')
const timeText = ref('')  // 직접 입력을 위한 텍스트 입력값
const convertedTime = ref('')
const conversionMode = ref('KST_TO_UTC')
const inputMode = ref('direct') // 'direct' 또는 'select'

// 선택 입력을 위한 상태
const selectedYear = ref(new Date().getFullYear())
const selectedMonth = ref(new Date().getMonth() + 1)
const selectedDay = ref(new Date().getDate())
const selectedHour = ref(new Date().getHours())
const selectedMinute = ref(new Date().getMinutes())

// 연도 범위 생성 (현재 ±10년)
const currentYear = new Date().getFullYear()
const years = computed(() =>
    Array.from({ length: 21 }, (_, i) => currentYear - 10 + i)
)

// 선택된 월의 일수 계산
const daysInMonth = computed(() => {
    return new Date(selectedYear.value, selectedMonth.value, 0).getDate()
})

// 현재 시간 업데이트
const updateCurrentTimes = () => {
    const now = new Date()
    currentUTCTime.value = now.toLocaleTimeString('ko-KR', {
        timeZone: 'UTC',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
    currentLocalTime.value = now.toLocaleTimeString('ko-KR', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
    localTimeZone.value = Intl.DateTimeFormat().resolvedOptions().timeZone

    // UTC 오프셋 계산
    const offset = -now.getTimezoneOffset()
    const hours = Math.abs(Math.floor(offset / 60))
    const minutes = Math.abs(offset % 60)
    utcOffset.value = `UTC${offset >= 0 ? '+' : '-'}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

// 현재 시간 사용
const useCurrentTime = () => {
    const now = new Date()
    if (conversionMode.value === 'KST_TO_UTC') {
        // 한국 시간으로 설정
        setTimeByDate(new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' })))
    } else {
        // UTC 시간으로 설정
        setTimeByDate(new Date(now.toLocaleString('en-US', { timeZone: 'UTC' })))
    }
}

// Date 객체로 모든 입력값 설정
const setTimeByDate = (date: Date) => {
    timeInput.value = date.toISOString().slice(0, 16)
    selectedYear.value = date.getFullYear()
    selectedMonth.value = date.getMonth() + 1
    selectedDay.value = date.getDate()
    selectedHour.value = date.getHours()
    selectedMinute.value = date.getMinutes()

    // 직접 입력 텍스트도 업데이트
    timeText.value = date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
}

// 직접 입력된 텍스트 파싱
watch(timeText, (newValue) => {
    if (!newValue) return

    try {
        let date: Date | null = null

        // 숫자만 추출
        const numbers = newValue.replace(/[^0-9]/g, '')

        if (numbers.length >= 12) {
            // YYYYMMDDHHMMSS 또는 YYYYMMDDHHMM 형식
            const year = parseInt(numbers.slice(0, 4))
            const month = parseInt(numbers.slice(4, 6))
            const day = parseInt(numbers.slice(6, 8))
            const hour = parseInt(numbers.slice(8, 10))
            const minute = parseInt(numbers.slice(10, 12))

            date = new Date(year, month - 1, day, hour, minute)
        } else {
            // 일반적인 날짜 문자열 파싱 시도
            date = new Date(newValue)
        }

        if (date && !isNaN(date.getTime())) {
            setTimeByDate(date)
        }
    } catch (error) {
        console.error('Invalid date format:', error)
    }
})

// 선택 모드 값 변경 감지
watch([selectedYear, selectedMonth, selectedDay, selectedHour, selectedMinute], () => {
    try {
        const date = new Date(
            selectedYear.value,
            selectedMonth.value - 1,
            selectedDay.value,
            selectedHour.value,
            selectedMinute.value
        )
        timeInput.value = date.toISOString().slice(0, 16)
    } catch (error) {
        console.error('Invalid date selection:', error)
    }
})

// 시간 변환
watch([timeInput, conversionMode], () => {
    if (!timeInput.value) return

    try {
        const date = new Date(timeInput.value)
        if (conversionMode.value === 'KST_TO_UTC') {
            // 한국 시간 → UTC
            convertedTime.value = date.toLocaleString('ko-KR', {
                timeZone: 'UTC',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            })
        } else {
            // UTC → 한국 시간
            convertedTime.value = date.toLocaleString('ko-KR', {
                timeZone: 'Asia/Seoul',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            })
        }
    } catch (error) {
        convertedTime.value = '유효하지 않은 시간입니다'
    }
})

// 도시별 현재 시각 반환
const getCityTime = (timezone: string) => {
    const now = new Date()
    return now.toLocaleTimeString('ko-KR', {
        timeZone: timezone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    })
}

// 시간대 약어 반환
const getTimezoneAbbr = (timezone: string) => {
    try {
        const date = new Date()
        const shortTz = new Intl.DateTimeFormat('en', {
            timeZone: timezone,
            timeZoneName: 'short'
        }).formatToParts(date).find(part => part.type === 'timeZoneName')?.value
        return shortTz || timezone
    } catch {
        return timezone
    }
}

// 시간대 정보 얻기
const getTimezoneInfo = (timezone: string) => {
    const cityNames = {
        'Asia/Seoul': '한국 시간',
        'Asia/Tokyo': '일본 시간',
        'Asia/Shanghai': '중국 시간',
        'America/New_York': '뉴욕 시간',
        'Europe/London': '런던 시간',
        'UTC': '세계 표준시'
    }
    return cityNames[timezone] || timezone
}

// 컴포넌트 마운트 시 현재 시간 설정 및 1초마다 업데이트
onMounted(() => {
    updateCurrentTimes()
    const timer = setInterval(updateCurrentTimes, 1000)
    onUnmounted(() => clearInterval(timer))
})

const majorCities = [
    { name: '서울', timezone: 'Asia/Seoul' },
    { name: '도쿄', timezone: 'Asia/Tokyo' },
    { name: '뉴욕', timezone: 'America/New_York' },
    { name: '런던', timezone: 'Europe/London' },
    { name: '파리', timezone: 'Europe/Paris' },
    { name: '시드니', timezone: 'Australia/Sydney' },
    { name: '로스앤젤레스', timezone: 'America/Los_Angeles' },
    { name: '싱가포르', timezone: 'Asia/Singapore' },
    { name: '베이징', timezone: 'Asia/Shanghai' }
]
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