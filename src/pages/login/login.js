import React from 'react'
import {Button, Row, Col, Input, Form, Icon, message} from 'antd'
import NavHeader from '../../components/header/header'
import '../register/register.less'
import {connect} from 'react-redux'
import {login} from "../../store/user.redux";

const Item = Form.Item;

@connect(
  state=>state.user,
  {login}
)
class Login extends React.Component{
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = (e)=>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      if(!err){
        this.props.login(values);
      }
    })
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className='login'>
        <Row>
          <Col span={12} offset={6}>
            <NavHeader/>
            <Form onSubmit={this.handleSubmit}>
              <Item label='用户名'>
                {
                  getFieldDecorator('username',{
                    rules:[
                      {
                        required:true,
                        message:'请输入用户名'
                      }
                    ]
                  })(
                    <Input
                      prefix={<Icon type={'user'}/>}
                      placeholder='用户名'
                    />
                  )
                }
              </Item>
              <Item label='密码'>
                {
                  getFieldDecorator('password',{
                    rules:[
                      {
                        required:true,
                        message:'请填写密码'
                      }
                    ]
                  })(
                    <Input
                      prefix={<Icon type='lock' />}
                      placeholder='请输入密码'
                    />
                  )
                }
              </Item>
              <Button type={"primary"} block htmlType={"submit"}>登录</Button>
            </Form>
            {this.props.msg?message.error(this.props.msg):null}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create({})(Login)
