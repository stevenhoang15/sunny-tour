"use client";

const galleryImages = [
  {
    src: "https://cdn.bookingtour.vn/thumb_x315x250/upload/admin/2024/09/25/anh_dep_tour_thai_lan3-19075.jpg",
    alt: "Ảnh đẹp Tour Thái Lan 3",
  },
  {
    src: "https://cdn.bookingtour.vn/thumb_x315x250/upload/admin/2024/09/25/anh_dep_tour_thai_lan1-19071.jpg",
    alt: "Ảnh đẹp Tour Thái Lan 1",
  },
  {
    src: "https://cdn.bookingtour.vn/thumb_x655x350/upload/admin/2024/09/25/anh_dep_tour_thai_lan2-19075.jpg",
    alt: "Ảnh đẹp Tour Thái Lan 2",
  },
];

const BestGallerySection = () => {
  return (
    <section className="best-section">
      <div className="container">
        <div className="row">
          {/* Cột trái: Tiêu đề + Ảnh chính */}
          <div className="col-lg-5">
            <div className="section-heading">
              <h5 className="dash-style">OUR TOUR GALLERY</h5>
              <h2>BEST TRAVELER'S SHARED PHOTOS</h2>
              <p>Những bức ảnh đẹp trên hành trình TOUR được khách hàng chia sẻ.</p>
            </div>
            <figure className="gallery-img">
              <a href="https://bookingtour.vn/destination/thai-lan.html">
                <h4>TOUR Thái Lan</h4>
              </a>
              <a href="https://bookingtour.vn/destination/thai-lan.html">
                <img
                  src="https://cdn.bookingtour.vn/thumb_x455x330/upload/2024/09/10/thai-lan2.jpg"
                  alt="Tour Thái Lan"
                />
              </a>
            </figure>
          </div>

          {/* Cột phải: Danh sách ảnh */}
          <div className="col-lg-7">
            <div className="row">
              {galleryImages.slice(0, 2).map((image, index) => (
                <div className="col-sm-6" key={index}>
                  <GalleryImage {...image} />
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col-12">
                <GalleryImage {...galleryImages[2]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Component hiển thị ảnh
const GalleryImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <figure className="gallery-img">
      <img src={src} alt={alt} />
    </figure>
  );
};

export default BestGallerySection;
