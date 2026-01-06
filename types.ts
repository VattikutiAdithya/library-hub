
export type UserRole = 'admin' | 'member';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  summary: string;
  status: 'available' | 'borrowed';
  coverUrl: string;
  publishedYear: number;
}

export interface BorrowRecord {
  id: string;
  userId: string;
  bookId: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
}

export interface AppState {
  currentUser: User | null;
  books: Book[];
  borrowRecords: BorrowRecord[];
}
