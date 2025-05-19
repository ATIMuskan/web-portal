import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
   const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ first_name: '', last_name: '', role: '' });


  useEffect(() => {
    axios.get('http://localhost:5000/external-users')
      .then(res => setUsers(res.data.data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddUser = async () => {
    try {
      await axios.post('http://localhost:5000/add-user', formData);
      alert('User added successfully!');
      setShowForm(false);
    } catch (err) {
      console.error('Add user error:', err);
      alert('Failed to add user.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
   
      <header className="bg-blue-500 shadow px-4 py-2 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-white font-medium hidden sm:inline">
            Welcome {user?.username}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </header>


      {user?.role === 'admin' && (
        <div className="flex justify-end px-8 py-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Add User
          </button>
        </div>
      )}

      
      <div className="px-8 overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Avatar</th>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-2">
                  <img src={u.avatar} alt={u.first_name} className="w-10 h-10 rounded-full" />
                </td>
                <td className="px-4 py-2">{u.first_name}</td>
                <td className="px-4 py-2">{u.last_name}</td>
                <td className="px-4 py-2">{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add New User</h3>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full mb-3 p-2 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
