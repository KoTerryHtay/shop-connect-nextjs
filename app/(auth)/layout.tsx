import Image from "next/image";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black">
        <nav className="flex items-center justify-between px-4 h-14">
          <div className="shrink-0">
            <Image
              src="/logo.700a5055.svg"
              alt="logo"
              width={235}
              height={32}
              loading="eager"
            />
          </div>
          <div className="text-white">US English</div>
        </nav>
      </header>
      <div className="h-screen">{children}</div>
    </div>
  );
}
