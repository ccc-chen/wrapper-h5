import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
  Drawer
} from '../../components'
import './index.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
  }

  state = { 
  }

  refDrawer = (node) => {
    this.Drawer = node
  }

  componentDidShow() {
    console.log(this.Drawer)
  }

  DrawerShow = () => {
    this.Drawer.drawerShow()
  }


  render() {
    const {

    } = this.props

    return (
      <View className='index-page'>
        <Drawer
          ref={this.refDrawer}
          Style={{
            height: 200,
          }}
          children={
            <View>hellos</View>
          }
        ></Drawer>
        <View
          onClick={this.DrawerShow}
        >抽屉</View>
      </View>
    )
  }
}
