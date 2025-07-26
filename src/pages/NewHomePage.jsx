import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logoImage1 from '../assets/logo.png'
import logoImage2 from '../assets/pgilogo.jpeg'
// Import both graph components
import ResponsiveGraph from '../components/HomePage/ResponsiveGraph';
import InteractiveGraph from '../components/HomePage/InteractiveGraph';
import BarGraph from '../components/HomePage/barGraph';
import BarGraphResponsive from '../components/HomePage/barGraphResponsive';
import { motion } from 'framer-motion';

import { teamDetailsNITJ, teamDetailsPGIMER, platformFeatures, t1dStatistics, teamMembers  } from './data.jsx';

export const NewHomePage = () => {
  // State for image slider
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Add state to detect mobile viewport
  const [isMobile, setIsMobile] = useState(false);
  
  // Hero images for slider
  const heroImages = [
    '/hero-images/img1.jpg',
    '/hero-images/img2.jpg',
    '/hero-images/img3.jpg',
    '/hero-images/img4.jpg',
    '/hero-images/img5.jpg',
    '/hero-images/img6.jpg',
  ];

  // Check if the viewport is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup event listener
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Auto image slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tw-font-jakarta tw-bg-white">
      {/* Navbar Section */}
      <nav className="tw-bg-white/90 tw-backdrop-blur-sm tw-shadow-md tw-h-16 tw-px-6 tw-sticky tw-top-0 tw-z-50 flex items-center">
        <div className="tw-container tw-mx-auto tw-flex tw-justify-between tw-items-center tw-h-full">
          <div
            className="tw-flex tw-items-center tw-h-full tw-cursor-pointer"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }}
            title="Go to Top"
          >
            <img 
              src="/dm/it1d-logo-c.png" 
              alt="iT1Dxpert Logo" 
              className="tw-h-24 tw-w-32 mt-2 md:tw-h-32 md:tw-w-32 tw-object-contain md:tw-mt-4" 
            />
          </div>
          <div className="tw-hidden md:tw-flex tw-space-x-8">
            <a href="#features" className="tw-text-gray-700 hover:tw-text-blue-600 tw-transition-colors tw-duration-300">Features</a>
            <a href="#statistics" className="tw-text-gray-700 hover:tw-text-blue-600 tw-transition-colors tw-duration-300">Statistics</a>
            <a href="#team" className="tw-text-gray-700 hover:tw-text-blue-600 tw-transition-colors tw-duration-300">Our Team</a>
          </div>
          <div>
            <Link to="/login" className="tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-md hover:tw-bg-blue-700 tw-transition-all tw-shadow-lg hover:tw-shadow-blue-300/50 tw-text-sm md:tw-text-base">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="tw-bg-[#F8FAFC] tw-py-10 md:tw-py-24">
        <div className="tw-container tw-mx-auto tw-px-4 md:tw-px-6">
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8 md:tw-gap-12 tw-items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.h1 
                className="tw-text-3xl md:tw-text-5xl tw-font-bold tw-text-[#281946] tw-mb-4 md:tw-mb-6 tw-text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                T1Dixpert Diabetes Heroes
              </motion.h1>
              <motion.p 
                className="tw-text-base md:tw-text-lg tw-text-gray-600 tw-mb-6 md:tw-mb-8 tw-max-w-lg tw-text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                Everyone loves a good hero story and we're inviting you to share yours.
                Celebrate your diabetes hero with T1Dixpert, connecting patients, doctors, and
                caregivers for improved health outcomes.
              </motion.p>
              <motion.div 
                className="tw-flex tw-flex-wrap tw-gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                <motion.button 
                  className="tw-bg-[#627CFF] hover:tw-bg-blue-700 tw-text-white tw-px-6 tw-py-2 md:tw-py-3 tw-rounded tw-font-medium tw-transition-all tw-text-sm md:tw-text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Launching Soon
                </motion.button>
              </motion.div>
            </motion.div>
            
            {/* Right Content - Minimal Image Slider */}
            <motion.div 
              className="tw-relative tw-overflow-hidden tw-rounded-xl tw-shadow-xl tw-h-64 md:tw-h-96"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              {heroImages.map((image, index) => (
                <motion.div 
                  key={index}
                  className={`tw-absolute tw-inset-0 tw-transition-opacity tw-duration-1000 tw-ease-in-out ${index === currentImageIndex ? 'tw-opacity-100' : 'tw-opacity-0'}`}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: index === currentImageIndex ? 1 : 0, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <img 
                    src={image} 
                    alt={`Diabetes Management ${index + 1}`} 
                    className="tw-w-full tw-h-full tw-object-cover"
                  />
                  <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-black/30 tw-to-transparent"></div>
                </motion.div>
              ))}
              
              {/* Simple navigation controls */}
              <div className="tw-absolute tw-bottom-4 tw-left-0 tw-right-0 tw-flex tw-justify-center tw-gap-2">
                {heroImages.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`tw-w-6 tw-h-1 tw-transition-all tw-duration-300 ${index === currentImageIndex ? 'tw-bg-white' : 'tw-bg-white/40'}`}
                    aria-label={`Go to image ${index + 1}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
              
              {/* Minimal navigation arrows - Hide on small screens */}
              {!isMobile && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prevIndex => (prevIndex - 1 + heroImages.length) % heroImages.length)}
                    className="tw-absolute tw-left-4 tw-top-1/2 tw-transform tw--translate-y-1/2 tw-bg-white/30 tw-backdrop-blur-sm tw-w-8 tw-h-8 md:tw-w-10 md:tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white hover:tw-bg-white/50 tw-transition-all"
                    aria-label="Previous image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-4 tw-w-4 md:tw-h-6 md:tw-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prevIndex => (prevIndex + 1) % heroImages.length)}
                    className="tw-absolute tw-right-4 tw-top-1/2 tw-transform tw--translate-y-1/2 tw-bg-white/30 tw-backdrop-blur-sm tw-w-8 tw-h-8 md:tw-w-10 md:tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white hover:tw-bg-white/50 tw-transition-all"
                    aria-label="Next image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-4 tw-w-4 md:tw-h-6 md:tw-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="tw-py-16 md:tw-py-24 tw-px-4 md:tw-px-6 tw-bg-gray-50">
        <div className="tw-container tw-mx-auto">
          <motion.div 
            className="tw-text-center tw-mb-10 md:tw-mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="tw-text-2xl md:tw-text-4xl tw-text-gray-800 tw-mb-3 md:tw-mb-4">Platform Features</h2>
            <p className="tw-text-sm md:tw-text-base tw-text-gray-600 tw-max-w-3xl tw-mx-auto">
              iT1Dixpert provides innovative tools specifically designed for effective Type 1 Diabetes management
            </p>
          </motion.div>
          
                      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8 md:tw-gap-16">
              {/* Features List */}
              <div className="tw-space-y-8 md:tw-space-y-12">
                {platformFeatures.map((feature, index) => (
                  <motion.div 
                    key={feature.id} 
                    className="tw-flex tw-gap-3 md:tw-gap-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="tw-shrink-0 tw-w-10 tw-h-10 md:tw-w-14 md:tw-h-14 tw-rounded-full tw-bg-blue-100 tw-flex tw-items-center tw-justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="tw-text-blue-600">{feature.icon}</span>
                    </motion.div>
                    <div>
                      <h3 className="tw-text-base md:tw-text-xl tw-font-medium tw-text-gray-800 tw-mb-1 md:tw-mb-2">{feature.title}</h3>
                      <p className="tw-text-xs md:tw-text-base tw-text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            
            {/* Bar Graph - Responsive */}
            {/* Desktop: Show BarGraph, hidden on mobile */}
            <div className="tw-flex tw-items-center tw-justify-center tw-hidden md:tw-flex">
              <BarGraph isMobile={false} />
            </div>
            {/* Mobile: Show BarGraphResponsive, hidden on desktop */}
            <div className="tw-flex tw-items-center tw-justify-center md:tw-hidden">
              <BarGraphResponsive />
            </div>
          </div>
        </div>
      </section>

      {/* T1D Statistics Section */}
      <section
        id="statistics"
        className="tw-py-8 md:tw-py-16 md:tw-mx-12 md:tw-rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%)",
        }}
      >
        <div className="tw-container tw-mx-auto tw-relative tw-z-10">
          <div className="tw-text-center tw-mb-8 tw-pt-8 md:tw-pt-12">
            <h2
              className="tw-text-2xl md:tw-text-4xl tw-mb-3 md:tw-mb-4"
              style={{ color: "#01579B" }}
            >
              T1D Statistics
            </h2>
            <p
              className="tw-text-sm tw-px-4 md:tw-text-base tw-max-w-3xl tw-mx-auto"
              style={{ color: "#444444" }}
            >
              Understanding the impact of Type 1 Diabetes in India and around the world
            </p>
          </div>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6 md:tw-gap-10 tw-p-6 md:tw-p-12">
            {t1dStatistics.map((stat, index) => (
              <div
                key={index}
                className="tw-bg-white tw-rounded-xl md:tw-rounded-2xl tw-p-4 md:tw-p-8 tw-border hover:tw-transform hover:tw-scale-[1.02] tw-transition-all tw-duration-300"
                style={{
                  borderColor: "#BBDEFB",
                  boxShadow: "0 2px 8px 0 rgba(2, 136, 209, 0.04)",
                }}
              >
                <div
                  className="tw-text-2xl md:tw-text-4xl tw-font-bold tw-mb-2 md:tw-mb-3"
                  style={{
                    color: index % 2 === 0 ? "#0288D1" : "#00BCD4",
                  }}
                >
                  {stat.value}
                </div>
                <h3
                  className="tw-text-base md:tw-text-xl tw-font-medium tw-mb-1 md:tw-mb-2"
                  style={{ color: "#01579B" }}
                >
                  {stat.label}
                </h3>
                <p
                  className="tw-text-xs md:tw-text-sm"
                  style={{ color: "#444444" }}
                >
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How T1Dixpert Platform Works Section */}
      <section className="tw-py-8 md:tw-py-14 tw-px-2 md:tw-px-0 tw-bg-white">
        <div className="tw-container tw-mx-auto">
          <motion.div 
            className="tw-text-center tw-mb-6 md:tw-mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="tw-text-2xl md:tw-text-3xl tw-text-gray-800 tw-mb-1 md:tw-mb-2 tw-font-semibold">
              How T1Dixpert Works
            </h2>
            <p className="tw-text-xs md:tw-text-sm tw-text-gray-600 tw-max-w-lg tw-mx-auto">
              A modern, data-driven platform for Type 1 Diabetes care.
            </p>
          </motion.div>
          <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4 md:tw-gap-8 tw-items-center">
            <motion.div 
              className="tw-space-y-4 md:tw-space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="tw-bg-gradient-to-r tw-from-blue-50 tw-to-indigo-50 tw-p-4 md:tw-p-6 tw-rounded-lg tw-border tw-border-blue-100"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="tw-text-base md:tw-text-lg tw-font-semibold tw-text-gray-800 tw-mb-1">Admin Dashboard</h3>
                <p className="tw-text-xs md:tw-text-sm tw-text-gray-600">
                  Centralized control panel for managing users, monitoring platform activity, and overseeing system health.
                </p>
              </motion.div>
              <motion.div 
                className="tw-bg-gradient-to-r tw-from-purple-50 tw-to-pink-50 tw-p-4 md:tw-p-6 tw-rounded-lg tw-border tw-border-purple-100"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="tw-text-base md:tw-text-lg tw-font-semibold tw-text-gray-800 tw-mb-1">Doctors Dashboard</h3>
                <p className="tw-text-xs md:tw-text-sm tw-text-gray-600">
                  Comprehensive interface for doctors to review patient data, provide recommendations, and track treatment progress.
                </p>
              </motion.div>
              <motion.div 
                className="tw-bg-gradient-to-r tw-from-green-50 tw-to-teal-50 tw-p-4 md:tw-p-6 tw-rounded-lg tw-border tw-border-green-100"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="tw-text-base md:tw-text-lg tw-font-semibold tw-text-gray-800 tw-mb-1">Patient Dashboard</h3>
                <p className="tw-text-xs md:tw-text-sm tw-text-gray-600">
                  Personalized dashboard for patients to monitor their health, receive insights, and communicate with healthcare providers.
                </p>
              </motion.div>
            </motion.div>
            <motion.div 
              className="tw-relative tw-overflow-hidden tw-rounded-lg tw-shadow md:tw-ml-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="tw-aspect-video tw-bg-gray-100 tw-flex tw-items-center tw-justify-center">
                <video autoPlay loop muted src='/videos/vid1.mp4' className="tw-w-full tw-h-full tw-object-cover tw-rounded-lg"></video>
              </div>
            </motion.div>
          </div>
          <motion.div 
            className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4 md:tw-gap-8 tw-mt-8 md:tw-mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="tw-text-left tw-p-4 tw-bg-white tw-rounded-lg tw-shadow tw-border tw-border-gray-100 hover:tw-shadow-md tw-transition-all"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="tw-w-10 tw-h-10 tw-bg-blue-100 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mb-2"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="tw-w-5 tw-h-5 tw-text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <h4 className="tw-text-sm md:tw-text-base tw-font-semibold tw-text-gray-800 tw-mb-1">Personalized Care</h4>
              <p className="tw-text-xs md:tw-text-xs tw-text-gray-600">Care plans tailored to your unique needs.</p>
            </motion.div>
            <motion.div 
              className="tw-text-left tw-p-4 tw-bg-white tw-rounded-lg tw-shadow tw-border tw-border-gray-100 hover:tw-shadow-md tw-transition-all"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="tw-w-10 tw-h-10 tw-bg-purple-100 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mb-2"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="tw-w-5 tw-h-5 tw-text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
              <h4 className="tw-text-sm md:tw-text-base tw-font-semibold tw-text-gray-800 tw-mb-1">Real-time Alerts</h4>
              <p className="tw-text-xs md:tw-text-xs tw-text-gray-600">Instant notifications for critical events.</p>
            </motion.div>
            <motion.div 
              className="tw-text-left tw-p-4 tw-bg-white tw-rounded-lg tw-shadow tw-border tw-border-gray-100 hover:tw-shadow-md tw-transition-all"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="tw-w-10 tw-h-10 tw-bg-green-100 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mb-2"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="tw-w-5 tw-h-5 tw-text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </motion.div>
              <h4 className="tw-text-sm md:tw-text-base tw-font-semibold tw-text-gray-800 tw-mb-1">Community Support</h4>
              <p className="tw-text-xs md:tw-text-xs tw-text-gray-600">Connect with others for support and advice.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Graph Component - Separate section for trends */}
      {/* Mobile: ResponsiveGraph, hidden on md+ */}
      <section className="tw-block md:tw-hidden tw-py-12 tw-px-4 tw-bg-white">
        <div className="tw-container tw-mx-auto">
          <div className="tw-text-center tw-mb-8">
            <h2 className="tw-text-2xl tw-text-gray-800 tw-mb-3">Global T1D Trends</h2>
            <p className="tw-text-sm tw-text-gray-600 tw-max-w-2xl tw-mx-auto">
              Track global trends in Type 1 Diabetes prevalence and cases over the past decade
            </p>
          </div>
          <div className="tw-max-w-md tw-mx-auto">
            <ResponsiveGraph isMobile={true} />
          </div>
        </div>
      </section>
      {/* Desktop: InteractiveGraph, hidden on mobile */}
      <section className="tw-hidden md:tw-block tw-py-16 tw-px-6 tw-bg-white">
        <div className="tw-container tw-mx-auto">
          <div className="tw-text-center tw-mb-8">
            <h2 className="tw-text-3xl tw-text-gray-800 tw-mb-3">Global T1D Trends</h2>
            <p className="tw-text-base tw-text-gray-600 tw-max-w-2xl tw-mx-auto">
              Track global trends in Type 1 Diabetes prevalence and cases over the past decade
            </p>
          </div>
          <div className=" tw-mx-auto">
            <InteractiveGraph />
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="tw-py-12 md:tw-py-16 tw-bg-gray-50 tw-flex tw-flex-col tw-items-center tw-justify-center tw-px-4">
        <h2 className="tw-text-xl md:tw-text-3xl tw-font-medium tw-text-gray-800 tw-mb-6 md:tw-mb-8 tw-text-center">
          In a Proud Collaboration with
        </h2>
        <div className="tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-6 md:tw-gap-12">
          {/* NITJ Logo */}
          <div className="tw-flex tw-flex-col tw-items-center">
            <img
              src={logoImage1}
              alt="NITJ Logo"
              className="tw-h-12 tw-w-20 md:tw-h-24 md:tw-w-36 tw-object-contain tw-mb-2"
              style={{ maxWidth: '120px' }}
            />
            <span className="tw-text-sm md:tw-text-lg tw-font-medium tw-text-gray-700 tw-mt-1">NIT Jalandhar</span>
          </div>
          {/* Divider */}
          <span className="tw-w-px tw-h-12 md:tw-h-20 tw-bg-gray-300"></span>
          {/* PGI Chandigarh Logo */}
          <div className="tw-flex tw-flex-col tw-items-center">
            <img
              src={logoImage2}
              alt="PGI Chandigarh Logo"
              className="tw-h-12 tw-w-20 md:tw-h-24 md:tw-w-36 tw-object-contain tw-mb-2"
              style={{ maxWidth: '120px' }}
            />
            <span className="tw-text-sm md:tw-text-lg tw-font-medium tw-text-gray-700 tw-mt-1">PGIMER Chandigarh</span>
          </div>
        </div>
        <div className="tw-max-w-3xl tw-mx-auto tw-text-center tw-mt-8 md:tw-mt-10 tw-border-t tw-border-gray-200 tw-pt-6 md:tw-pt-10">
          <h3 className="tw-text-lg md:tw-text-xl tw-font-medium tw-text-gray-800 tw-mb-3 md:tw-mb-4">Transforming Diabetes Care Together</h3>
          <p className="tw-text-xs md:tw-text-base tw-text-gray-600">
            This strategic partnership combines NITJ's technological innovation with PGIMER's medical excellence to deliver a comprehensive platform that streamlines diabetes management, improves treatment outcomes, and enhances quality of life for patients across India.
          </p>
        </div>
      </section>

      {/* Team Sections */}
      <section id="team" className="tw-py-16 md:tw-py-24 tw-px-4 md:tw-px-6 tw-bg-white">
        <div className="tw-container tw-mx-auto">
          <div className="tw-text-center tw-mb-10 md:tw-mb-16">
            <h2 className="tw-text-2xl md:tw-text-4xl tw-text-gray-800 tw-mb-3 md:tw-mb-4">Our Expert Team</h2>
            <p className="tw-text-sm md:tw-text-base tw-text-gray-600 tw-max-w-3xl tw-mx-auto">
              Meet our dedicated team of medical professionals and technology experts committed to transforming diabetes care
            </p>
          </div>
          
          {/* NITJ Team */}
          <div className="tw-mb-12 md:tw-mb-20">
            <h3 className="tw-text-xl md:tw-text-2xl tw-text-gray-800 tw-mb-6 md:tw-mb-8 tw-text-center md:tw-text-left">
              <span className="tw-pb-1 md:tw-pb-2">NIT Jalandhar Team</span>
            </h3>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4 md:tw-gap-6">
              {teamDetailsNITJ.map((member, index) => (
                <div
                  key={index}
                  className="tw-bg-white tw-rounded-xl tw-shadow-md tw-overflow-hidden hover:tw-shadow-lg tw-transition-all tw-border tw-border-gray-100"
                >
                  <div className="tw-flex tw-flex-row tw-h-full">
                    {/* Photo left, details right, on all screens */}
                    <div className="tw-flex-shrink-0 tw-flex tw-items-center tw-justify-center tw-bg-blue-50" style={{width: '112px', minWidth: '112px', height: '160px'}}>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="tw-w-28 tw-h-40 tw-object-contain"
                        style={{maxHeight: '160px'}}
                      />
                    </div>
                    <div className="tw-flex-1 tw-p-3 md:tw-p-4 tw-bg-gradient-to-br tw-from-blue-50 tw-to-white tw-flex tw-flex-col tw-justify-center">
                      <h3 className="tw-text-base md:tw-text-lg tw-font-medium tw-text-gray-800 tw-mb-1">{member.name}</h3>
                      <p className="tw-text-xs md:tw-text-sm tw-text-blue-600 tw-mb-1 md:tw-mb-2">{member.designation}</p>
                      <p className="tw-text-xs tw-text-gray-600 tw-mb-1">{member.specialization}</p>
                      {member.additionalRole && (
                        <p className="tw-text-xs tw-text-gray-700 tw-italic">{member.additionalRole}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PGIMER Team */}
          <div>
            <h3 className="tw-text-xl md:tw-text-2xl tw-text-gray-800 tw-mb-6 md:tw-mb-8 tw-text-center md:tw-text-left">
              <span className="tw-pb-1 md:tw-pb-2">PGIMER Chandigarh Team</span>
            </h3>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4 md:tw-gap-6">
              {teamDetailsPGIMER.map((member, index) => (
                <div
                  key={index}
                  className="tw-bg-white tw-rounded-xl tw-shadow-md tw-overflow-hidden hover:tw-shadow-lg tw-transition-all tw-border tw-border-gray-100"
                >
                  <div className="tw-flex tw-flex-row tw-h-full">
                    {/* Photo left, details right, on all screens */}
                    <div className="tw-flex-shrink-0 tw-flex tw-items-center tw-justify-center tw-bg-blue-50" style={{width: '112px', minWidth: '112px', height: '160px'}}>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="tw-w-28 tw-h-40 tw-object-contain"
                        style={{maxHeight: '160px'}}
                      />
                    </div>
                    <div className="tw-flex-1 tw-p-3 md:tw-p-4 tw-bg-gradient-to-br tw-from-blue-50 tw-to-white tw-flex tw-flex-col tw-justify-center">
                      <h3 className="tw-text-base md:tw-text-lg tw-font-medium tw-text-gray-800 tw-mb-1">{member.name}</h3>
                      <p className="tw-text-xs md:tw-text-sm tw-text-blue-600 tw-mb-1 md:tw-mb-2">{member.designation}</p>
                      <p className="tw-text-xs tw-text-gray-600">{member.specialization}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer - Clean and Essential */}
      <footer className="tw-bg-gradient-to-br tw-from-[#1E293B] tw-to-[#0F172A] tw-text-white tw-pt-10 md:tw-pt-16 tw-pb-4 md:tw-pb-8 tw-px-2 sm:tw-px-4 md:tw-px-6">
        <div className="tw-container tw-mx-auto">
          {/* Main Footer Content */}
          <motion.div 
            className="tw-flex tw-flex-col lg:tw-flex-row tw-justify-between tw-items-stretch tw-gap-8 md:tw-gap-12 tw-mb-8 md:tw-mb-12 tw-pb-8 md:tw-pb-12 tw-border-b tw-border-gray-700/50"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Logo and Tagline */}
            <motion.div 
              className="tw-flex tw-flex-col tw-items-center lg:tw-items-start tw-mb-6 lg:tw-mb-0 tw-flex-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="tw-text-xl sm:tw-text-2xl tw-font-bold tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-blue-400 tw-to-indigo-300">iT1Dixpert</h2>
              <p className="tw-text-sm sm:tw-text-base tw-text-gray-300 tw-max-w-xs sm:tw-max-w-md tw-text-center lg:tw-text-left tw-mt-2">
                Empowering diabetes management through technology, education, and community support.
              </p>
            </motion.div>
            
            {/* Quick Links and Platform - side by side on mobile and up */}
            <div className="tw-flex tw-flex-row tw-gap-6 md:tw-gap-8 tw-flex-1 tw-items-start tw-justify-center">
              <div>
                <h4 className="tw-text-base sm:tw-text-lg tw-font-medium tw-mb-3 tw-text-blue-400">Quick Links</h4>
                <ul className="tw-space-y-2">
                  <li><a href="#features" className="tw-text-sm tw-text-gray-300 hover:tw-text-white tw-transition-colors">Features</a></li>
                  <li><a href="#statistics" className="tw-text-sm tw-text-gray-300 hover:tw-text-white tw-transition-colors">Statistics</a></li>
                  <li><a href="#team" className="tw-text-sm tw-text-gray-300 hover:tw-text-white tw-transition-colors">Our Team</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="tw-text-base sm:tw-text-lg tw-font-medium tw-mb-3 tw-text-blue-400">Platform</h4>
                <ul className="tw-space-y-2">
                  <li><Link to="/login" className="tw-text-sm tw-text-gray-300 hover:tw-text-white tw-transition-colors">Login</Link></li>
                  <li><a href="#" className="tw-text-sm tw-text-gray-300 hover:tw-text-white tw-transition-colors">Patient Portal</a></li>
                  <li><a href="#" className="tw-text-sm tw-text-gray-300 hover:tw-text-white tw-transition-colors">Provider Access</a></li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div 
            className="tw-flex tw-flex-col sm:tw-flex-row tw-justify-between tw-items-center tw-gap-4 md:tw-gap-8 tw-mb-6 md:tw-mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="tw-flex tw-flex-col xs:tw-flex-row tw-items-center tw-gap-3 sm:tw-gap-6">
              <div className="tw-flex tw-items-center tw-gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="tw-h-4 tw-w-4 tw-text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l9 6 9-6M21 8v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8"
                  />
                </svg>
                <span className="tw-text-sm tw-text-gray-300">support@t1dixpert.com</span>
              </div>
              <div className="tw-flex tw-items-center tw-gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-4 tw-w-4 tw-text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="tw-text-sm tw-text-gray-300">NIT Jalandhar & PGIMER Chandigarh</span>
              </div>
            </div>
          </motion.div>
          
          {/* Bottom Bar with Copyright */}
          <motion.div 
            className="tw-pt-4 tw-border-t tw-border-gray-700/50 tw-flex tw-flex-col sm:tw-flex-row tw-justify-between tw-items-center tw-gap-2 sm:tw-gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <p className="tw-text-xs tw-text-gray-400 tw-text-center sm:tw-text-left">&copy; {new Date().getFullYear()} T1Dixpert. All rights reserved.</p>
            
            <div className="tw-flex tw-gap-4 tw-justify-center sm:tw-justify-end">
              <a href="#" className="tw-text-xs tw-text-gray-400 hover:tw-text-white tw-transition-colors">Privacy Policy</a>
              <a href="#" className="tw-text-xs tw-text-gray-400 hover:tw-text-white tw-transition-colors">Terms of Service</a>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default NewHomePage; 