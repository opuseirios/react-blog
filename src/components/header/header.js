import React from 'react'
import {Row,Col} from 'antd'
import NavSetting from '../nav-setting/nav-setting'

import './header.less'

class Header extends React.Component{
  render() {
    return (
      <div className='header-wrapper'>
        <Row>
          <Col>
            <h4 className="title">MYBLOG</h4>
            <p className="subTitle">my blog album</p>
            <div className="setting-wrapper">
              <NavSetting/>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header
