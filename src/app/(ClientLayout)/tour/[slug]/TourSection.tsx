// components/Tour/TourSection.tsx
import React from 'react';
import TourAccordion from './TourAccordion';
import TourItinerary from './TourItinerary';
import TourOverview from './TourOverview';
import TourReviews from './TourReviews';
import TourSidebar from './TourSidebar';


const TourSection: React.FC = () => {
  return (
    <div className="single-tour-section">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-2/3 px-4">
            <figure className="feature-image relative">
              {/* Placeholder for image */}
              <div className="package-meta text-center text-white bg-black bg-opacity-50 py-2">
                <ul className="flex justify-center space-x-4">
                  <li><i className="far fa-clock"></i> 4N/3Đ</li>
                  <li><i className="fas fa-map-marked-alt"></i> <a href="/destination/singapore" className="text-white">Singapore</a></li>
                </ul>
              </div>
            </figure>
            <div className="single-tour-inner">
              <div className="tab-container">
                <ul className="nav nav-tabs flex space-x-4" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" href="#overview" data-toggle="tab">ĐIỂM ĐẶC SẮC</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#program" data-toggle="tab">LỘ TRÌNH TOUR</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#review" data-toggle="tab">REVIEW</a>
                  </li>
                </ul>
                <div className="tab-content mt-4">
                  <TourOverview />
                  <TourItinerary />
                  <TourReviews />
                </div>
              </div>
              <TourAccordion />
            </div>
          </div>














          
          <div className="w-full lg:w-1/3 px-4">
            <TourSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourSection;