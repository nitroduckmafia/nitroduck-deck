import * as React from 'react';
export interface PollenFieldProps {
  /**
   * Mutable ref holding the flock's orientation quaternion [x, y, z, w].
   * Read on every animation frame; mutate it (no re-render) to tumble the cloud.
   */
  orientationRef?: React.MutableRefObject<[number, number, number, number]>;
  /** Render a single static frame with no drift loop or motion. @default false */
  reducedMotion?: boolean;
  /** Grain-count multiplier (streams, dust, large grains). @default 1 */
  density?: number;
}
/**
 * The signature Nitroduck motif — a volumetric, wind-borne pollen flock rendered on a
 * <canvas>. Grains carry real 3D positions and are rotated/projected each frame, so the
 * flock tumbles like a cloud (not a rotating plane). Fills its position:relative parent.
 */
export function PollenField(props: PollenFieldProps): JSX.Element;
