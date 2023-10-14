const Home = () => {
  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };

    fetch("http://localhost:5000/adduser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          console.log("User successfully added on the database.");
          form.reset();
        } else {
          console.error("Some errors happening.");
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <h1 className="text-6xl font-bold text-center">Home page</h1>

      <form
        onSubmit={handleAddUser}
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
          />
        </div>
        <button
          className="py-3 px-5 bg-cyan-500 w-full rounded-md font-semibold uppercase"
          type="submit"
        >
          Add user
        </button>
      </form>
    </div>
  );
};

export default Home;
