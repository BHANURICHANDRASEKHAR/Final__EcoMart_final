import React, { useState } from 'react'
import { Popconfirm } from 'antd';
import Cartbutton1 from './Cartbutton1'; //increment and dec button
import reacticons from '../../icons';
import Loader from '../../Loader';
import './cart1.css'
export default function CartItems({ item, confirm }) {
  const [loader,setloader]=useState(false)
    return (
      <table className='table cart-table mb-0 table-responsive-sm'>
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th className='text-right'><span id="amount" className='amount'>Total Amount</span></th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {item.map((data) => {
            const { productname, quantity, price, productimg, id } = data;
  
            return (
              <React.Fragment key={id}>
                <tr>
                  <td><div className='product-img'><img src={productimg} alt="" /></div></td>
                  <td><div className='product-name'><p>{productname} Per-500 Grams</p></div></td>
                  <td>{price}</td>
                  <td>
                    <Cartbutton1 item={data} />
                  </td>
                  <td className='text-right'>₹ {price * quantity}</td>
                  <td>
                  {loader&&<Loader/>}
                    <Popconfirm
                      title="Delete the Item"
                      description="Are you sure to delete this Item?"
                      onConfirm={() => { confirm(id,setloader) }}
                      style={{ width: '100px' }}
                      okText="Yes"
                      cancelText="No"
                      placement="leftBottom"
                    >
                      <reacticons.delete style={{ height: '30px', width: '40px', cursor: 'pointer' }} />
                    </Popconfirm>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    );
  }
  