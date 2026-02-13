import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save, Book as BookIcon } from 'lucide-react';
import { Book } from '../../types';

const initialBooks: Book[] = [
  {
    id: 1,
    title: "PHÁT TRIỂN NGÔN NGỮ VÀ TƯ DUY CHO TRẺ TỪ 0 – 6 TUỔI",
    description: "Cẩm nang thiết yếu giúp cha mẹ và giáo viên nắm bắt các mốc phát triển quan trọng...",
    coverImage: "https://picsum.photos/seed/book_ngonngu/600/850",
    type: "textbook"
  },
  {
    id: 2,
    title: "THỰC HÀNH DẠY TRẺ TỰ KỶ",
    description: "Tài liệu chuyên sâu hướng dẫn các phương pháp can thiệp sớm...",
    coverImage: "https://picsum.photos/seed/book_tuky/600/850",
    type: "research"
  }
];

const BookManager: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState<Partial<Book>>({});

  const handleAddNew = () => {
    setCurrentBook({ title: '', description: '', coverImage: '', type: 'research' });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentBook.id) {
      setBooks(books.map(b => b.id === currentBook.id ? currentBook as Book : b));
    } else {
      setBooks([...books, { ...currentBook, id: Date.now() } as Book]);
    }
    setIsEditing(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Xóa ấn phẩm này?')) setBooks(books.filter(b => b.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý Ấn phẩm & Sách</h1>
        <button onClick={handleAddNew} className="px-4 py-2 bg-primary text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors">
          <Plus className="w-5 h-5 mr-2" /> Thêm sách mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map(book => (
          <div key={book.id} className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
            <div className="h-48 overflow-hidden bg-gray-100 dark:bg-black/20 relative">
               <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
               <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-white text-xs rounded">
                  {book.type === 'research' ? 'Chuyên khảo' : 'Giáo trình/Kỹ năng'}
               </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
               <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{book.title}</h3>
               <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">{book.description}</p>
               <div className="flex gap-2 justify-end pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button onClick={() => { setCurrentBook(book); setIsEditing(true); }} className="p-2 text-gray-400 hover:text-primary"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(book.id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e293b] w-full max-w-lg rounded-2xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold dark:text-white">{currentBook.id ? 'Sửa thông tin sách' : 'Thêm sách mới'}</h2>
              <button onClick={() => setIsEditing(false)}><X className="dark:text-white" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
               <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Tên sách</label>
                  <input required className="w-full p-2 border rounded dark:bg-black/20 dark:border-gray-700 dark:text-white" value={currentBook.title} onChange={e => setCurrentBook({...currentBook, title: e.target.value})} />
               </div>
               <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Loại sách</label>
                  <select className="w-full p-2 border rounded dark:bg-black/20 dark:border-gray-700 dark:text-white" value={currentBook.type} onChange={e => setCurrentBook({...currentBook, type: e.target.value as any})}>
                     <option value="research">Sách Chuyên khảo</option>
                     <option value="textbook">Sách Giáo trình / Kỹ năng</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Mô tả</label>
                  <textarea rows={4} className="w-full p-2 border rounded dark:bg-black/20 dark:border-gray-700 dark:text-white" value={currentBook.description} onChange={e => setCurrentBook({...currentBook, description: e.target.value})} />
               </div>
               <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Ảnh bìa (URL)</label>
                  <input className="w-full p-2 border rounded dark:bg-black/20 dark:border-gray-700 dark:text-white" value={currentBook.coverImage} onChange={e => setCurrentBook({...currentBook, coverImage: e.target.value})} />
               </div>
               <button type="submit" className="w-full py-2 bg-primary text-white rounded font-bold hover:bg-blue-600">Lưu thông tin</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookManager;