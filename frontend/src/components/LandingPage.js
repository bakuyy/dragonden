import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup'; // Importing reactjs-popup
import Heart from "../images/tinderheart.png";
import NoMatch from "../images/no.webp";
import Spline from '@splinetool/react-spline';
import 'reactjs-popup/dist/index.css'; // Importing popup styles
import '../styling/Spline.css'; // Assuming you have custom styles here

const LandingPage = ({ serialData }) => {
  const navigate = useNavigate();
  const dragon_count = 3; // Total number of dragon characters
  const [selectIndex, setSelectIndex] = useState(0); // Determines the selected character and also xValue
  const [match, setMatch] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageType, setImageType] = useState("");
  const [text, setText]= useState(""); // State to store input text

  const handleFinish = () => {
    navigate('/');
  };

  const handleText = (e) => {
    e.preventDefault(); // Corrected this line
    setText(e.target.value); // Set the input value as text
    console.log(e.target.value);
  };

  const handleSerialToggle = (data) => {
    if (data[1] === "Right") {
      setSelectIndex((prevIndex) => (prevIndex + 1) % dragon_count);
    } else if (data[1] === "Left") {
      setSelectIndex((prevIndex) => (prevIndex - 1 + dragon_count) % dragon_count);
    } else if (data[1] === "Yes") {
      setMatch(true);
      setImageType("match");
      setShowImage(true);
      setTimeout(() => {
        setShowImage(false);
      }, 1000);
    } else if (data[1] === "No") {
      setMatch(false);
      setImageType("noMatch");
      setShowImage(true);
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

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (newValue >= 0 && newValue < dragon_count) {
      setSelectIndex(newValue); // Update selectIndex when input changes
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top right button */}
      <div className='absolute right-0 px-12 py-2 bg-white rounded-xl mt-10 mr-12'>
        <button onClick={handleFinish}>Finish</button>
      </div>

      {/* Character boxes with spline rendering */}
      <div className="flex space-x-4 hover ml-5 mb-32">
        {/* Character 1 */}
        <div className="spline-character">
          <Spline scene="https://prod.spline.design/82gSsm7wjc-ugja7/scene.splinecode" />
          {selectIndex === 0 && (
            <Spline
              scene="https://prod.spline.design/a2IWM6qn1r-q8Aqu/scene.splinecode"
              className="overlay"
            />
          )}
        </div>

        {/* Character 2 */}
        <div className="spline-character">
          <Spline scene="https://prod.spline.design/rJWsDUbRib-nVYB3/scene.splinecode" />
          {selectIndex === 1 && (
            <Spline
              scene="https://prod.spline.design/BglYE7jKXRL8UZ8D/scene.splinecode"
              className="overlay"
            />
          )}
        </div>

        {/* Character 3 */}
        <div className="spline-character">
          <Spline scene="https://prod.spline.design/kcOMX-bu-HV6x4Hj/scene.splinecode" />
          {selectIndex === 2 && (
            <Spline
              scene="https://prod.spline.design/LLtNuOqC7rj2EXKu/scene.splinecode"
              className="overlay"
            />
          )}
        </div>
      </div>

      {/* Match/No Match images */}
      {showImage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {imageType === "match" ? (
            <img src={Heart} alt="Match!" className="w-32 h-32" />
          ) : (
            <img src={NoMatch} alt="No Match" className="w-32 h-32" />
          )}
        </div>
      )}

      {/* Footer and Modal Trigger */}
      <div className="flex">
        <div className="absolute bottom-32 ml-16 w-3/5 px-24 py-8 rounded-2xl text-white text-4xl text-center border-2 border-white font-bold shadow-white-glow animate-slow-bounce">
          AAPL
        </div>

        {/* Modal Trigger */}
        <Popup 
          trigger={
            <div className="absolute bottom-32 right-24 ml-12 w-1/5 bg-white px-24 py-8 rounded-2xl text-[#6D37D9] text-4xl font-bold text-center cursor-pointer">
              ···
            </div>
          }
          modal
          closeOnDocumentClick
        >
          {(close) => (
            <div className="modal bg-white p-8 rounded-lg shadow-lg">
              <div className="modal-content">
                <h2 className="text-xl font-bold mb-4">Modal Content</h2>
                <p>This is some content inside the modal!</p>
                <input onChange={handleText} placeholder="Enter some text" />
                <p className="mt-4">Text Entered: {text}</p>
                <button 
                  className="mt-4 px-6 py-2 bg-[#6D37D9] text-white rounded-lg"
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
