import React from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../_actions/user_actions";
import { useDispatch } from "react-redux";
import styled from 'styled-components'
import { Form } from 'react-bootstrap';

  const S = {
    textarea: styled.textarea`
    resize: none;
    width:400px; 
    height:100px; 
    overflow-x:hidden;
    overflow-y:auto;
    margin-left: auto;
    margin-top: 30px;
    border-style: inset;
    border-width: 2px;
    `,
    Header: styled.div`
    padding-top: 142px;
    padding-bottom: 50px;
    text-align: center;
    font-size : 30pt;
    `,
     Wrapper: styled.div`
     position: relative;
     `,
    Content: styled.div`
    display : flex, block;
    position : relative;
    left : 10px;
    `,
    FormWrap : styled.form`
  
    position: relavtive;
    padding-top: 30px;
    padding-bottom: 30px;
    
    `,
    Box : styled.input` 
    height: 51px;
    border: solid 3px #black;
    padding: 10px 14px 10px 14px;
    background: #fff;
    `,
    Box2 : styled.input` 
    height: 10px;
    border: solid 3px #black;
    padding: 10px 14px 10px 14px;
    background: #fff;
    `,
    Ilable : styled.label`
    padding-right : 0px;
    bottom : 0;
    display: inline-block;
    width: 140px;
    text-align: left;  
    font-size: 15px;
    font-weight: 700;
    
    `,
    ulable : styled.label`
  
    font-size: 15px;
    font-weight: 700;
    `,
    inputfeedback : styled.div`
      color: red;
      height: 5px;
      margin-top: -1px;
      position: relative;
      text-align: right; 
      left : 60px   
      padding-right : 0px;
      `,

    btn : styled.button`
    width: 10%;
    padding: 14px 0 14px;
    border: 0;
    cursor: pointer;
    color: #fff;
    background-color: #2E64FE;
    font-size: 20px;
    font-weight: 400;
    font-family: Dotum,'돋움',Helvetica,sans-serif;
    `,
    btnForm : styled.form`
    margin: 30px 0 91px;
    `
  }



function Register(props) {
  const dispatch = useDispatch();
  return (
    

    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms : false
      }}
      validationSchema={Yup.object().shape({
        
        email: Yup.string()
          .email('이메일을 확인해주세요.')
          .required('이메일을 입력해주세요.'),
        password: Yup.string()
          .min(6, '비밀번호는 최소 6자 이상입니다.')
          .required('비밀번호를 입력해주세요.'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], '비밀번호와 일치해야 합니다.')
          .required('비밀번호를 재입력해주세요'),
        acceptTerms : Yup.boolean()
          .oneOf([true],'이용약관에 동의하셔야 합니다.')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {


          let dataToSubmit = {  
            email: values.email,
            password: values.password,
         
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload) {
              props.history.push("/login");
            } else {
              alert('에러발생');
            }
          })

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <S.Wrapper >
          <div>
            <div className="d-flex align-items-center auth px-0">
              <div className="row w-100 mx-0">
                <div className="col-lg-4 mx-auto">
                  <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                    <div className="brand-logo">
                      <img src={require("../../assets/login.PNG")} alt="logo" />
                    </div>
                    <h2 style={{fontFamily: 'ImcreSoojin'}}>회원가입</h2>          
               <S.Content>
                <S.FormWrap onSubmit={handleSubmit}>
                <S.Ilable for = "email" style={{fontFamily: "'yg-jalnan'" }}>이메일</S.Ilable>
               <Form.Control
                  id="email"
                  placeholder="Enter your Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                  {errors.email && touched.email && (
               <S.inputfeedback>{errors.email}</S.inputfeedback>
             )}
               <br/>

         
          <S.Ilable for = "password" style={{fontFamily: "'yg-jalnan'" }}>비밀번호 입력</S.Ilable>
            <Form.Control
              id="password"
              placeholder="Enter your password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.password && touched.password ? 'text-input error' : 'text-input'
              }
            />
            {errors.password && touched.password && (
              <S.inputfeedback>{errors.password}</S.inputfeedback>
            )}
          <br/>

          
          <S.Ilable for = "confirmPassword" style={{fontFamily: "'yg-jalnan'" }}>비밀번호 확인</S.Ilable>
                <Form.Control
                  id="confirmPassword"
                  placeholder="Enter your confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <S.inputfeedback>{errors.confirmPassword}</S.inputfeedback>
                )}
              
             
             
           <S.textarea>
              여러분을 환영합니다.
            도그블럭 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 도그블럭 서비스의 이용과 관련하여 도그블럭 서비스를 제공하는 도그블럭 주식회사(이하 ‘네이버’)와 이를 이용하는 네이버 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
            도그블럭 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 네이버 서비스의 이용과 관련하여 네이버 서비스를 제공하는 네이버 주식회사(이하 ‘네이버’)와 이를 이용하는 네이버 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
            도그블럭 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 네이버 서비스의 이용과 관련하여 네이버 서비스를 제공하는 네이버 주식회사(이하 ‘네이버’)와 이를 이용하는 네이버 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
            </S.textarea>
            <S.ulable for = "acceptTerms">개인정보 수집 및 이용 동의(필수)</S.ulable>
              <S.Box2  type="checkbox" name="acceptTerms" 
                      onClick = { handleChange }
              className={errors.acceptTerms && touched.acceptTerms ? 'text-input error' : 'text-input' }
              /> 
            
              {errors.acceptTerms && touched.acceptTerms && (
                <S.inputfeedback>{errors.acceptTerms}</S.inputfeedback>
                          )}
            </S.FormWrap>

              <S.btnForm>
                <button onClick={handleSubmit} type="submit" disabled={isSubmitting} style={{fontFamily: "'Cafe24Oneprettynight"}} className="btn btn-block btn-danger btn-lg font-weight-medium auth-form-btn">
                  가입
                </button>
              </S.btnForm>
              </S.Content>
                  </div>
                </div>
              </div>
            </div>  
          </div>
          </S.Wrapper>
        );
      }}
    </Formik>
  );
};


export default Register