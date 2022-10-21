import firebaseApp from "../firebase/firebase";
import { getAuth, signOut } from "firebase/auth";

import Admin from "./Admin";
import User from "./User";

const Home = ({ user }) => {
    const auth = getAuth(firebaseApp);

    console.log("user en home", user);
    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => signOut(auth)}>Log Out</button>
            {user.role === "admin" ? (
                <Admin user={user} />
            ) : (
                <User user={user} />
            )}
        </div>
    );
};

export default Home;
