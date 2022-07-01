import Stories from "./Stories";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";
import { useSession } from "next-auth/react";

function Feed() {
  const { data: session } = useSession();
  return (
    <div
      className={`max-w-lg  mx-auto py-12 sm:py-24 relative ${
        session?.user?.username ? "lg:max-w-4xl" : "lg:max-w-xl"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div
          className={` ${
            session?.user?.username ? "col-span-3" : "col-span-5"
          }`}
        >
          {/* Stories */}
          {session?.user?.username && <Stories />}
          {/* Posts */}
          <Posts />
        </div>
        {session?.user?.username && (
          <div className="hidden lg:block lg:col-span-2 mt-3">
            <div className="sticky top-24">
              {/* Mini Profile */}
              <MiniProfile />
              {/* Suggestions */}
              <Suggestions />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed;
