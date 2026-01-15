import { forwardRef, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** Enable striped rows */
  striped?: boolean;
  /** Enable hover effect on rows */
  hover?: boolean;
  /** Enable borders on all cells */
  bordered?: boolean;
  /** Compact padding */
  compact?: boolean;
}

export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableFootProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Numeric cell (monospace, right-aligned) */
  numeric?: boolean;
  /** Status cell (nowrap, minimal width) */
  status?: boolean;
}

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Numeric cell (monospace, right-aligned) */
  numeric?: boolean;
}

/**
 * Table component with striped, hover, bordered, and compact variants.
 *
 * @example
 * <Table striped hover>
 *   <TableHead>
 *     <TableRow>
 *       <TableHeaderCell>Name</TableHeaderCell>
 *       <TableHeaderCell numeric>Time</TableHeaderCell>
 *     </TableRow>
 *   </TableHead>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John Doe</TableCell>
 *       <TableCell numeric>1:23.45</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ striped = false, hover = false, bordered = false, compact = false, className = '', children, ...props }, ref) => {
    const classes = [
      'table',
      striped && 'table-striped',
      hover && 'table-hover',
      bordered && 'table-bordered',
      compact && 'table-compact',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <table ref={ref} className={classes} {...props}>
        {children}
      </table>
    );
  }
);

Table.displayName = 'Table';

/**
 * Table head section.
 */
export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <thead ref={ref} className={className || undefined} {...props}>
        {children}
      </thead>
    );
  }
);

TableHead.displayName = 'TableHead';

/**
 * Table body section.
 */
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <tbody ref={ref} className={className || undefined} {...props}>
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = 'TableBody';

/**
 * Table foot section.
 */
export const TableFoot = forwardRef<HTMLTableSectionElement, TableFootProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <tfoot ref={ref} className={className || undefined} {...props}>
        {children}
      </tfoot>
    );
  }
);

TableFoot.displayName = 'TableFoot';

/**
 * Table row.
 */
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <tr ref={ref} className={className || undefined} {...props}>
        {children}
      </tr>
    );
  }
);

TableRow.displayName = 'TableRow';

/**
 * Table cell (td).
 */
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ numeric = false, status = false, className = '', children, ...props }, ref) => {
    const classes = [numeric && 'cell-numeric', status && 'cell-status', className]
      .filter(Boolean)
      .join(' ');

    return (
      <td ref={ref} className={classes || undefined} {...props}>
        {children}
      </td>
    );
  }
);

TableCell.displayName = 'TableCell';

/**
 * Table header cell (th).
 */
export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  ({ numeric = false, className = '', children, ...props }, ref) => {
    const classes = [numeric && 'cell-numeric', className].filter(Boolean).join(' ');

    return (
      <th ref={ref} className={classes || undefined} {...props}>
        {children}
      </th>
    );
  }
);

TableHeaderCell.displayName = 'TableHeaderCell';
