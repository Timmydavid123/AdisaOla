// src/components/ErrorPage.tsx
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-6xl font-bold text-red-900 mb-4">Something went wrong</h1>
      <p className="text-xl mb-8">We're working on fixing the problem. Please try again later.</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-red-900 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Return to Home
      </button>
    </div>
  );
};

export default ErrorPage;