import React from 'react'
import { Button, IconButton, Toolbar, Typography } from '@material-ui/core'
import { ClearAll } from '@material-ui/icons'

interface TableToolbarProps {
  numRowSelect: number
  removeSelected: React.MouseEventHandler
}

const TableToolbar: React.FC<TableToolbarProps> = ({ numRowSelect, removeSelected }) => {
  const rowSelected = numRowSelect === 2
  return (
    <Toolbar variant="dense">
      <IconButton edge="start" color="inherit" aria-label="menu" disabled={numRowSelect === 0} onClick={removeSelected}>
        <ClearAll />
      </IconButton>
      {numRowSelect > 0 && (
        <Typography style={{ marginLeft: 15 }}>{`${numRowSelect} product${
          numRowSelect > 1 ? 's' : ''
        } selected`}</Typography>
      )}
      <Button variant="contained" style={{ marginLeft: 'auto' }} disabled={!rowSelected}>
        {rowSelected ? 'compare products' : 'select 2 products to compare'}
      </Button>
    </Toolbar>
  )
}

TableToolbar.propTypes = {}

export default TableToolbar
