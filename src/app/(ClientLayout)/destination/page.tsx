import HomeSlider from "@/components/Main/HomeSectionBanner";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DestinationSection: React.FC = () => {
  return (



    <>

<HomeSlider />

    <section className="destination-section destination-page">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="row">
              <div className="col-sm-6">
                <div className="desti-item overlay-desti-item">
                  <figure className="desti-image">
                    <Image
                      src="/assets/images/mai-chau-moc-chau6.jpg"
                      alt="Mai Châu - Mộc Châu"
                      width={322}
                      height={555}
                      layout="responsive"
                    />
                  </figure>
                  <div className="meta-cat bg-meta-cat">
                    <Link href="https://bookingtour.vn/destination/mai-chau-moc-chau.html">
                      Mai Châu - Mộc Châu
                    </Link>
                  </div>
                  <div className="desti-content">
                    <h3>
                      <Link href="https://bookingtour.vn/destination/mai-chau-moc-chau.html">
                        Du lịch Mai Châu - Mộc Châu 2024: Khám Phá Vẻ Đẹp Mộc Mạc và Thơ Mộng
                      </Link>
                    </h3>
                    <div className="rating-start" title="Rated 5 out of 4">
                      <span style={{ width: "95%" }}></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="desti-item overlay-desti-item">
                  <figure className="desti-image">
                    <Image
                      src="/assets/images/nhat-ban1.jpg"
                      alt="Nhật Bản"
                      width={322}
                      height={555}
                      layout="responsive"
                    />
                  </figure>
                  <div className="meta-cat bg-meta-cat">
                    <Link href="https://bookingtour.vn/destination/nhat-ban.html">
                      Nhật Bản
                    </Link>
                  </div>
                  <div className="desti-content">
                    <h3>
                      <Link href="https://bookingtour.vn/destination/nhat-ban.html">
                        Tour du lịch Nhật Bản 2024
                      </Link>
                    </h3>
                    <div className="rating-start" title="Rated 5 out of 4">
                      <span style={{ width: "95%" }}></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="row">
              <div className="col-md-6 col-xl-12">
                <div className="desti-item overlay-desti-item">
                  <figure className="desti-image">
                    <Image
                      src="/assets/images/trung-quoc3.jpg"
                      alt="Trung Quốc"
                      width={460}
                      height={255}
                      layout="responsive"
                    />
                  </figure>
                  <div className="meta-cat bg-meta-cat">
                    <Link href="https://bookingtour.vn/destination/trung-quoc.html">
                      Trung Quốc
                    </Link>
                  </div>
                  <div className="desti-content">
                    <h3>
                      <Link href="https://bookingtour.vn/destination/trung-quoc.html">
                        Tour Du Lịch Trung Quốc: Khám Phá Đất Nước Hùng Vĩ
                      </Link>
                    </h3>
                    <div className="rating-start" title="Rated 5 out of 5">
                      <span style={{ width: "100%" }}></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-12">
                <div className="desti-item overlay-desti-item">
                  <figure className="desti-image">
                    <Image
                      src="/assets/images/dubai7.jpg"
                      alt="Dubai"
                      width={460}
                      height={255}
                      layout="responsive"
                    />
                  </figure>
                  <div className="meta-cat bg-meta-cat">
                    <Link href="https://bookingtour.vn/destination/dubai.html">
                      DUBAI
                    </Link>
                  </div>
                  <div className="desti-content">
                    <h3>
                      <Link href="https://bookingtour.vn/destination/dubai.html">
                        TOUR DU LỊCH DUBAI
                      </Link>
                    </h3>
                    <div className="rating-start" title="Rated 5 out of 5">
                      <span style={{ width: "100%" }}></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-5">
            <div className="row">
              <div className="col-md-6 col-xl-12">
                <div className="desti-item overlay-desti-item">
                  <figure className="desti-image">
                    <Image
                      src="/assets/images/han-quoc7.jpg"
                      alt="Hàn Quốc"
                      width={460}
                      height={255}
                      layout="responsive"
                    />
                  </figure>
                  <div className="meta-cat bg-meta-cat">
                    <Link href="https://bookingtour.vn/destination/han-quoc.html">
                      Hàn Quốc
                    </Link>
                  </div>
                  <div className="desti-content">
                    <h3>
                      <Link href="https://bookingtour.vn/destination/han-quoc.html">
                        {/* Add title if needed */}
                      </Link>
                    </h3>
                    <div className="rating-start" title="Rated 5 out of 5">
                      <span style={{ width: "100%" }}></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-12">
                <div className="desti-item overlay-desti-item">
                  <figure className="desti-image">
                    <Image
                      src="/assets/images/thai-lan2.jpg"
                      alt="Thái Lan"
                      width={460}
                      height={255}
                      layout="responsive"
                    />
                  </figure>
                  <div className="meta-cat bg-meta-cat">
                    <Link href="https://bookingtour.vn/destination/thai-lan.html">
                      Thái Lan
                    </Link>
                  </div>
                  <div className="desti-content">
                    <h3>
                      <Link href="https://bookingtour.vn/destination/thai-lan.html">
                        TOUR DU LỊCH THÁI LAN
                      </Link>
                    </h3>
                    <div className="rating-start" title="Rated 5 out of 5">
                      <span style={{ width: "100%" }}></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="row">
              <div className="col-sm-6">
                <div className="desti-item overlay-desti-item">
                  <figure className="desti-image">
                    <Image
                      src="/assets/images/dai-loan1.jpg"
                      alt="Đài Loan"
                      width={322}
                      height={555}
                      layout="responsive"
                    />
                  </figure>
                  <div className="meta-cat bg-meta-cat">
                    <Link href="https://bookingtour.vn/destination/dai-loan.html">
                      Đài Loan
                    </Link>
                  </div>
                  <div className="desti-content">
                    <h3>
                      <Link href="https://bookingtour.vn/destination/dai-loan.html">
                        {/* Add title if needed */}
                      </Link>
                    </h3>
                    <div className="rating-start" title="Rated 5 out of 4">
                      <span style={{ width: "95%" }}></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="desti-item overlay-desti-item">
                  <figure className="desti-image">
                    <Image
                      src="/assets/images/ninh-thuan1.jpg"
                      alt="Ninh Thuận"
                      width={322}
                      height={555}
                      layout="responsive"
                    />
                  </figure>
                  <div className="meta-cat bg-meta-cat">
                    <Link href="https://bookingtour.vn/destination/ninh-thuan.html">
                      Ninh Thuận
                    </Link>
                  </div>
                  <div className="desti-content">
                    <h3>
                      <Link href="https://bookingtour.vn/destination/ninh-thuan.html">
                        Tour Ninh Thuận
                      </Link>
                    </h3>
                    <div className="rating-start" title="Rated 5 out of 4">
                      <span style={{ width: "95%" }}></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add remaining rows as needed */}
      </div>
    </section>
    
    </>
  );
};

export default DestinationSection;