import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { FaTimes } from "react-icons/fa";
import { IoImagesOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { useSession } from "next-auth/react";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Modal() {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [selectedImage, setSelectedImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const ImageWrapper = useRef(null);
  const ImageIcon = useRef(null);
  const captionRef = useRef(null);
  const { data: session } = useSession();

  const { getRootProps, getInputProps, open, isDragAccept } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      setSelectedImage(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
  });

  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadBytes(imageRef, selectedImage, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    setModalOpen(false);
    setLoading(false);
    setSelectedImage(null);
  };

  return (
    <>
      {modalOpen && (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen  flex justify-center items-center p-5">
          <FaTimes
            onClick={() => {
              setModalOpen(false);
              setSelectedImage(null);
            }}
            className="absolute right-10 top-5 text-white button z-[51]"
          />

          <motion.div
            animate={{
              scale: [0.9, 1.15, 1],
              opacity: [0, 1],
            }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            className="z-[51] max-w-xl min-h-[60vh] w-full mx-auto bg-white rounded-lg flex flex-col relative"
          >
            <div className="flex w-full items-center justify-center border-b border-gray-300 py-2 font-semibold">
              Create new post
            </div>
            {selectedImage ? (
              <div className="flex flex-col justify-center items-center w-full h-full p-4">
                <img
                  src={selectedImage.preview}
                  alt={selectedImage.name}
                  onClick={open}
                  className="h-[45vh] object-cover cursor-pointer"
                />
                <div className="w-full mt-3">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className=" h-10 w-10 relative border border-gray-300 rounded-full overflow-hidden">
                      <img src={session?.user?.image} />
                    </div>
                    <span className="font-semibold">
                      {session?.user?.username}
                    </span>
                  </div>
                  <textarea
                    name=""
                    placeholder="Write a caption..."
                    id=""
                    ref={captionRef}
                    rows="3"
                    className="border-b border-gray-300 w-full p-2 mb-3"
                  ></textarea>
                  <button
                    onClick={() => {
                      uploadPost();
                    }}
                    disabled={!selectedImage || loading}
                    className="button inline-block !w-auto !h-auto bg-violet-600 px-4 py-1 rounded-md text-white mb-4 disabled:bg-violet-300 disabled:pointer-events-none"
                  >
                    {loading ? "Uploading..." : "Upload Post"}
                  </button>
                </div>
              </div>
            ) : (
              <div
                ref={ImageWrapper}
                className={`flex flex-col w-full min-h-[50vh] justify-center items-center transition-all ${
                  isDragAccept ? "!bg-gray-100" : ""
                }`}
                {...getRootProps()}
              >
                <div
                  ref={ImageIcon}
                  className="text-gray-400 pointer-events-none transition-all"
                >
                  <IoImagesOutline
                    className={`w-full h-32 ${
                      isDragAccept ? "!text-violet-600" : ""
                    }`}
                  />
                  <span className="text-lg">Drag your photos here</span>
                </div>
                <span
                  onClick={open}
                  className="button !w-auto !h-auto bg-violet-600 px-4 py-1 rounded-md text-white mt-3"
                >
                  Select from computer
                </span>
                <input
                  type="file"
                  id="new-image"
                  {...getInputProps}
                  className="hidden"
                />
              </div>
            )}
          </motion.div>
          <div
            onClick={() => {
              setModalOpen(false);
              setSelectedImage(null);
            }}
            className="bg-black-overlay absolute w-full h-full"
          ></div>
        </div>
      )}
    </>
  );
}

export default Modal;
