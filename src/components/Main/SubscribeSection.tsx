"use client";

import { useState } from "react";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Cảm ơn bạn đã đăng ký: ${email}`);
    setEmail("");
  };

  return (
    <section
      className="subscribe-section bg-cover bg-center py-20 text-white"
      style={{
        backgroundImage:
          "url(https://cdn.bookingtour.vn/upload/thanhthao/2024/09/19/61-23562.jpg)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h5 className="text-lg uppercase tracking-widest text-yellow-300">
            CƠ HỘI GIẢM GIÁ TỚI 50% !
          </h5>
          <h4 className="text-3xl font-bold mt-2">
            Hãy đăng ký để nhận ưu đãi bí mật từ BookingTour nhé!!
          </h4>
          <form onSubmit={handleSubmit} className="mt-6 flex">
            <input
              type="email"
              name="email"
              placeholder="Điền số điện thoại hoặc email của bạn..."
              className="p-3 w-full text-black rounded-l-md focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-yellow-500 px-6 py-3 rounded-r-md text-black font-bold hover:bg-yellow-400 transition"
            >
              ĐĂNG KÝ NGAY!
            </button>
          </form>
          <p className="mt-4 text-sm">
            BookingTour luôn có chương trình ưu đãi ĐẶC BIỆT cho các thành viên.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
