/* ============================================
   DIULogo Component — Transparent Vector Logo & Full Brand Banner
   DIU Student Welfare System
   ============================================ */

import logoTransparent from '../../assets/images/diu-welfare-logo-transparent.png';
import logoClean from '../../assets/images/diu-welfare-logo-clean.png';

interface DIULogoProps {
  size?: number;
  height?: number;
  className?: string;
  variant?: 'default' | 'on-dark' | 'gold';
  mode?: 'full' | 'icon';
}

export function DIULogo({
  size = 38,
  height,
  className = '',
  variant = 'default',
  mode = 'icon',
}: DIULogoProps) {
  /* Full Official Banner Image Mode */
  if (mode === 'full') {
    const logoSrc = variant === 'on-dark' ? logoTransparent : logoClean;

    return (
      <img
        src={logoSrc}
        alt="DIU Student Welfare System"
        style={{
          height: height ?? (size ? size : 40),
          width: 'auto',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
        className={className}
      />
    );
  }

  /* Vector SVG Shield Icon Mode */
  const primaryColor =
    variant === 'on-dark'
      ? '#FFFFFF'
      : variant === 'gold'
      ? '#F4A100'
      : '#1A4D2E';
  const accentColor = '#F4A100';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Shield - Transparent Background */}
      <path
        d="M60 10 L100 24 V58 C100 84 60 110 60 110 C60 110 20 84 20 58 V24 L60 10 Z"
        fill="none"
        stroke={primaryColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner Accent Crest Outline */}
      <path
        d="M60 20 L90 31 V56 C90 76 60 96 60 96 C60 96 30 76 30 56 V31 L60 20 Z"
        fill={
          variant === 'on-dark'
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(26, 77, 46, 0.06)'
        }
        stroke={accentColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Graduation Cap (Mortarboard Top) */}
      <polygon points="60,34 92,47 60,60 28,47" fill={accentColor} />

      {/* Graduation Cap Base / Skullcap */}
      <path
        d="M42 54.5 V65 C42 70 50 74 60 74 C70 74 78 70 78 65 V54.5"
        fill="none"
        stroke={primaryColor}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Cap Tassel */}
      <path
        d="M84 49 V66 C84 68 86 70 87 70"
        stroke={accentColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="87" cy="71" r="2.5" fill={accentColor} />

      {/* Supportive Caring Hands / Leaf Arch */}
      <path
        d="M44 80 C50 86 70 86 76 80"
        stroke={accentColor}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Center Star of Excellence */}
      <polygon
        points="60,63 62,68 67,68 63,71 65,76 60,73 55,76 57,71 53,68 58,68"
        fill={primaryColor}
      />
    </svg>
  );
}
