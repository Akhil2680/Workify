import { Link } from 'react-router-dom';
import { Search, Zap, Brush, Hammer, ArrowRight } from 'lucide-react';

const Home = () => {
  const categories = [
    { name: 'Electricians', icon: <Zap className="w-8 h-8 text-yellow-500" />, bg: 'bg-yellow-50' },
    { name: 'Cleaners', icon: <Brush className="w-8 h-8 text-blue-500" />, bg: 'bg-blue-50' },
    { name: 'Carpenters', icon: <Hammer className="w-8 h-8 text-orange-500" />, bg: 'bg-orange-50' },
    { name: 'Other Services', icon: <Search className="w-8 h-8 text-slate-500" />, bg: 'bg-slate-50' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-[#0da16b] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-8 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Find Skilled Workers <br /> Near You
            </h1>
            <p className="text-lg md:text-xl text-primary-light/90 max-w-lg">
              Find trusted local professionals for all your home and business needs with ServiceConnect.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <Link
                to="/workers"
                className="px-8 py-3.5 rounded-lg bg-white text-primary font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                Find Workers <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/register"
                className="px-8 py-3.5 rounded-lg border-2 border-white text-white font-bold hover:bg-white/10 transition-all"
              >
                Become a Worker
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full max-w-lg">
            <div className="relative">
              <div className="absolute -inset-4 bg-white/10 rounded-full blur-3xl"></div>
              <img
                src="/hero_illustration.png"
                alt="Service Connection Illustration"
                className="relative rounded-2xl shadow-2xl mix-blend-screen opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-bold text-slate-800">Popular Service Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                to="/workers"
                className="group p-8 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all text-center space-y-4"
              >
                <div className={`w-20 h-20 ${cat.bg} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-700">{cat.name}</h3>
                <p className="text-sm text-slate-500">Find the best {cat.name.toLowerCase()} in your area.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

