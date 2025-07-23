import { useState, useMemo } from 'react'

interface PaginationOptions {
  initialPage?: number
  initialPageSize?: number
  totalItems: number
}

interface PaginationResult<T> {
  currentPage: number
  pageSize: number
  totalPages: number
  totalItems: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  startIndex: number
  endIndex: number
  paginatedData: T[]
  goToPage: (page: number) => void
  goToNextPage: () => void
  goToPreviousPage: () => void
  goToFirstPage: () => void
  goToLastPage: () => void
  setPageSize: (size: number) => void
}

export const usePagination = <T>(
  data: T[],
  options: PaginationOptions
): PaginationResult<T> => {
  const {
    initialPage = 1,
    initialPageSize = 10,
    totalItems
  } = options

  const [currentPage, setCurrentPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const totalPages = Math.ceil(totalItems / pageSize)
  const hasNextPage = currentPage < totalPages
  const hasPreviousPage = currentPage > 1
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)

  const paginatedData = useMemo(() => {
    return data.slice(startIndex, startIndex + pageSize)
  }, [data, startIndex, pageSize])

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(validPage)
  }

  const goToNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const goToPreviousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const goToFirstPage = () => {
    setCurrentPage(1)
  }

  const goToLastPage = () => {
    setCurrentPage(totalPages)
  }

  const handleSetPageSize = (size: number) => {
    setPageSize(size)
    // Adjust current page if necessary
    const newTotalPages = Math.ceil(totalItems / size)
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages)
    }
  }

  return {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    hasNextPage,
    hasPreviousPage,
    startIndex,
    endIndex,
    paginatedData,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    setPageSize: handleSetPageSize
  }
}
