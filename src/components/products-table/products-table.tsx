import { ProductId } from '@/api/types'
import {
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
import React, { useState } from 'react'
import { ProductsTableProps } from '../types'
import CompareProducts from './compare-products'
import Toolbar from './table-toolbar'

const ProductsTable: React.FC<ProductsTableProps> = ({ productProperties, products }) => {
  // Feature 1: Display products in a rich text table
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [selected, setSelected] = useState<ProductId[]>([])

  // Feature 2: Compare two products
  const [isCompared, setIsCompared] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const isSelected = (productId: ProductId) => selected.indexOf(productId) !== -1

  const handleClick = (event: React.MouseEvent<unknown>, productId: ProductId) => {
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
    if (newSelected.length < 2) setIsCompared(false)
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
          setIsCompared(false)
        }}
        compareHandler={() => setIsCompared(true)}
      />

      <TableContainer style={{ width: 1170, height: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {productProperties.map(({ name, label }) => (
                <TableCell key={name}>{label}</TableCell>
              ))}
            </TableRow>
            {isCompared && <CompareProducts selected={selected} products={products} productProps={productProperties} />}
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={product.id}
                  onClick={(event) => handleClick(event, product.id)}
                  aria-checked={isSelected(product.id)}
                  selected={isSelected(product.id)}
                >
                  {productProperties.map(({ name }) => {
                    return (
                      <TableCell key={name}>
                        {name === 'tags'
                          ? product[name]?.join(', ')
                          : typeof product[name] === 'number'
                          ? Math.round(Number(product[name]) * 100) / 100
                          : product[name] ?? '-'}
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
}

export default ProductsTable
