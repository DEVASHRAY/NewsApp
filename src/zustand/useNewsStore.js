import {create} from 'zustand';

export const useNewsStore = create(set => ({
  newsData: [],
  pinnedNewsData: [],
  updateNewsData: data => set(state => ({newsData: data || []})),
  updatedPinnedNewsData: data => set(() => ({pinnedNewsData: data || []})),
}));
