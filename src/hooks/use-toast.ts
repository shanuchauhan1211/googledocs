import { useReducer } from "react";

interface ToasterToast {
  id: string;
  message: string;
  type?: "success" | "error" | "info" | "warning";
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

// Define Action Types

type Action =
  | {
      type: typeof actionTypes.ADD_TOAST;
      toast: ToasterToast;
    }
  | {
      type: typeof actionTypes.UPDATE_TOAST;
      toast: Partial<ToasterToast> & { id: string };
    }
  | {
      type: typeof actionTypes.DISMISS_TOAST;
      toastId?: string;
    }
  | {
      type: typeof actionTypes.REMOVE_TOAST;
      toastId?: string;
    };

const toastReducer = (state: ToasterToast[], action: Action): ToasterToast[] => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return [...state, action.toast];
    case actionTypes.UPDATE_TOAST:
      return state.map((toast) =>
        toast.id === action.toast.id ? { ...toast, ...action.toast } : toast
      );
    case actionTypes.DISMISS_TOAST:
      return state.filter((toast) => toast.id !== action.toastId);
    case actionTypes.REMOVE_TOAST:
      return state.filter((toast) => toast.id !== action.toastId);
    default:
      return state;
  }
};

export const useToast = () => {
  const [state, dispatch] = useReducer(toastReducer, []);

  const addToast = (toast: ToasterToast) => {
    dispatch({ type: actionTypes.ADD_TOAST, toast });
  };

  const updateToast = (toast: Partial<ToasterToast> & { id: string }) => {
    dispatch({ type: actionTypes.UPDATE_TOAST, toast });
  };

  const dismissToast = (toastId?: string) => {
    dispatch({ type: actionTypes.DISMISS_TOAST, toastId });
  };

  const removeToast = (toastId?: string) => {
    dispatch({ type: actionTypes.REMOVE_TOAST, toastId });
  };

  return {
    toasts: state,
    addToast,
    updateToast,
    dismissToast,
    removeToast,
  };
};
