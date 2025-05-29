# 📝 App de Notas

Aplicación web para crear, visualizar y gestionar notas de forma sencilla. Desarrollada con **React + Vite** en el frontend y **Node.js + Express** en el backend, conectada con **Firebase Firestore** para almacenar datos en la nube en tiempo real.

---

## 📌 Descripción General

Esta aplicación permite a los usuarios:

- Crear nuevas notas rápidamente.
- Consultar sus notas desde cualquier dispositivo.
- Guardar, editar y eliminar datos almacenados en Firebase Firestore.

El frontend está desplegado en **Vercel** y el backend en **Render**.

---

## 🚀 Tecnologías Utilizadas

- **React + Vite** – Para la interfaz de usuario.
- **Firebase Firestore** – Base de datos en la nube (NoSQL).
- **Node.js + Express** – Servidor backend que expone rutas REST.
- **Render** – Hospedaje del backend (con conexión a Firebase).
- **Vercel** – Hospedaje del frontend.

---

## 🧩 Estructura de la base de datos

### 📂 Colección: `notas`

Cada documento dentro de la colección representa una nota individual con la siguiente estructura:

```json
{
  "titulo": "Comprar leche",
  "contenido": "Ir al supermercado",
  "fecha": "2025-05-29T12:00:00Z",
  "id_usuario": "uid123abc"
}
