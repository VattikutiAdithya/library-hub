
import { Book } from './types';

export const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    category: 'Classic',
    summary: 'A story of wealth, love, and the American Dream in the 1920s.',
    status: 'available',
    coverUrl: 'https://picsum.photos/seed/gatsby/400/600',
    publishedYear: 1925
  },
  {
    id: '2',
    title: 'Dune',
    author: 'Frank Herbert',
    isbn: '9780441172719',
    category: 'Sci-Fi',
    summary: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides.',
    status: 'available',
    coverUrl: 'https://picsum.photos/seed/dune/400/600',
    publishedYear: 1965
  },
  {
    id: '3',
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '9780735211292',
    category: 'Self-Help',
    summary: 'An easy and proven way to build good habits and break bad ones.',
    status: 'borrowed',
    coverUrl: 'https://picsum.photos/seed/habits/400/600',
    publishedYear: 2018
  },
  {
    id: '4',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    isbn: '9780593135204',
    category: 'Sci-Fi',
    summary: 'A lone astronaut must save the earth from a disaster.',
    status: 'available',
    coverUrl: 'https://picsum.photos/seed/hailmary/400/600',
    publishedYear: 2021
  }
];

export const CATEGORIES = ['All', 'Classic', 'Sci-Fi', 'Self-Help', 'History', 'Fiction', 'Fantasy'];
