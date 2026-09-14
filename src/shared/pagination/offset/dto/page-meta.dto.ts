import { IPageMetaDto } from '../interfaces';

export class PageMetaDto {
    readonly page: number;

    readonly take: number;

    readonly itemsCount: number;

    readonly pageCount: number;

    readonly hasPreviousPage: boolean;

    readonly hasNextPage: boolean;

    constructor({ pageOptionsDto, itemsCount }: IPageMetaDto) {
        this.page = pageOptionsDto.page;
        this.take = pageOptionsDto.take;
        this.itemsCount = itemsCount;
        this.pageCount = Math.ceil(this.itemsCount / this.take);
        this.hasNextPage = this.page < this.pageCount;
        this.hasPreviousPage = this.page > 1;
    }
}
