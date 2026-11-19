export default function KrisNote({
  children,
  title = "Kris's take",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <aside className="my-8 border-y border-line2 py-5">
      <p className="eyebrow text-cloudText">{title}</p>
      <p className="mt-3 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[62ch]">
        {children}
      </p>
    </aside>
  );
}
