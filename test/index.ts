import Rotation from './src/index.ts'

const rotation = new Rotation()

rotation.poll(
  (params) => {
    // 网络请求
    return axios(params)
  },
  // 处理网络请求的返回值，axios的响应拦截依然有效
  (res) => {
    console.log(res);
  },
  params
)

// 需要改变axios的请求内容params，则需要重新调用rotation.poll

rotation.poll(
  (newParams) => {
    // 网络请求
    return axios(newParams)
  },
  // 处理网络请求的返回值，axios的响应拦截依然有效
  (res) => {
    console.log(res);
  },
  newParams
)
