import { successToast } from "@/lib/toastify";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getRooms, toggleActive, toggleActiveOf } from "@/redux/thunk/roomThunk";
import React, { useState } from "react";
interface ToggleSwitchProps {
  data:boolean;
  roomNumber:string;
  onClose:()=>void;
}

const UIToggleSwitch = ({data , roomNumber,onClose}: ToggleSwitchProps) => {
  const dispatch = useAppDispatch();
  const profileData=useAppSelector((state)=>state.profileState);
  const handleChange=()=>{
    if (data=== false && roomNumber && profileData.data){
      dispatch(toggleActive({roomNumber:roomNumber,token:profileData.data.accessToken,callback:onSuccess}))
    }

    if(data=== true && profileData.data){
      dispatch(toggleActiveOf({roomNumber:roomNumber,token:profileData.data?.accessToken,callback:onSuccess}))
    }
  }

  const onSuccess=()=>{
    {data=== true && successToast("Room deactivated successfully")}
    {data=== false && successToast("Room activated successfully")}
    onClose();
  }
  

  return (
    <label className="switch">
      <input type="checkbox" onChange={handleChange}  checked={data}/>
      <span className="slider round"></span>
    </label>
  );
};

export default UIToggleSwitch;
