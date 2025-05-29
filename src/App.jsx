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
import './index.css';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');
  const notesCollection = collection(db, 'notas');

  // Cargar notas de Firestore
  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getDocs(notesCollection);
      const formatted = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotes(formatted);
    };
    fetchNotes();
  }, []);

  // Añadir nota
  const handleAdd = async () => {
    if (!note.trim()) return;
    const newNote = { text: note, favorite: false, archived: false };
    const docRef = await addDoc(notesCollection, newNote);
    setNotes([...notes, { ...newNote, id: docRef.id }]);
    setNote('');
  };

  // Borrar nota
  const handleDelete = async id => {
    await deleteDoc(doc(db, 'notas', id));
    setNotes(notes.filter(n => n.id !== id));
  };

  // Alternar favorito
  const toggleFavorite = async id => {
    const target = notes.find(n => n.id === id);
    const updated = { ...target, favorite: !target.favorite };
    await updateDoc(doc(db, 'notas', id), { favorite: updated.favorite });
    setNotes(notes.map(n => n.id === id ? updated : n));
  };

  // Alternar archivado
  const toggleArchive = async id => {
    const target = notes.find(n => n.id === id);
    const updated = { ...target, archived: !target.archived };
    await updateDoc(doc(db, 'notas', id), { archived: updated.archived });
    setNotes(notes.map(n => n.id === id ? updated : n));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>App de Notas</h1>
      </header>

      <section className="input-section">
        <textarea
          className="note-textarea"
          placeholder="Escribe una nota..."
          value={note}
          onChange={e => setNote(e.target.value)}
        />
        <button className="btn-add" onClick={handleAdd}>
          Añadir
        </button>
      </section>

      <section className="list-section">
        <ul>
          {notes.map(n => (
            <li key={n.id} className={n.archived ? 'archived' : ''}>
              <p className={n.archived ? 'line-through text-gray-400' : ''}>
                {n.text}
              </p>
              <div className="actions">
                <button
                  onClick={() => toggleFavorite(n.id)}
                  className="action-btn favorite"
                  title="Favorito"
                >
                  {n.favorite ? '★' : '☆'}
                </button>
                <button
                  onClick={() => toggleArchive(n.id)}
                  className="action-btn archive"
                  title="Archivar"
                >
                  📦
                </button>
                <button
                  onClick={() => handleDelete(n.id)}
                  className="action-btn delete"
                  title="Eliminar"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
