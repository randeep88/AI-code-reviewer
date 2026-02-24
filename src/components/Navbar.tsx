import Image from "next/image";

const Navbar = async () => {
  return (
    <div className="w-full h-16 bg-transparent">
      <div className="flex fixed top-0 left-20 transform -translate-x-1/2 items-center justify-center py-3  rounded-full z-50">
        <div className="text-lg font-medium font-mono flex items-center gap-2">
          <Image width={30} height={30} src="/logo3.png" alt="logo" />
          Review AI
        </div>
      </div>
    </div>
  );
};

export default Navbar;
