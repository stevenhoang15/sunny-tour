// components/Tour/TourReviews.tsx
import React from 'react';

type Review = {
  author: string;
  content: string;
  rating: number;
};

const TourReviews: React.FC = () => {
  const reviews: Review[] = [
    {
      author: 'Chị Lan (Hà Nội)',
      content: 'Chuyến đi thật tuyệt vời! Chúng tôi đã có cơ hội tham quan những địa điểm nổi tiếng...',
      rating: 5,
    },
    // Add other reviews
  ];

  return (
    <div className="tab-pane" id="review" role="tabpanel">
      <div className="summary-review flex items-center">
        <div className="review-score text-3xl font-bold">4.9</div>
        <div className="review-score-content ml-4">
          <h3>Excellent <span>(Based on 10 reviews)</span></h3>
          <p>Các đánh giá được tính toán dựa vào các nhận xét</p>
        </div>
      </div>
      <div className="comment-area mt-4">
        <h3 className="comment-title">3 Reviews</h3>
        <ol className="space-y-4">
          {reviews.map((review, index) => (
            <li key={index} className="flex">
              <figure className="comment-thumb w-16 h-16">
                <img src="/images/img22.jpg" alt={review.author} className="rounded-full" />
              </figure>
              <div className="comment-content ml-4">
                <div className="comment-header flex justify-between">
                  <h5 className="author-name">{review.author}</h5>
                  <div className="rating-wrap">Rating: {review.rating}/5</div>
                </div>
                <p>{review.content}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TourReviews;