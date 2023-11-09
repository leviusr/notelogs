import { Omit } from "@prisma/client/runtime/library";
import { Note } from "@prisma/client";

export type Notenoid = Omit<Note, "id" | "createdAt" | "updatedAt">;
export type UpdateNote = Partial<Notenoid>;
