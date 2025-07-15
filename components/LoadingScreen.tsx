"use client"


import React, { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';

const SpaceLoadingScreen = ({
    loadingTexts = [
        "Launching into orbit...",
        "Calculating trajectory...",
        "Engaging thrusters...",
        "Navigating through space...",
        "Approaching destination...",
        "Systems initializing...",
        "Fuel levels optimal...",
        "Scanning for asteroids..."
    ],
    fullScreen = false,
    className = ""
}) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentTextIndex(() =>
                    Math.floor(Math.random() * loadingTexts.length)
                );
                setIsVisible(true);
            }, 300);
        }, 2500);

        return () => clearInterval(interval);
    }, [loadingTexts.length]);

    const containerClasses = fullScreen
        ? "fixed w-screen h-screen top-0 left-0  z-50 bg-fuchsia-900/5 backdrop-blur-sm"
        : "w-full h-full flex-1 bg-fuchsia-900/5 backdrop-blur-sm";

    return (
        <div className={`${containerClasses} flex flex-col items-center justify-center relative p-1.5 overflow-hidden ${className}`}>
            {/* Rocket Animation Container */}
            <div className="relative mb-8">
                {/* Rocket Orbit Path */}
                <div className="w-33 h-33 rounded-full border border-purple-500/30 relative animate-spin" style={{ animationDuration: '8s' }}>
                    {/* Rocket */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="relative">
                            <Rocket
                                className="w-8 h-8 text-purple-400 rotate-45 animate-pulse"
                                style={{ animationDuration: '1.5s' }}
                            />
                            {/* Rocket Thruster Effects */}
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-ping opacity-75"></div>
                            <div className="absolute -bottom-2 -right-2 w-1 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Center Glow Effect */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500/50 rounded-full animate-pulse"></div>
            </div>

            {/* Loading Text */}
            <div className="text-center px-4 max-w-md">
                <div
                    className={`text-xl font-medium bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent bg-size-200 animate-gradient-x transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {loadingTexts[currentTextIndex]}
                </div>

                {/* Loading Dots */}
                <div className="flex justify-center space-x-1 mt-4">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>

            {/* Additional Space Elements */}

            <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
        </div>
    );
};

export default SpaceLoadingScreen
