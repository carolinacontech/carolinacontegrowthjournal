import { CategoryIcon } from "./CategoryIcon";

const treatments = [
  "bg-[radial-gradient(circle_at_20%_16%,rgba(121,201,68,.55)_0_1px,transparent_2px),radial-gradient(circle_at_60%_60%,rgba(121,201,68,.4)_0_1.5px,transparent_2px)] bg-[length:38px_27px,55px_38px]",
  "bg-[linear-gradient(45deg,transparent_45%,rgba(121,201,68,.16)_46%_54%,transparent_55%)] bg-[length:44px_44px]",
  "bg-[radial-gradient(ellipse_at_10%_70%,rgba(121,201,68,.55),transparent_45%),linear-gradient(160deg,#081318_20%,#1c5d38_65%,#081318_100%)]",
  "bg-[repeating-linear-gradient(115deg,rgba(121,201,68,.14)_0_2px,transparent_2px_26px)]",
  "bg-[radial-gradient(circle_at_80%_20%,rgba(121,201,68,.35),transparent_40%),radial-gradient(circle_at_15%_85%,rgba(121,201,68,.25),transparent_35%)]",
];

function hashString(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function CoverArt({
  seed,
  category,
  className = "",
  iconSize = "size-10",
}: {
  seed: string;
  category?: string;
  className?: string;
  iconSize?: string;
}) {
  const treatment = treatments[hashString(seed) % treatments.length];
  return (
    <div className={`relative overflow-hidden bg-navy ${treatment} ${className}`}>
      {category && (
        <span className={`absolute right-3 top-3 text-signal/40 ${iconSize}`}>
          <CategoryIcon category={category} />
        </span>
      )}
    </div>
  );
}
