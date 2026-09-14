/**
 * One component of a cursor, described against the row type the query returns.
 *
 * The mapped union keeps `key` and `value` correlated: for `key: 'createdAt'`
 * the value must be exactly the type of `TRow['createdAt']`, and a key that
 * does not exist on the row is a compile error.
 */
export type CursorKey<TRow> = {
    [K in Extract<keyof TRow, string>]: {
        key: K;
        value: TRow[K];
        /** Query builder only: SQL expression. Defaults to the key. */
        column?: string;
        /**
         * Query builder only: cast for the bound parameter, e.g.
         * `'timestamptz'`. A row-value comparison gives Postgres no column
         * from which to infer the type.
         */
        cast?: string;
    };
}[Extract<keyof TRow, string>];

/**
 * A cursor, most significant key first. The last key must be unique — normally
 * the primary key — or rows will be skipped or repeated at the boundary.
 */
export type CursorKeys<TRow> = readonly [CursorKey<TRow>, ...CursorKey<TRow>[]];

/**
 * Key-erased view of the above. `CursorKey<TRow>` correlates `key` with the
 * type of `value`, and that correlation cannot survive a loop, so it is
 * dropped where the conditions are actually assembled.
 */
export interface IErasedCursorKey {
    key: string;
    value: unknown;
    column?: string;
    cast?: string;
}
