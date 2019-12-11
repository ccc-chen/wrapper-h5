import Taro from '@tarojs/taro'
import qs from 'qs'
import {
  baseUrl,
  ssoBaseUrl,
  privateKey,
  packageId
} from '../config';
import { forge } from './security/forge'

import {
  hex_sha1
} from './security/sha1'

const flag = 'rmcp'

function get_params(api, params, is_auth) {
  let data = {
    api,
    ...params,
    version: '1',
    signType: 'rsa',
    proType: 'cs',
    packageId,
  }
  // if (is_auth) {
  //   data.token = Taro.getStorageSync('access_token')
  // }
  const access_token = Taro.getStorageSync('access_token')
  if (access_token) {
    data.token = access_token
  }

  data = get_signature(data)
  return data
}

function get_signature(params) {
  let request = {
    'flag': flag,
    'timestamp': new Date().getTime(),
    ...params
  }
  request['sign'] = calc_signature(request)
  return request
}
function calc_signature(parms) {
  let sign = ''
  let tmpArr = []
  let tmpStr = ''
  let result = ''
  for (let key in parms) {
    if (parms[key]) {
      tmpArr.push(key)
    }
  }
  tmpArr = tmpArr.sort().reverse()

  for (let i = 0; i < tmpArr.length; i++) {
    if (typeof (parms[tmpArr[i]]) === 'object') {
      tmpStr = tmpStr + tmpArr[i].toLowerCase() + JSON.stringify(parms[tmpArr[i]])
    } else {
      tmpStr = tmpStr + tmpArr[i].toLowerCase() + parms[tmpArr[i]]
    }

  }

  if (parms.signType == 'sha') {
    let sha = hex_sha1(utf16to8(tmpStr))
    let shaLength = sha.length
    let count = parseInt(tmpArr.length * 1.4)

    if (count >= shaLength) {
      count = shaLength
    }

    let step = parseInt(shaLength / count)

    for (let i = 0; i < count; i++) {
      let num = Math.floor(i * step)
      sign = sign + sha.charAt(num)
    }
    result = sign
  } else {
    var privKey = forge.pki.privateKeyFromPem(privateKey);
    const md = forge.md.sha1.create()
    md.update(tmpStr, "utf8");
    let sig = privKey.sign(md);
    let erg = forge.util.encode64(sig);
    result = erg;
  }

  return result
}

function utf16to8(str) {
  let out, i, len, c
  out = ''
  len = str.length
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i)
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i)
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    }
  }
  return out
}

export default (options = {
  data: {},
}) => {
  return Taro.request({
    url: baseUrl,
    data: qs.stringify(get_params(options.api, options.data, options.data.is_auth)),
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  }).then((res) => {
    const {
      statusCode,
      data,
    } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (data.status !== 'ok') {
        if (res.data.code == '30008') {
          Taro.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000
          })
        }
        switch (data.code) {
          case '30007':
            console.log('codeeee', options)
            Taro.setStorageSync('errCode', data.code)
            break
        }
      }
      return data
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  })
    .catch(err => {
      console.log('请求失败', err)
    })
}
