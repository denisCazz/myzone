export default function VetrinaLoading() {
  return (
    <div className="min-h-screen bg-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="skeleton h-4 w-48 mx-auto mb-4" />
          <div className="skeleton h-12 w-72 mx-auto mb-5" />
          <div className="skeleton h-6 w-96 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden border border-primary/10 shadow-md animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="skeleton h-72 w-full" />
              <div className="p-6">
                <div className="skeleton h-6 w-3/4 mb-3" />
                <div className="skeleton h-4 w-full mb-4" />
                <div className="skeleton h-8 w-1/3 mb-5" />
                <div className="flex gap-6 py-4 border-y border-primary/10">
                  <div className="skeleton h-5 w-16" />
                  <div className="skeleton h-5 w-20" />
                </div>
                <div className="skeleton h-4 w-full mb-4" />
                <div className="skeleton h-10 w-full rounded-xl mt-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
