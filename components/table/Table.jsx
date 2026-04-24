export default function Table({
  data,
  columns,
  actions = [],
  onRowClick = null,
}) {
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="row empty">No results found</div>;
  }

  return (
    <>
      {data.map((item, index) => (
        <div
          key={item.id ?? index}
          className="row"
          onClick={() => onRowClick && onRowClick(item)}
          style={{ cursor: onRowClick ? "pointer" : "default" }}
        >
          {columns.map((col) => (
            <div key={col.key} className={`col ${col.className}`}>
              {item[col.key]}
            </div>
          ))}

          {actions.length > 0 && (
            <div className="col actions">
              {actions.map((action, actionIndex) => (
                <button
                  key={actionIndex}
                  className={action.className}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick(item, index);
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}