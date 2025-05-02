export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-pink-100 to-pink-200">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
        Social Petwork 🐾
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8">
        Connect your pet with real-life furry friends!
      </p>
      <button className="bg-pink-600 text-black text-lg px-6 py-3 rounded-full shadow-lg hover:bg-pink-700 transition">
        Start Sniffing
      </button>
    </div>
  );
}
