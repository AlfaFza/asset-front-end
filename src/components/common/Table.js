function Table({ columns, data }) {
  return (
    <table className="w-full bg-white shadow rounded">

      {/* HEADER */}
      <thead>
        <tr className="bg-gray-200">
          {columns.map((col) => (
            <th key={col.key} className="p-2">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      {/* BODY */}
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="text-center border-t">
            {columns.map((col) => (
              <td key={col.key} className="p-2">
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>

    </table>
  );
}

export default Table;