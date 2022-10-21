const Admin = ({ user }) => {
    return (
        <div>
            <h1>The Admin Page</h1>
            <h2>Only for Admins</h2>
            <p>Admin identified as {user.email}</p>
        </div>
    );
};

export default Admin;
