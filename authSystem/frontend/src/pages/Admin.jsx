function Admin() {
  const users = [
    { name: "John", role: "user" },
    { name: "Sarah", role: "admin" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-4xl font-bold text-red-500 mb-6">
        Admin Control Panel 👑
      </h1>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl mb-4">User Overview</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="p-2">Name</th>
              <th className="p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="hover:bg-gray-700 transition"
              >
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;