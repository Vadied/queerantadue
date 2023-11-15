import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  if (isDisabled)
    return (
      <div className={`flex h-8 w-8 items-center justify-center border border-color-black p-2 bg-background-subtle rounded disabled`}>
        {icon}
      </div>
    );

  return (
    <Link className={`flex h-8 w-8 items-center justify-center border border-color-black p-2 hover::bg-background-subtle rounded `} href={href}>
      {icon}
    </Link>
  );
}
