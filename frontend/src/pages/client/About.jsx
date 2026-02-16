import { Users, Heart, CheckCircle2 } from 'lucide-react';

const About = () => {
    const stats = [
        { label: 'Active Workers', value: '500+', icon: <Users className="w-6 h-6 text-primary" />, bg: 'bg-primary/5' },
        { label: 'Happy Clients', value: '1000+', icon: <Heart className="w-6 h-6 text-blue-500" />, bg: 'bg-blue-50' },
        { label: 'Jobs Completed', value: '5000+', icon: <CheckCircle2 className="w-6 h-6 text-orange-500" />, bg: 'bg-orange-50' },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <section className="py-20 px-4 bg-slate-50/50">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h1 className="text-5xl font-extrabold text-slate-900">About ServiceConnect</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Connecting communities with trusted local professionals since day one.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-800">Our Mission</h2>
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                            <p>
                                We believe everyone deserves access to reliable, skilled professionals for their home and business needs. ServiceConnect makes it simple to find, connect with, and hire trusted workers in your local area.
                            </p>
                            <p>
                                Our platform empowers workers to grow their businesses while providing clients with peace of mind through verified profiles, transparent pricing, and community reviews.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                            {stats.map((stat, idx) => (
                                <div key={idx} className={`${stat.bg} p-6 rounded-2xl border border-transparent hover:border-slate-200 transition-all`}>
                                    <div className="mb-4">{stat.icon}</div>
                                    <div className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
                                    <div className="text-sm font-medium text-slate-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 w-full max-w-lg">
                        <img
                            src="/hero_illustration.png"
                            alt="Our Mission"
                            className="rounded-3xl shadow-2xl opacity-80"
                        />
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 px-4 bg-slate-50/30">
                <div className="max-w-7xl mx-auto text-center space-y-12">
                    <h2 className="text-3xl font-bold text-slate-800">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">Trust & Safety</h3>
                            <p className="text-slate-600">We prioritize the safety of our community with thorough verification processes and transparent reviews.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">Quality Service</h3>
                            <p className="text-slate-600">We connect you with professionals who take pride in their craft and deliver exceptional results.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">Community Growth</h3>
                            <p className="text-slate-600">We support local economies by helping independent workers find consistent, rewarding opportunities.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
