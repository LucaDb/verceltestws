import { Box, Text } from '@websolutespa/bom-mixer-ui';
import React from 'react';
import { FloatingTip } from '../floating-tip/floating-tip';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HiveSvg = React.forwardRef<SVGSVGElement, any>((props, ref) => {

  const { items } = props;

  const updatePath = (path: JSX.Element, color: string) => {
    const updatedPath = React.cloneElement(path, { opacity: 1, fill: color });
    return updatedPath;
  };

  const paths = [
    <path key="0" transform="translate(4, 4)" d="m289.54,42.04c11.61,0,21.03-9.41,21.03-21.02S301.15,0,289.54,0s-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="1" transform="translate(4, 4)" d="m102.37,89.77c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="2" transform="translate(4, 4)" d="m208.57,185.25c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="3" transform="translate(4, 4)" d="m341.38,233.19c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="4" transform="translate(4, 4)" d="m181.21,328.72c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="5" transform="translate(4, 4)" d="m45.87,376.43c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="6" transform="translate(4, 4)" d="m287.99,422.76c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="7" transform="translate(4, 4)" d="m342.65,137.51c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="8" transform="translate(4, 4)" d="m21.03,233.19c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02S0,200.56,0,212.16s9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="9" transform="translate(4, 4)" d="m102.37,185.25c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="10" transform="translate(4, 4)" d="m99.73,280.9c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="11" transform="translate(4, 4)" d="m341.38,328.72c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="12" transform="translate(4, 4)" d="m127.81,422.76c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="13" transform="translate(4, 4)" d="m24.04,42.04c11.61,0,21.03-9.41,21.03-21.02S35.65,0,24.04,0,3.01,9.41,3.01,21.02s9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="14" transform="translate(4, 4)" d="m208.57,89.77c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="15" transform="translate(4, 4)" d="m234.6,233.19c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="16" transform="translate(4, 4)" d="m259.44,376.43c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="17" transform="translate(4, 4)" d="m367.87,89.77c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="18" transform="translate(4, 4)" d="m24.04,137.51c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02S3.01,104.88,3.01,116.49s9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="19" transform="translate(4, 4)" d="m367.87,185.25c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="20" transform="translate(4, 4)" d="m127.81,233.19c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="21" transform="translate(4, 4)" d="m313.3,280.9c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="22" transform="translate(4, 4)" d="m152.66,376.43c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="23" transform="translate(4, 4)" d="m394.77,422.76c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="24" transform="translate(4, 4)" d="m130.24,42.04c11.61,0,21.03-9.41,21.03-21.02S141.85,0,130.24,0s-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="25" transform="translate(4, 4)" d="m236.44,137.51c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="26" transform="translate(4, 4)" d="m314.77,185.25c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="27" transform="translate(4, 4)" d="m153.12,280.9c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="28" transform="translate(4, 4)" d="m21.03,328.72c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02S0,296.09,0,307.7s9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="29" transform="translate(4, 4)" d="m419.62,376.43c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity="0.2" strokeWidth="0" />,
    <path key="30" transform="translate(4, 4)" d="m99.27,376.43c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="31" transform="translate(4, 4)" d="m74.42,422.76c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="32" transform="translate(4, 4)" d="m341.38,422.76c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="33" transform="translate(4, 4)" d="m130.24,137.51c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="34" transform="translate(4, 4)" d="m394.77,328.72c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="35" transform="translate(4, 4)" d="m127.81,328.72c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="36" transform="translate(4, 4)" d="m312.83,376.43c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="37" transform="translate(4, 4)" d="m366.23,376.43c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="38" transform="translate(4, 4)" d="m261.67,185.25c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="39" transform="translate(4, 4)" d="m46.34,280.9c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="40" transform="translate(4, 4)" d="m74.42,233.19c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="41" transform="translate(4, 4)" d="m181.21,233.19c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="42" transform="translate(4, 4)" d="m259.9,280.9c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="43" transform="translate(4, 4)" d="m342.65,42.04c11.61,0,21.03-9.41,21.03-21.02S354.26,0,342.65,0s-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="44" transform="translate(4, 4)" d="m206.51,280.9c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="45" transform="translate(4, 4)" d="m366.69,280.9c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="46" transform="translate(4, 4)" d="m77.14,137.51c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="47" transform="translate(4, 4)" d="m21.03,422.76c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02S0,390.13,0,401.74s9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="48" transform="translate(4, 4)" d="m74.42,328.72c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="49" transform="translate(4, 4)" d="m234.6,422.76c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="50" transform="translate(4, 4)" d="m183.34,137.51c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.42,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="51" transform="translate(4, 4)" d="m420.08,280.9c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="52" transform="translate(4, 4)" d="m181.21,422.76c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="53" transform="translate(4, 4)" d="m289.54,137.51c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="54" transform="translate(4, 4)" d="m395.75,137.51c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="55" transform="translate(4, 4)" d="m77.14,42.04c11.61,0,21.03-9.41,21.03-21.02S88.75,0,77.14,0s-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="56" transform="translate(4, 4)" d="m183.34,42.04c11.61,0,21.03-9.41,21.03-21.02S194.95,0,183.34,0s-21.03,9.41-21.03,21.02,9.42,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="57" transform="translate(4, 4)" d="m287.99,233.19c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="58" transform="translate(4, 4)" d="m236.44,42.04c11.61,0,21.03-9.41,21.03-21.02S248.06,0,236.44,0s-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="59" transform="translate(4, 4)" d="m206.05,376.43c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="60" transform="translate(4, 4)" d="m395.75,42.04c11.61,0,21.03-9.41,21.03-21.02S407.36,0,395.75,0s-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="61" transform="translate(4, 4)" d="m155.47,185.25c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="62" transform="translate(4, 4)" d="m49.27,89.77c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="63" transform="translate(4, 4)" d="m234.6,328.72c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="64" transform="translate(4, 4)" d="m261.67,89.77c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="65" transform="translate(4, 4)" d="m314.77,89.77c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="66" transform="translate(4, 4)" d="m155.47,89.77c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="67" transform="translate(4, 4)" d="m394.77,233.19c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="68" transform="translate(4, 4)" d="m49.27,185.25c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="69" transform="translate(4, 4)" d="m287.99,328.72c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="70" transform="translate(4, 4)" d="m420.97,89.77c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
    <path key="71" transform="translate(4, 4)" d="m420.97,185.25c11.61,0,21.03-9.41,21.03-21.02s-9.41-21.02-21.03-21.02-21.03,9.41-21.03,21.02,9.41,21.02,21.03,21.02Z" fill="var(--color-neutral-800)" opacity=".2" strokeWidth="0" />,
  ];

  return (
    <svg ref={ref} width="100%" height="100%" viewBox="0 0 452 429.76">
      {paths && paths.map((path, index) => {
        if (index < items.length) {
          const activePath = updatePath(path, items[index].color);
          return (<FloatingTip key={index} color="var(--color-neutral-100)" borderColor="var(--color-neutral-800)" panel={
            <Box background="var(--color-neutral-100)" border="4px solid var(--color-neutral-800)" maxWidth="300px" color="var(--color-neutral-800)" padding="15px" borderRadius="16px">
              {items[index].title && <Text variant="paragraph20">{items[index].title}</Text>}
              {items[index].abstract && <Text variant="paragraph40" dangerouslySetInnerHTML={{ __html: items[index].abstract }} />}
            </Box>
          }>{activePath}</FloatingTip>);
        } else {
          return path;
        }
      })}
    </svg>
  );
});

HiveSvg.displayName = 'HiveSvg';
