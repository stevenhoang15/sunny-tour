// components/Tour/TourSection.tsx
import HomeSlider from '@/components/Main/HomeSectionBanner';
import React from 'react';
import TourSection from './TourSection';


const TourPage: React.FC = () => {
  return (
    <div>
    <HomeSlider />
    <TourSection />
  </div>
  );
};

export default TourPage;