export interface TableColumn {
  field: string
  headerName: string
  width?: number
  flex?: number
  cellRenderer?: (params: unknown) => React.ReactNode
}

export interface TableProps {
  columns: TableColumn[]
  rowData: Record<string, unknown>[]
  height?: number
  className?: string
}
