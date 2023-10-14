import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const loadedUser = useLoaderData();
  const userInfo = loadedUser[0];
  const navigate = useNavigate();

  // Function to handle the update of a user
  const handleUpdateUser = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const form = e.target; // Access the form element from the event
    const name = form.name.value; // Extract the value of the 'name' field from the form
    const email = form.email.value; // Extract the value of the 'email' field from the form

    const user = { name, email }; // Create a user object with the extracted name and email

    // Make a PUT request to update the user information
    fetch(`http://localhost:5000/user/update/${userInfo._id}`, {
      method: "PUT", // Specify the HTTP method as PUT
      headers: {
        "content-type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify(user), // Convert the user object to JSON and send it in the request body
    })
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => {
        console.log(data); // Log the response data to the console
        navigate("/users"); // Navigate to the '/users' route after the update is complete
      });
  };

  return (
    <div>
      <h2>Update user info:</h2>
      <form
        onSubmit={handleUpdateUser}
        className="max-w-md mx-auto mt-14 p-6 border border-gray-200 bg-gray-100 rounded-lg space-y-5"
      >
        <div className="flex flex-col gap-2">
          <label className="sr-only" htmlFor="name">
            Full name:
          </label>
          <input
            className="px-5 py-3 focus:outline-none"
            type="text"
            name="name"
            id="name"
            placeholder="Your name"
            defaultValue={userInfo?.name}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="sr-only" htmlFor="email">
            Email Address:
          </label>
          <input
            className="px-5 py-3 focus:outline-none"
            type="text"
            name="email"
            id="email"
            placeholder="Your email address"
            defaultValue={userInfo?.email}
          />
        </div>
        <button
          className="py-3 px-5 bg-cyan-500 w-full rounded-md font-semibold uppercase"
          type="submit"
        >
          Update user info
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
