import { Layers } from 'lucide-react';

const Footer = () => (
  <footer className="bg-white border-t py-12 px-4">
    <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        <Layers className="w-6 h-6 text-primary" />
        <span className="text-xl font-bold text-slate-800">ServiceConnect</span>
      </div>
      <div className="flex gap-8 text-sm text-slate-500 font-medium">
        <a href="#" className="hover:text-primary transition-colors">Facebook</a>
        <a href="#" className="hover:text-primary transition-colors">Twitter</a>
        <a href="#" className="hover:text-primary transition-colors">Instagram</a>
        <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
      </div>
      <div className="text-sm text-slate-400">
        © {new Date().getFullYear()} ServiceConnect. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

