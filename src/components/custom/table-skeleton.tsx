"use client";

import React from "react";

const TableSkeleton: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
        <tbody className="divide-y divide-gray-200 bg-white">
          {[...Array(3)].map((_, index) => (
            <tr key={`table-loading-${index}`}>
              <td className="px-4 py-3">
                <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
