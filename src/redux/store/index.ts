import { combineReducers } from 'redux';

import { BookmarksReducer } from '../store/bookmarksreducer';
import { Bookmarks } from '../model/bookmarks';

export class IAppState {
    bookmarks: Bookmarks;
}

export const rootReducer = combineReducers<IAppState>({
    bookmarks: BookmarksReducer,
});
