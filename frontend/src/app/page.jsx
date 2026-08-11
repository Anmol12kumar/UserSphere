import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
            <Navbar />

            <section className="flex flex-col items-center justify-center flex-grow relative overflow-hidden px-4 md:px-8 lg:px-12">
                {/* Neon glow accents */}
                <div className="absolute inset-0">
                    <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold gradient-text drop-shadow-lg">
                        Welcome to UserSphere
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-gray-300">
                        Manage users with <span className="text-cyan-400 font-semibold">Create</span>,
                        <span className="text-pink-400 font-semibold"> Read</span>,
                        <span className="text-yellow-400 font-semibold"> Update</span>, and
                        <span className="text-green-400 font-semibold"> Delete</span> operations.
                    </p>

                    <a href="/users" className="btn-neon mt-10 inline-block">
                        Get Started →
                    </a>
                </div>
            </section>
        </div>
    );
}
