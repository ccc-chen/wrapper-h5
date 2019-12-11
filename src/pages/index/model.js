import * as indexApi from './service'

export default {
  namespace: 'CardNum',
  state: {
    cloudPay_cardCount: {},
  },

  effects: {
    * cloudPay_cardCount({ payload, callback }, { call, put, select }) {
      try {
        const { status, result } = yield call(indexApi.cloudPay_cardCount, payload)
        if (status == 'ok') {
          console.log(123)
          if (callback && typeof callback === 'function') {
            callback(result);
          }
          yield put({
            type: 'save',
            payload: {
              cloudPay_cardCount: result,
            }
          })
        }
      } catch (err) {
        console.log('err->>>', err)
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}
