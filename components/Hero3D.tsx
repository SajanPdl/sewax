
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export const Hero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const MotionDiv = motion.div as any;
  
  // Mouse movement parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    // Skip calculations if reduced motion is on
    if (shouldReduceMotion) return;
    
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    const xPct = (clientX / innerWidth) - 0.5;
    const yPct = (clientY / innerHeight) - 0.5;
    x.set(xPct * 20); // Sensitivity
    y.set(yPct * 20);
  };

  // Scroll Parallax
  const rotateScroll = useTransform(scrollY, [0, 500], [0, 15]);
  const yScroll = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center perspective-1000 overflow-hidden md:overflow-visible"
    >
      {/* Abstract Background Elements */}
      <MotionDiv 
        className="absolute w-72 h-72 bg-primary-500/10 rounded-full blur-3xl -top-10 -left-10 mix-blend-multiply"
        animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <MotionDiv 
        className="absolute w-72 h-72 bg-blue-500/10 rounded-full blur-3xl bottom-10 -right-10 mix-blend-multiply"
        animate={shouldReduceMotion ? {} : { scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      {/* Main 3D Card Container */}
      <MotionDiv
        className="relative w-[320px] md:w-[500px] h-[320px] md:h-[380px]"
        style={{ 
          rotateX: shouldReduceMotion ? 0 : mouseX, 
          rotateY: shouldReduceMotion ? 0 : mouseY, 
          rotateZ: shouldReduceMotion ? 0 : rotateScroll,
          y: shouldReduceMotion ? 0 : yScroll,
          transformStyle: 'preserve-3d' 
        }}
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Base Layer - The "Platform" */}
        <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl border border-gray-100/50 flex flex-col overflow-hidden transform translate-z-0 group hover:shadow-primary-500/20 transition-shadow duration-500">
          <div className="h-8 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <div className="ml-auto w-32 h-4 bg-gray-200 rounded-full opacity-50"></div>
          </div>
          <div className="flex-1 p-6 relative bg-gradient-to-br from-white to-gray-50 overflow-hidden">
             {/* Simulated Website Content */}
             <MotionDiv 
               className="w-full h-32 bg-gray-100 rounded-xl mb-4 overflow-hidden relative"
             >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100 animate-pulse opacity-50"></div>
             </MotionDiv>
             <div className="flex gap-4">
               <div className="w-2/3 space-y-3">
                 <div className="w-full h-4 bg-gray-100 rounded-full"></div>
                 <div className="w-3/4 h-4 bg-gray-100 rounded-full"></div>
                 <div className="w-1/2 h-4 bg-gray-100 rounded-full"></div>
               </div>
               <div className="w-1/3 h-24 bg-primary-50/50 rounded-xl border border-primary-100 flex flex-col items-center justify-center p-2 text-center">
                  <span className="text-2xl font-bold text-primary-600">98%</span>
                  <span className="text-primary-600/70 font-medium text-[10px] uppercase tracking-wider">Performance</span>
               </div>
             </div>
          </div>
        </div>

        {/* Floating Element 1 - Notification */}
        <MotionDiv
          className="absolute -right-8 md:-right-16 top-16 bg-white p-4 rounded-xl shadow-xl border border-gray-100 z-20 w-52 backdrop-blur-md bg-white/90"
          style={{ zIndex: 20, translateZ: "40px" }}
          animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-sm">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">New Order (eSewa)</p>
              <p className="text-sm font-bold text-gray-800">NPR 2,500.00</p>
            </div>
          </div>
        </MotionDiv>

        {/* Floating Element 2 - The Cube (Abstract Logo) */}
        <MotionDiv
          className="absolute -left-6 md:-left-12 -bottom-6 w-24 h-24 bg-gradient-to-br from-primary-600 to-red-500 rounded-2xl shadow-2xl shadow-primary-500/30 z-30 flex items-center justify-center border-4 border-white"
          style={{ translateZ: "60px" }}
          animate={shouldReduceMotion ? {} : { rotate: [0, 5, 0], y: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
           <svg className="w-12 h-12 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
           </svg>
        </MotionDiv>

        {/* Floating Element 3 - Code Badge */}
        <MotionDiv
            className="absolute -right-4 bottom-20 px-4 py-2 bg-gray-900 rounded-lg text-white text-xs font-mono shadow-xl z-25 flex items-center gap-2"
            style={{ translateZ: "30px" }}
            animate={shouldReduceMotion ? {} : { x: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            Deployed
        </MotionDiv>
      </MotionDiv>
    </div>
  );
};