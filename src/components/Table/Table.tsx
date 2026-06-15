import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
import styles from './Table.module.css'
import type { TableProps } from './Table.types'
import { cn } from '@/lib/utils'

ModuleRegistry.registerModules([AllCommunityModule])

const Table: React.FC<TableProps> = ({
  columns,
  rowData,
  height = 400,
  className,
}) => {
  return (
    <div
      className={cn(styles.wrapper, className)}
      style={{ height }}
    >
      <AgGridReact
        columnDefs={columns}
        rowData={rowData}
        domLayout="normal"
        rowHeight={48}
        headerHeight={48}
        theme="legacy"
      />
    </div>
  )
}

export default Table
