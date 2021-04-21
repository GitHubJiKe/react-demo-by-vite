import { useRef, useEffect } from "react";

interface IntervalOpt {
  func: () => void;
  duration?: number;
  immediatelyRun?: boolean;
}

export default function useInterval({
  func,
  duration,
  immediatelyRun = true,
}: IntervalOpt) {
  const ref = useRef<any>();

  function removeInterval() {
    if (ref.current) {
      clearTimeout(ref.current);
      ref.current = null;
    }
  }

  function run() {
    func();
    ref.current = setTimeout(run, duration || 0);
  }

  useEffect(() => {
    if (immediatelyRun) {
      run();
    }

    return () => {
      removeInterval();
    };
  }, []);

  return {
    removeInterval,
    startInterval: () => {
      if (ref.current) {
        console.warn("interval is running");
        return;
      }
      run();
    },
  };
}

/**
 * 示例代码
 */
// function Demo() {
//   const [num, setNum] = useState(0);
//   const { removeInterval, startInterval } = useInterval({
//     func: () => {
//       setNum((n) => n + 1);
//     },
//     duration: 1000,
//   });

//   useInterval({
//     func: () => {
//       console.log(100);
//     },
//     duration: 1000,
//   });
//   return (
//     <div>
//       {num}
//       <button onClick={startInterval}>async startInterval</button>
//       <button onClick={removeInterval}>removeInterval</button>
//     </div>
//   );
// }
