//Presentation Layer: các UI components
const UserCard = ({ user }) => (
  <div  className="card">
    <h2>{user.name}</h2>
    <p>{user.email}</p>
  </div>
);

export default UserCard;
