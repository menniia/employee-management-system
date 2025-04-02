
// Updated mock users with more users
const mockUsers = [
    { id: 1, name: "Admin", email: "admin@gmail.com", password: "admin123", role: "hr manager" },
    { id: 2, name: "John Doe", email: "john@gmail.com", password: "john123", role: "employee" },
    { id: 3, name: "Dennis Ofosu", email: "dennis@gmail.com", password: "dennis123", role: "employee" },
    { id: 4, name: "Jane Smith", email: "jane@gmail.com", password: "jane123", role: "employee" },
    { id: 5, name: "Michael Brown", email: "michael@gmail.com", password: "michael123", role: "employee" },
    { id: 6, name: "Sarah Johnson", email: "sarah@gmail.com", password: "sarah123", role: "employee" },
    { id: 7, name: "David Wilson", email: "david@gmail.com", password: "david123", role: "employee" },
    { id: 8, name: "Emily Davis", email: "emily@gmail.com", password: "emily123", role: "employee" },
];

// Save updated mock users to localStorage only if not already set
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(mockUsers));
}

// Function to get users from localStorage
export const getUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || [];
};

// Function to save users to localStorage
export const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
};

// Example function to add a new user dynamically
export const addUser = (newUser) => {
    const users = getUsers();
    newUser.id = users.length + 1; // Assign a new ID
    users.push(newUser);
    saveUsers(users);
};


export const updateUserPassword = (email, newPassword) => {
  let users = getUsers();
  users = users.map((user) =>
    user.email === email ? { ...user, password: newPassword } : user
  );
  localStorage.setItem("users", JSON.stringify(users));
};
