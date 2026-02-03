export default function Blog() {
    return (
        <section id="blog" className="min-h-screen flex items-center justify-center py-20 px-4">
            <div className="max-w-4xl mx-auto w-full text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                    <span className="text-cyber-green">Blog</span> & Articles
                </h2>

                <div className="bg-card p-12 rounded-lg border border-gray-dark">
                    <div className="mb-6">
                        <span className="text-6xl">📝</span>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-white">Coming Soon</h3>
                    <p className="text-gray-light mb-6 max-w-2xl mx-auto">
                        I'm working on sharing my knowledge and experiences in cybersecurity, programming,
                        and technology. Stay tuned for insightful articles and tutorials!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-light">
                        <span className="px-4 py-2 bg-background rounded-full border border-gray-dark">
                            Cybersecurity Tips
                        </span>
                        <span className="px-4 py-2 bg-background rounded-full border border-gray-dark">
                            C++ Tutorials
                        </span>
                        <span className="px-4 py-2 bg-background rounded-full border border-gray-dark">
                            Network Security
                        </span>
                        <span className="px-4 py-2 bg-background rounded-full border border-gray-dark">
                            Project Walkthroughs
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
