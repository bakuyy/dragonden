import React, { useEffect, useState } from 'react';
import Characterbox from './Characterbox';
import { useNavigate } from "react-router-dom";
import Heart from "../images/tinderheart.png";
import NoMatch from "../images/no.webp";

const LandingPage = ({ serialData }) => {
  const navigate = useNavigate()
  const dragon_count = 3;
  const [selectIndex, setSelectIndex] = useState(0);
  const [match, setMatch] = useState(false);
  const [showImage, setShowImage] = useState(false); 
  const [imageType, setImageType] = useState(""); 

  const handleFinish=()=>{
    navigate('/')

  }
  const handleSerialToggle = (data) => {
    if (data[1] === "Right") {
      setSelectIndex((prevIndex) => (prevIndex + 1) % dragon_count);
    } else if (data[1] === "Left") {
      setSelectIndex(
        (prevIndex) => (prevIndex - 1 + dragon_count) % dragon_count
      );
    } else if (data[1] === "Yes") {
      setMatch(true);
      setImageType("match"); 
      setShowImage(true); 
      console.log("BUTTON MATCHED");
      setTimeout(() => {
        setShowImage(false);
      }, 1000);
    } else if (data[1] === "No") {
      setMatch(false);
      setImageType("noMatch");
      setShowImage(true);
      console.log("BUTTON NO MATCH");
      setTimeout(() => {
        setShowImage(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (serialData) {
      handleSerialToggle(serialData);
    }
  }, [serialData]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="absolute right-0 px-12 py-2 rounded-xl mt-10 mr-12 rounded-2xl text-white  text-center border-2 border-white font-bold  ">
        <button onClick={handleFinish}>Finish</button>
      </div>
      <div className="flex justify-center items-center space-x-4 mt-10">
        {[...Array(dragon_count)].map((_, index) => (
          <Characterbox key={index} isSelected={index === selectIndex} />
        ))}
      </div>

      {showImage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {imageType === "match" ? (
            <img src={Heart} alt="Match!" className="w-32 h-32" />
          ) : (
            <img src={NoMatch} alt="No Match" className="w-32 h-32" />
          )}
        </div>
      )}
      <div className="flex">
        <div className=" absolute bottom-32 ml-16 w-3/5  px-24 py-8 rounded-2xl text-white text-4xl text-center border-2 border-white font-bold  shadow-white-glow animate-slow-bounce">  AAPL</div>
        <div className="  absolute bottom-32 right-24 ml-12 w-1/5 bg-white px-24 py-8 rounded-2xl text-[#6D37D9] text-4xl font-bold text-center">  ···</div>

      </div>
    </div>
  );
};

export default LandingPage;
