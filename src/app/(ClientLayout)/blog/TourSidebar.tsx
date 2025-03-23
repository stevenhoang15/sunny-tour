import React from 'react';
import Image from 'next/image'; // Sử dụng Image component từ Next.js cho tối ưu hình ảnh
import Link from 'next/link';
import styles from './TourSidebar.module.css'; // Giả sử bạn sẽ tạo file CSS module

interface Tour {
  title: string;
  link: string;
  imageSrc: string;
  imageAlt: string;
  originalPrice: string;
  discountedPrice: string;
}

const tours: Tour[] = [
  {
    title: "Tour du lịch Hà Nội - Thành Đô - Cửu Trại Câu 6 ngày 5 đêm",
    link: "/tour/tour-du-lich-ha-noi-thanh-do-cuu-trai-cau-6-ngay-5-dem.html",
    imageSrc: "/images/tour/tour-du-lich-ha-noi-thanh-do-cuu-trai-cau-6-ngay-5-dem10.jpg",
    imageAlt: "Tour du lịch Hà Nội - Thành Đô - Cửu Trại Câu 6 ngày 5 đêm",
    originalPrice: "19,990,000đ",
    discountedPrice: "17,990,000đ",
  },
  {
    title: "Tour du lịch TP. Hồ Chí Minh - Bắc Kinh 4 ngày 3 đêm",
    link: "/tour/tour-du-lich-ha-noi-thanh-do-cuu-trai-cau-6-ngay-5-dem.html",
    imageSrc: "/images/tour/tour-du-lich-ha-noi-thanh-do-cuu-trai-cau-6-ngay-5-dem10.jpg",
    imageAlt: "Tour du lịch TP. Hồ Chí Minh - Bắc Kinh 4 ngày 3 đêm",
    originalPrice: "14,390,000đ",
    discountedPrice: "12,990,000đ",
  },
  {
    title: "Tour du lịch Hà Nội - Hạ Long 2 ngày 1 đêm",
    link: "/tour/tour-du-lich-ha-noi-thanh-do-cuu-trai-cau-6-ngay-5-dem.html",
    imageSrc: "/images/tour/tour-du-lich-ha-noi-thanh-do-cuu-trai-cau-6-ngay-5-dem10.jpg",
    imageAlt: "Tour du lịch Hà Nội - Hạ Long 2 ngày 1 đêm",
    originalPrice: "2,390,000đ",
    discountedPrice: "1,950,000đ",
  },
];

const TourSidebar: React.FC = () => {
  return (
    <div className="col-lg-4 secondary">
      <div className={styles.sidebar}>
        <aside className={`${styles.widget} widget_latest_post widget-post-thumb`}>
          <h3 className={styles.widgetTitle}>TOUR BOOKING</h3>
          <ul className={styles.tourList}>
            {tours.map((tour, index) => (
              <li key={index} className={styles.tourItem}>
                <figure className={styles.postThumb}>
                  <Link href={tour.link}>
                    <Image
                      src={tour.imageSrc}
                      alt={tour.imageAlt}
                      width={365}
                      height={305}
                      className={styles.tourImage}
                    />
                  </Link>
                </figure>
                <div className={styles.postContent}>
                  <h5 className={styles.tourTitle}>
                    <Link href={tour.link}>{tour.title}</Link>
                  </h5>
                  <div className={styles.packagePrice}>
                    Giá: <del>{tour.originalPrice}</del>{' '}
                    <ins>{tour.discountedPrice}</ins>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default TourSidebar;