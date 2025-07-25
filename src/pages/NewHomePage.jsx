import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logoImage1 from '../assets/logo.png'
import logoImage2 from '../assets/pgilogo.jpeg'
// Import both graph components
import ResponsiveGraph from '../components/HomePage/ResponsiveGraph';
import InteractiveGraph from '../components/HomePage/InteractiveGraph';
import BarGraph from '../components/HomePage/barGraph';
import BarGraphResponsive from '../components/HomePage/barGraphResponsive';

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
          <div className="tw-flex tw-items-center tw-h-full">
            {/* Use a properly sized logo, adjust src as needed */}
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
            <div>
              <h1 className="tw-text-3xl md:tw-text-5xl tw-font-bold tw-text-[#281946] tw-mb-4 md:tw-mb-6 tw-text-left">
                T1Dixpert Diabetes Heroes
              </h1>
              <p className="tw-text-base md:tw-text-lg tw-text-gray-600 tw-mb-6 md:tw-mb-8 tw-max-w-lg tw-text-left">
                Everyone loves a good hero story and we're inviting you to share yours.
                Celebrate your diabetes hero with T1Dixpert, connecting patients, doctors, and
                caregivers for improved health outcomes.
              </p>
              <div className="tw-flex tw-flex-wrap tw-gap-4">
                <button className="tw-bg-[#627CFF] hover:tw-bg-blue-700 tw-text-white tw-px-6 tw-py-2 md:tw-py-3 tw-rounded tw-font-medium tw-transition-all tw-text-sm md:tw-text-base">
                  Get Started
                </button>
                <button className="tw-border tw-border-[#281946] tw-text-[#281946] hover:tw-bg-gray-100 tw-px-6 tw-py-2 md:tw-py-3 tw-rounded tw-font-medium tw-transition-all tw-text-sm md:tw-text-base">
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Right Content - Minimal Image Slider */}
            <div className="tw-relative tw-overflow-hidden tw-rounded-xl tw-shadow-xl tw-h-64 md:tw-h-96">
              {heroImages.map((image, index) => (
                <div 
                  key={index}
                  className={`tw-absolute tw-inset-0 tw-transition-opacity tw-duration-1000 tw-ease-in-out ${index === currentImageIndex ? 'tw-opacity-100' : 'tw-opacity-0'}`}
                >
                  <img 
                    src={image} 
                    alt={`Diabetes Management ${index + 1}`} 
                    className="tw-w-full tw-h-full tw-object-cover"
                  />
                  <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-black/30 tw-to-transparent"></div>
                </div>
              ))}
              
              {/* Simple navigation controls */}
              <div className="tw-absolute tw-bottom-4 tw-left-0 tw-right-0 tw-flex tw-justify-center tw-gap-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`tw-w-6 tw-h-1 tw-transition-all tw-duration-300 ${index === currentImageIndex ? 'tw-bg-white' : 'tw-bg-white/40'}`}
                    aria-label={`Go to image ${index + 1}`}
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
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="tw-py-16 md:tw-py-24 tw-px-4 md:tw-px-6 tw-bg-gray-50">
        <div className="tw-container tw-mx-auto">
          <div className="tw-text-center tw-mb-10 md:tw-mb-16">
            <h2 className="tw-text-2xl md:tw-text-4xl tw-text-gray-800 tw-mb-3 md:tw-mb-4">Platform Features</h2>
            <p className="tw-text-sm md:tw-text-base tw-text-gray-600 tw-max-w-3xl tw-mx-auto">
              iT1Dixpert provides innovative tools specifically designed for effective Type 1 Diabetes management
            </p>
          </div>
          
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8 md:tw-gap-16">
            {/* Features List */}
            <div className="tw-space-y-8 md:tw-space-y-12">
              {platformFeatures.map((feature) => (
                <div key={feature.id} className="tw-flex tw-gap-3 md:tw-gap-4">
                  <div className="tw-shrink-0 tw-w-10 tw-h-10 md:tw-w-14 md:tw-h-14 tw-rounded-full tw-bg-blue-100 tw-flex tw-items-center tw-justify-center">
                    <span className="tw-text-blue-600">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="tw-text-base md:tw-text-xl tw-font-medium tw-text-gray-800 tw-mb-1 md:tw-mb-2">{feature.title}</h3>
                    <p className="tw-text-xs md:tw-text-base tw-text-gray-600">{feature.description}</p>
                  </div>
                </div>
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

      {/* Footer with simplified design for mobile */}
      <footer className="tw-bg-gradient-to-br tw-from-[#1E293B] tw-to-[#0F172A] tw-text-white tw-pt-12 md:tw-pt-20 tw-pb-6 md:tw-pb-10 tw-px-4 md:tw-px-6">
        <div className="tw-container tw-mx-auto">
          <div className="tw-flex tw-flex-col lg:tw-flex-row tw-justify-between tw-items-center tw-gap-8 md:tw-gap-10 tw-mb-10 md:tw-mb-16 tw-pb-10 md:tw-pb-16 tw-border-b tw-border-gray-700/50">
            {/* Logo and Tagline */}
            <div className="tw-flex tw-flex-col tw-items-center lg:tw-items-start">
              <h2 className="tw-text-xl md:tw-text-2xl tw-font-bold tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-blue-400 tw-to-indigo-300">iT1Dixpert</h2>
              <p className="tw-text-xs md:tw-text-sm tw-text-gray-300 tw-max-w-md tw-text-center lg:tw-text-left tw-mt-2">
                Empowering diabetes management through technology, education, and community support.
              </p>
            </div>
            
            {/* Newsletter Signup - Simplified for mobile */}
            <div className="tw-w-full lg:tw-w-auto">
              <h3 className="tw-text-base md:tw-text-xl tw-font-medium tw-text-white tw-mb-2 md:tw-mb-4 tw-text-center lg:tw-text-left">Subscribe to Updates</h3>
              <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="tw-px-3 md:tw-px-4 tw-py-2 md:tw-py-3 tw-bg-gray-800 tw-text-white tw-rounded-lg tw-border tw-border-gray-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 tw-text-sm md:tw-text-base"
                />
                <button className="tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3 tw-rounded-lg tw-font-medium tw-transition-colors tw-text-sm md:tw-text-base">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          {/* Footer Links - Hide less important sections on mobile */}
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-6 md:tw-gap-10 tw-mb-8 md:tw-mb-12">
            {/* Platform Links */}
            <div>
              <h4 className="tw-text-base md:tw-text-lg tw-font-medium tw-mb-3 md:tw-mb-5 tw-flex tw-items-center tw-gap-2">
                <span className="tw-text-blue-400">Platform</span>
              </h4>
              <ul className="tw-space-y-2 md:tw-space-y-3">
                <li><a href="#" className="tw-text-xs md:tw-text-sm tw-text-gray-300 hover:tw-text-white tw-transition-colors">Dashboard</a></li>
                <li><a href="#" className="tw-text-xs md:tw-text-sm tw-text-gray-300 hover:tw-text-white tw-transition-colors">Patient Portal</a></li>
                <li><a href="#" className="tw-text-xs md:tw-text-sm tw-text-gray-300 hover:tw-text-white tw-transition-colors">Provider Access</a></li>
              </ul>
            </div>
            
            {/* Contact - Always visible */}
            <div className="sm:tw-col-span-2 lg:tw-col-span-1">
              <h4 className="tw-text-base md:tw-text-lg tw-font-medium tw-mb-3 md:tw-mb-5 tw-flex tw-items-center tw-gap-2">
                <span className="tw-text-blue-400">Contact Us</span>
              </h4>
              <ul className="tw-space-y-2 md:tw-space-y-3">
                <li className="tw-flex tw-items-center tw-gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-4 tw-w-4 tw-text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="tw-text-xs md:tw-text-sm tw-text-gray-300">support@t1dixpert.com</span>
                </li>
                <li className="tw-flex tw-items-start tw-gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-4 tw-w-4 tw-text-blue-400 tw-shrink-0 tw-mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="tw-text-xs md:tw-text-sm tw-text-gray-300">
                    NIT Jalandhar & PGIMER Chandigarh, Punjab, India
                  </span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar with Copyright */}
          <div className="tw-pt-4 md:tw-pt-8 tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center tw-gap-2 md:tw-gap-4">
            <p className="tw-text-xs tw-text-gray-400">&copy; {new Date().getFullYear()} T1Dixpert. All rights reserved.</p>
            
            <div className="tw-flex tw-flex-wrap tw-gap-3 md:tw-gap-6 tw-justify-center">
              <a href="#" className="tw-text-xs tw-text-gray-400 hover:tw-text-white tw-transition-colors">Privacy</a>
              <a href="#" className="tw-text-xs tw-text-gray-400 hover:tw-text-white tw-transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewHomePage; 