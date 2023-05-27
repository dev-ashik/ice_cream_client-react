import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const faq_data = [
  {
    id: 1,
    question: "What are your hours of operation?",
    ans: "Our hours of operation are [insert hours here].",
  },
  {
    id: 2,
    question: "What types of ice cream do you offer?",
    ans: "We offer a variety of flavors, including chocolate, vanilla, strawberry, mint chocolate chip, cookies and cream, and many more.",
  },
  {
    id: 3,
    question: "Do you offer any non-dairy or vegan options?",
    ans: "Yes, we offer non-dairy and vegan options such as sorbet and coconut milk-based ice creams.",
  },
  {
    id: 4,
    question: "Do you offer any gluten-free options?",
    ans: "Yes, we have gluten-free options available. Please ask our staff for more information.",
  },
  {
    id: 5,
    question: "Do you offer any toppings or mix-ins?",
    ans: "Yes, we offer a variety of toppings and mix-ins such as sprinkles, hot fudge, caramel sauce, nuts, and fruit.",
  },
  {
    id: 6,
    question: " Can I place an order for a special occasion or event?",
    ans: "Yes, we offer catering services for special occasions and events. Please contact us for more information.",
  },
  {
    id: 7,
    question: "Do you offer any discounts or loyalty programs?",
    ans: "Yes, we offer loyalty programs and occasional discounts. Please ask our staff for more information.",
  },
  {
    id: 8,
    question: "Do you have seating available for customers?",
    ans: "Yes, we have indoor and outdoor seating available.",
  },
  {
    id: 9,
    question: "o you offer any sugar-free options?",
    ans: "Yes, we have sugar-free options available. Please ask our staff for more information.",
  },
  {
    id: 10,
    question: "Do you offer any fundraising opportunities?",
    ans: "Yes, we offer fundraising opportunities for local schools and organizations. Please contact us for more information.",
  },
];

const Faq = () => {
  return (
    <Layout>
      <div className="" style={{ maxWidth: "40rem", margin: "0 auto" }}>
        {faq_data.map((data) => (
          <div>
            <QuestionSection data={data}/>
          </div>
        ))}
      </div>
    </Layout>
  );
};

const QuestionSection = ({data}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="eachQuestion_section">
      <div className="eachQuestion_section-close">{showAnswer ? <AiOutlineMinus /> : <AiOutlinePlus />}</div>
      <div>
        <p>Q. {data.question}</p>
        <p>A. {data.ans}</p>
      </div>
    </div>
  );
};

export default Faq;
