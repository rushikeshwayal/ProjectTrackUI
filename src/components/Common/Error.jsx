

export default function Error() {
return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="font-bold text-6xl text-red-500 mb-4">404</h1>
      <h2 className="font-semibold text-2xl text-gray-700 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist or has been moved.</p>
      <a href="/" className="text-blue-500 hover:underline">Go back to Home</a>
    </div>
  )
}
