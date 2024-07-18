const getSuspender = <T>(promise: Promise<T>) => {
    let status: "pending" | "success" | "error" = "pending";
    let response: T;
  
    const suspender = promise.then(
      (res: T) => {
        status = "success";
        response = res;
      },
      (err: T) => {
        status = "error";
        response = err;
      }
    );
  
    const read = (): T => {
      switch (status) {
        case "pending":
          throw suspender;
        case "error":
          throw response;
        default:
          return response;
      }
    };
  
    return { read };
  };
  
  export function fetchData(url: string) {
    const promise = fetch(url)
      .then((response) => response.json())
      .then((json) => json);
  
    return getSuspender(promise);
  }
  