const User = ({ user }) => {
    return (
        <div>
            <div>
                <h1>The User Page</h1>
                <h2>Only for Users</h2>
                <p>User identified as {user.email}</p>
            </div>
        </div>
    );
};

export default User;
