import React from "react";
import Layout from "../components/Layout/Layout";
import contact_img from "../assets/contact_img.jpg";

const Policy = () => {
  return (
    <Layout title={'apolicy'}>
      <div className="mt-5 d-flex flex-column">
        <div className="contact_image">
          <img src={contact_img} alt="" />
        </div>
        <div style={{maxWidth: "50rem", margin: "40px auto"}}>
          <p><strong>Refund Policy:</strong> This policy outlines the conditions under which the shop will issue refunds. For example, if a customer is not satisfied with the quality of the ice cream or if there was an error in the order.</p>
          <p><strong>Allergen Policy:</strong> This policy is important to let customers know about the presence of allergens in the ice cream or any other products offered by the shop. The policy should outline the types of allergens present and the steps taken by the shop to avoid cross-contamination.</p>
          <p><strong>Privacy Policy:</strong> This policy describes how the shop collects, uses, and protects the personal information of its customers. It should outline the types of information collected, how it is used, and how it is shared with third parties.</p>
          <p><strong>Social Media Policy:</strong> This policy outlines how the shop uses social media to communicate with its customers. It should describe the types of content that are acceptable and unacceptable and the consequences for violating the policy.</p>
          <p><strong>Payment Policy:</strong> This policy outlines the accepted methods of payment, such as cash, credit cards, or digital wallets. It should also specify the time frame for payment, such as immediate payment or payment on delivery.</p>
          <p><strong>Returns and Exchanges Policy:</strong> This policy outlines the conditions under which the shop will accept returns or exchanges. For example, if the customer received the wrong flavor or if there was a defect in the product.</p>
          <p><strong>Customer Service Policy:</strong> This policy describes how the shop handles customer service issues, such as complaints or feedback. It should outline the steps taken by the shop to resolve customer concerns and the timeframe for resolution.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
