
import React, { useState } from 'react';
import { User, Book, BorrowRecord } from './types';
import { INITIAL_BOOKS } from './constants';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import BookCard from './components/BookCard';
import { Search, X, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [records, setRecords] = useState<BorrowRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Auth forms
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      const user: User = { 
        id: '1', 
        name: email.split('@')[0], 
        email, 
        role: email.includes('admin') ? 'admin' : 'member' 
      };
      setCurrentUser(user);
      setIsLoggedIn(true);
    } else {
      const user: User = { id: Date.now().toString(), name, email, role: 'member' };
      setCurrentUser(user);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  const borrowBook = (book: Book) => {
    if (!currentUser) return;
    const newRecord: BorrowRecord = {
      id: Date.now().toString(),
      userId: currentUser.id,
      bookId: book.id,
      borrowDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    };
    setRecords([...records, newRecord]);
    setBooks(books.map(b => b.id === book.id ? { ...b, status: 'borrowed' } : b));
  };

  const returnBook = (recordId: string) => {
    const record = records.find(r => r.id === recordId);
    if (!record) return;
    setBooks(books.map(b => b.id === record.bookId ? { ...b, status: 'available' } : b));
    setRecords(records.filter(r => r.id !== recordId));
  };

  const handleViewBook = (book: Book) => {
    setSelectedBook(book);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-slate-900 p-8 text-center">
            <h1 className="text-3xl font-serif font-bold text-teal-400">Library</h1>
            <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest">Hub</p>
          </div>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-8">
              {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <form onSubmit={handleAuth} className="space-y-6">
              {authMode === 'register' && (
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    placeholder="Enter your name"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/10"
              >
                {authMode === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
            <div className="mt-8 text-center text-sm text-slate-500">
              {authMode === 'login' ? (
                <p>Don't have an account? <button onClick={() => setAuthMode('register')} className="text-teal-600 font-bold hover:underline">Register here</button></p>
              ) : (
                <p>Already have an account? <button onClick={() => setAuthMode('login')} className="text-teal-600 font-bold hover:underline">Sign in</button></p>
              )}
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const myLoans = records.filter(r => r.userId === currentUser?.id).map(record => ({
    ...record,
    book: books.find(b => b.id === record.bookId)
  }));

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        role={currentUser?.role || 'member'} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />
      
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center font-bold text-xl">
              {currentUser?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Hello, {currentUser?.name}</h2>
              <p className="text-sm text-slate-500 uppercase tracking-widest text-xs">{currentUser?.role}</p>
            </div>
          </div>
          
          <div className="flex items-center bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 w-96">
            <Search className="text-slate-400 mr-2" size={20} />
            <input 
              type="text" 
              placeholder="Search books, authors, ISBN..." 
              className="bg-transparent border-none focus:outline-none w-full text-slate-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {activeTab === 'dashboard' && <Dashboard books={books} records={records} />}
        
        {activeTab === 'catalog' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-serif font-bold text-slate-800">Book Library</h2>
              <div className="flex space-x-2">
                {['All', 'Classic', 'Sci-Fi', 'Self-Help'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      selectedCategory === cat ? 'bg-teal-500 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map(book => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onViewDetails={handleViewBook}
                  onBorrow={borrowBook}
                  isAdmin={currentUser?.role === 'admin'}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-serif font-bold text-slate-800 mb-8">My Books</h2>
            {myLoans.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                   <BookOpen size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">No books found</h3>
                <p className="text-slate-500 mt-2">Explore the catalog to find your next great read.</p>
                <button 
                  onClick={() => setActiveTab('catalog')}
                  className="mt-6 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-600 transition-colors"
                >
                  Go to Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myLoans.map(loan => (
                  <div key={loan.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex space-x-6">
                    <img src={loan.book?.coverUrl} className="w-24 h-32 object-cover rounded-xl shadow-md" alt="" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-slate-800">{loan.book?.title}</h4>
                        <p className="text-sm text-slate-500">{loan.book?.author}</p>
                        <div className="mt-4 space-y-1">
                          <p className="text-xs text-slate-400 font-bold uppercase">Due Date</p>
                          <p className="text-sm font-semibold text-rose-500">{new Date(loan.dueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => returnBook(loan.id)}
                        className="mt-4 text-teal-600 font-bold hover:text-teal-700 text-sm flex items-center"
                      >
                        Return Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
            <div className="w-full md:w-1/3 h-64 md:h-auto relative">
              <img src={selectedBook.coverUrl} className="w-full h-full object-cover" alt="" />
              <button 
                onClick={() => setSelectedBook(null)}
                className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 md:hidden"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 p-8 md:p-12 relative">
              <button 
                onClick={() => setSelectedBook(null)}
                className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-600 hidden md:block"
              >
                <X size={24} />
              </button>
              
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">{selectedBook.category}</span>
              <h3 className="text-4xl font-serif font-bold text-slate-800 mt-2">{selectedBook.title}</h3>
              <p className="text-xl text-slate-500 mt-2">by {selectedBook.author}</p>
              
              <div className="mt-8">
                <p className="text-slate-600 leading-relaxed italic border-l-4 border-teal-500 pl-4">
                  {selectedBook.summary}
                </p>
              </div>
              
              <div className="mt-10 grid grid-cols-2 gap-8 py-6 border-y border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">ISBN</p>
                  <p className="font-semibold text-slate-800">{selectedBook.isbn}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Year</p>
                  <p className="font-semibold text-slate-800">{selectedBook.publishedYear}</p>
                </div>
              </div>
              
              <div className="mt-10 flex space-x-4">
                {selectedBook.status === 'available' ? (
                  <button 
                    onClick={() => {
                      borrowBook(selectedBook);
                      setSelectedBook(null);
                    }}
                    className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/10"
                  >
                    Borrow this Book
                  </button>
                ) : (
                  <div className="flex-1 bg-slate-100 text-slate-400 py-4 rounded-2xl font-bold text-center">
                    Currently on Loan
                  </div>
                )}
                <button 
                  onClick={() => setSelectedBook(null)}
                  className="px-8 py-4 border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
