import React from 'react'
import {Icon,Dropdown,Menu} from 'antd'
import {Link} from 'react-router-dom'

const Item = Menu.Item;

class NavSetting extends React.Component{
  render() {
    const menu = (
      <Menu>
        <Item>
          <Link to='/login'>登录</Link>
        </Item>
        <Item>
          <Link to='/register'>注册</Link>
        </Item>
      </Menu>
    )
    return (
      <div className='dropMenu'>
        <Dropdown overlay={menu} trigger={['click']}>
          <Icon type={'unordered-list'} style={{fontSize:20,color:'#000'}} />
        </Dropdown>
      </div>
    );
  }
}

export default NavSetting
