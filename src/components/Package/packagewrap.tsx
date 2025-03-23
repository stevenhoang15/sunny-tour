"use client";

import Link from "next/link";
import Image from "next/image";
import { Col } from "antd";
import { FaClock, FaUserFriends, FaMapMarkerAlt, FaArrowRight, FaHeart } from "react-icons/fa";
import { BiStar } from "react-icons/bi";

const PackageWrap = () => {
  return (
   <Col xs={24} sm={14} md={12} lg={8}>
   <div className="package-wrap">
     {/* Hình ảnh */}
     <figure className="feature-image">
       <Link href="/tour/123">
         <Image
           src="/images/chuyen-du-lich-bac-ninh-singapore-4-ngay-3-dem5.jpg"
           alt="Chuyến Du Lịch Bắc Ninh - Singapore"
           width={365}
           height={305}
           className="w-full h-auto object-cover"
         />
       </Link>
     </figure>

     {/* Giá */}
     <div className="package-price">
       <h6>
         <span>11,490,000₫</span> / người
       </h6>
     </div>

     {/* Nội dung */}
     <div className="package-content-wrap">
       {/* Meta Info */}
       <div className="package-meta text-center">
         <ul>
           <li>
             <FaClock /> 4N/3Đ
           </li>
           <li>
             <FaUserFriends />
           </li>
           <li>
             <FaMapMarkerAlt />
             <Link href="https://bookingtour.vn/destination/singapore.html" className="text-white">
               Singapore
             </Link>
           </li>
         </ul>
       </div>

       {/* Chi tiết Tour */}
       <div className="package-content">
         <h3>
           <Link href="https://bookingtour.vn/tour/chuyen-du-lich-bac-ninh-singapore-4-ngay-3-dem.html">
             Chuyến Du Lịch Bắc Ninh - Singapore 4 Ngày 3 Đêm
           </Link>
         </h3>

         <div className="review-area">
           <span className="review-text">Điểm khởi hành: Bắc Ninh</span>
           <div className="rating-start-event" title="Rated 5 out of 5">
               <span>
                  <BiStar />
                  <BiStar />  
                  <BiStar />
                  <BiStar />
                  <BiStar />
               </span>
           </div>
         </div>

         {/* Nút Book */}
         <div className="btn-wrap">
           <Link href="https://bookingtour.vn/tour/chuyen-du-lich-bac-ninh-singapore-4-ngay-3-dem.html" className="button-text width-6 button-home">
             Book Now <FaArrowRight />
           </Link>
           <Link href="#" className="button-text width-6 button-home">
             Wish List <FaHeart />
           </Link>
         </div>
       </div>
     </div>
   </div>
 </Col>
  );
};

export default PackageWrap;
