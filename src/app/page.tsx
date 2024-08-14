import Script from "next/script";
import NaverMapComponent from "@/components/NaverMap";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Script
        src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=czzi9ktqey"
        strategy="beforeInteractive"
      />
      <h1 className="text-4xl font-bold text-blue-500 mb-4">
        {/* 유어픽 위치 기반 서비스 */}
      </h1>
      <div className="w-full h-96">
        <NaverMapComponent />
      </div>
    </main>
  );
}
