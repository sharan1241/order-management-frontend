import React from 'react'
import { Card,Button } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';


const ItemList = ({item}) => {
  const dispatch = useDispatch()
  const handleAddToCart =()=>{
    dispatch({
      type:"ADD_TO_CART",
      payload:{...item,quantity:1}
    })
    console.log("hi")
  }
  const { Meta } = Card;
  return (
    <div><Card
    
    style={{
      width: 240,
      marginBottom:20
    }}
    cover={<img alt={item.name} src={item.image} style={{height:200}} />}
    
  >
    <Meta title={item.name} />
    <div className='item-button'>
      <Button style={{backgroundColor:"orange"}} onClick={()=>handleAddToCart()}>Add to Cart</Button>
    </div>
  </Card></div>
  )
}

export default ItemList