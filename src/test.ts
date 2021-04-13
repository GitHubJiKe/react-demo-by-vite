type Func<P, R> = (...args: P[]) => R;

function promisify<P, R>(func: Func<P, R>) {
  return (...args: Parameters<Func<P, R>>) =>
    new Promise<ReturnType<Func<P, R>>>((resolve, reject) => {
      try {
        const res = func(...args);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
}
