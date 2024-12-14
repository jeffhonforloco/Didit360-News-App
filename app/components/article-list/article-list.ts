import { EventData, ListView } from '@nativescript/core';
import { Article } from '../../shared/interfaces';

export function onItemTap(args: EventData): void {
    const listView = args.object as ListView;
    const article: Article = listView.items[listView.index];
    // Handle item tap
}

export function onLoadMoreItems(args: EventData): void {
    // Handle loading more items
}