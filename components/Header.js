import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { AiOutlineHome, AiOutlineCompass } from "react-icons/ai";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { BsPlusSquare, BsHeart, BsCamera } from "react-icons/bs";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Header() {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const router = useRouter();

  return (
    <header className="border-b  sm:border-gray-200 bg-white fixed w-full z-50">
      <div className="max-w-5xl mx-auto h-12 sm:h-16 flex items-center px-5">
        <div className="flex  sm:hidden relative  justify-start">
          <BsCamera className=" w-6 h-6" />
        </div>
        <div className="flex flex-1 justify-center sm:justify-start items-center">
          <div
            className="relative w-[110px] sm:w-[102px] h-7 mt-1 sm:h-16 cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            <Image
              src="/img/Instagram-Logo.png"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div className="hidden md:flex justify-center sm:min-w-[270px]">
          <div className="relative  max-w-[270px] w-full">
            <BiSearch className="absolute left-2 h-full text-gray-400 text-lg pointer-events-none " />
            <input
              type="text"
              name="search"
              placeholder="Search"
              className="bg-gray-100 rounded-md h-full w-full p-2 pl-8"
            />
          </div>
        </div>
        <div className="flex sm:flex-1 h-full sm:space-x-5 sm:pl-5 items-center justify-end">
          <AiOutlineHome
            onClick={() => {
              router.push("/");
            }}
            className="button hidden sm:inline -mt-1"
          />
          {session ? (
            <>
              <div className="relative">
                <HiOutlinePaperAirplane className="button -mt-2 rotate-[60deg]" />
                <span className="absolute bg-red-500 text-white text-xs w-4 h-4 flex justify-center items-center -top-2 -right-2 animate-bounce rounded-full">
                  2
                </span>
              </div>
              <BsPlusSquare
                onClick={() => {
                  setModalOpen(true);
                }}
                className="button hidden sm:inline"
              />
              <AiOutlineCompass className="button hidden sm:inline !w-7 !h-7" />
              <BsHeart className="button hidden sm:inline" />
              <div className="w-8 h-8 cursor-pointer relative hidden sm:inline border border-gray-300 rounded-full overflow-hidden">
                <img
                  onClick={signOut}
                  src={session?.user?.image}
                  alt=""
                  className="w-full"
                />
              </div>
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
