import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "./Post";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <>
      {posts.map((post) => {
        console.log(post.data());
        return (
          <div
            key={post.id}
            className="mb-5 sm:mt-3 sm:border border-gray-200 sm:rounded-md bg-white"
          >
            <Post
              id={post.id}
              username={post.data().username}
              avatar={post.data().profileImg}
              description={post.data().caption}
              image={post.data().image}
              timestamp={post.data().timestamp}
            />
          </div>
        );
      })}
    </>
  );
}

export default Posts;
