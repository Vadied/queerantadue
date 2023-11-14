const Profile = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Id: {user.id}</p>
    </div>
  );
};

export default Profile;
