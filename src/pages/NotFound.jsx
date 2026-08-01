import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | IPTS Global</title>
      </Helmet>
      <main id="main-content" className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-[#EEF2F6] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-[#AAB5C2] font-['Space_Grotesk']">?</span>
          </div>
          <h1 className="text-8xl font-bold text-[#EEF2F6] font-['Space_Grotesk'] mb-4">404</h1>
          <h2 className="text-2xl font-bold text-[#071C33] font-['Space_Grotesk'] mb-3">
            Page Not Found
          </h2>
          <p className="text-[#AAB5C2] mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-primary gap-2">
            <ArrowLeft size={16} /> Back to Homepage
          </Link>
        </div>
      </main>
    </>
  );
}
