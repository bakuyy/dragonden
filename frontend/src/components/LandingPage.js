import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import Heart from "../images/tinderheart.png";
import NoMatch from "../images/no.webp";
import Spline from "@splinetool/react-spline";
import "reactjs-popup/dist/index.css";
import "../styling/Spline.css";

const LandingPage = ({ serialData }) => {
  const navigate = useNavigate();
  const dragon_count = 3;
  const [selectIndex, setSelectIndex] = useState(0);
  const [match, setMatch] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageType, setImageType] = useState("");
  const [text, setText] = useState("");
  const [currStock, setCurrStock] = useState("");
  const arr = ["AAPL", "MICROSOFT", "GOOGL", "AMZN"];
  const [currentStockIndex, setCurrentStockIndex] = useState(0);
  const [savedStocks, setSavedStocks] = useState([]);
  const handleFinish = () => {
    navigate("/");
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted text:", text);
  };

  const handleSerialToggle = (data) => {
    if (data[1] === "Right") {
    } else if (data[1] === "Left") {
    } else if (data[1] === "Yes") {
      setMatch(true);
      setImageType("match");
      setShowImage(true);
      setCurrStock(arr[currentStockIndex]);
      setTimeout(() => {
        setShowImage(false);
        nextStock();
      }, 1000);
      setSavedStocks((prevSaved) => [...prevSaved, arr[currentStockIndex]]);
    } else if (data[1] === "No") {
      setMatch(false);
      setImageType("noMatch");
      setShowImage(true);
      setCurrStock(arr[currentStockIndex]);
      setTimeout(() => {
        setShowImage(false);
        nextStock();
      }, 1000);
    }
  };

  const nextStock = () => {
    if (currentStockIndex < arr.length - 1) {
      setCurrentStockIndex(currentStockIndex + 1);
    } else {
      console.log("No more stocks to evaluate.");
    }
    {
      console.log(savedStocks);
    }
  };

  useEffect(() => {
    if (serialData) {
      handleSerialToggle(serialData);
    }
  }, [serialData]);

  useEffect(() => {
    setCurrStock(arr[currentStockIndex]);
  }, [currentStockIndex]);

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (newValue >= 0 && newValue < dragon_count) {
      setSelectIndex(newValue);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="absolute right-0 top-8 px-12 py-2 bg-white rounded-xl mt-10 mr-24">
        <button onClick={handleFinish}>Finish</button>
      </div>

      <div className="flex ">
        <div className="spline-character1">
          {selectIndex === 0 ? (
            <Spline scene="https://prod.spline.design/a2IWM6qn1r-q8Aqu/scene.splinecode" />
          ) : (
            <Spline scene="https://prod.spline.design/82gSsm7wjc-ugja7/scene.splinecode" />
          )}
        </div>

        <div className="spline-character2">
          {selectIndex === 1 ? (
            <Spline scene="https://prod.spline.design/BglYE7jKXRL8UZ8D/scene.splinecode" />
          ) : (
            <Spline scene="https://prod.spline.design/rJWsDUbRib-nVYB3/scene.splinecode" />
          )}
        </div>

        <div className="spline-character3">
          {selectIndex === 2 ? (
            <Spline scene="https://prod.spline.design/LLtNuOqC7rj2EXKu/scene.splinecode" />
          ) : (
            <Spline scene="https://prod.spline.design/kcOMX-bu-HV6x4Hj/scene.splinecode" />
          )}
        </div>
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
        <div className="absolute bottom-32 ml-16 w-3/5 px-24 py-8 rounded-2xl text-white text-4xl text-center border-2 border-white font-bold shadow-white-glow animate-slow-bounce">
          {currStock}
        </div>

        <Popup
          trigger={
            <div className="absolute bottom-32 right-24 ml-12 w-1/5 bg-white px-24 py-8 rounded-2xl text-[#6D37D9] text-4xl font-bold text-center cursor-pointer">
              Chirp In !
            </div>
          }
          modal
          closeOnDocumentClick
        >
          {(close) => (
            <div className="modal bg-white p-8 rounded-lg shadow-lg">
              <div className="modal-content">
                <h2 className="text-xl font-bold mb-4 text-red">
                  Tell us about your interests, values and budget...
                </h2>
                <form onSubmit={handleSubmit}>
                  <textarea
                    onChange={handleText}
                    value={text}
                    placeholder="Enter some text"
                    className="mb-4 p-2 border rounded w-full h-32"
                  />

                  <button
                    type="submit"
                    className="mt-4 px-6 py-2 bg-[#6D37D9] text-white rounded-lg"
                  >
                    Submit
                  </button>
                </form>
                <button
                  className="mt-4 px-6 py-2 bg-gray-400 text-white rounded-lg"
                  onClick={close}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default LandingPage;
