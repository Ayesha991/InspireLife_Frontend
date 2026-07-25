export default function PeelCard({ children, className = "" }) {
  return (
    <div className={`peel-card h-full w-full group ${className}`}>
      <div className="peel-layer peel-l1 bg-purple-200 opacity-50"></div>
      <div className="peel-layer peel-l2 bg-purple-300 opacity-70"></div>
      <div className="peel-layer peel-l3 bg-white border border-purple-200 h-full w-full p-5 flex flex-col rounded-xl justify-center">
        {children}
      </div>
    </div>
  );
}
