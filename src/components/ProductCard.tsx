import React from 'react'
import { Card, CardContent, Typography, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Product } from '../common/types/types'
import { addToCart } from '../store/cartSlice'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }:ProductCardProps) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  return (
    <Card sx={{ 
      maxWidth: 345, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#f5f5f5',
      '&:hover': {
        backgroundColor: '#e0e0e0',
        transform: 'translateY(-2px)',
        transition: 'all 0.2s ease-in-out'
      }
    }}>
      <CardContent sx={{ 
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        p: 3
      }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div"
          sx={{
            fontWeight: 'bold',
            mb: 2
          }}
        >
          {product.title}
        </Typography>
          <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{mb: 2}}
          >
             {product.price} рублей
          </Typography>
      </CardContent>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleAddToCart} 
        sx={{ 
          mx: 2, 
          mb: 2,
          borderRadius: 2
        }}
      >
        Добавить в корзину
      </Button>
    </Card>
  )
}
