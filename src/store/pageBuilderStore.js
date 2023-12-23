import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_LAYOUT_KEY = 'layout';

const getInitialLoggedIn = () => {
  const layout = JSON.parse(localStorage.getItem(LOCAL_LAYOUT_KEY) || '[]');
  return layout;
};

export const usePageBuilderStore = create(set => ({
  layout: getInitialLoggedIn(),
  addElement: element =>
    set(state => {
      const newState = [...state.layout, { id: uuidv4(), ...element }];
      localStorage.setItem(LOCAL_LAYOUT_KEY, JSON.stringify(newState));
      return {
        layout: newState,
      };
    }),
  deleteElement: id =>
    set(state => {
      const newState = state.layout.filter(element => element.id !== id);
      localStorage.setItem(LOCAL_LAYOUT_KEY, JSON.stringify(newState));
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
      localStorage.setItem(LOCAL_LAYOUT_KEY, JSON.stringify(updatedPage));
      return {
        layout: updatedPage,
      };
    }),
}));
