
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Book, BorrowRecord } from '../types';
import { BookOpen, Users, Clock, ArrowUpRight } from 'lucide-react';

interface DashboardProps {
  books: Book[];
  records: BorrowRecord[];
}

const Dashboard: React.FC<DashboardProps> = ({ books, records }) => {
  const stats = [
    { label: 'Total Books', value: books.length, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Available', value: books.filter(b => b.status === 'available').length, icon: ArrowUpRight, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Borrowed', value: books.filter(b => b.status === 'borrowed').length, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Total Borrowed', value: records.length, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const categoryData = books.reduce((acc: any[], book) => {
    const existing = acc.find(i => i.name === book.category);
    if (existing) existing.value += 1;
    else acc.push({ name: book.category, value: 1 });
    return acc;
  }, []);

  const COLORS = ['#0d9488', '#2563eb', '#7c3aed', '#db2777', '#f59e0b'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-800">Library Insight</h2>
          <p className="text-slate-500">A real-time overview of the collection performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Collection by Genre</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="value" fill="#0d9488" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Status Distribution</h3>
          <div className="h-80 w-full flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Available', value: books.filter(b => b.status === 'available').length },
                    { name: 'Borrowed', value: books.filter(b => b.status === 'borrowed').length }
                  ]}
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#0d9488" />
                  <Cell fill="#f1f5f9" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold text-slate-800">
                {Math.round((books.filter(b => b.status === 'available').length / books.length) * 100)}%
              </span>
              <span className="text-xs text-slate-500 uppercase">Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
