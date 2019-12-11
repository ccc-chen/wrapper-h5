import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView, Image, Input } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux'
import './index.scss'
@connect(({ CardNum, common, loading }) => ({
  ...CardNum,
  ...common,
  loading
}))

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页',

  }

  state = {

  }

  componentDidShow() {
    // ex
    // this.props.dispatch({
    //   type: 'CardNum/cloudPay_cardCount',
    //   payload: {},
    //   callback: (res) => {
    //     if (res) {
    //       console.log(res);// 请求完成后返回的结果
    //     }
    //   }
    // })
  }

  render() {
    const {

    } = this.props

    return (
      <View className='index-page'>
        首页
      </View>
    )
  }
}
