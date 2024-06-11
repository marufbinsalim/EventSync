import React from "react";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  paginationInfo: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
  options?: {
    startPages?: number;
    endPages?: number;
    surroundingPages?: number;
  };
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  paginationInfo,
  options = {
    startPages: 1,
    endPages: 1,
    surroundingPages: 1,
  },
}) => {
  const { startPages, endPages, surroundingPages } = options;

  function handleNext() {
    if (page < paginationInfo.totalPages) {
      setPage(page + 1);
    }
  }

  function handlePrevious() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function renderPageNumbers() {
    const { totalPages } = paginationInfo;
    const pageNumbers: (number | string)[] = [];

    const startPagesArray = Array.from(
      { length: startPages || 0 },
      (_, i) => i + 1
    );
    const endPagesArray = Array.from(
      { length: endPages || 0 },
      (_, i) => totalPages - (endPages || 0) + 1 + i
    );
    const surroundingStart = Math.max(
      (startPages || 0) + 1,
      page - (surroundingPages || 0)
    );
    const surroundingEnd = Math.min(
      totalPages - (endPages || 0),
      page + (surroundingPages || 0)
    );

    if (
      totalPages <=
      (startPages || 0) + (endPages || 0) + (surroundingPages || 0) * 2
    ) {
      // If total pages are less than or equal to the sum of start, end, and surrounding pages, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first few pages
      pageNumbers.push(...startPagesArray);

      // Show ellipsis if there's a gap between start and surrounding pages
      if (surroundingStart > (startPages || 0) + 1) {
        pageNumbers.push("...");
      }

      // Show pages around the current page
      for (let i = surroundingStart; i <= surroundingEnd; i++) {
        pageNumbers.push(i);
      }

      // Show ellipsis if there's a gap between surrounding and end pages
      if (surroundingEnd < totalPages - (endPages || 0)) {
        pageNumbers.push("...");
      }

      // Show last few pages
      pageNumbers.push(...endPagesArray);
    }

    return pageNumbers.map((pageNumber, index) => (
      <button
        key={index}
        onClick={() => typeof pageNumber === "number" && setPage(pageNumber)}
        className={`p-2 rounded-md ${
          pageNumber === page ? "bg-slate-900" : "bg-slate-700"
        }`}
        disabled={typeof pageNumber !== "number"}
      >
        {pageNumber}
      </button>
    ));
  }

  return (
    <div className="flex gap-2 justify-center items-center p-2 md:p-4 bg-slate-800 text-slate-300 flex-wrap">
      <button
        onClick={handlePrevious}
        className="p-2 bg-slate-700 rounded-md"
        disabled={page === 1}
      >
        Prev
      </button>
      <div className="flex gap-2">{renderPageNumbers()}</div>
      <button
        onClick={handleNext}
        className="p-2 bg-slate-700 rounded-md"
        disabled={page === paginationInfo.totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
