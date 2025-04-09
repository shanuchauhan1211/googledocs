import { create } from "zustand";
import { type Editor } from "@tiptap/react";

interface EditorState {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
}

interface DisplayToolTip {
  tag: string;
  setTag: (tag: string) => void;
}

interface MarginState {
  leftMargin: number;
  rightMargin: number;
  setLMargin: (leftMargin: number) => void;
  setRMargin: (rightMargin: number) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));

export const useDisplayToolTipStore = create<DisplayToolTip>((set) => ({
  tag: "",
  setTag: (tag) => set({ tag }),
}));

export const useMargin = create<MarginState>((set) => ({
  leftMargin: 56,
  setLMargin: (leftMargin) => set({ leftMargin }),
  rightMargin: 56,
  setRMargin: (rightMargin) => set({ rightMargin }),
}));
