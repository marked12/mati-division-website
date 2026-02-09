export default function HeroSection() {
    return (
        <section className="relative bg-primary text-primary-foreground py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-3xl animate-fade-in">
                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        Official Portal of the <br />
                        <span className="text-accent-foreground bg-accent px-2">Mati City Division</span>
                    </h1>
                    <p className="text-xl text-primary-foreground/80 mb-8">
                        Serving the people of Mati with transparency, dedication, and excellence in public service.
                    </p>
                    <div className="flex gap-4">
                        <button className="bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition">
                            View Services
                        </button>
                        <button className="border border-white/30 hover:bg-white/10 px-6 py-3 rounded-md font-semibold transition">
                            Latest News
                        </button>
                    </div>
                </div>
            </div>
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </section>
    );
}