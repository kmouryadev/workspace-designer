export const ErrorIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v6M12 16.5v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7.5v.01M12 11v5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CheckCircleIcon = ({ size = 16, fillColor = "#A9722A" }: { size?: number; fillColor?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="8" fill={fillColor} />
    <path d="M4.5 8.2 7 10.7 11.5 5.8" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const PlusCircleIcon = ({ size = 16, fillColor = "#17263F" }: { size?: number; fillColor?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="8" fill={fillColor} />
    <path d="M8 4.5v7M4.5 8h7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-.8 12.1a2 2 0 0 1-2 1.9H9.8a2 2 0 0 1-2-1.9L7 7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const CheckmarkIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12.5 9.5 17 19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const ChevronLeftIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M14.5 6 8 12l6.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const LogoMark = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
    <circle cx="18" cy="18" r="18" fill="#A9722A" />
    <path d="M18 10a7 7 0 0 1 7 7h-14a7 7 0 0 1 7-7Z" fill="#FBF4E6" />
    <path d="M7 23h22" stroke="#FBF4E6" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 27h18" stroke="#FBF4E6" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
  </svg>
);

export const WrenchIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M14.7 6.3a1 1 0 0 0-1.4 0l-7 7a1 1 0 0 0-.25.4l-1 3a1 1 0 0 0 1.25 1.25l3-1a1 1 0 0 0 .4-.25l7-7a1 1 0 0 0 0-1.4l-2-2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);
