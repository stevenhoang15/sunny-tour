"use client";

const destinations = [
  {
    name: "Trung Quốc",
    img: "https://cdn.bookingtour.vn/thumb_x322x555/upload/2024/09/21/trung-quoc3.jpg",
    url: "https://bookingtour.vn/destination/trung-quoc.html",
    title: "Tour Du Lịch Trung Quốc: Khám Phá Đất Nước Hùng Vĩ",
    rating: "100%",
  },
  {
    name: "Nhật Bản",
    img: "https://cdn.bookingtour.vn/thumb_x322x555/upload/2024/09/10/nhat-ban1.jpg",
    url: "https://bookingtour.vn/destination/nhat-ban.html",
    title: "Tour du lịch Nhật Bản 2024",
    rating: "90%",
  },
  {
    name: "Hàn Quốc",
    img: "https://cdn.bookingtour.vn/thumb_x460x255/upload/2022/12/06/han-quoc7.jpg",
    url: "https://bookingtour.vn/destination/han-quoc.html",
    title: "Tour du lịch Hàn Quốc",
    rating: "100%",
  },
  {
    name: "Thái Lan",
    img: "https://cdn.bookingtour.vn/thumb_x460x255/upload/2024/09/10/thai-lan2.jpg",
    url: "https://bookingtour.vn/destination/thai-lan.html",
    title: "TOUR DU LỊCH THÁI LAN",
    rating: "100%",
  },
];

const DestinationSection = () => {
  return (
    <div className="container">
      <div className="section-heading">
        <div className="row align-items-end">
          <div className="col-lg-7">
            <h5 className="dash-style">POPULAR DESTINATION</h5>
            <h2>ĐIỂM ĐẾN HÀNG ĐẦU</h2>
          </div>
          <div className="col-lg-5">
            <div className="section-disc">
              Khám phá ngay các tour, hoạt động du lịch và địa điểm tham quan cho hành trình du lịch của bạn.
            </div>
          </div>
        </div>
      </div>

      <div className="destination-inner destination-three-column">
        <div className="row">
          <div className="col-lg-7">
            <div className="row">
              {destinations.slice(0, 2).map((dest, index) => (
                <div className="col-sm-6" key={index}>
                  <DestinationItem {...dest} />
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-5">
            <div className="row">
              {destinations.slice(2).map((dest, index) => (
                <div className="col-md-6 col-xl-12" key={index}>
                  <DestinationItem {...dest} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="btn-wrap text-center">
          <a href="https://bookingtour.vn/destination" className="button-primary">
            XEM THÊM ĐIỂM ĐẾN
          </a>
        </div>
      </div>
    </div>
  );
};

const DestinationItem = ({ name, img, url, title, rating }: any) => {
  return (
    <div className="desti-item overlay-desti-item">
      <figure className="desti-image">
        <img src={img} alt={name} />
      </figure>
      <div className="meta-cat bg-meta-cat">
        <a href={url}>{name}</a>
      </div>
      <div className="desti-content">
        <h3>
          <a href={url}>{title}</a>
        </h3>
        <div className="rating-start" title={`Rated 5 out of 5`}>
          <span style={{ width: rating }}></span>
        </div>
      </div>
    </div>
  );
};

export default DestinationSection;
