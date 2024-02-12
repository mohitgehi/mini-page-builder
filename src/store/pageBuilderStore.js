import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_LAYOUT_KEY = 'layout';

const getInitialLoggedIn = () => {
  const layout = JSON.parse(localStorage.getItem(LOCAL_LAYOUT_KEY) || '[]');
  return layout;
};

export const usePageBuilderStore = create(set => ({
  layout: [],
  addElement: element =>
    set(state => {
      const newState = [...state.layout, { id: uuidv4(), ...element }];
      return {
        layout: newState,
      };
    }),
  deleteElement: id =>
    set(state => {
      const newState = state.layout.filter(element => element.id !== id);
      return {
        layout: newState,
      };
    }),
  updateElement: (id, updateData) =>
    set(state => {
      const updatedPage = state.layout.map(element => {
        if (element.id === id) {
          return {
            ...element,
            ...updateData,
          };
        }
        return element;
      });
      return {
        layout: updatedPage,
      };
    }),
}));
