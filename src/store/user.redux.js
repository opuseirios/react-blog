import axios from 'axios'

//constants
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

const defaultState = {
  msg:'',
  user:''
}

//reducer
export const userReducer = function (state=defaultState,action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...state,...action.payload,msg:''};
    case ERROR_MSG:
      return {...state,msg:action.msg}
    default:
      return state;
  }
}

function authSuccess(data) {
  return {type:AUTH_SUCCESS,payload:data}
}

function errorMsg(msg) {
  return {type:ERROR_MSG,msg}
}

//登录
export const login = ({username,password})=>{
  return dispatch=>{
    if(!username||!password){
      return dispatch(errorMsg('请填写用户名或密码'))
    }
    axios.post('/user/login',{
      username,
      password
    }).then(res=>{
      let data = res.data;
      if(data.code === 0){
        dispatch(authSuccess(data.data))
      }else {
        dispatch(errorMsg(data.msg))
      }
    }).catch(e=>{
      console.log(e);
    })
  }
}

//注册
export const register = function(values,state,avatar){
  const {username,password,repassword,bio} = values;
  const {sex} = state;
  return dispatch=>{
    if(!username||!password||!avatar||!bio||!sex){
      return dispatch(errorMsg('请填写完整信息'));
    }
    if(password!==repassword){
      return dispatch(errorMsg('两次输入的密码不一致'))
    }
    axios.post('/user/register',{
      username,
      password,
      avatar,
      bio,
      sex
    }).then(res=>{
      let data = res.data;
      if(data.code === 0){
        dispatch(authSuccess(data.data))
      }else {
        dispatch(errorMsg(data.msg));
      }
    }).catch(e=>{
      console.log(e)
    })
  }
}
