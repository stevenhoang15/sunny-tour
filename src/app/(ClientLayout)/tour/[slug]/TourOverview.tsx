// components/Tour/TourOverview.tsx
import React from 'react';

const TourOverview: React.FC = () => {
  return (
    <div className="tab-pane fade active show" id="overview" role="tabpanel">
      <div className="overview-content">
        <p>
          - Hành trình 4 ngày đầy hấp dẫn với những địa điểm nổi bật.<br />
          - Khám phá thành phố sạch nhất thế giới.<br />
          - Khám phá khu vườn siêu cây khổng lồ Garden By The Bay.<br />
          - Tham quan công viên sư tử biển nổi tiếng Merlion Park.<br />
          - Thỏa sức mua sắm tại trung tâm mua sắm nổi tiếng Orchard Road.<br />
          - Trải nghiệm tắm biển tại bãi biển xinh đẹp và nổi tiếng trên đảo Sentosa.
        </p>
        <ul className="product-info space-y-2">
          <li className="flex items-start">
            <i className="fas fa-fw fa-bolt mr-2"></i>
            <div>
              <span>Điểm tham quan: </span>
              <p>Hải Phòng - Singapore - Garden By The Bay - Orchard Road - Merlion Park - Sentosa</p>
            </div>
          </li>
          <li className="flex items-start">
            <i className="fas fa-fw fa-map-marker-alt mr-2"></i>
            <div>
              <span>Nơi khởi hành: </span>
              <p>Hải Phòng</p>
            </div>
          </li>
          <li className="flex items-start">
            <i className="fas fa-fw fa-hotel mr-2"></i>
            <div>
              <span>Khách sạn: </span>
              <p>Khách sạn 3 sao</p>
            </div>
          </li>
          <li className="flex items-start">
            <i className="far fa-fw fa-calendar-alt mr-2"></i>
            <div>
              <span>Thời gian: </span>
              <p>Thời gian 4 ngày</p>
            </div>
          </li>
          <li className="flex items-start">
            <i className="fas fa-fw fa-plane mr-2"></i>
            <div>
              <span>Phương tiện di chuyển: </span>
              <p>Máy bay, Ô tô</p>
            </div>
          </li>
        </ul>
        <p>
          Chương trình tour này là món quà tuyệt vời dành cho du khách của Cattour muốn khám phá đảo quốc Sư Tử...
        </p>
      </div>
    </div>
  );
};

export default TourOverview;