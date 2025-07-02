import './App.scss'
import React, { useEffect, useRef } from 'react';

export default function App() {

   const interactiveRef = useRef(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const target = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.05; // smoothness
      pos.current.y += (target.current.y - pos.current.y) * 0.05;

      if (interactiveRef.current) {
        interactiveRef.current.style.left = `${pos.current.x}px`;
        interactiveRef.current.style.top = `${pos.current.y}px`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className='app-container'>
    <div className='text'>
      bubbles
    </div>
    <div className='gradient-bg'>
      <svg xmlns="hhttps://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0
                                                            0 1 0 0 0
                                                            0 0 1 0 0
                                                            0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className='gradients-container'>
        <div className='gradient gradient-1'></div>
        <div className='gradient gradient-2'></div>
        <div className='gradient gradient-3'></div>
        <div className='gradient gradient-4'></div>
        <div className='gradient gradient-5'></div>
        <div className='interactive' ref={interactiveRef}></div>
      </div>
    </div>
    </div>
  )
}