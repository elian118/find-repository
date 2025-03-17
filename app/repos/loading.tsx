import React from 'react';
import { headers } from '@/app/repos/consts';

const Loading = () => {
  return (
    <div className="flex flex-col gap-2 p-4 w-full mainContainer">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="w-1/2 flex items-center gap-2">
            <div className="w-30 flex items-center gap-2">리포지토리</div>
            <div className="w-40 h-8 skeleton" />
          </div>
          <div className="w-1/2 flex justify-end items-center gap-2">
            <div className="w-40 h-8 skeleton" />
            <button className="btn btn-sm btn-primary">검색</button>
            <button className="btn btn-sm btn-primary">초기화</button>
          </div>
        </div>
        <div className="rounded-md h-160 overflow-y-scroll">
          <table className="table table-pin-rows">
            <thead>
              <tr className="bg-gray-100 text-gray-800">
                {headers.map((col) => (
                  <th
                    key={col.key}
                    className={`truncate ${
                      ['name', 'description'].includes(col.key)
                        ? 'min-w-40 max-w-60'
                        : col.key === 'updated_at'
                          ? 'w-36'
                          : 'w-32'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="truncate">{col.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, idx) => (
                <tr key={idx}>
                  {headers.map((col, cIdx) => (
                    <td
                      key={cIdx}
                      className={`${
                        ['name', 'description'].includes(col.key)
                          ? 'min-w-40 max-w-60'
                          : col.key === 'updated_at'
                            ? 'w-36'
                            : 'w-32'
                      }`}
                    >
                      <div className="skeleton w-full h-8" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Loading;
