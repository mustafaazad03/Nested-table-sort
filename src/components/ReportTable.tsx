'use client';
import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface BaseRow {
  customerName: string;
  range30: number;
  rane60: number;
  rane90: number;
  total: number;
  children?: (CustomerRow | PORow | InvoiceRow)[];
}

interface CustomerRow extends BaseRow {
  id: number;
  children?: PORow[];
}

interface PORow extends BaseRow {
  poNumber: number;
  children?: InvoiceRow[];
}

interface InvoiceRow extends BaseRow {
  invNumber: number;
}

type SortField = 'customerName' | 'range30' | 'rane60' | 'rane90' | 'total';
type SortDirection = 'asc' | 'desc';

interface ReportTableProps {
  data: CustomerRow[];
}

const ReportTable: React.FC<ReportTableProps> = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<SortField>('customerName');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const toggleExpanded = (rowId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(rowId)) {
      newExpanded.delete(rowId);
    } else {
      newExpanded.add(rowId);
    }
    setExpandedRows(newExpanded);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = (valueB as string).toLowerCase();
      }

      if (sortDirection === 'asc') {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });
  }, [data, sortField, sortDirection]);

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortDirection === 'asc' ? 
      <ArrowUp className="w-4 h-4 text-blue-600" /> : 
      <ArrowDown className="w-4 h-4 text-blue-600" />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderRow = (
    row: CustomerRow | PORow | InvoiceRow,
    level: number,
    parentId?: string
  ) => {
    const isCustomer = 'id' in row;
    const isPO = 'poNumber' in row;
    // const isInvoice = 'invNumber' in row;
    
    const rowId = isCustomer ? `customer-${row.id}` : 
                 isPO ? `${parentId}-po-${row.poNumber}` :
                 `${parentId}-inv-${(row as InvoiceRow).invNumber}`;
    
    const hasChildren = row.children && row.children.length > 0;
    const isExpanded = expandedRows.has(rowId);
    
    const getRowStyle = () => {
      if (isCustomer) return 'hover:bg-blue-100 font-semibold';
      if (level%2 !== 0) return 'bg-green-50 hover:bg-green-100 font-medium';
      return 'bg-blue-50 hover:bg-blue-100';
    };

    const getIdentifierCell = () => {
      if (isCustomer) return row.customerName;
      if (isPO) return `PO: ${row.customerName}`;
      return `Invoice: ${row.customerName}`;
    };

    return (
      <React.Fragment key={rowId}>
        <tr className={`transition-all duration-200 ${getRowStyle()}`}>
          <td className={`px-6 py-4 ${level > 0 ? `pl-${12 + level * 4}` : ''}`}>
            <div className="flex items-center space-x-2">
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(rowId)}
                  className="p-1 h-6 w-6 hover:bg-white/50"
                >
                  {isExpanded ? 
                    <ChevronDown className="w-4 h-4" /> : 
                    <ChevronRight className="w-4 h-4" />
                  }
                </Button>
              )}
              {!hasChildren && <div className="w-6" />}
              <span className="truncate">{getIdentifierCell()}</span>
            </div>
          </td>
          <td className="px-6 py-4 text-right font-mono">
            {formatCurrency(row.range30)}
          </td>
          <td className="px-6 py-4 text-right font-mono">
            {formatCurrency(row.rane60)}
          </td>
          <td className="px-6 py-4 text-right font-mono">
            {formatCurrency(row.rane90)}
          </td>
          <td className="px-6 py-4 text-right font-mono font-semibold">
            {formatCurrency(row.total)}
          </td>
        </tr>
        
        {hasChildren && isExpanded && row.children?.map((child) => 
          renderRow(child, level + 1, rowId)
        )}
      </React.Fragment>
    );
  };

  const totals = useMemo(() => {
    return data.reduce((acc, customer) => ({
      range30: acc.range30 + customer.range30,
      rane60: acc.rane60 + customer.rane60,
      rane90: acc.rane90 + customer.rane90,
      total: acc.total + customer.total,
    }), { range30: 0, rane60: 0, rane90: 0, total: 0 });
  }, [data]);

  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-black">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('customerName')}
                    className="font-semibold text-gray-900 hover:bg-gray-100 p-2 -m-2"
                  >
                    Customer / PO / Invoice
                    {getSortIcon('customerName')}
                  </Button>
                </th>
                <th className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('range30')}
                    className="font-semibold text-gray-900 hover:bg-gray-100 p-2 -m-2"
                  >
                    0-30 Days
                    {getSortIcon('range30')}
                  </Button>
                </th>
                <th className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('rane60')}
                    className="font-semibold text-gray-900 hover:bg-gray-100 p-2 -m-2"
                  >
                    31-60 Days
                    {getSortIcon('rane60')}
                  </Button>
                </th>
                <th className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('rane90')}
                    className="font-semibold text-gray-900 hover:bg-gray-100 p-2 -m-2"
                  >
                    61-90 Days
                    {getSortIcon('rane90')}
                  </Button>
                </th>
                <th className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('total')}
                    className="font-semibold text-gray-900 hover:bg-gray-100 p-2 -m-2"
                  >
                    Total
                    {getSortIcon('total')}
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedData.map((customer) => renderRow(customer, 0))}
              <tr className="bg-gray-50 text-black font-bold border-t-2 border-gray-100">
                <td className="px-6 py-4">Grand Total</td>
                <td className="px-6 py-4 text-right font-mono">
                  {formatCurrency(totals.range30)}
                </td>
                <td className="px-6 py-4 text-right font-mono">
                  {formatCurrency(totals.rane60)}
                </td>
                <td className="px-6 py-4 text-right font-mono">
                  {formatCurrency(totals.rane90)}
                </td>
                <td className="px-6 py-4 text-right font-mono text-lg">
                  {formatCurrency(totals.total)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportTable;