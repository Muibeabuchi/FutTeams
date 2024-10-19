import Image from "next/image";
import Link from "next/link";
import { DottedSeparator } from "./doted-separator";
import Navigation from "./navigation";

type Props = {};

function Sidebar({}: Props) {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full ">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={50} height={50} />
      </Link>
      <DottedSeparator className="my-4" />
      <Navigation />
    </aside>
  );
}

export default Sidebar;
