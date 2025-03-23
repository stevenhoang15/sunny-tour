"use client";

import React from "react";

interface BlogPost {
  title: string;
  image: string;
  link: string;
  author: string;
  date: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Top 5 Công Viên Giải Trí Hàng Đầu Singapore: Trải Nghiệm Đỉnh Cao Cho Mọi Lứa Tuổi",
    image: "https://cdn.bookingtour.vn/thumb_x365x305/upload/2025/02/26/top-5-cong-vien-giai-tri-hang-dau-singapore-trai-nghiem-dinh-cao-cho-moi-lua-tuoi1.png",
    link: "https://bookingtour.vn/blog/top-5-cong-vien-giai-tri-hang-dau-singapore-trai-nghiem-dinh-cao-cho-moi-lua-tuoi.html",
    author: "Lê Thanh Thảo",
    date: "26/02/25",
  },
  {
    title: "Khám Phá 4 Làng Chài Hạ Long Yên Bình Và Hút Du Khách Với Những Trải Nghiệm Đặc Sắc",
    image: "https://cdn.bookingtour.vn/thumb_x365x305/upload/2025/02/26/kham-pha-4-lang-chai-ha-long-yen-binh-va-hut-du-khach-voi-nhung-trai-nghiem-dac-sac6.jpg",
    link: "https://bookingtour.vn/blog/kham-pha-4-lang-chai-ha-long-yen-binh-va-hut-du-khach-voi-nhung-trai-nghiem-dac-sac.html",
    author: "Lê Thanh Thảo",
    date: "26/02/25",
  },
  {
    title: "Sân Bay Changi Singapore: Thiên Đường Hàng Không Quốc Tế và Trải Nghiệm Tuyệt Vời Cho Du Khách",
    image: "https://cdn.bookingtour.vn/thumb_x365x305/upload/2025/02/26/san-bay-changi-singapore-thien-duong-hang-khong-quoc-te-va-trai-nghiem-tuyet-voi-cho-du-khach8.png",
    link: "https://bookingtour.vn/blog/san-bay-changi-singapore-thien-duong-hang-khong-quoc-te-va-trai-nghiem-tuyet-voi-cho-du-khach.html",
    author: "Lê Thanh Thảo",
    date: "26/02/25",
  },
];

const BlogSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Tiêu đề */}
        <div className="text-center mb-10">
          <h5 className="text-yellow-500 uppercase font-semibold tracking-wider">
            FROM OUR BLOG
          </h5>
          <h2 className="text-3xl font-bold">CHIA SẺ GẦN ĐÂY</h2>
          <p className="mt-2 text-gray-600">
            Những kinh nghiệm thú vị về du lịch được chia sẻ ở đây.
          </p>
        </div>

        {/* Danh sách bài viết */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <figure className="relative">
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />
                </a>
              </figure>
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2">
                  <a href={post.link} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 transition">
                    {post.title}
                  </a>
                </h3>
                <div className="text-sm text-gray-500">
                  <span className="mr-2">✍ {post.author}</span>
                  <span>📅 {post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
