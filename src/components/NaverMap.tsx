"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const CENTER_COORDINATES = { lat: 37.5358994, lng: 126.8969627 };

type MarkerData = {
  id: string;
  lat: number;
  lng: number;
  title: string;
  type: string;
};

const NaverMapComponent: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  console.log(markers);
  const [visibleTypes, setVisibleTypes] = useState<string[]>([
    "CAFE",
    "FOOD",
    "PHARMACY",
    "MART",
  ]);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await axios.get<MarkerData[]>(
          "https://apiy.yourpick.co.kr/mission/test001"
        );
        setMarkers(response.data);
      } catch (error) {
        console.error("마커 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    fetchMarkers();
  }, []);

  useEffect(() => {
    const initializeMap = () => {
      if (typeof window !== "undefined" && window.naver) {
        const mapOptions = {
          center: new window.naver.maps.LatLng(
            CENTER_COORDINATES.lat,
            CENTER_COORDINATES.lng
          ),
          zoom: 16,
        };

        const map = new window.naver.maps.Map("map", mapOptions);

        // 해당위치에서 100m원추가
        new window.naver.maps.Circle({
          map: map,
          center: new window.naver.maps.LatLng(
            CENTER_COORDINATES.lat,
            CENTER_COORDINATES.lng
          ),
          radius: 100,
          fillColor: "rgba(0, 128, 255, 0.3)",
          strokeColor: "rgba(0, 128, 255, 0.6)",
          strokeWeight: 2,
        });

        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(
            CENTER_COORDINATES.lat,
            CENTER_COORDINATES.lng
          ),
          map: map,
          title: "Center Marker",
          icon: {
            url: "/icons/center_marker.png",
            size: new window.naver.maps.Size(24, 24),
            scaledSize: new window.naver.maps.Size(24, 24),
            anchor: new window.naver.maps.Point(12, 12),
          },
        });

        markers.forEach((marker) => {
          if (visibleTypes.includes(marker.type.toUpperCase())) {
            let icon;

            switch (marker.type) {
              case "CAFE":
                icon = {
                  url: "/icons/cafe.png",
                  size: new window.naver.maps.Size(24, 24),
                  scaledSize: new window.naver.maps.Size(24, 24),
                  anchor: new window.naver.maps.Point(12, 12),
                };
                break;
              case "FOOD":
                icon = {
                  url: "/icons/food.png",
                  size: new window.naver.maps.Size(24, 24),
                  scaledSize: new window.naver.maps.Size(24, 24),
                  anchor: new window.naver.maps.Point(12, 12),
                };
                break;
              case "PHARMACY":
                icon = {
                  url: "/icons/pharmacy.png",
                  size: new window.naver.maps.Size(24, 24),
                  scaledSize: new window.naver.maps.Size(24, 24),
                  anchor: new window.naver.maps.Point(12, 12),
                };
                break;
              case "MART":
                icon = {
                  url: "/icons/mart.png",
                  size: new window.naver.maps.Size(24, 24),
                  scaledSize: new window.naver.maps.Size(24, 24),
                  anchor: new window.naver.maps.Point(12, 12),
                };
                break;
              default:
                icon = null;
                break;
            }

            new window.naver.maps.Marker({
              position: new window.naver.maps.LatLng(marker.lat, marker.lng),
              map: map,
              title: marker.title,
              icon: icon,
            });
          }
        });
      }
    };

    if (typeof window !== "undefined" && window.naver) {
      initializeMap();
    }
  }, [markers, visibleTypes]);

  const toggleMarkerVisibility = (type: string) => {
    setVisibleTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div>
      <div
        id="map"
        style={{
          width: "100%",
          height: "500px",
        }}
      />
      <div className="flex space-x-2 mt-4">
        <button
          onClick={() => toggleMarkerVisibility("CAFE")}
          className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center"
        >
          <Image src="/icons/cafe.png" alt="Cafe Icon" width={24} height={24} />
        </button>
        <button
          onClick={() => toggleMarkerVisibility("FOOD")}
          className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center"
        >
          <Image src="/icons/food.png" alt="Food Icon" width={24} height={24} />
        </button>
        <button
          onClick={() => toggleMarkerVisibility("PHARMACY")}
          className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center"
        >
          <Image
            src="/icons/pharmacy.png"
            alt="Pharmacy Icon"
            width={24}
            height={24}
          />
        </button>
        <button
          onClick={() => toggleMarkerVisibility("MART")}
          className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center"
        >
          <Image src="/icons/mart.png" alt="Mart Icon" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default NaverMapComponent;
