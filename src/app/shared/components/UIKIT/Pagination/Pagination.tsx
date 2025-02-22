import React from 'react';
import PaginationItem from './PaginationItem';
import s from './Pagination.module.scss';
import { useSortStore } from '@/app/core/providers/sortProvider';

interface PaginationProps {
  page: number;
  pages: number;
}

export default function Pagination({ page, pages }: PaginationProps) {
  const { changePage } = useSortStore((store) => store);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pages) {
      changePage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageItems: React.ReactNode[] = [];

    if (pages <= 5) {
      for (let i = 1; i <= pages; i++) {
        pageItems.push(<PaginationItem key={i} page={i} active={page === i} />);
      }
    } else {
      pageItems.push(<PaginationItem key={1} page={1} active={page === 1} />);

      if (page > 3) {
        pageItems.push(<span key="dots1">...</span>);
      }

      const startPage = Math.max(2, page - 1);
      const endPage = Math.min(pages - 1, page + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageItems.push(<PaginationItem key={i} page={i} active={page === i} />);
      }

      if (page < pages - 2) {
        pageItems.push(<span key="dots2">...</span>);
      }

      pageItems.push(<PaginationItem key={pages} page={pages} active={page === pages} />);
    }

    return pageItems;
  };

  return (
    <div className={s.Pagination}>
      <div className={s.Pagination__arrow_left} onClick={() => handlePageChange(page - 1)}>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 0.295L0 6.295L1.41 7.705L6 3.125L10.59 7.705L12 6.295L6 0.295Z" fill="black"></path>
        </svg>
      </div>

      <div className={s.Pagination__items}>{renderPageNumbers()}</div>

      <div className={s.Pagination__arrow_right} onClick={() => handlePageChange(page + 1)}>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 0.295L0 6.295L1.41 7.705L6 3.125L10.59 7.705L12 6.295L6 0.295Z" fill="black"></path>
        </svg>
      </div>
    </div>
  );
}
