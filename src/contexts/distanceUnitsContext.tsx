'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

export type DistanceUnits = 'lunar' | 'kilometers';

const UnitsSwitcherContext = createContext<(units: DistanceUnits) => void>(
  () => undefined,
);

const DistanceUnitsContext = createContext<DistanceUnits>('lunar');

export const useDistanceUnits = () => {
  return useContext(DistanceUnitsContext);
};
export const useUnitsSwitcher = () => {
  return useContext(UnitsSwitcherContext);
};

export default function DistanceUnitsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [distanceUnits, setDistanceUnits] = useState<DistanceUnits>('lunar');

  const switchUnits = useCallback((distanceUnits: DistanceUnits) => {
    setDistanceUnits(distanceUnits);
  }, []);

  return (
    <UnitsSwitcherContext.Provider value={switchUnits}>
      <DistanceUnitsContext.Provider value={distanceUnits}>
        {children}
      </DistanceUnitsContext.Provider>
    </UnitsSwitcherContext.Provider>
  );
}
