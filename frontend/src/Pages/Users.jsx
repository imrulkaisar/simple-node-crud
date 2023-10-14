import { useEffect, useState } from "react"; // Import necessary modules from React
import { NavLink } from "react-router-dom"; // Import NavLink for client-side navigation

const Users = () => {
  const [reload, setReload] = useState(0); // State variable to trigger reload of user data
  const [users, setUsers] = useState([]); // State variable to store the user data

  // Fetch the list of users from the server on component mount and reload
  useEffect(() => {
    fetch("http://localhost:5000/users") // Fetch the list of users from the server
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => setUsers(data)); // Set the retrieved user data in the state
  }, [reload]); // Reload the user data when the 'reload' state changes

  // Function to handle the deletion of a user
  const handleDelete = (_id) => {
    fetch(`http://localhost:5000/user/delete/${_id}`, {
      method: "DELETE", // Specify the HTTP method as DELETE
    })
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => {
        if (data.deletedCount) {
          setReload((prev) => prev + 1); // Increment the reload state to trigger data reload
        }
      });
  };

  // Log the user data to the console
  console.log(users);

  // Return the JSX elements to be rendered
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl text-center font-semibold mb-5">
        List of Users ({users.length} entries)
      </h1>
      <div className="users">
        <ul className="space-y-2">
          {/* Map through the list of users and render user details */}
          {users.map((user, index) => (
            <li className="border bg-gray-100 py-2 px-4" key={user._id}>
              <b>
                {index + 1}. {user.name} :{" "}
              </b>{" "}
              {user.email}{" "}
              <NavLink
                className="text-blue-700"
                to={`/user/update/${user._id}`}
              >
                Edit
              </NavLink>
              <button
                onClick={() => handleDelete(user._id)} // Call handleDelete function on button click
                className="px-3 py-1 rounded-full border text-sm float-right bg-white hover:bg-red-400 hover:text-white"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users; // Export the Users component
