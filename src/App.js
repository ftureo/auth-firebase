import { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";

import firebaseApp from "./firebase/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebaseApp);

const App = () => {
    const [user, setUser] = useState(null);

    const firestore = getFirestore(firebaseApp);

    const getUserFirestore = async (uid) => {
        const docRef = doc(firestore, `users/${uid}`);
        const docSnap = await getDoc(docRef);
        const role = docSnap.data().role;
        return role;
        // Conseguimos el rol del usuario
    };

    const setUserWithFirestoreRole = (userFromFirebase) => {
        // Traer el usuario por ID - Usar un metodo getUserFirestore
        getUserFirestore(userFromFirebase.uid).then((role) => {
            // console.log("role", role);
            // Armar el objeto con el usuario y el rol
            const userWithRole = {
                uid: userFromFirebase.uid,
                email: userFromFirebase.email,
                role: role,
            };
            setUser(userWithRole);
        });
    };

    // console.log("user", user);
    onAuthStateChanged(auth, (userFromFirebase) => {
        // console.log("userFromFirebase.uid", userFromFirebase.uid);
        if (userFromFirebase) {
            if (!user) {
                setUserWithFirestoreRole(userFromFirebase);
            }
        } else {
            setUser(null);
        }
    });

    return (
        <div className="App">
            <h1>Authentication React + Firebase</h1>
            {user ? <Home user={user} /> : <Login />}
        </div>
    );
};

export default App;
