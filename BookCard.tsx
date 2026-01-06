
import React from 'react';
import { Book } from '../types';
import { Clock, Info, CheckCircle2 } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onViewDetails: (book: Book) => void;
  onBorrow?: (book: Book) => void;
  isAdmin?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, onViewDetails, onBorrow, isAdmin }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-64 bg-slate-200 overflow-hidden">
        <img 
          src={book.coverUrl} 
          alt={book.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase ${
          book.status === 'available' ? 'bg-teal-100 text-teal-600' : 'bg-rose-100 text-rose-600'
        }`}>
          {book.status}
        </div>
      </div>
      
      <div className="p-5">
        <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">{book.category}</span>
        <h3 className="text-lg font-bold text-slate-800 mt-1 line-clamp-1">{book.title}</h3>
        <p className="text-sm text-slate-500 mt-1">by {book.author}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <button 
            onClick={() => onViewDetails(book)}
            className="flex items-center text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
          >
            <Info size={16} className="mr-1" /> Details
          </button>
          
          {book.status === 'available' && !isAdmin && onBorrow && (
            <button 
              onClick={() => onBorrow(book)}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-teal-600 transition-colors"
            >
              Borrow
            </button>
          )}

          {book.status === 'borrowed' && (
            <div className="flex items-center text-xs text-slate-400 italic">
               <Clock size={14} className="mr-1" /> On Loan
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
