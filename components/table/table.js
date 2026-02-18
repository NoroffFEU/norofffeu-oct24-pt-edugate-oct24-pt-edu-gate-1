export function createTable(container, columns, actions = [], options = {}){
      const {
        onRowClick = null
    } = options;
    
  function render(data, context = {}) {

    container.innerHTML = "";

    if (!Array.isArray(data) || data.length === 0) {

      container.innerHTML =
        `<div class="row empty">No results found</div>`;

      return;
    }

    data.forEach((item, index) => {

      const row = document.createElement("div");
      row.className = "row";
       if(onRowClick){

                row.addEventListener("click", ()=>{

                    onRowClick(item);
                });

                row.style.cursor = "pointer";
            }

      // columns
      columns.forEach(col => {

        const cell = document.createElement("div");

        cell.className = `col ${col.class}`;

        cell.textContent =
            item[col.value];

        row.appendChild(cell);
      });

      // actions
      if (actions.length > 0) {

        const actionsCell =
          document.createElement("div");

        actionsCell.className = "col actions";

        actions.forEach(action => {

          const btn =
            document.createElement("button");

          btn.className = action.class;

          btn.textContent = action.label;

          btn.addEventListener("click", () =>
            action.onClick(item, index, context)
          );

          actionsCell.appendChild(btn);
        });

        row.appendChild(actionsCell);
      }

      container.appendChild(row);
    });
  }

  return { render };
}