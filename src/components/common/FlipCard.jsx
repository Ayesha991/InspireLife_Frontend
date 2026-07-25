export default function FlipCard({ frontContent, backContent, className = "" }) {
  return (
    <div className={`flip-card-wrapper h-full w-full group ${className}`}>
      <div className="flip-inner relative w-full h-full">
        {/* Front Face */}
        <div className="flip-face absolute inset-0 w-full h-full bg-white border border-purple-200 rounded-2xl p-10 flex flex-col justify-between shadow-lg">
          {frontContent}
        </div>
        {/* Back Face */}
        <div className="flip-face flip-back absolute inset-0 w-full h-full bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-10 flex flex-col justify-between shadow-xl">
          {backContent}
        </div>
      </div>
    </div>
  );
}
