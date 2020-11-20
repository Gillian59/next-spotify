import { useEffect, useState } from "react";

const timeLapse = (ms: number, pauseStatus: boolean): number => {
  const [lapse, setLapse] = useState(ms);

  useEffect(() => {
    let timer;
    if (!pauseStatus) timer = setInterval(() => runtime(), 1000);

    return () => {
      clearInterval(timer);
      setLapse(ms);
    };
  }, [pauseStatus, ms]);

  const runtime = () => {
    setLapse((lapse) => lapse + 1000);
  };

  return lapse;
};

export default timeLapse;
