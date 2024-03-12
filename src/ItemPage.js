import React,{useEffect,useState} from 'react'
import DefaultLayout from './DefaultLayout'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {DeleteOutlined,EditOutlined} from '@ant-design/icons'
import { Button, Table, Modal, Form, Input, Select,message } from 'antd';


const ItemPage = () => {
  const dispatch = useDispatch()
  const [itemsData, setItemsData] = useState([]);
  const [popupModal,setPopupModal] = useState(false)
  const [editItem,setEditItem] = useState(null)
  const getAllItems = async () => {
    try {
      dispatch({
        type:'SHOW_LOADING'
      })
      const { data } = await axios.get("https://order-management-backend-lge7.onrender.com/api/items/get-item");
      setItemsData(data);
      dispatch({type:'HIDE_LOADING'})
      console.log(data);
    } catch (error) {
      dispatch({type:'HIDE_LOADING'})
      console.log(error);
    }
  };
  useEffect(() => {
    
    getAllItems();
  }, []);

  const handleDelete=async(record)=>{
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post("https://order-management-backend-lge7.onrender.com/api/items/delete-item", {itemId:record._id});
      message.success("Item deleted Succesfully");
      getAllItems();
      setPopupModal(false);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something Went Wrong");
      console.log(error);
    }
  }

  const columns = [
    {title:'Name',dataIndex:'name'},
    {title:'Image',dataIndex:'image',
    render:(image,record)=><img src={image} alt={record.name} height='60' width='60'/>},
    {title:"Price",dataIndex:"price"},
    
    {title:'Actions',dataIndex:"_id",render:(id,record)=>
    <div><DeleteOutlined style={{cursor:"pointer"}} onClick={()=>{handleDelete(record)}} /> <EditOutlined style={{cursor:"pointer"}} onClick={()=>{setEditItem(record);
    setPopupModal(true)
    }}/></div>
  }
]

const handleSubmit = async (value) => {
  if (editItem === null) {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const res = await axios.post("https://order-management-backend-lge7.onrender.com/api/items/add-item", value);
      message.success("Item Added Succesfully");
      getAllItems();
      setPopupModal(false);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something Went Wrong");
      console.log(error);
    }
  } else {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.put("https://order-management-backend-lge7.onrender.com/api/items/edit-item", {
        ...value,
        itemId: editItem._id,
      });
      message.success("Item Updated Succesfully");
      getAllItems();
      setPopupModal(false);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something Went Wrong");
      console.log(error);
    }
  }
};
  return (
    <DefaultLayout>
      <div className='d-flex justify-content-between'>
        <h1>Item List</h1>
        <Button style={{backgroundColor:"orange"}} onClick={()=>setPopupModal(true)}>Add Item</Button>
      </div>
        <Table columns={columns} dataSource={itemsData} bordered/>
        {
          popupModal && (
            <Modal title={`${editItem !== null ? 'edit item': 'Add New Item'}`} visible={popupModal} onCancel={()=>
            {
              setEditItem(null)
              setPopupModal(false)
            }
            } footer={false}>
        <Form layout='vertical' initialValues={editItem} onFinish={handleSubmit}>
          <Form.Item name="name" label='Name'>
            <Input/>
          </Form.Item>
          <Form.Item name="price" label='Price'>
            <Input/>
          </Form.Item>
          <Form.Item name="image" label='Image URL'>
            <Input/>
          </Form.Item>
          <Form.Item name='category' label='Category'>
          <Select>
            <Select.Option value='drinks'>Drinks</Select.Option>
            <Select.Option value='rice'>rice</Select.Option>
            <Select.Option value='noodles'>Noodles</Select.Option>
          </Select>
          </Form.Item>
          <div className='d-flex justify-content-end'>
            <Button type='primary' htmlType='submit'>
              Save
            </Button>
          </div>
        </Form>
      </Modal>
          )
        }
    </DefaultLayout>
  )
}

export default ItemPage