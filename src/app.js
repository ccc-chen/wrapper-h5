import '@tarojs/async-await'
import {Provider} from '@tarojs/redux'
import Taro, {Component} from '@tarojs/taro'
import Index from './pages/index'
import dva from './utils/dva'
import models from './models'

import './styles/base.scss'


const dvaApp = dva.createApp({
    initialState: {},
    models: models,
});
const store = dvaApp.getStore();

class App extends Component {

    config = {
        pages: [
            'pages/index/index',
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#ffffff',
            navigationBarTitleText: '',
            navigationBarTextStyle: 'black'
        }
    }

    componentDidMount() {
        let ENV = process.env.TARO_ENV
        switch (ENV) {
            case 'weapp':
                this.weappLogin()
                Taro.setStorageSync('clientType', '3')
                Taro.setStorageSync('platform', '0')
                break
            case 'web':
                this.weappLogin()
                Taro.setStorageSync('clientType', '3')
                Taro.setStorageSync('platform', '0')
                break
        }
    }


    componentDidShow() {

    }

    //微信小程序登录
    weappLogin = () => {
        Taro.login()
            .then(res => {
                if (res.code) {
                    dvaApp.dispatch({
                      type: 'common/account_customer_mini_autologin',
                      payload: {
                         code:res.code
                      }
                    })
                    // dvaApp.dispatch({
                    //   type: 'common/sms_send',
                    //   payload: {
                    //       mobile: '15527377390',
                    //       type: '4'
                    //   }
                    // })
                }
            })
    }


    render() {
        return (
            <Provider store={store}>
                <Index/>
            </Provider>
        )
    }
}

Taro.render(<App/>, document.getElementById('app'))
