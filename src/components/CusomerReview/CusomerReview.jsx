import React from "react";
import "./CusomerReview.css";
import { AiTwotoneStar } from "react-icons/ai";
import { profile_1, profile_2, profile_3 } from "../../assets";

const review_data = [
  {
    id: 1,
    img: profile_1,
    name: "Jhon Doe",
    review:
      "Ice cream is a frozen dessert that is beloved by people all over the world. It is made by blending milk, cream, sugar, and other ingredients together, then freezing the mixture until it solidifies.",
    stars: 5,
  },
  {
    id: 1,
    img: profile_2,
    name: "Karina Kapur",
    review:
      "There are countless variations of ice cream, ranging from classic flavors like vanilla and chocolate to more adventurous options like mint chocolate chip, rocky road, and strawberry cheesecake.",
    stars: 5,
  },
  {
    id: 1,
    img: profile_3,
    name: "Saruk Khan",
    review:
      "One of the things that makes ice cream so enjoyable is its creamy texture, which melts in your mouth and provides a satisfying contrast to the cold temperature.",
    stars: 5,
  },
];

const CusomerReview = () => {
  return (
    <div className="customer_review">
      <h4 className="text-center header_text">WHAT OUR CLIENTS SAYS</h4>
      <div className="review_card-section">
        {review_data.map((re) => (
          <div className="review_card">
            <img src={re.img} alt="ice cream photo" />
            <div className="review_card-body">
              <h2 className="review_header">{re.name}</h2>

              <p className="card-text">{re.review}</p>

              <div className="star_container">
                <AiTwotoneStar />
                <AiTwotoneStar />
                <AiTwotoneStar />
                <AiTwotoneStar />
                <AiTwotoneStar />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CusomerReview;
