import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../recoil/useAuth';
import {
  FaArrowLeft,
  FaExclamationTriangle,
  FaUsers,
  FaUtensils,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaLink,
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Dashboard() {
  // State for storing data
  const [attractions, setAttractions] = useState([]);
  const [events, setEvents] = useState([]);
  const [dining, setDining] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('attractions');
  const [selectedRole, setSelectedRole] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const config = { withCredentials: true };
        const [aRes, eRes, dRes, uRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_FETCH_URL}/api/attractions/admin/all`, config),
          axios.get(`${import.meta.env.VITE_FETCH_URL}/api/events/admin/all`, config),
          axios.get(`${import.meta.env.VITE_FETCH_URL}/api/dining/admin/all`, config),
          axios.get(`${import.meta.env.VITE_FETCH_URL}/api/users/admin/all`, config),
        ]);
        const getArray = (res) => {
          if (Array.isArray(res.data?.data)) return res.data.data;
          return [];
        };
        setAttractions(getArray(aRes));
        setEvents(getArray(eRes));
        setDining(getArray(dRes));
        setUsers(getArray(uRes));
        setError(null);
      } catch (err) {
        console.log('Error fetching the data :', err);
        setError('Failed to fetch the data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user?.role === 'contributor') {
      toast.info('Limited access: You are logged in as a contributor.', {
        position: 'top-right',
        autoClose: 6000,
        style: {
          background: '#1F2937', // Tailwind gray-800
          color: 'white',
        },
      });
    }
    if (user?.role === 'recruiter') {
      toast.info(
        'Limited access: You are logged in as a recruiter. Recruiters are only allowed to view the UI.',
        {
          position: 'top-right',
          autoClose: 6000,
          style: {
            background: '#1F2937', // Tailwind gray-800
            color: 'white',
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    console.log(`attractions ${attractions}`);
  }, [attractions, events, dining, users]);

  // Calculate statistics
  const computeStats = (items) => {
    if (!Array.isArray(items)) return { total: 0, softDeleted: 0, featured: 0 };
    return {
      total: items.length,
      softDeleted: items.filter((i) => i.isDeleted).length,
      featured: items.filter((i) => i.isFeatured).length,
    };
  };

  // Get current items based on active tab
  const getCurrentItems = () => {
    switch (activeTab) {
      case 'attractions':
        return attractions;
      case 'events':
        return events;
      case 'dining':
        return dining;
      case 'users':
        return users;
      default:
        return [];
    }
  };

  const aStats = computeStats(attractions);
  const eStats = computeStats(events);
  const dStats = computeStats(dining);
  const uStats = computeStats(users);
  const overallTotal = aStats.total + eStats.total + dStats.total + uStats.total;

  const handleSoftDelete = async (id) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_FETCH_URL}/api/${activeTab}/admin/soft/${id}`, {
        withCredentials: true,
      });
      console.log(activeTab);
      toast.success('Soft delete was successfull');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Soft delete Unsuccessful');
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(activeTab);
      const res = await axios.delete(`${import.meta.env.VITE_FETCH_URL}/api/${activeTab}/admin/hard/${id}`, {
        withCredentials: true,
      });
      toast.success('hard delete was successfull');
    } catch (err) {
      console.error('Error while hard deleting', err.response?.data?.message);
      toast.error(err.response?.data?.message || 'hard delete Unsuccessful');
    }
  };

  const handleRoleChange = async (userId) => {
    const newRole = selectedRole[userId];
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_FETCH_URL}/api/users/admin/userRole/${userId}`,
        { role: newRole },
        { withCredentials: true }
      );

      toast.success(res.data?.message);
    } catch (err) {
      toast.error(err.response?.data?.message || 'User role change failed');
    }
  };

  const handleSelectChange = (userId, value) => {
    setSelectedRole((prev) => ({
      ...prev,
      [userId]: value,
    }));
  };
  const handleAddData = (currentTab) => {
    const url = `/admin/add?tab=${currentTab}`;
    window.open(url, '_blank');
  };
  const handleUpdateData = (currentTab, slug) => {
    const url = `/admin/update?slug=${slug}&tab=${currentTab}`;
    window.open(url, '_blank');
  };
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }
  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <FaExclamationTriangle className="mx-auto text-yellow-500 text-5xl mb-6" />
          <h2 className="text-2xl font-semibold mb-4">Error Loading Dashboard</h2>
          <p className="text-gray-400 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-teal-600 hover:bg-teal-700 transition-colors rounded-md text-white font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gray-900 text-white animate-fadeInMore">
      {/* Header */}
      <header className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
          <div className="flex justify-between items-end">
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <FaArrowLeft className="mr-2" /> Back to Site
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-5 mb-8">
          {/* Total Items */}
          <StatContainer
            icon={<FaUsers className="h-8 w-8 text-teal-400" />}
            name={'Total Items'}
            stats={overallTotal}
          />
          {/* Total Users */}
          <StatContainer
            icon={<FaUsers className="h-8 w-8 text-teal-400" />}
            name={'Total Users'}
            stats={uStats}
          />
          {/* Attractions Stats */}
          <StatContainer
            icon={<FaMapMarkerAlt className="h-8 w-8 text-teal-400" />}
            name={'Attraction'}
            stats={aStats}
          />
          {/* Events Stats */}
          <StatContainer
            icon={<FaCalendarAlt className="h-8 w-8 text-teal-400" />}
            name={'Events'}
            stats={eStats}
          />
          {/* Dining Stats */}
          <StatContainer
            icon={<FaUtensils className="h-8 w-8 text-teal-400" />}
            name={'Dining'}
            stats={dStats}
          />
        </div>

        {/* Toggleable Table Section */}
        {renderToggleableTable()}
      </main>
    </div>
  );

  // Render toggleable table
  function renderToggleableTable() {
    const items = getCurrentItems();
    const currentTabStats =
      activeTab === 'attractions'
        ? aStats
        : activeTab === 'events'
          ? eStats
          : activeTab === 'dining'
            ? dStats
            : uStats;

    return (
      <div className="relative ">
        <div className="bg-gray-800 rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-6 grid:cols-1 md:grid-cols-2">
            <div className="px-4 w-40 py-2">
              <h2 className="text-lg font-medium text-white ">
                All {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                <div className="ml-2 text-sm text-gray-400">({currentTabStats.total} items)</div>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
              <button
                onClick={() => setActiveTab('attractions')}
                className={`inline-flex items-center justify-center px-10 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none ${
                  activeTab === 'attractions'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <FaMapMarkerAlt className="mr-2" /> All Attractions
              </button>

              <button
                onClick={() => setActiveTab('events')}
                className={`inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none ${
                  activeTab === 'events'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <FaCalendarAlt className="mr-2" /> All Events
              </button>

              <button
                onClick={() => setActiveTab('dining')}
                className={`inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none ${
                  activeTab === 'dining'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <FaUtensils className="mr-2" /> All Dining
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none ${
                  activeTab === 'users'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <FaUsers className="mr-2" /> Manage Users
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Photo URL
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    ID
                  </th>
                  {activeTab !== 'users' && (
                    <>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Delete Item
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        add
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        update
                      </th>
                    </>
                  )}
                  {activeTab === 'users' && (
                    <>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        email address
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        roles
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Set Role
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <tr key={item._id} className="hover:bg-gray-750 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-white">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                        {item.mainImage ? (
                          <a
                            href={item.mainImage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-400 hover:text-teal-300 break-all flex items-center "
                          >
                            <FaLink className="text-[15px]" /> <span className="px-1">URL</span>
                          </a>
                        ) : (
                          <span className="text-gray-500">No photo</span>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(item.created_on).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        {item.isDeleted ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-900 text-red-200">
                            Deleted
                          </span>
                        ) : item.isFeatured ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-900 text-teal-200">
                            Featured
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-700 text-gray-300">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                        {item._id}
                      </td>
                      {activeTab !== 'users' && (
                        <>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300 ">
                            <button
                              onClick={() => handleSoftDelete(item._id)}
                              className="font-chillax px-3 bg-myteal-900 rounded-sm mr-2"
                            >
                              Soft
                            </button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="font-chillax px-3 bg-red-900 rounded-sm"
                            >
                              hard
                            </button>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300 ">
                            <button
                              onClick={() => handleAddData(activeTab)}
                              className="font-chillax px-3 bg-myteal-900 rounded-sm mr-2"
                            >
                              Add
                            </button>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300 ">
                            <button
                              onClick={() => handleUpdateData(activeTab, item.slug)}
                              className="font-chillax px-3 bg-myteal-900 rounded-sm mr-2"
                            >
                              Update
                            </button>
                          </td>
                        </>
                      )}

                      {activeTab === 'users' && (
                        <>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                            {item.email}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300 ">
                            <button
                              onClick={() => handleAddData(activeTab)}
                              className="font-chillax px-3 bg-myteal-900 rounded-sm mr-2"
                            >
                              {item.role}
                            </button>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300 ">
                            <select
                              value={selectedRole[item._id] || item.role}
                              onChange={(e) => handleSelectChange(item._id, e.target.value)}
                              className="bg-gray-700 py-1 px-1 rounded-sm mr-2"
                            >
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                              <option value="recruiter">Recruiter</option>
                              <option value="contributor">Contributor</option>
                            </select>
                            <button
                              className="font-chillax px-3 py-1 bg-myteal-900 rounded-sm mr-2"
                              onClick={() => handleRoleChange(item._id)}
                            >
                              Save
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className=" py-10 text-center text-gray-400">
                      No {activeTab} found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const StatContainer = ({ icon, name, stats }) => {
  return (
    <>
      <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">{icon}</div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-400 truncate">{name}</dt>
                {name !== 'Total Items' ? (
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-white">{stats.total}</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-teal-400">
                      {stats.featured} featured 
                    </div>
                  </dd>
                ) : (
                  <dd>
                    <div className="text-2xl font-semibold">{stats}</div>
                  </dd>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
