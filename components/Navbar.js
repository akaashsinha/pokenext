import { HomeIcon, PuzzleIcon } from "@heroicons/react/outline";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-red-500 drop-shadow-md justify-evenly items-center">
      <div className="">
        <Link href="/" passHref>
          <a>
            <HomeIcon className="h-12 mx-auto hover:text-white" />
          </a>
        </Link>
      </div>
      <div className="">
        <Link href="/whos-that-pokemon" passHref>
          <a>
            <PuzzleIcon className="h-12 hover:text-white" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
