import{m as V,r as a,n as B,p as D,o as c,c as u,a as t,q as f,t as d,u as o,d as b,s as v,v as h,x as y,b as w,w as k,y as _,T}from"./DQNNM6vr.js";import{s as I}from"./CcBepUSo.js";const U={class:"space-y-8"},N={class:"bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl sm:rounded-2xl shadow-lg text-white p-4 sm:p-8"},R={class:"grid grid-cols-1 gap-4 sm:gap-8"},S={class:"backdrop-blur-sm bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6"},j={class:"text-xl sm:text-2xl font-bold"},z={class:"backdrop-blur-sm bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6"},A={class:"text-xl sm:text-2xl font-bold font-mono"},K={class:"grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2"},L={class:"bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6"},P={class:"space-y-3 sm:space-y-4"},q={class:"flex flex-col sm:flex-row gap-2 sm:gap-3"},E={key:0,class:"bg-gray-50 rounded-lg p-3 sm:p-4"},F={class:"text-base sm:text-lg font-semibold text-gray-900"},G={class:"bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6"},H={class:"space-y-3 sm:space-y-4"},J={class:"flex flex-col sm:flex-row gap-2 sm:gap-3"},O={key:0,class:"bg-gray-50 rounded-lg p-3 sm:p-4"},Q={class:"text-base sm:text-lg font-semibold font-mono text-gray-900"},Z=V({__name:"timestamp",setup(W){const p=a(""),x=a(0),l=a(""),r=a(""),n=a(""),i=a(""),g=()=>{const e=new Date;p.value=e.toLocaleString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}),x.value=Math.floor(e.getTime()/1e3)},C=()=>{if(l.value)try{const e=new Date(parseInt(l.value)*1e3);n.value=e.toLocaleString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1})}catch{n.value="유효하지 않은 Timestamp입니다"}},M=()=>{if(r.value)try{const e=new Date(r.value);i.value=Math.floor(e.getTime()/1e3).toString()}catch{i.value="유효하지 않은 날짜입니다"}};return B(()=>{g();const e=I(g,1e3);D(()=>clearInterval(e))}),(e,s)=>(c(),u("div",U,[s[8]||(s[8]=t("div",{class:"text-center space-y-2 sm:space-y-3"},[t("h1",{class:"text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"}," Unix Timestamp 변환 "),t("p",{class:"mt-2 text-gray-700 text-base sm:text-lg"}," 현재 시간을 Timestamp로 변환하거나, Timestamp를 읽기 쉬운 날짜로 변환하세요 ")],-1)),t("div",N,[t("div",R,[t("div",S,[s[2]||(s[2]=f('<div class="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3"><svg class="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="2"></circle><path stroke-width="2" d="M12 6v6l4 4"></path></svg><span class="font-semibold text-sm sm:text-base">현재 시간</span></div>',1)),t("p",j,d(o(p)),1)]),t("div",z,[s[3]||(s[3]=t("div",{class:"flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3"},[t("svg",{class:"w-5 h-5 sm:w-6 sm:h-6 text-yellow-300",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2"})]),t("span",{class:"font-semibold text-sm sm:text-base"},"현재 Timestamp")],-1)),t("p",A,d(o(x)),1)])])]),t("div",K,[t("div",L,[s[5]||(s[5]=t("h2",{class:"text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center"},[t("svg",{class:"w-5 h-5 mr-2 text-blue-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})]),b(" Timestamp를 날짜로 변환 ")],-1)),t("div",P,[t("div",q,[v(t("input",{"onUpdate:modelValue":s[0]||(s[0]=m=>y(l)?l.value=m:null),type:"number",placeholder:"Timestamp를 입력하세요",class:"w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm"},null,512),[[h,o(l)]]),t("button",{onClick:C,class:"w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"}," 변환 ")]),w(T,{"enter-active-class":"transition-all duration-300 ease-out","enter-from-class":"opacity-0 transform translate-y-2","enter-to-class":"opacity-100 transform translate-y-0","leave-active-class":"transition-all duration-300 ease-in","leave-from-class":"opacity-100 transform translate-y-0","leave-to-class":"opacity-0 transform translate-y-2"},{default:k(()=>[o(n)?(c(),u("div",E,[s[4]||(s[4]=t("p",{class:"text-xs sm:text-sm text-gray-500 mb-1"},"변환 결과",-1)),t("p",F,d(o(n)),1)])):_("",!0)]),_:1})])]),t("div",G,[s[7]||(s[7]=t("h2",{class:"text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center"},[t("svg",{class:"w-5 h-5 mr-2 text-blue-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2"})]),b(" 날짜를 Timestamp로 변환 ")],-1)),t("div",H,[t("div",J,[v(t("input",{"onUpdate:modelValue":s[1]||(s[1]=m=>y(r)?r.value=m:null),type:"datetime-local",class:"w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm"},null,512),[[h,o(r)]]),t("button",{onClick:M,class:"w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"}," 변환 ")]),w(T,{"enter-active-class":"transition-all duration-300 ease-out","enter-from-class":"opacity-0 transform translate-y-2","enter-to-class":"opacity-100 transform translate-y-0","leave-active-class":"transition-all duration-300 ease-in","leave-from-class":"opacity-100 transform translate-y-0","leave-to-class":"opacity-0 transform translate-y-2"},{default:k(()=>[o(i)?(c(),u("div",O,[s[6]||(s[6]=t("p",{class:"text-xs sm:text-sm text-gray-500 mb-1"},"변환 결과",-1)),t("p",Q,d(o(i)),1)])):_("",!0)]),_:1})])])]),s[9]||(s[9]=f('<div class="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 prose max-w-none"><h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center"><svg class="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Unix Timestamp란? </h2><div class="text-gray-600 space-y-3 sm:space-y-4"><p class="text-sm sm:text-base"> Unix Timestamp는 1970년 1월 1일 00:00:00 UTC부터 경과한 시간을 초 단위로 나타낸 값입니다. 개발자들이 시간을 다룰 때 자주 사용하며, 데이터베이스나 API에서 시간을 저장하고 전송하는 데 널리 활용됩니다. </p><div class="bg-gray-50 rounded-lg p-3 sm:p-4"><h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-2">주요 사용 사례</h3><ul class="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-600"><li>서버 로그의 시간 기록</li><li>데이터베이스의 생성일/수정일 저장</li><li>API 응답의 시간 정보</li><li>시스템 간 시간 동기화</li></ul></div></div></div>',1))]))}});export{Z as default};
