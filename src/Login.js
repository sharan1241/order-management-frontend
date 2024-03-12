import React,{useEffect} from 'react'
import { Form,Input,Button } from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {message} from 'antd'
import { useDispatch } from 'react-redux'


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async (value) =>{
        try {
            dispatch({
              type: "SHOW_LOADING",
            });
            const res = await axios.post("https://order-management-backend-lge7.onrender.com/api/users/login",value);
            console.log(res.status)
            if(res.status === 200){
                message.success("user login Succesfully");
            localStorage.setItem('auth',JSON.stringify(res.data))
            navigate("/")
            }else{
                message.success("user does not exist");
            }
            
            
            
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
            <h3>Login Page</h3>
            <Form layout='vertical'  onFinish={handleSubmit}>
          
          <Form.Item name="userId" label='User ID'>
            <Input/>
          </Form.Item>
          <Form.Item name="password" label='Password'>
            <Input type="password"/>
          </Form.Item>
          <div className='d-flex justify-content-between'>
            <p>
                Not a User?
                <Link to='/register'>Register Here !</Link>
            </p>
            <Button style={{backgroundColor:"orange"}} htmlType='submit'>
              Login
            </Button>
            
          </div>
        </Form>
        </div>
        </div>
    </>
  )
}

export default Login