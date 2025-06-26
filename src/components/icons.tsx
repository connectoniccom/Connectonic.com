import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 10v4c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1H8c-.6 0-1 .4-1 1Z" />
      <path d="M15 10v4c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1Z" />
      <path d="M11 12h2" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
};
