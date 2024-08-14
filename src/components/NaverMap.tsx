"use client";

import React, { useEffect, useState } from "react";
import { NaverMap, Marker, Container as MapDiv } from "react-naver-maps";
import axios from "axios";

const CENTER_COORDINATES = { lat: 37.5358994, lng: 126.8969627 };

type MarkerData = {
  id: string;
  lat: number;
  lng: number;
  title: string;
};

const NaverMapComponent: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  console.log(markers);
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await axios.get<MarkerData[]>(
          "https://apiy.yourpick.co.kr/mission/test001"
        );
        setMarkers(response.data);
      } catch (error) {
        console.error("Error fetching markers:", error);
      }
    };
    fetchMarkers();
  }, []);

  return (
    <div className="w-full h-screen">
      <MapDiv
        style={{
          width: "100%",
          height: "600px",
        }}
      >
        <NaverMap
          defaultCenter={CENTER_COORDINATES}
          defaultZoom={16}
          ncpClientId={process.env.NEXT_PUBLIC_NAVER_CLIENT_API as string} // API key 전달
          style={{ width: "100%", height: "100%" }} // 스타일은 부모 div에서 처리
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              defaultPosition={{ lat: marker.lat, lng: marker.lng }}
              title={marker.title}
            />
          ))}
        </NaverMap>
      </MapDiv>
    </div>
  );
};

export default NaverMapComponent;
