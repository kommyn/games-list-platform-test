import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

import { OrderEnum } from '../../enums';
import { DEFAULT_TAKE, MAX_TAKE } from '../constants';

export class CursorOptionsDto {
    @IsString()
    @IsOptional()
    readonly cursor?: string;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(MAX_TAKE)
    @IsOptional()
    readonly take: number = DEFAULT_TAKE;

    @Transform(({ value }: { value: unknown }) =>
        typeof value === 'string' ? value.toUpperCase() : value,
    )
    @IsEnum(OrderEnum)
    @IsOptional()
    readonly order: OrderEnum = OrderEnum.ASC;
}
