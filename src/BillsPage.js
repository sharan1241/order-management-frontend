import DefaultLayout from './DefaultLayout'
import React,{useEffect,useState,useRef} from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {EyeOutlined} from '@ant-design/icons'
import { Button, Table, Modal, Form, Input, Select,message } from 'antd';
import "./InvoiceStyles.css";

const BillsPage = () => {
    const componentRef = useRef();

    const dispatch = useDispatch()
  const [billsData, setBillsData] = useState([]);
  const [popupModal,setPopupModal] = useState(false)
  const [selectedBill,setSelectedBill] = useState(null)
  const getAllBills = async () => {
    try {
      dispatch({
        type:'SHOW_LOADING'
      })
      const { data } = await axios.get("https://order-management-backend-lge7.onrender.com/api/bills/get-bills");
      setBillsData(data);
      dispatch({type:'HIDE_LOADING'})
      console.log(data);
    } catch (error) {
      dispatch({type:'HIDE_LOADING'})
      console.log(error);
    }
  };
  useEffect(() => {
    
    getAllBills();
  }, []);

  const columns = [
    {title:'ID ',dataIndex:'_id'},
    {title:'Customer Name',dataIndex:'customerName'},
    {title:"Contact No",dataIndex:"customerNumber"},
    {title:"Subtotal",dataIndex:"subTotal"},
    {title:"Tax",dataIndex:"tax"},
    {title:"Total Amount",dataIndex:"totalAmount"},
    
    
    {title:'Actions',dataIndex:"_id",render:(id,record)=>(
    <div> 
        <EyeOutlined style={{cursor:'pointer'}}
        onClick={()=>{
            setSelectedBill(record)
            setPopupModal(true)
        }}
        />
    </div>
    )
  }
]

  return (
    <DefaultLayout>
      <div className='d-flex justify-content-between'>
        <h1>Invoice List</h1>
        
      </div>
        <Table columns={columns} dataSource={billsData} bordered/>
        {
          popupModal && (
            <Modal title="Invoice Details" visible={popupModal} onCancel={()=>
            {
              
              setPopupModal(false)
            }
            } footer={false}>
            <div id="invoice-POS" ref={componentRef}>
            <center id="top">
              <div className="logo" />
              <div className="info">
                <h2>Swiggy</h2>
                <p> Contact : 123456 | Chennai TamilNadu</p>
              </div>
              {/*End Info*/}
            </center>
            {/*End InvoiceTop*/}
            <div id="mid">
              <div className="mt-2">
                <p>
                  Customer Name : <b>{selectedBill.customerName}</b>
                  <br />
                  Phone No : <b>{selectedBill.customerNumber}</b>
                  <br />
                </p>
                <hr style={{ margin: "5px" }} />
              </div>
            </div>
            {/*End Invoice Mid*/}
            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item">
                        <h2>Item</h2>
                      </td>
                      <td className="Hours">
                        <h2>Qty</h2>
                      </td>
                      <td className="Rate">
                        <h2>Price</h2>
                      </td>
                      <td className="Rate">
                        <h2>Total</h2>
                      </td>
                    </tr>
                    {selectedBill.cartItems.map((item) => (
                      <>
                        <tr className="service">
                          <td className="tableitem">
                            <p className="itemtext">{item.name}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.quantity}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.price}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">
                              {item.quantity * item.price}
                            </p>
                          </td>
                        </tr>
                      </>
                    ))}

                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>tax</h2>
                      </td>
                      <td className="payment">
                        <h2>Rs{selectedBill.tax}</h2>
                      </td>
                    </tr>
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>Grand Total</h2>
                      </td>
                      <td className="payment">
                        <h2>
                          <b>Rs{selectedBill.totalAmount}</b>
                        </h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/*End Table*/}
              <div id="legalcopy">
                <p className="legal">
                  <strong>Thank you for your order!</strong> 10% GST application
                  on total amount.Please note that this is non refundable amount
                  for any assistance please write email
                  <b> help@mydomain.com</b>
                </p>
              </div>
            </div>
            {/*End InvoiceBot*/}
          </div>
          {/*End Invoice*/}
          <div className="d-flex justify-content-end mt-3">
            
          </div>
        
      </Modal>
          )
        } 
    </DefaultLayout>
  )
}

export default BillsPage