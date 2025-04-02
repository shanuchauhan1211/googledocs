import { create } from "zustand";


interface Document {
  title: string;
  content: string;
  _id: string;
  ownerId: string;
  collaboratorIds?: string[];
  createdAt:Date,
  updatedAt:Date,
}

interface DocState {
  currentDoc: Document | null;
  docs: Document[] | null;
  setCurrentDoc: (currentDoc: Document) => void;
  setDocs: (docs: Document[]) => void;
}

export const useDocStore = create<DocState>((set) => ({
  currentDoc: null,
  docs: null,

  setCurrentDoc: (currentDoc) => {
    set({ currentDoc });
   
  },

  setDocs: (docs) => {
    set({ docs });
   
  },
}));
