import { IoImagesOutline } from "react-icons/io5";
import { useRef, useState } from "react";

function DragImage({ onFileChange }) {
  const ImageWrapper = useRef(null);
  const ImageIcon = useRef(null);
  const [image, setImage] = useState();

  const onDragEnter = () => {
    ImageWrapper.current.classList.add("!bg-gray-100");
    ImageIcon.current.classList.add("!text-violet-500");
  };

  const onDragLeave = () => {
    ImageWrapper.current.classList.remove("!bg-gray-100");
    ImageIcon.current.classList.remove("!text-violet-500");
  };

  const onDrop = () => {
    ImageWrapper.current.classList.remove("!bg-gray-100");
    ImageIcon.current.classList.remove("!text-violet-500");
  };

  const onFileDrop = (e) => {
    e.preventDefault();
    const newFile = e.target.files[0];
    if (newFile) {
      setImage(newFile);
      onFileChange(newFile);
    }
  };

  return (
    <>
      <div
        ref={ImageWrapper}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className="flex flex-col w-full h-full justify-center items-center transition-all relative"
      >
        <div
          ref={ImageIcon}
          className="text-gray-400 pointer-events-none transition-all"
        >
          <IoImagesOutline className="w-full h-32 " />
          <span className="text-lg ">Drag your photos here</span>
        </div>
        <label
          htmlFor="new-image"
          className="button !w-auto !h-auto bg-violet-600 px-4 py-1 rounded-md text-white mt-3"
        >
          Select from computer
        </label>
        <input
          type="file"
          id="new-image"
          className="absolute w-full h-full opacity-0 pointer-events-none"
          value=""
          onChange={onFileDrop}
        />
      </div>
    </>
  );
}

export default DragImage;
