"use client";

const tours = [
  {
    name: "Tour Hạ Long",
    img: "https://cdn.bookingtour.vn/thumb_x460x255/upload/2024/09/21/ha-long.jpg",
    url: "https://bookingtour.vn/tour/ha-long.html",
    price: "3,500,000 VNĐ",
    duration: "3 ngày 2 đêm",
  },
  {
    name: "Tour Đà Nẵng",
    img: "https://cdn.bookingtour.vn/thumb_x460x255/upload/2024/09/10/da-nang.jpg",
    url: "https://bookingtour.vn/tour/da-nang.html",
    price: "4,200,000 VNĐ",
    duration: "4 ngày 3 đêm",
  },
  {
    name: "Tour Phú Quốc",
    img: "https://cdn.bookingtour.vn/thumb_x460x255/upload/2024/09/10/phu-quoc.jpg",
    url: "https://bookingtour.vn/tour/phu-quoc.html",
    price: "5,000,000 VNĐ",
    duration: "3 ngày 2 đêm",
  },
];

const PackageSection = () => {
  return (
    <section className="package-section">
      <div className="container">
        {/* Tiêu đề section */}
        <div className="section-heading text-center">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h5 className="dash-style">EXPLORE GREAT PLACES</h5>
              <h2>NHỮNG TOUR ĐƯỢC YÊU THÍCH</h2>
              <p>Các tour được đặt nhiều nhất trong tháng này.</p>
            </div>
          </div>
        </div>

        {/* Danh sách tour */}
        <div className="package-inner">
          <div className="row">
            {tours.map((tour, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <TourCard {...tour} />
              </div>
            ))}
          </div>

          {/* Nút xem thêm */}
          <div className="btn-wrap text-center">
            <a href="https://bookingtour.vn/tour" className="button-primary">
              XEM THÊM GÓI TOUR
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Component Tour Card
const TourCard = ({ name, img, url, price, duration }: any) => {
  return (
    <div className="tour-item">
      <figure className="tour-image">
        <img src={img} alt={name} />
      </figure>
      <div className="tour-content">
        <h3>
          <a href={url}>{name}</a>
        </h3>
        <p>
          <strong>Giá:</strong> {price} | <strong>Thời gian:</strong> {duration}
        </p>
      </div>
    </div>
  );
};

export default PackageSection;
