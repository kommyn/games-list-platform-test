import { applyDecorators, Type } from '@nestjs/common';

export const apiOffsetPaginatedResponse = <TModel extends Type<any>>(
    model: TModel,
) => {};
