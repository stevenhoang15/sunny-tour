import React from 'react';


const TourAccordion: React.FC = () => {
  return (
    <div className="accordion mt-4">
      <h5 className="dash-style">Những thông tin cần lưu ý</h5>
      <div className="card">
        <div className="card-header">
          <h4>
            <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne">
              Giá đã bao gồm
            </button>
          </h4>
        </div>
        <div id="collapseOne" className="collapse">
          <div className="card-body">
            <ul>
              <li>Vé máy bay khứ hồi Hà Nội – Singapore – Hà Nội...</li>
              {/* Add other items */}
            </ul>
          </div>
        </div>
      </div>
      {/* Add other accordion items */}
    </div>
  );
};

export default TourAccordion;