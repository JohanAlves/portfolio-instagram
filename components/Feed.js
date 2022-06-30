import Stories from "./Stories";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";

function Feed() {
  return (
    <div className="max-w-lg lg:max-w-4xl  mx-auto py-12 sm:py-24 relative">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="col-span-3">
          {/* Stories */}
          <Stories />
          {/* Posts */}
          <Posts />
        </div>
        <div className="hidden lg:block lg:col-span-2 mt-3">
          <div className="sticky top-24">
            {/* Mini Profile */}
            <MiniProfile />
            {/* Suggestions */}
            <Suggestions />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
