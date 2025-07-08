import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Profile Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-300">
              Welcome, {user?.login}
            </span>
            <button
              onClick={logout}
              className="btn btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder cards for statistics - will be replaced with actual data */}
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">XP Progress</h3>
              <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Projects</h3>
              <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Audit Stats</h3>
              <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            </div>
          </div>

          {/* Placeholder for GraphQL data visualization */}
          <div className="mt-8">
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Statistics
              </h3>
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-600 dark:text-gray-400">
                  GraphQL data visualization coming soon...
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
