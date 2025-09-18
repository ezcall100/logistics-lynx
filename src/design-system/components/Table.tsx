/**
 * MCP Agents - Clean Table Component
 * Modern, accessible table with sorting, filtering, and comprehensive features
 */

import React, { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import {
  ChevronUp,
  ChevronDown,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
} from 'lucide-react';

// ===== TABLE VARIANTS =====
const tableVariants = cva(
  [
    'w-full border-collapse',
    'bg-white rounded-lg overflow-hidden',
    'shadow-sm border border-gray-200',
  ],
  {
    variants: {
      variant: {
        default: 'bg-white',
        striped: 'bg-white',
        bordered: 'border border-gray-300',
        glass: 'bg-white/10 backdrop-blur-md border-white/20',
        minimal: 'bg-transparent border-0 shadow-none',
      },
      size: {
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// ===== TABLE PROPS =====
export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  loading?: boolean;
  empty?: boolean;
  emptyMessage?: string;
  searchable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  onSearch?: (query: string) => void;
  onFilter?: (filters: Record<string, unknown>) => void;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
}

// ===== TABLE COMPONENT =====
const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      className,
      variant,
      size,
      loading,
      empty,
      emptyMessage = 'No data available',
      searchable,
      filterable,
      onSearch,
      onFilter,
      children,
      ...props
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query: string) => {
      setSearchQuery(query);
      onSearch?.(query);
    };

    return (
      <div className="space-y-4">
        {/* Table Controls */}
        {(searchable || filterable) && (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {searchable && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={e => handleSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              )}
              {filterable && (
                <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        )}

        {/* Table Container */}
        <div className="relative overflow-hidden rounded-lg border border-gray-200">
          {loading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="animate-spin">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-primary-500 rounded-full" />
              </div>
            </div>
          )}

          <table ref={ref} className={cn(tableVariants({ variant, size }), className)} {...props}>
            {children}
          </table>

          {/* Empty State */}
          {empty && !loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-300 rounded"></div>
                </div>
                <p className="text-gray-500">{emptyMessage}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Table.displayName = 'Table';

// ===== TABLE HEADER =====
const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => {
  return (
    <thead ref={ref} className={cn('bg-gray-50', className)} {...props}>
      {children}
    </thead>
  );
});

TableHeader.displayName = 'TableHeader';

// ===== TABLE BODY =====
const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => {
  return (
    <tbody ref={ref} className={cn('divide-y divide-gray-200', className)} {...props}>
      {children}
    </tbody>
  );
});

TableBody.displayName = 'TableBody';

// ===== TABLE FOOTER =====
const TableFooter = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => {
  return (
    <tfoot ref={ref} className={cn('bg-gray-50 font-medium', className)} {...props}>
      {children}
    </tfoot>
  );
});

TableFooter.displayName = 'TableFooter';

// ===== TABLE ROW =====
const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    hover?: boolean;
    selected?: boolean;
    onClick?: () => void;
  }
>(({ className, hover = true, selected, onClick, children, ...props }, ref) => {
  return (
    <tr
      ref={ref}
      className={cn(
        'transition-colors duration-150',
        {
          'hover:bg-gray-50 cursor-pointer': hover && onClick,
          'bg-primary-50 border-primary-200': selected,
          'bg-white': !selected,
        },
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </tr>
  );
});

TableRow.displayName = 'TableRow';

// ===== TABLE HEAD =====
const TableHead = forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & {
    sortable?: boolean;
    sortDirection?: 'asc' | 'desc' | null;
    onSort?: () => void;
  }
>(({ className, sortable, sortDirection, onSort, children, ...props }, ref) => {
  return (
    <th
      ref={ref}
      className={cn(
        'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
        {
          'cursor-pointer hover:bg-gray-100': sortable,
        },
        className
      )}
      onClick={sortable ? onSort : undefined}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span>{children}</span>
        {sortable && (
          <div className="flex flex-col">
            <ChevronUp
              className={cn(
                'w-3 h-3',
                sortDirection === 'asc' ? 'text-primary-600' : 'text-gray-400'
              )}
            />
            <ChevronDown
              className={cn(
                'w-3 h-3 -mt-1',
                sortDirection === 'desc' ? 'text-primary-600' : 'text-gray-400'
              )}
            />
          </div>
        )}
      </div>
    </th>
  );
});

TableHead.displayName = 'TableHead';

// ===== TABLE CELL =====
const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    variant?: 'default' | 'numeric' | 'actions';
  }
>(({ className, variant = 'default', children, ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={cn(
        'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
        {
          'text-right': variant === 'numeric',
          'text-center': variant === 'actions',
        },
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
});

TableCell.displayName = 'TableCell';

// ===== ACTION BUTTONS =====
const ActionButtons: React.FC<{
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  variant?: 'default' | 'minimal';
  size?: 'sm' | 'md';
}> = ({ onView, onEdit, onDelete, onApprove, onReject, variant = 'default', size = 'sm' }) => {
  const buttonSize = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  if (variant === 'minimal') {
    return (
      <div className="flex items-center gap-1">
        {onView && (
          <button
            onClick={onView}
            className={`${buttonSize} flex items-center justify-center text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors`}
          >
            <Eye className={iconSize} />
          </button>
        )}
        {onEdit && (
          <button
            onClick={onEdit}
            className={`${buttonSize} flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors`}
          >
            <Edit className={iconSize} />
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className={`${buttonSize} flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors`}
          >
            <Trash2 className={iconSize} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {onView && (
        <button
          onClick={onView}
          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
        >
          <Eye className="w-3 h-3" />
          View
        </button>
      )}
      {onEdit && (
        <button
          onClick={onEdit}
          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
        >
          <Edit className="w-3 h-3" />
          Edit
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
        >
          <Trash2 className="w-3 h-3" />
          Delete
        </button>
      )}
      {onApprove && (
        <button
          onClick={onApprove}
          className="flex items-center gap-1 px-2 py-1 text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors"
        >
          <Check className="w-3 h-3" />
          Approve
        </button>
      )}
      {onReject && (
        <button
          onClick={onReject}
          className="flex items-center gap-1 px-2 py-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
        >
          <X className="w-3 h-3" />
          Reject
        </button>
      )}
    </div>
  );
};

// ===== STATUS BADGE =====
const StatusBadge: React.FC<{
  status:
    | 'active'
    | 'inactive'
    | 'pending'
    | 'approved'
    | 'rejected'
    | 'warning'
    | 'error'
    | 'success';
  size?: 'sm' | 'md';
}> = ({ status, size = 'sm' }) => {
  const statusConfig = {
    active: { color: 'bg-emerald-100 text-emerald-800', text: 'Active' },
    inactive: { color: 'bg-gray-100 text-gray-800', text: 'Inactive' },
    pending: { color: 'bg-amber-100 text-amber-800', text: 'Pending' },
    approved: { color: 'bg-emerald-100 text-emerald-800', text: 'Approved' },
    rejected: { color: 'bg-red-100 text-red-800', text: 'Rejected' },
    warning: { color: 'bg-amber-100 text-amber-800', text: 'Warning' },
    error: { color: 'bg-red-100 text-red-800', text: 'Error' },
    success: { color: 'bg-emerald-100 text-emerald-800', text: 'Success' },
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        config.color,
        sizeClasses[size]
      )}
    >
      {config.text}
    </span>
  );
};

// ===== PAGINATION =====
const TablePagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  totalItems?: number;
  onPageSizeChange?: (size: number) => void;
}> = ({ currentPage, totalPages, onPageChange, pageSize, totalItems, onPageSizeChange }) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white border-t border-gray-200">
      <div className="flex items-center gap-4">
        {totalItems && (
          <p className="text-sm text-gray-700">
            Showing {(currentPage - 1) * (pageSize || 10) + 1} to{' '}
            {Math.min(currentPage * (pageSize || 10), totalItems)} of {totalItems} results
          </p>
        )}
        {onPageSizeChange && (
          <select
            value={pageSize}
            onChange={e => onPageSizeChange(Number(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="flex items-center gap-1">
          {getVisiblePages().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={cn(
                'px-3 py-1 text-sm border rounded',
                page === currentPage
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'border-gray-300 hover:bg-gray-50',
                page === '...' && 'cursor-default'
              )}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  ActionButtons,
  StatusBadge,
  TablePagination,
};
export default Table;
}