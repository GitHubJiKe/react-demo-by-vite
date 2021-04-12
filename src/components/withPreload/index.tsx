import React, { useEffect, ComponentType, useState } from "react";
import { ErrorBox, Loading } from "..";

interface IWithPreloadProps<T> {
  loader: () => Promise<T>;
}

export default function withPreload<T, P>(
  { loader }: IWithPreloadProps<T>,
  Comp: ComponentType<P>
) {
  return function (props: P & { data?: T }) {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<Error>();

    useEffect(() => {
      run();

      async function run() {
        Loading.global(true);
        try {
          const res = await loader();
          setData(res);
          setError(undefined);
        } catch (error) {
          setError(error);
        } finally {
          Loading.global(false);
        }
      }
    }, [loader]);

    if (error) {
      return <ErrorBox error={error} />;
    }

    return data ? <Comp {...props} data={data} /> : null;
  };
}
