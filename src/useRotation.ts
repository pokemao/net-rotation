type network = <T> (promiseFn: (params?: unknown) => Promise<T>, workFn: (T) => unknown, params?: unknown) => void
// 最新一次请求的时间
const latestRequestTime = useRef(Date.now());
// 使用timer变量作为计时器的句柄，用于计时器的清除
const timer = useRef(null);
// 最基础的发起网络请求的函数
const network: network = (promiseFn, workFn, params) => {
  // 记录下最新的请求的发起时间，这个latestRequestTime.value属于所有的请求，记录下的永远是最新的请求的发起时间
  latestRequestTime.value = Date.now();
  // 使用闭包记录下当前请求的时间，这个requestTime变量是专属于当前请求的
  const requestTime = Date.now();
  promiseFn(params).then((res) => {
    // 如果当前这个请求的发起时间比最新的请求的发起时间要大，那就说明这个请求是最新的请求，因为requestTime的赋值时间比latestRequestTime.value要晚
    if (latestRequestTime.value < requestTime) {
      // 说明这个res可以使用，对res进行处理
      workFn(res);
    }
  });
};
// 对最基础的网络请求的函数进行轮训包装
const poll: network = (promiseFn, workFn, params) => {
  if (timer.value) clearTimeout(timer.value);
  network(promiseFn, workFn, params);
  timer.value = setTimeout(() => {
    poll(promiseFn, workFn, params);
  }, time);
};
// 首先调用一次poll，然后就开启了轮训
// 接下来只要用户更改了params那么poll就会被自动重新调用发起请求，并开启新的轮训，之前的轮训响应值会被弃用，做到数据驱动
useEffect(() => {
  poll(promiseFn, workFn, params)
}, [promiseFn, workFn, params]);
