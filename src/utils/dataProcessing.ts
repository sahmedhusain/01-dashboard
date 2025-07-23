export interface DataProcessor<T, R> {
  process: (data: T) => R
  validate: (data: T) => boolean
}

export const createDataProcessor = <T, R>(
  processFunc: (data: T) => R,
  validateFunc: (data: T) => boolean = () => true
): DataProcessor<T, R> => ({
  process: processFunc,
  validate: validateFunc
})

export const batchProcess = <T, R>(
  data: T[],
  processor: DataProcessor<T, R>,
  batchSize: number = 100
): R[] => {
  const results: R[] = []
  
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize)
    const batchResults = batch
      .filter(processor.validate)
      .map(processor.process)
    results.push(...batchResults)
  }
  
  return results
}

export const aggregateData = <T>(
  data: T[],
  keyFunc: (item: T) => string,
  valueFunc: (item: T) => number
): Record<string, number> => {
  return data.reduce((acc, item) => {
    const key = keyFunc(item)
    const value = valueFunc(item)
    acc[key] = (acc[key] || 0) + value
    return acc
  }, {} as Record<string, number>)
}

export const filterAndSort = <T>(
  data: T[],
  filterFunc: (item: T) => boolean,
  sortFunc: (a: T, b: T) => number
): T[] => {
  return data.filter(filterFunc).sort(sortFunc)
}
