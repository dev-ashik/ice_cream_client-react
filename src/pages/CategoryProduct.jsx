import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const param = useParams();

    const getProduct = async () => {
        try {
            const {data} = await axios.get(`https://shopping-dot-com-server.onrender.com/api/v1/product/product-category/${param.slug}`)

            setProducts(data?.products);
            setCategory(data.category)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getProduct();
    }, [param.slug])
    // console.log(products, category)
  return (
    <Layout>
        <div className="container">
            <h4>Category: {category.name}</h4>
            <div className="row row-cols-1 row-cols-md-3 g-4">
            {products.length < 1 && <h5>loading...</h5>}

            {products?.map(({ _id, name, description, price, slug }) => (
              <div className="col" key={_id}>
                <div className="card h-100">
                  <img
                    src={`https://shopping-dot-com-server.onrender.com/api/v1/product/product-photo/${_id}`}
                    className="card-img-top"
                    alt="product image"
                    style={{
                      height: "200px",
                      objectFit: "contain",
                      backgroundImage:
                        "linear-gradient(120deg, #d6e6ff 0%, #cfeffd 100%)",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{name}</h5>

                    {description.length > 30 ? (
                      <p className="card-text">
                        {description.substring(0, 70)}...
                      </p>
                    ) : (
                      <p className="card-text">{description}</p>
                    )}

                    <p>${price}</p>
                  </div>
                  <div className="card-footer">
                    <small className="text-body-secondary">
                      <Link to={`/product/${slug}`} className="btn btn-primary me-3" >see more</Link>
                      <button className="btn btn-primary">add to cart</button>
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </Layout>
  )
}

export default CategoryProduct