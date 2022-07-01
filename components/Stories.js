import React, { useEffect, useRef, useState } from "react";

import { USERS } from "../public/data/UsersData";

import { motion } from "framer-motion";

import useWindowSize from "../helpers/useWindowSize";
import Story from "../components/Story";
import { useSession } from "next-auth/react";

const handleDeviceSize = () => {
  const isMobile = useWindowSize();

  const swiperProps = {
    desktop: {
      slidesPerView: 6,
      slidesPerGroup: 5,
      navigation: {},
      modules: [Navigation],
      spaceBetween: 10,
    },
    mobile: { slidesPerView: 5, grabCursor: true, spaceBetween: 10 },
  };
  return isMobile ? swiperProps.mobile : swiperProps.desktop;
};

function Stories() {
  const { data: session } = useSession();
  const storiesWrap = useRef();
  const [storiesWidth, setStoriesWidth] = useState(0);

  useEffect(() => {
    setStoriesWidth(
      storiesWrap.current.scrollWidth - storiesWrap.current.offsetWidth
    );
  }, []);

  return (
    <motion.div
      ref={storiesWrap}
      whileTap={{ cursor: "grabbing" }}
      className="pl-3 sm:border border-gray-200 rounded-md sm:bg-white overflow-hidden cursor-grab"
    >
      <motion.div
        className="py-4 flex space-x-4"
        drag="x"
        dragConstraints={{ left: -storiesWidth - 20, right: 0 }}
      >
        <div className="ml-1">
          <Story
            avatar={session.user.image}
            username={session?.user?.username}
          />
        </div>

        {USERS.map((user, i) => (
          <div className="ml-1" key={i}>
            <Story {...user} />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Stories;
