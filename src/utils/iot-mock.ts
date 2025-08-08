export type SensorReading = {
  timestamp: number;
  lotId: string;
  temperature: number; // °C
  humidity: number; // %
  location: string;
};

const sensorEmitter = new EventTarget();

function randomIn(min: number, max: number) {
  return +(Math.random() * (max - min) + min).toFixed(2);
}

export type IotStartOptions = {
  lotId: string;
  intervalMs?: number;
};

export function startIotMock({ lotId, intervalMs = 10000 }: IotStartOptions) {
  let active = true;
  const locations = ["Nairobi", "Lagos", "Tunis", "Kigali", "Accra"];

  const tick = () => {
    if (!active) return;
    // Base ranges for cold chain (-80 to -60) with occasional drift
    const drift = Math.random() < 0.1 ? randomIn(5, 15) : randomIn(0, 2);
    const sign = Math.random() < 0.5 ? -1 : 1;
    const temperature = randomIn(-75, -65) + sign * drift; // can go out of range sometimes
    const humidity = randomIn(30, 65);
    const reading: SensorReading = {
      timestamp: Date.now(),
      lotId,
      temperature,
      humidity,
      location: locations[Math.floor(Math.random() * locations.length)],
    };
    sensorEmitter.dispatchEvent(new CustomEvent<SensorReading>("sensor", { detail: reading }));
  };

  const id = setInterval(tick, intervalMs);
  // Emit first value immediately
  tick();

  return () => {
    active = false;
    clearInterval(id);
  };
}

export function onSensor(callback: (reading: SensorReading) => void) {
  const handler = (e: Event) => {
    const ce = e as CustomEvent<SensorReading>;
    callback(ce.detail);
  };
  sensorEmitter.addEventListener("sensor", handler);
  return () => sensorEmitter.removeEventListener("sensor", handler);
}
