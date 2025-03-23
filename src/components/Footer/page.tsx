"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm">
      {/* Top Footer */}
      <div className="container mx-auto py-10 px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg text-white font-bold mb-4">About BookingTour.vn</h3>
            <p className="mb-4">
              Địa chỉ: Tòa nhà Tuấn Hạnh, Số 82, Ngõ 116, Phố Nhân Hòa, Phường Nhân Chính, Quận Thanh Xuân, Hà Nội, Việt Nam.
            </p>
            <div className="flex gap-2">
              <a href="#"><img src="https://bookingtour.vn/templates/themes/images/logo6.png" alt="Logo 1" className="w-16" /></a>
              <a href="#"><img src="https://bookingtour.vn/templates/themes/images/logo2.png" alt="Logo 2" className="w-16" /></a>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg text-white font-bold mb-4">CONTACT INFORMATION</h3>
            <ul>
              <li className="mb-2 flex items-center">
                <i className="fas fa-phone-alt mr-2"></i> <a href="tel:0888822368">0888822368</a>
              </li>
              <li className="mb-2 flex items-center">
                <i className="fas fa-envelope mr-2"></i> <a href="mailto:bookingtour@gmail.com">bookingtour@gmail.com</a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i> Số 25 Ngõ Thái Hà, Hà Nội
              </li>
            </ul>
          </div>

          {/* Latest Posts */}
          <div>
            <h3 className="text-lg text-white font-bold mb-4">Latest Post</h3>
            <ul>
              <li className="mb-3">
                <a href="https://bookingtour.vn/blog/5-diem-den-mua-thu-dep-nhu-tranh-ve-khong-the-bo-qua-o-viet-nam.html" className="text-gray-300 hover:text-yellow-400">
                  5 điểm đến mùa thu đẹp như tranh vẽ không thể bỏ qua ở Việt Nam
                </a>
                <p className="text-xs text-gray-500">August 17, 2024</p>
              </li>
              <li>
                <a href="https://bookingtour.vn/blog/nhung-le-hoi-doc-dao-ma-ban-khong-nen-bo-lo-khi-di-du-lich-nhat-ban.html" className="text-gray-300 hover:text-yellow-400">
                  7 lễ hội độc đáo mà bạn không nên bỏ lỡ khi đi du lịch Nhật Bản
                </a>
                <p className="text-xs text-gray-500">August 19, 2024</p>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="text-lg text-white font-bold mb-4">SUBSCRIBE US</h3>
            <p className="mb-4">Để lại email để BOOKINGTOUR gửi bạn thông tin TOUR sớm nhất!</p>
            <form className="flex">
              <input
                type="email"
                name="s"
                placeholder="Your Email..."
                className="p-2 w-full rounded-l bg-gray-800 border border-gray-600 text-white"
              />
              <button type="submit" className="bg-yellow-500 text-black px-4 rounded-r">SUBSCRIBE</button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <ul className="flex gap-4 mb-2 md:mb-0">
            <li><a href="https://bookingtour.vn/blog/dieu-khoan-su-dung.html" className="hover:text-yellow-400">CÁC ĐIỀU KIỆN & ĐIỀU KHOẢN</a></li>
            <li><a href="https://bookingtour.vn/blog/chinh-sach-bao-mat.html" className="hover:text-yellow-400">Chính sách bảo mật</a></li>
            <li><a href="https://bookingtour.vn/blog/gioi-thieu-du-an-bookingtour.html" className="hover:text-yellow-400">Giới thiệu BookingTour</a></li>
          </ul>
          <a href="#"><img src="https://bookingtour.vn/templates/themes/images/logo_footer_bookingtour.vn.png" alt="Logo" className="w-24" /></a>
          <p className="text-xs text-gray-500">Copyright © 2024 BookingTour. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
