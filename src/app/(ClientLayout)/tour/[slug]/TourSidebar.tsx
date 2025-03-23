import Image from 'next/image';
import React from 'react';
import './tour.css';
const TourSidebar: React.FC = () => {
  return (
    <div className="sidebar">
      

<div className="box-inner">
                        <div className="box-border">
                            <div className="product-name d-none d-lg-block">
                                Chuyến du lịch Bắc Ninh - Singapore 4 ngày 3 đêm                            </div>
							  <div className="rating-wrap">
								<div className="rating-start" title="Rated 5 out of 5">
              <span ></span>
                                       </div>
								</div>
                                <div className="position-relative">
								                                    <div className="origi-price text-through">
                                        Giá cũ: <span>14,490,000đ</span>
                                    </div>
									                                    <div className="sale-price">
                                        Giá mới: <span className="sale-price">11,490,000đ</span>                                    </div>
                                    <div className="saleoff-badge">
                                        Tiết kiệm<br/>
                                        <strong>21%</strong>
                                    </div>
                                </div>
                            <ul className="product-info">
								<li>
									<i className="fas fa-fw fa-map-marker-alt"></i>
									<div>
										<span>Nơi khởi hành: </span>
										Bắc Ninh									</div>
								</li>
								</ul> <ul className="product-info">
							<li>
								<i className="fas fa-fw fa-hotel"></i>
								<div>
									<span>Khách sạn: </span>
									Khách sạn 3 sao 								</div>
							</li></ul>
							<ul className="product-info">
							<li>
								<i className="far fa-fw fa-calendar-alt"></i>
								<div>
									<span>Thời gian: </span>
									( 4 ngày 3 đêm)
								</div>
							</li>
									
									</ul>
                           <div className="action-book mt-lg-0 mt-3">
                                <a href="" className="btn btn-orange btn-block">
                                        ĐẶT NGAY
                                    <span>Giữ chỗ ngay bây giờ - Thanh toán sau</span>
                                </a>
                            </div>
                           
                            
                        </div>
                    </div>




      <div className="widget-bg mt-4 p-4 bg-gray-100 rounded">
        <p>Hoặc để lại SĐT - BookingTour sẽ gọi cho bạn!</p>
        <div className="input-group flex mt-2">
          <input type="text" placeholder="Số điện thoại..." className="form-control flex-1 p-2 rounded-l" />
<button type="submit" id="noti_btn_primary" className="btn-submit-tele">
                                        <Image src={"/images/btn-submit.png"} width={30} height={30} alt="telegram-plane" />
      </button>
        </div>
      </div>
    </div>
  );
};

export default TourSidebar;