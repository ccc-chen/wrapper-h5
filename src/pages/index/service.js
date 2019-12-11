import Request from '../../utils/request'

export const cloudPay_cardCount = data => Request({
  api: 'cloudPay.cardCount',
  data,
})
