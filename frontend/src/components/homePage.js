import React from 'react';
import { useRedirectFunctions, useLogoutFunction, withAuthInfo } from '@propelauth/react';
import Spline from '@splinetool/react-spline';

const advisors = [
    {
        name: "Meet Eco, the Sustainability Specialist!",
        introduction: "Eco is passionate about protecting our planet while helping you grow your investments. With a keen eye for sustainable practices, Eco analyzes companies that prioritize environmental stewardship and social responsibility. Whether you’re looking to invest in renewable energy, eco-friendly products, or sustainable agriculture, Eco will guide you toward choices that align with your values and contribute to a greener future. Together, you can make a positive impact while achieving your financial goals",
        scene: "https://prod.spline.design/kcOMX-bu-HV6x4Hj/scene.splinecode" 
    },
    {
        name: "Introducing Cash, the Capitalist Guru!",
        introduction: "Cash is a master of maximizing profits and seizing market opportunities. With a sharp focus on wealth accumulation, Cash specializes in identifying high-growth stocks and investment strategies that can yield significant returns. This savvy advisor thrives in competitive markets and is always on the lookout for the next big trend. If you’re ready to take bold steps in your investment journey and build a prosperous portfolio, Cash is the advisor for you. Get ready to soar to new financial heights!",
        scene: "https://prod.spline.design/rJWsDUbRib-nVYB3/scene.splinecode" 
    },
    {
        name: "Say hello to Ava, the Feminist Finance Advocate!",
        introduction: "Ava believes in empowering individuals through financial literacy and equal opportunities for all. With a strong commitment to promoting diversity and inclusion in investing, Ava helps you navigate the financial landscape with a feminist perspective. Whether you’re interested in companies led by women, supporting social justice initiatives, or investing in ventures that uplift marginalized communities, Ava will guide you in making choices that reflect your values. Join Ava in creating a fairer and more equitable financial world for everyone!",
        scene: "https://prod.spline.design/82gSsm7wjc-ugja7/scene.splinecode" 
    },
];

const HomePage = withAuthInfo((props) => {
    const logoutFunction = useLogoutFunction();
    const { redirectToLoginPage, redirectToSignupPage } = useRedirectFunctions();

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 flex flex-col items-center justify-start p-8">
            {/* Welcome Section */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-12 mt-16">
                <div className="text-center md:text-left md:w-3/5 "> {/* 60% of the width */}
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Welcome to the App</h1>
                    
                    <p className="text-lg md:text-xl text-white mb-4 mt-16">
                        Ready to start your stock investing journey but don’t know where to begin? Our app makes it easy, fun, and tailored just for you!
                    </p>
                    <p className="text-lg md:text-xl text-white mb-4">
                        After logging in, you’ll meet our trio of expert bird advisors, each specializing in a unique investment strategy. Choose your advisor, set your investment amount, and receive a personalized selection of stocks.
                    </p>
                    <p className="text-lg md:text-xl text-white mb-4">
                        With a simple swipe right to invest or left to pass, you’ll create a curated portfolio that aligns with your goals.
                    </p>
                    <p className="text-lg md:text-xl text-white mb-4">
                        Dive deeper into your choices in our detailed stock dashboard, where you can explore comprehensive data and make well-informed decisions with confidence.
                    </p>
                    <p className="text-lg md:text-xl text-white mb-4">
                        Join us today, and let our feathered advisors guide you toward a smarter financial future!
                    </p>

                    {/* Auth buttons */}
                    {!props.isLoggedIn && (
                        <div className="mt-8 flex justify-center md:justify-start space-x-4 mt-24">
                            <button 
                                onClick={() => redirectToLoginPage()} 
                                className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-300"
                            >
                                Login
                            </button>
                            <button 
                                onClick={() => redirectToSignupPage()} 
                                className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-300"
                            >
                                Signup
                            </button>
                        </div>
                    )}
                    
                    {/* Logout button */}
                    {props.isLoggedIn && (
                        <>
                            <p className="text-lg text-white mt-4">You are logged in as {props.user.email}</p>
                            <button
                                onClick={() => logoutFunction(true)}
                                className="mt-4 bg-red-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>

      
                <div className="welcome-image md:w-2/5"> {/* 40% of the width */}
                    <img src="/homePage.png" alt="Welcome" className="rounded-xl shadow-lg max-w-full md:max-w-md"/>
                </div>
            </div>
            <div className="my-12 border-t border-white w-full"></div>
            {/* Meet the Financial Advisors Section */}
            <div className="w-full mt-16">
                <h2 className="text-5xl font-bold text-white text-center mb-8">Meet the Financial Advisors</h2>
                {advisors.map((advisor, index) => (
                    <div key={index} className={`flex flex-col md:flex-row items-center justify-between mb-12 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                        <div className="md:w-2/5"> {/* Spline Component Section */}
                           <Spline scene={advisor.scene} />
                        </div>
                        <div className="md:w-3/5 text-center md:text-left md:pl-8"> {/* Introduction Section */}
                            <h3 className="text-3xl font-semibold text-white mb-2">{advisor.name}</h3>
                            <p className="text-lg text-white">{advisor.introduction}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default HomePage;
