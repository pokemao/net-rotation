interface optionsIntf {
  time?: number;
}
type networkType = <T> (promiseFn: (params?: unknown) => Promise<T>, workFn: (T) => unknown, params?: unknown) => void
class CreateRotation {
  private latestRequestTime: number = Date.now();
  private timer: ReturnType<typeof setTimeout> | null = null;
  private options: optionsIntf
  constructor(options: optionsIntf) {
    this.options = options || {};
  }
  network:networkType = (promiseFn, workFn, params) => {
    this.latestRequestTime = Date.now();
    const currentRequestTime: number = Date.now();
    promiseFn(params).then((res) => {
      if (this.latestRequestTime < currentRequestTime) {
        workFn(res);
      }
    });
  };
  poll:networkType = (promiseFn, workFn, params) => {
    const { time = 5000 } = this.options;
    if (this.timer) clearTimeout(this.timer);
    this.network(promiseFn, workFn, params);
    setTimeout(() => {
      this.poll(promiseFn, workFn, params);
    }, time);
  };
}

export default CreateRotation;
