import { Checkbox, Radio } from 'antd';
import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { registerUser } from '../../_actions/user_actions';
import { withRouter } from 'react-router-dom';

function Register(props) {
  
      const dispatch = useDispatch();
  
      const [Email, setEmail] = useState("")
      const [Password, setPassword] = useState("")
      const [Name, setName] = useState("")
      const [ConfirmPassword, setConfirmPassword] = useState("")
  
      const onEmailHandler = (event) =>{
  
          setEmail(event.currentTarget.value)
      }
  
      const onPasswordHandler = (event) => {
          setPassword(event.currentTarget.value)
      }
  
      const onNameHandler = (event) => {
          setName(event.currentTarget.value)
      }
  
      const onConfirmPasswordHandler = (event) => {
          setConfirmPassword(event.currentTarget.value)
      }
  
      const onSubmitHandler = (event) => {
          event.preventDefault();
  
          if(Password !== ConfirmPassword) {
              return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
          }
  
          
          let body = {
              email: Email,
              password: Password,
              name: Name
          }
  
  
  
          dispatch(registerUser(body))
          .then(response => {
              if(response.payload.success) {
                  props.history.push('/login')
              } else {
                  alert('Failed to sign up')
              }
          
          })
  
      } 
  
  
  

    return (
      <div onSubmit={onSubmitHandler}>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={require("../../assets/logo1.PNG")} alt="logo" />
                </div>
                <h4>처음오셨나요?</h4>
                <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                <form className="pt-3">
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" id="exampleInputID1" placeholder="아이디" />
                    <button>중복확인</button>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg"  value={Password} onChange={onPasswordHandler} placeholder="비밀번호" />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg" value={ConfirmPassword} onChange={onConfirmPasswordHandler} placeholder="비밀번호 확인" />
                  </div>
                  <div className="form-group">
                    <input type="name" className="form-control form-control-lg" id="exampleInputName1" placeholder="이름" />
                  </div>
                  <div className="form-group">
                    <input type="usernumber" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="주민등록 번호" />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="이메일" />
                    <button>인증메일 전송</button>
                  </div>
                  <div className="form-group">
                    <input type="emailnumber" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="인증번호"/>
                  </div>
                  <div className="form-group">
                    <input type="phone" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="전화번호" />
                  </div>
                  <div className="form-group">
                  <textarea type="readonly">이용약관</textarea>
                    <Checkbox>약관동의</Checkbox>
                  </div>
                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        I agree to all Terms & Conditions
                      </label>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" >회원가입</button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account? <Link to="/user-pages/login" className="text-primary">Login</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  export default withRouter(Register)
