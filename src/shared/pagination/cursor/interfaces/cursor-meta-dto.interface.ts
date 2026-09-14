import type { OrderEnum } from '../../enums';

export interface ICursorMetaDto {
    /** Page size the client asked for. Never the internal lookahead. */
    take: number;
    order: OrderEnum;
    /** Cursor this page was requested with, if any. */
    cursor?: string;
    /** Cursor for the following page. Absent on the last page. */
    nextCursor?: string;
    hasNextPage: boolean;
    /** Whether this page was reached from another one. */
    hasPreviousPage: boolean;
    /** Number of items on this page. */
    itemsCount: number;
    /** Rows matching the query as a whole. Only set when explicitly requested. */
    totalCount?: number;
}
