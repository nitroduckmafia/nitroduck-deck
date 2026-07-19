import * as React from 'react';
export interface PollenFieldProps {
  width?: number;
  height?: number;
  /** Slow parallax drift. @default true */
  animate?: boolean;
  /** Number of tumbling sketched petals. @default 6 */
  petals?: number;
  /** Draw exine ornamentation on the largest grains. @default true */
  exine?: boolean;
  style?: React.CSSProperties;
}
/**
 * The signature Nitroduck motif — a wind-borne pollen field with drifting petals.
 * Place inside a position:relative container (fills it); put content above it with a scrim.
 */
export function PollenField(props: PollenFieldProps): JSX.Element;
