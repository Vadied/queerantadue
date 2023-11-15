import Link from "next/link";

type Props = {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
};
export default function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: Props) {

  if (isActive || position === "middle")
    return (
      <div
        className={`flex h-8 w-8 items-center justify-center border border-color-black p-2 bg-background-subtle rounded disabled`}
      >
        {page}
      </div>
    );

  return (
    <Link
      href={href}
      className={`flex h-8 w-8 items-center justify-center border border-color-black p-2 hover::bg-background-subtle rounded`}
    >
      {page}
    </Link>
  );
}
