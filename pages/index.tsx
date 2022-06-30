import { useSession } from "next-auth/react";
import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    !session && router.push("/auth/signin");
  }, []);

  return (
    <>
      <Head>
        <title>Instagram Remake</title>
        <link rel="icon" href="/img/favicon1.ico" />
      </Head>
      {session && (
        <>
          <Header />
          <div className="bg-gray-50 min-h-screen">
            <Feed />
          </div>
          {/* Modal */}
          <Modal />
        </>
      )}
    </>
  );
};

export default Home;
