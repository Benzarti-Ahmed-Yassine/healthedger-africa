import * as React from "react";
import { onSensor, startIotMock, type SensorReading } from "@/utils/iot-mock";

export function useIotStream(lotId: string, autoStart = true) {
  const [readings, setReadings] = React.useState<SensorReading[]>([]);
  const stopRef = React.useRef<null | (() => void)>(null);

  React.useEffect(() => {
    const off = onSensor((r) => {
      if (r.lotId !== lotId) return;
      setReadings((prev) => {
        const next = [...prev, r];
        // keep last 50
        return next.slice(-50);
      });
    });

    if (autoStart) {
      stopRef.current = startIotMock({ lotId, intervalMs: 10000 });
    }

    return () => {
      off();
      stopRef.current?.();
    };
  }, [lotId, autoStart]);

  const latest = readings[readings.length - 1];
  return { readings, latest };
}
