import type { SVGProps } from "react";

export const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 12c0-4.42-3.58-8-8-8S4 7.58 4 12" />
    <path d="M18.5 12c0-3.31-2.69-6-6-6s-6 2.69-6 6" />
    <path d="M16.5 12c0-2.21-1.79-4-4-4s-4 1.79-4 4" />
    <path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2" />
  </svg>
);
