import { createSelector } from "@reduxjs/toolkit";
import { selectItems } from "../contacts/selectors";
import Fuse from "fuse.js";

export const selectNameFilter = (state) => state.filters.name;

export const selectFilteredContacts = createSelector([selectNameFilter, selectItems], (filterContacts, contacts) => {

    if (!filterContacts) {
        return contacts;
    } else {
        const fuse = new Fuse(contacts, {
            keys: ['name', 'number'],
            threshold: 0.3
        });

        const searchResults = fuse.search(filterContacts.trim());
        return searchResults.map(result => result.item);
    }
}
);