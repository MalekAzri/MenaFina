export default function StatsSection() {
    return (
        <section id="stats-section" className="py-20 bg-gradient-to-r from-dark-primary to-dark-secondary">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="text-5xl font-bold text-blue-400 mb-2">500+</div>
                        <div className="text-xl text-gray-300">Active Students</div>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl font-bold text-purple-400 mb-2">50+</div>
                        <div className="text-xl text-gray-300">Expert Professors</div>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl font-bold text-green-400 mb-2">1000+</div>
                        <div className="text-xl text-gray-300">Learning Sessions</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
