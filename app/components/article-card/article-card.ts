import { EventData } from '@nativescript/core';
import { Article } from '../../shared/interfaces';
import { formatPublishDate } from '../../shared/utils';

export function onArticleTap(args: EventData): void {
    const article: Article = args.object.bindingContext;
    // Handle article tap
}

export function getFormattedDate(date: Date): string {
    return formatPublishDate(date);
}