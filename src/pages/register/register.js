import React from 'react'
import {Button,Row,Col,Input,Form,Upload,Modal,Select,Icon} from 'antd'
import NavHeader from '../../components/header/header'
import './register.less'

const Item = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>resolve(reader.result);
    reader.onerror = (error)=>reject(error);
  })
}

class Register extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      sex:'m',
      fileList:[],
      previewVisible:false,
      previewImage:''
    }
  }

  handleSubmit = (e)=>{
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){
        console.log(values)
      }
    })
  }

  handleChangeSex = (e)=>{
    this.setState({
      sex:e
    })
  }

  handlePreview = async file=>{
    if(!file.url&&!file.preview){
      file.preview = await getBase64(file.originFileObj)
    }
    this.setState({
      previewImage:file.url||file.preview,
      previewVisible:true
    })
  }

  handleCancel = ()=>{
    this.setState({
      previewVisible:false
    })
  }

  handleFileList = ({fileList})=>{
    this.setState({fileList})
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const uploadButton = (
      <div>
        <Icon type='plus'/>
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className='register'>
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
                    },
                    {
                      min:2,max:30,
                      message:'用户名长度必须控制在2-30个字符之间'
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
                      message:'请输入密码'
                    },
                    {
                      min:6,
                      message:'密码至少6位'
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type='lock'/>}
                    placeholder='请输入密码'
                    type='password'
                  />
                )
              }
            </Item>
            <Item label='重复密码'>
              {
                getFieldDecorator('repassword',{
                  rules:[
                    {
                      required:true,
                      message:'请重新输入密码'
                    },
                    {
                      min:6,
                      message:'密码至少6位'
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type='lock'/>}
                    placeholder='请再次输入密码'
                    type='password'
                  />
                )
              }
            </Item>
            <Item label='性别'>
              <Select
                value={this.state.sex}
                onChange={this.handleChangeSex}
              >
                <Option value='m'>男</Option>
                <Option value='f'>女</Option>
                <Option value='x'>保密</Option>
              </Select>
            </Item>
            <Item label='头像'>
              {
                getFieldDecorator('avatar',{
                  rules:[{
                    required:true,
                    message:'请上传头像'
                  }]
                })(
                  <Upload
                    fileList={this.state.fileList}
                    listType='picture-card'
                    action='http://localhost:9000/user/uploadImg'
                    onPreview={this.handlePreview}
                    onChange={this.handleFileList}
                  >
                    {this.state.fileList.length>0?null:uploadButton}
                  </Upload>
                )
              }
            </Item>
            <Item label='个人简介'>
              {
                getFieldDecorator('bio',{
                  rules:[
                    {
                      required:true,
                      message:'请填写个人简介'
                    },
                    {
                      min:10,
                      message:'个人简介不能少于10个字符'
                    }
                  ]
                })(
                  <TextArea rows={4} placeholder='个人简介'/>
                )
              }
            </Item>
            <Button type={"primary"} block style={{marginBottom:100}}>注册</Button>
          </Form>
          <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
            <img src={this.state.previewImage} style={{width:'100%'}} alt="头像"/>
          </Modal>
        </Col>
      </div>
    );
  }
}

export default Form.create({})(Register)
