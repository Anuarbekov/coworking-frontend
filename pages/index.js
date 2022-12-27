import Main from "../components/Main";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import { verify } from "jsonwebtoken";

import { useEffect } from "react";
const App = ({ session }) => {
  const { data, status } = useSession();
  const secret = process.env.JWT_SECRET;
  const usesecret = () => {
    verify(session.user.token, secret);
  };
  const handleGetAllUsers = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/users/", {
        headers: { Authorization: `Bearer ${session.user.token}` },
      });
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="height-screen width-screen">
      <button onClick={usesecret}>click</button>
      {status === "authenticated" ? (
        <>
          {session.user.email}
          <br />
          <button onClick={() => signOut()}>Sign out</button>
          <br />
          <button onClick={(e) => handleGetAllUsers(e)}>Get All Users</button>
        </>
      ) : (
        <>
          <Link href="/auth/register">
            <button onClick={() => {}}>Register</button>
          </Link>

          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      <Main status={status} />
    </div>
  );
};
export default App;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session: session,
    },
  };
}
