export function createPagination(container, onPageChange) {

  function render({ currentPage, totalItems, itemsPerPage }) {

    container.innerHTML = "";

    const totalPages =
      Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return;

    renderNavigationButtons(
      container,
      currentPage,
      totalPages
    );
  }

  function createButton(label, page, options = {}) {

    const { disabled, active } = options;

    const btn = document.createElement("button");

    btn.textContent = label;

    if (disabled) btn.disabled = true;
    if (active) btn.classList.add("active");

    btn.addEventListener("click", () => {
      onPageChange(page);
    });

    return btn;
  }

  function renderNavigationButtons(
    container,
    currentPage,
    totalPages
  ) {

    container.appendChild(
      createButton("«", 1, {
        disabled: currentPage === 1
      })
    );

    container.appendChild(
      createButton("‹", currentPage - 1, {
        disabled: currentPage === 1
      })
    );

    renderPageNumbers(
      container,
      currentPage,
      totalPages
    );

    container.appendChild(
      createButton("›", currentPage + 1, {
        disabled: currentPage === totalPages
      })
    );

    container.appendChild(
      createButton("»", totalPages, {
        disabled: currentPage === totalPages
      })
    );
  }

  function renderPageNumbers(
    container,
    currentPage,
    totalPages
  ) {

    const maxVisible = 5;

    let start =
      Math.max(1, currentPage - 2);

    let end =
      Math.min(totalPages, start + maxVisible - 1);

    for (let i = start; i <= end; i++) {

      container.appendChild(
        createButton(i, i, {
          active: i === currentPage
        })
      );
    }
  }

  return { render };
}