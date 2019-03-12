import { Actions } from '../actions/bookmark-actions';
import { Bookmarks } from '../model/bookmarks';

const INITIAL_STATE: Bookmarks = {
  bookmarks: []
};

export function BookmarksReducer(state: Bookmarks = INITIAL_STATE, action: any): any {
  let list, index;

  switch (action.type) {
    case Actions.BOOKMARKS_GET:
      return Object.assign({}, state, { bookmarks: action.payload.bookmarks });

    case Actions.BOOKMARKS_DELETE:
      list = state.bookmarks
        .filter(({ id }) => id !== action.payload.id);
      return Object.assign({}, state, { list });

    case Actions.BOOKMARKS_ADD:
      state.bookmarks.push(action.payload.bookmark);
      return state;

    case Actions.BOOKMARKS_UPDATE:
      list = [...state.bookmarks];
      index = list.findIndex(({ id }) => id === action.payload.bookmark.id);
      list[index] = action.payload.bookmark;
      return Object.assign({}, state, { list });

    default:
      return state;
  }
}
