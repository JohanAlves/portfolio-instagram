import { getProviders, signIn, useSession } from "next-auth/react";
import Head from "next/head";

export default function SignIn({ providers }) {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Log in - Instagram Remake</title>
        <link rel="icon" href="/img/favicon.ico" />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="bg-gray-50  min-h-screen max-w-screen flex justify-center items-center p-5">
        {session !== null ? (
          <span className="text-lg">
            You're already logged in. Redirecting...
          </span>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl max-w-sm w-full mx-auto ">
            <div className="hidden md:block">
              <img src="/img/image-login.png" alt="" />
            </div>
            <div className="px-4 bg-white border border-gray-300 flex flex-col items-center">
              <div className="max-w-[300px] w-full flex flex-col items-center p-5 pb-9 h-[300px]">
                <img
                  className="py-14 w-52"
                  src="/img/Instagram-Logo.png"
                  alt=""
                />
                <form
                  action=""
                  className="flex flex-col items-center space-y-2 w-full"
                >
                  <span className="text-gray-400 py-2">
                    Educational purpose ONLY
                  </span>
                  {/* <input
                    type="text"
                    placeholder="Username"
                    disabled
                    className="w-full border border-gray-300 p-2 bg-gray-50 rounded-md disabled:bg-gray-200"
                  />
                  <input
                    type="text"
                    disabled
                    placeholder="Password"
                    className="w-full border border-gray-300 p-2 bg-gray-50 rounded-md disabled:bg-gray-200"
                  />
                  <button
                    type="submit"
                    disabled
                    className="w-full border inline-block border-gray-300 p-2 bg-violet-500 disabled:bg-violet-300 text-white font-semibold rounded-md"
                  >
                    Log In
                  </button> */}
                </form>
                {/* <div className=" mt-3 mb-9 border-b border-gray-300 w-full flex justify-center">
                  <div className="bg-white px-5 -mb-3 z-30 flex text-gray-500 font-semibold">
                    OR
                  </div>
                </div> */}
                {Object.values(providers).map((provider) => (
                  <div key={provider.name} className="w-full">
                    <button
                      onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                      className="hover:scale-105 transition-all w-full border border-gray-300 p-2  rounded-md font-semibold"
                    >
                      Sign in with {provider.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
