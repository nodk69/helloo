import { useState, useEffect } from 'react';
import { useGetAllGrievancesQuery, useGetGrievancesByStatusQuery } from '../api/grievancesApi';
import GrievanceCard from '../components/grievances/GrievanceCard';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import StatusBadge from '../components/grievances/StatusBadge';

const DashboardPage = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isVisible, setIsVisible] = useState(true); // Controls visibility + animation

  const {
    data: allGrievances = [],
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useGetAllGrievancesQuery();

  const {
    data: pendingGrievances = [],
    isLoading: isLoadingPending,
    isError: isErrorPending,
  } = useGetGrievancesByStatusQuery('PENDING');

  const {
    data: resolvedGrievances = [],
    isLoading: isLoadingResolved,
    isError: isErrorResolved,
  } = useGetGrievancesByStatusQuery('RESOLVED');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      const hideTimer = setTimeout(() => setShowWelcome(false), 300); // Wait for fade-out animation
      return () => clearTimeout(hideTimer);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoadingAll || isLoadingPending || isLoadingResolved)
    return <Loader className="my-8" />;

  if (isErrorAll || isErrorPending || isErrorResolved)
    return (
      <div className="text-red-500 text-center mt-4">
        Error loading grievances. Please try again later.
      </div>
    );

  return (
    <div className="space-y-8 bg-pink-50 min-h-screen p-6">
      {/* Smooth Toast Welcome Message */}
      {showWelcome && (
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-500 ease-in-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="bg-gradient-to-r from-pink-100 to-red-100 border-2 border-pink-300 rounded-lg p-6 shadow-lg max-w-md animate-fadeIn">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-pink-700 mb-4">Welcome to Your Love Complaint Box! 💌</h2>
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => setShowWelcome(false), 300);
                }}
                className="text-pink-500 hover:text-pink-700"
              >
                ✕
              </button>
            </div>
            <p className="text-pink-800 mb-4">
              This is your personal space to document all those little (and big!) things your boyfriend does that make you go 🤦‍♀️
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => setShowWelcome(false), 300);
                }}
                className="px-4 py-2 bg-gradient-to-r from-pink-400 to-red-400 text-white rounded-full hover:from-pink-500 hover:to-red-500 transition shadow-md flex items-center"
              >
                Let's Complain! 💘
                <span className="ml-2">👉</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-pink-700">My Love Complaint Diary</h1>
          <p className="text-pink-500">Tracking his offenses since {new Date().getFullYear()} 💅</p>
        </div>
        <Button className="bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-white rounded-full px-6 py-2 shadow-lg transform hover:scale-105 transition">
          <Link to="/grievances/new">
            + New Complaint
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-white shadow-lg rounded-xl p-6 border-2 border-pink-200 hover:border-pink-300 transition">
          <h3 className="text-lg font-medium text-pink-700">Total Complaints</h3>
          <div className="mt-2 flex items-end">
            <p className="text-4xl font-bold text-pink-600 mr-2">
              {allGrievances.length}
            </p>
            <span className="text-pink-400 mb-1">😤</span>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 border-2 border-yellow-200 hover:border-yellow-300 transition">
          <h3 className="text-lg font-medium text-yellow-700">Pending Apologies</h3>
          <div className="mt-2 flex items-center">
            <p className="text-4xl font-bold text-yellow-600 mr-2">
              {pendingGrievances.length}
            </p>
            <div className="flex items-center">
              <StatusBadge status="PENDING" />
              <span className="ml-2 text-yellow-400">😠</span>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 border-2 border-green-200 hover:border-green-300 transition">
          <h3 className="text-lg font-medium text-green-700">Resolved Issues</h3>
          <div className="mt-2 flex items-center">
            <p className="text-4xl font-bold text-green-600 mr-2">
              {resolvedGrievances.length}
            </p>
            <div className="flex items-center">
              <StatusBadge status="RESOLVED" />
              <span className="ml-2 text-green-400">😊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Grievances */}
      <div className="space-y-4">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-pink-700">Recent Love Crimes</h2>
          <span className="ml-2 text-2xl">🔍</span>
        </div>
        {allGrievances.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-xl shadow-lg border-2 border-pink-200">
            <p className="text-gray-500 mb-2">No complaints yet... but we both know that won't last! 😏</p>
            <Button
              as={Link}
              to="/grievances/new"
              className="mt-4 bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-white rounded-full px-6 py-2 shadow-lg transform hover:scale-105 transition"
            >
              File Your First Complaint
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {allGrievances.slice(0, 3).map((grievance) => (
              <GrievanceCard 
                key={grievance.id} 
                grievance={grievance} 
                className="border-2 border-pink-200 hover:border-pink-300 transition"
              />
            ))}
            {allGrievances.length > 3 && (
              <div className="text-center pt-2">
                <Button 
                  as={Link} 
                  to="/grievances" 
                  className="bg-pink-100 text-pink-700 hover:bg-pink-200 rounded-full px-6 py-2 shadow transform hover:scale-105 transition"
                >
                  I can show only his 3 offences🥲 →
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cute Footer */}
      <div className="text-center text-pink-400 mt-8 text-sm">
        <p>Remember: A happy girlfriend = A happy life for him 💋</p>
      </div>
    </div>
  );
};

export default DashboardPage;