import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  BsThreeDots,
  BsChatDots,
  BsBookmark,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";
import { HiOutlinePaperAirplane, HiOutlineEmojiHappy } from "react-icons/hi";
import Moment from "react-moment";
import { db } from "../firebase";

function Post({ id, username, avatar, image, description }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  return (
    <>
      <div className="flex items-center p-2.5">
        <div className="bg-gradient-to-tr from-yellow-400 to-pink-500 w-[42px] h-[42px] p-[1px] rounded-full flex justify-center items-center ">
          <div className="border-[2px] rounded-full flex justify-center items-center border-white w-full h-full bg-white">
            <img src={avatar} alt="" className="w-full  rounded-full" />
          </div>
        </div>
        <h2 className="text-sm font-semibold flex-1 ml-2">{username}</h2>
        <BsThreeDots className="button" />
      </div>

      {/* Image */}
      <img
        src={image}
        alt=""
        className="h-[470px] w-full object-cover object-center"
      />

      {/* Post's Buttons line */}
      <div className="flex items-center p-2.5 justify-between">
        <div className="flex space-x-4">
          {hasLiked ? (
            <BsHeartFill onClick={likePost} className="button text-red-600" />
          ) : (
            <BsHeart onClick={likePost} className="button" />
          )}
          <BsChatDots className="button" />
          <HiOutlinePaperAirplane className="button -mt-1 rotate-[60deg]" />
        </div>
        <BsBookmark className="button" />
      </div>

      {/* Likes Count */}
      {likes.length > 0 && (
        <p className="py-2.5 pl-2.5 text-sm font-bold">
          {likes.length} {likes.length == 1 ? "like" : "likes"}
        </p>
      )}

      {/*  Avatar and description */}
      <div className="pl-2.5 text-sm pb-6">
        <span className="font-bold mr-2">{username}</span>
        {description}
      </div>

      {/* Comments */}
      {comments.length > 0 && (
        <div className="ml-5 h-20 overflow-scroll scrollbar-thumb-gray-300  scrollbar-thin ">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-center space-x-2 mb-3 pr-4"
            >
              <img
                className="h-7 w-7 rounded-full"
                src={comment.data().userImage}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold mr-2">
                  {comment.data().username}
                </span>
                {comment.data().comment}
              </p>
              <Moment className="text-xs" fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* Comments input */}
      <div className="p-2.5 flex border-t border-gray-200">
        <HiOutlineEmojiHappy className="button" />
        <input
          type="text"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="Add a comment..."
          className="flex-1 pl-2 text-sm"
        />
        <button
          disabled={!comment.trim()}
          onClick={sendComment}
          className="text-violet-500 font-semibold cursor-pointer disabled:text-violet-300 disabled:pointer-events-none"
        >
          Post
        </button>
      </div>
    </>
  );
}

export default Post;
