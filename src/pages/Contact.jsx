import React from 'react';
import Layout from '../components/Layout/Layout';
import contact_img from '../assets/contact_img.jpg';

const Contact = () => {
  return (
    <Layout title={'contact shoppingDotCom'}>
      <div>
        <div className='contact_image'>
          <img src={contact_img} alt="" />
        </div>
        <div>
          <button>Contact US</button>
          <p>any quey and info about product feel free to call anytime we 24X7 vaialible</p>
          <p>www.help@commerceapp.com</p>
          <p>+34 000 2223 444</p>
          <p>234-0000-000(toll free)</p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact