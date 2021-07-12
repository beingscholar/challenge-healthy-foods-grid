import React, { useMemo, CSSProperties } from 'react'
import { Product, ProductId, ProductPropertyEntryDTO } from '@/api/types'
import { Chip, TableCell, TableRow } from '@material-ui/core'

interface CompareProductsProps {
  selected: ProductId[]
  products: Product[]
  productProps: ProductPropertyEntryDTO[]
}
const CompareProducts: React.FC<CompareProductsProps> = ({ selected, products, productProps }) => {
  const productOne = useMemo(() => products.find((product) => product.id === selected[0]), [selected, products])
  const productTwo = useMemo(() => products.find((product) => product.id === selected[1]), [selected, products])

  return (
    <TableRow>
      {selected.length === 2 &&
        productProps &&
        productProps.map((productProp) => {
          const { name } = productProp
          switch (name) {
            case 'name':
              return (
                <ProductCell key={name}>
                  {productOne[name]} vs <br /> {productTwo[name]}
                </ProductCell>
              )
            case 'tags':
              return <ProductCell key={name}>{`${productOne.tags?.join(', ') ?? '-'}`}</ProductCell>
            default:
              const isNotEqual = productOne[name] !== productTwo[name] ? true : false
              const myStyles: CSSProperties = {
                textDecoration: isNotEqual ? 'line-through' : '',
                marginRight: '.25rem'
              }
              return (
                <ProductCell key={name}>
                  <Chip
                    size="small"
                    color="primary"
                    label={
                      typeof productOne[name] === 'number'
                        ? Math.round(Number(productOne[name]) * 100) / 100
                        : productOne[name] ?? '-'
                    }
                    style={myStyles}
                  />
                  {isNotEqual && (
                    <Chip
                      size="small"
                      color="secondary"
                      label={
                        typeof productTwo[name] === 'number'
                          ? Math.round(Number(productTwo[name]) * 100) / 100
                          : productTwo[name] ?? '-'
                      }
                    />
                  )}
                </ProductCell>
              )
          }
        })}
    </TableRow>
  )
}

export default CompareProducts

function ProductCell({ children }: { children?: React.ReactNode }) {
  return <TableCell align="center">{children || '-'}</TableCell>
}
