import React from 'react';
import Layout from '../components/Layout/Layout';
import contact_img from '../assets/contact_img.jpg';
import { MdEmail } from 'react-icons/md';
import { AiFillPhone } from 'react-icons/ai';

const Contact = () => {
  return (
    <Layout title={'contact shoppingDotCom'}>
      <div className='contact_page'>
        <h4 className='header_text'>Contact with Us</h4>
        <div className='contact_image'>
          <img src={contact_img} alt="" />
        </div>
        <div className='mt-4'>
          <h5>any quey and info about product feel free to call anytime we 24X7 vaialible</h5>
          <p><MdEmail/> www.help@commerceapp.com</p>
          <p><AiFillPhone/> +34 000 2223 444</p>
          <p><AiFillPhone/> 234-0000-000(toll free)</p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact