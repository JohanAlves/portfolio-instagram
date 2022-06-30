import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

function MiniProfile() {
  const { data: session } = useSession();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 relative border border-gray-300 rounded-full overflow-hidden">
            <img src={session?.user?.image} />
          </div>
          <div>
            <h3 className="font-semibold">{session?.user?.username}</h3>
            <h4 className="text-gray-500">{session?.user?.name}</h4>
          </div>
        </div>
        <span
          onClick={signOut}
          className="text-violet-500 text-xs font-semibold cursor-pointer"
        >
          Sign out
        </span>
      </div>
    </div>
  );
}

export default MiniProfile;
