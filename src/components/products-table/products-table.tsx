import React, { useState } from 'react'
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core'
import { ProductsTableProps } from '../types'
import type { Product, ProductPropertyEntryDTO } from '@/api/types'
import Toolbar from './table-toolbar'
import { ProductId } from '@/api/types'

const ProductsTable: React.FC<ProductsTableProps> = ({ productProperties, products }) => {
  // TODO Feature 1: Display products in a rich text table

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [selected, setSelected] = useState<ProductId[]>([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const isSelected = (productId: ProductId) => {
    const index = selected.indexOf(productId)
    return index > -1
  }

  const handleSelection = (productId: ProductId) => () => {
    const newSelected = [...selected]
    const selectIndex = newSelected.indexOf(productId)
    if (selectIndex > -1) {
      newSelected.splice(selectIndex, 1)
    } else {
      newSelected.push(productId)
    }
    if (newSelected.length > 2) {
      newSelected.splice(0, 1)
    }
    // if (newSelected.length < 2) setShowComparison(false)

    setSelected(newSelected)
  }

  return !products || !productProperties ? (
    <Typography variant="h4">no products found...!</Typography>
  ) : (
    <Paper>
      <Toolbar
        numRowSelect={selected.length}
        removeSelected={() => {
          setSelected([])
        }}
      />
      <TableContainer style={{ width: 1024, height: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {productProperties.map(({ name, label }) => (
                <TableCell key={name}>{label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={product.id}
                  selected={isSelected(product.id)}
                  onClick={handleSelection(product.id)}
                >
                  {productProperties.map(({ name }) => {
                    // const value = product[name];
                    return (
                      <TableCell key={name}>
                        {(name === 'tags' ? product[name]?.join(', ') : product[name]) ?? '-'}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
  // TODO Feature 2: Compare two products
}

export default ProductsTable
