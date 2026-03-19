const Sidebar = ({ users, selectedUser, setSelectedUser }) => {
  return (
    <div className="w-1/4 bg-gray-800 border-r border-gray-700">

      {/* Header */}
      <div className="p-4 text-xl font-semibold border-b border-gray-700 text-white">
        Chats
      </div>

      {/* Users */}
      <div className="p-2">
        {users.length === 0 ? (
          <p className="text-gray-400 text-sm p-3">
            No users found
          </p>
        ) : (
          users.map((u) => (
            <div
              key={u._id}
              onClick={() => setSelectedUser(u)}
              className={`p-3 rounded cursor-pointer mb-2 transition ${
                selectedUser?._id === u._id
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              {/*  THIS IS WHERE YOUR CODE GOES */}
              <div className="flex items-center gap-3">
                
                {/* Avatar */}
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {u.username.charAt(0).toUpperCase()}
                </div>

                {/* Username */}
                <span className="text-white">{u.username}</span>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;