import Taro, { Component } from '@tarojs/taro'
import { Block, View } from '@tarojs/components'
import './index.scss'

export default class Drawer extends Component {
  config = {
    navigationBarTitleText: '首页',
  }

  state = {
    is_mask: false,
    animation: 'fadeInUp'
  }

  drawerShow = () => {
    this.setState({
      animation: 'fadeInUp'
    }, () => {
      this.setState({
        is_mask: true
      })
    })
  }

  drawerHide = () => {
    this.setState({
      animation: 'fadeOutDown'
    }, () => {
      setTimeout(() => {
        this.setState({
          is_mask: false
        })
      }, 350)
    })
  }

  render() {
    const { is_mask, animation } = this.state
    const { children, Style } = this.props
    return (
      <Block>
        {
          is_mask &&
          <Block>
            <View className='mask' onClick={this.drawerHide}></View>
            <View
              className={`mask-bottom-box animated ${animation}`}
              style={{
                ...Style
              }}
            >
              {children}
            </View>
          </Block>
        }
      </Block>
    )
  }
}
