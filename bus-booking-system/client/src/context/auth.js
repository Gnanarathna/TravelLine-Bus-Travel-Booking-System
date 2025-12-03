import { atom } from "jotai";

export const userAtom = atom(null);        // Stores user details
export const tokenAtom = atom("");         // Stores JWT token
export const roleAtom = atom("");          // Stores user role (admin/passenger)
