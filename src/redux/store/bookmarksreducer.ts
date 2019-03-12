import { Actions } from '../actions/bookmark-actions';
import { Bookmarks } from '../model/bookmarks';

const INITIAL_STATE: Bookmarks = {
  bookmarks: []
};

export function BookmarksReducer(state: Bookmarks = INITIAL_STATE, action: any): any {
  let bookmarks, index;

  switch (action.type) {
    case Actions.BOOKMARKS_GET:
      return {
        ...state,
        bookmarks: action.payload.bookmarks
      };

    case Actions.BOOKMARKS_DELETE:
      bookmarks = state.bookmarks
        .filter(({ id }) => id !== action.payload.id);
      return {
        ...state,
        bookmarks
      };

    case Actions.BOOKMARKS_ADD:
      state.bookmarks.push(action.payload.bookmark);
      return state;

    case Actions.BOOKMARKS_UPDATE:
      bookmarks = [...state.bookmarks];
      index = bookmarks.findIndex(({ id }) => id === action.payload.bookmark.id);
      bookmarks[index] = action.payload.bookmark;
      return {
        ...state,
        bookmarks
      };

    default:
      return state;
  }
}
