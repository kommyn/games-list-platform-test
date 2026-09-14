import { CursorOptionsDto } from './cursor-options.dto';
import { CursorMetaDto } from './cursor-meta.dto';
import { encodeCursor } from '../utils/encode-cursor';

export class CursorDto<T> {
    readonly items: T[];

    readonly meta: CursorMetaDto;

    constructor(
        rows: T[],
        { cursor, take, order }: CursorOptionsDto,
        toCursor: (item: T) => Record<string, string>,
        totalCount?: number,
    ) {
        const hasNextPage = rows.length > take;

        this.items = hasNextPage ? rows.slice(0, take) : rows;

        const lastItem = this.items[this.items.length - 1];

        this.meta = new CursorMetaDto({
            take,
            order,
            cursor,
            nextCursor:
                hasNextPage && lastItem
                    ? encodeCursor(toCursor(lastItem))
                    : undefined,
            hasNextPage,
            hasPreviousPage: cursor !== undefined,
            itemsCount: this.items.length,
            totalCount,
        });
    }
}
