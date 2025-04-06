// models/User.ts

import mongoose, { Schema, Document } from 'mongoose';

// Define la interfaz para el tipo de documento
interface IUser extends Document {
  name: string;
  email: string;
  password: string; // Añade el campo de contraseña
  cursos : number; // Añade el campo de cursos
  
  certificado : number;
  curso1: number; // Añade el campo de cursos, default 0
  curso2: number; // default 0
  curso3: number; // Añade el campo de cursos, default 0
  curso4: number; // default 0
  curso5: number; // Añade el campo de cursos, default 0
  curso6: number; // Añade el campo de cursos, default 0
  curso7: number; // default 0
   // Añade el campo de cursos
}

// Define el esquema de Mongoose
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },  // Campo de email único
  password: { type: String, required: true }, 
  cursos: {type: Number, default: 0}, 
  certificado: {type: Number , default:0 }, // Campo de contraseña
  curso1: { type: Number, default: 0 }, // Añade el campo de cursos
  curso2: { type: Number, default: 0 }, 
  curso3: { type: Number, default: 0 }, // Añade el campo de cursos
  curso4: { type: Number, default: 0 }, 
  curso5: { type: Number, default: 0 }, // Añade el campo de cursos
  curso6: { type: Number, default: 0 }, // Añade el campo de cursos
  curso7: { type: Number, default: 0 }
});

// Define el modelo de Mongoose y lo exporta
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User ;
