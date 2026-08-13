const icons: Record<string, string> = {
  "llm seo":
    "M14 10h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H22l-6 5v-5h-2a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2Z M18 18h12 M18 23h8",
  "ai seo":
    "M22 8c7 0 12.6 5.6 12.6 12.6S29 33.2 22 33.2 9.4 27.6 9.4 20.6 15 8 22 8Z M31 30l8 8 M22 15v11.2 M16.4 20.6h11.2",
  "growth engineering":
    "M8 39h33 M11 29h5v10h-5z M19 24h5v15h-5z M27 18h5v21h-5z M35 13h5v26h-5z M10 25l8-8 6 4 13-13 M32 8h5v5",
  automation:
    "M24 9a15 15 0 1 1-10.6 4.4 M24 9v8 M13.4 13.4l5.6 5.6",
  "growth systems":
    "M8 40h32 M12 33l8-11 7 6 12-16 M39 12h-8v8",
  default:
    "M14 10h20a2 2 0 0 1 2 2v22a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2Z M18 17h12 M18 23h12 M18 29h8",
};

export function CategoryIcon({ category }: { category: string }) {
  const path = icons[category.toLowerCase()] ?? icons.default;
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="size-10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}
