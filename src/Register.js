import React,{useEffect} from 'react'
import { Form,Input,Button } from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {message} from 'antd'
import { useDispatch } from 'react-redux'

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async (value) =>{
        try {
            dispatch({
              type: "SHOW_LOADING",
            });
            await axios.post("https://order-management-backend-lge7.onrender.com/api/users/register", value);
            message.success("Register Succesfully");
            navigate("/login")
            dispatch({ type: "HIDE_LOADING" });
          } catch (error) {
            dispatch({ type: "HIDE_LOADING" });
            message.error("Something Went Wrong");
            console.log(error);
          }
    }
    useEffect(()=>{
        if(localStorage.getItem('auth')){
            localStorage.getItem('auth')
            navigate("/")
        }
    },[navigate])
  return (
    <>
        <div className='register'>
            <div className='register-form'>
            <h1>order management app</h1>
            <h3>Register Page</h3>
            <Form layout='vertical'  onFinish={handleSubmit}>
          <Form.Item name="name" label='Name'>
            <Input/>
          </Form.Item>
          <Form.Item name="userId" label='User ID'>
            <Input/>
          </Form.Item>
          <Form.Item name="password" label='Password'>
            <Input type="password"/>
          </Form.Item>
          <div className='d-flex justify-content-between'>
            <p>
                Already Register Please
                <Link to='/login'>Login Here !</Link>
            </p>
            <Button style={{backgroundColor:"orange"}} htmlType='submit'>
              Register
            </Button>
            
          </div>
        </Form>
        </div>
        </div>
    </>
  )
}

export default Register