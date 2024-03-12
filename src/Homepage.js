import React, { useState, useEffect } from "react";
import DefaultLayout from "./DefaultLayout";
import axios from "axios";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";

import ItemList from "./ItemList";
const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState('drinks')
  const categories=[
    {
      name:'drinks',
      imageUrl:'https://cdn.icon-icons.com/icons2/219/PNG/256/Sex_on_the_Beach_25441.png'
    },
    {
      name:'rice',
      imageUrl:'https://cdn-icons-png.flaticon.com/512/184/184532.png'
    },
    {
      name:'noodles',
      imageUrl:'https://cdn.icon-icons.com/icons2/1646/PNG/512/recipenoodlespastaicon_109880.png'
    },
  ]
  const dispatch = useDispatch()

  //useEffect
  useEffect(() => {
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
        console.log(error);
      }
    };
    getAllItems();
  }, [dispatch]);
  return (
    <DefaultLayout>
      <div className="d-flex">
        {categories.map(category=>(
          <div key={category.name} className={`d-flex category ${selectedCategory === category.name && "category-active"}`} onClick={()=>setSelectedCategory(category.name)}>
              <h4>{category.name}</h4>
              <img src={category.imageUrl} alt={category.name} height="40" width="60"/>
          </div>
        ))}
      </div>
      <Row>
        {itemsData
        .filter(i=>i.category === selectedCategory)
        .map((item) => (
          <Col xs={24} lg={6} md={12} sm={6}>
            <ItemList key={item.id} item={item} />
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;