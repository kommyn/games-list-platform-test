import type { OrderEnum } from '../../enums';
import type { ICursorMetaDto } from '../interfaces/cursor-meta-dto.interface';

export class CursorMetaDto {
    readonly take: number;

    readonly order: OrderEnum;

    readonly cursor?: string;

    readonly nextCursor?: string;

    readonly hasNextPage: boolean;

    readonly hasPreviousPage: boolean;

    readonly itemsCount: number;

    readonly totalCount?: number;

    constructor({
        take,
        order,
        cursor,
        nextCursor,
        hasNextPage,
        hasPreviousPage,
        itemsCount,
        totalCount,
    }: ICursorMetaDto) {
        this.take = take;
        this.order = order;
        this.cursor = cursor;
        this.nextCursor = nextCursor;
        this.hasNextPage = hasNextPage;
        this.hasPreviousPage = hasPreviousPage;
        this.itemsCount = itemsCount;
        this.totalCount = totalCount;
    }
}
