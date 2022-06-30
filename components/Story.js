import { motion } from "framer-motion";

function Story({ avatar, username }) {
  return (
    <motion.div className="w-16">
      <motion.div className=" bg-gradient-to-tr from-yellow-400 to-pink-500 w-[68px] h-[68px]  p-[1px] rounded-full flex justify-center items-center">
        <motion.div className="border-[2px] rounded-full border-white w-16 h-16 bg-white">
          <img src={avatar} className="rounded-full pointer-events-none" />
        </motion.div>
      </motion.div>
      <motion.div className="text-xs text-center mt-1">
        {username.substring(0, 7)}...
      </motion.div>
    </motion.div>
  );
}

export default Story;
