// components/Tour/TourItinerary.tsx
import React from 'react';

const TourItinerary: React.FC = () => {
  const itinerary = [
    {
      day: 1,
      title: 'HẢI PHÒNG - HÀ NỘI – SINGAPORE (Ăn tối)',
      content: (
        <>
          <p>Sáng: Xe và HDV đón quý khách tại điểm hẹn, khởi hành ra sân bay Nội Bài...</p>
          <ul>
            <li>Parliament House (Tòa nhà Quốc hội)</li>
            <li>Merlion Park (Công viên Sư Tử Biển)</li>
            <li>Nhà hát Victoria...</li>
          </ul>
        </>
      ),
    },
    // Add other days similarly
  ];

  return (
    <div className="tab-pane" id="program" role="tabpanel">
      <div className="itinerary-content">
        <h3>Thời gian <span>(4 ngày 3 đêm)</span></h3>
        <p>Lộ trình chi tiết cho 4 ngày hành trình Tour của bạn.</p>
      </div>
      <div className="itinerary-timeline-wrap">
        <ul className="space-y-4">
          {itinerary.map((item, index) => (
            <li key={index}>
              <div className="timeline-content">
                <div className="day-count">Ngày <span>{item.day}</span></div>
                <h4>{item.title}</h4>
                {item.content}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TourItinerary;