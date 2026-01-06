
import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  History, 
  LogOut, 
  PlusCircle 
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'catalog', label: 'Catalog', icon: BookOpen },
    { id: 'history', label: 'My Books', icon: History },
  ];

  if (role === 'admin') {
    menuItems.splice(2, 0, { id: 'manage-books', label: 'Manage Books', icon: PlusCircle });
    menuItems.splice(3, 0, { id: 'members', label: 'Members', icon: Users });
  }

  return (
    <div className="w-64 h-full bg-slate-900 text-white flex flex-col fixed left-0 top-0">
      <div className="p-8">
        <h1 className="text-2xl font-serif font-bold text-teal-400">Library</h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Hub</p>
      </div>

      <nav className="flex-1 px-4 mt-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 mt-auto border-t border-slate-800">
        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
