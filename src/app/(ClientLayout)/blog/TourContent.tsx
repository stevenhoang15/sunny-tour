"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const TourContent: React.FC = () => {
  return (
    <div>
      <div
        className="grid-item col-md-6"
        style={{ position: "absolute", left: "0px", top: "0px" }}
      >
        <article className="post">
          <figure className="feature-image">
            <Link href="/blog/ve-dep-pho-co-hong-nhai-dong-trung-khanh-diem-den-ly-tuong-de-thuong-thuc-ve-dep-lich-su-va-van-hoa">
              <Image
                src="/iamges/thai-lan2.jpg"
                alt=""
                width={100}
                height={100}
              />
            </Link>
          </figure>
          <div className="entry-content">
            <h3>
              <Link href="/blog/ve-dep-pho-co-hong-nhai-dong-trung-khanh-diem-den-ly-tuong-de-thuong-thuc-ve-dep-lich-su-va-van-hoa">
                Vẻ Đẹp Phố Cổ Hồng Nhai Động Trùng Khánh – Điểm Đến Lý Tưởng Để Thưởng Thức
                Vẻ Đẹp Lịch Sử Và Văn Hóa
              </Link>
            </h3>
            <div className="entry-meta">
              <span className="byline">
                <Link href="/author/le-thanh-thao">Lê Thanh Thảo</Link>
              </span>
              <span className="posted-on">
                <Link href="/date/03-08-2025">03/08/2025</Link>
              </span>
            </div>
            <p>
              Nếu bạn đang tìm kiếm một điểm đến vừa đầy vẻ đẹp lịch sử, vừa nhộn nhịp và sống
              động, thì phố cổ Hồng Nhai Động tại Trùng Khánh chính là một lựa chọn tuyệt vời.
              Nằm bên sông Jialing, khu phố này không chỉ là một nơi lưu giữ những giá trị văn hóa
              đặc sắc mà còn là một khu vực sôi động về đêm với ánh đèn lung linh và không khí ấm
              cúng. BookingTour sẽ giúp bạn khám phá tất cả những điều thú vị và độc đáo nhất tại
              phố cổ Hồng Nhai Động
            </p>
            <Link
              href="/blog/ve-dep-pho-co-hong-nhai-dong-trung-khanh-diem-den-ly-tuong-de-thuong-thuc-ve-dep-lich-su-va-van-hoa"
              className="button-text"
            >
              ĐỌC TIẾP..
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default TourContent;