// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-01-14',
  app: {
    head: {
      htmlAttrs: {
        lang: 'ko' // 한국어 사이트임을 명시
      },
      title: 'Unix Timestamp 변환기 | 타임스탬프 변환기 | 유닉스 시간 변환 | UTC 시간 변환 사이트',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'UTC 시간과 Unix Timestamp(타임스탬프)를 간편하게 변환할 수 있는 사이트입니다. 유닉스타임(Unix time)을 날짜로 확인하고, 데이트나우(Date.now), 겟타임(getTime) 값도 변환할 수 있습니다. MySQL의 TIMESTAMP나 몽고디비(MongoDB) ISODate도 실시간으로 확인 가능한 개발자 필수 무료료 도구입니다.'
        },
        // 검색엔진을 위한 추가 메타 태그
        {
          name: 'format-detection',
          content: 'telephone=no' // 전화번호 자동 링크 방지
        },
        {
          name: 'theme-color',
          content: '#ffffff' // 모바일 브라우저 테마 색상
        },
        // Open Graph 태그 보완
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:title',
          content: 'Unix Timestamp 변환기 | 타임스탬프 변환기 | 유닉스 시간 변환 | UTC 시간 변환 사이트'
        },
        {
          property: 'og:description',
          content: 'UTC 시간과 Unix Timestamp(타임스탬프)를 간편하게 변환할 수 있는 사이트입니다. 유닉스타임(Unix time)을 날짜로 확인하고, 데이트나우(Date.now), 겟타임(getTime) 값도 변환할 수 있습니다. MySQL의 TIMESTAMP나 몽고디비(MongoDB) ISODate도 실시간으로 확인 가능한 개발자 필수 무료료 도구입니다.'
        },
        {
          property: 'og:site_name',
          content: 'UTC & Unix 시간 변환기'
        },
        {
          property: 'og:locale',
          content: 'ko_KR'
        },
        // Twitter 카드 보완
        {
          name: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'twitter:title',
          content: 'Unix Timestamp 변환기 | 타임스탬프 변환기 | 유닉스 시간 변환 | UTC 시간 변환 사이트'
        },
        {
          name: 'twitter:description',
          content: 'UTC 시간과 Unix Timestamp(타임스탬프)를 간편하게 변환할 수 있는 사이트입니다. 유닉스타임(Unix time)을 날짜로 확인하고, 데이트나우(Date.now), 겟타임(getTime) 값도 변환할 수 있습니다. MySQL의 TIMESTAMP나 몽고디비(MongoDB) ISODate도 실시간으로 확인 가능한 개발자 필수 무료료 도구입니다.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    },
    baseURL: '/timestamp-converter/'
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
  // 성능 최적화
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true
  }
})