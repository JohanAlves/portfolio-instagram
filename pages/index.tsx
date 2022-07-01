import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";

const Home = () => {
  return (
    <>
      <Head>
        <title>Instagram Remake</title>
        <link rel="icon" href="/img/favicon.ico" />
        <meta name="robots" content="noindex" />
      </Head>

      <Header />
      <div className="bg-gray-50 min-h-screen">
        <Feed />
      </div>
      {/* Modal */}
      <Modal />
    </>
  );
};

export default Home;
