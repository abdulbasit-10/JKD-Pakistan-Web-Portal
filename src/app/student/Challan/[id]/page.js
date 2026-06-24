// pages/challan/[id].js
"use client";
import React, { useState, useEffect } from "react";
import { useParams} from "next/navigation";
import axiosInstance from "@/lib/axios";
import Challan from "@/component/Challan";

const ChallanPage = () => {
  const {id} = useParams();
  const [challanData, setChallanData] = useState(null);
  useEffect(() => {
    if (!id) return;

    const fetchChallan = async () => {
      try {
        const res = await axiosInstance.get(`/api/challan/${id}`);
        const data = res.data.challan;
        setChallanData(data);
        console.log("Challan data received:", data);
      } catch (err) {
        console.log("Error loading challan", err.response);
      }
    };

    fetchChallan();
  }, []);



  if (!challanData) {
    return <div className="text-center py-10">Loading Challan...</div>;
  }


  return (
    // <div>

      <Challan
        challanData={challanData}
        // ref={componentRef}
      />
    // </div>
  );
};

export default ChallanPage;