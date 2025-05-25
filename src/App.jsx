import { useState, useEffect } from 'react';
import { db } from './firebase/firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const notesCollection = collection(db, 'notas');

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getDocs(notesCollection);
      const formatted = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotes(formatted);
    };
    fetchNotes();
  }, []);

  const handleAdd = async () => {
    if (note.trim()) {
      const newNote = {
        text: note,
        favorite: false,
        archived: false
      };
      const docRef = await addDoc(notesCollection, newNote);
      setNotes([...notes, { ...newNote, id: docRef.id }]);
      setNote("");
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'notas', id));
    setNotes(notes.filter(n => n.id !== id));
  };

  const toggleFavorite = async (id) => {
    const note = notes.find(n => n.id === id);
    const updated = { ...note, favorite: !note.favorite };
    await updateDoc(doc(db, 'notas', id), { favorite: updated.favorite });
    setNotes(notes.map(n => n.id === id ? updated : n));
  };

  const toggleArchive = async (id) => {
    const note = notes.find(n => n.id === id);
    const updated = { ...note, archived: !note.archived };
    await updateDoc(doc(db, 'notas', id), { archived: updated.archived });
    setNotes(notes.map(n => n.id === id ? updated : n));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">App de Notas</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-grow"
          placeholder="Escribe una nota..."
          value={note}
          onChange={e => setNote(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAdd}>
          Añadir
        </button>
      </div>
      <div className="space-y-2">
        {notes.map(n => (
          <div key={n.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <p className={n.archived ? 'line-through text-gray-400' : ''}>{n.text}</p>
              <div className="text-sm text-gray-500">
                {n.favorite && <span className="mr-2">★ Favorito</span>}
                {n.archived && <span>📦 Archivado</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => toggleFavorite(n.id)} className="text-yellow-600">{n.favorite ? '★' : '☆'}</button>
              <button onClick={() => toggleArchive(n.id)} className="text-gray-600">📦</button>
              <button onClick={() => handleDelete(n.id)} className="text-red-500">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
