import React from 'react'
import { AppBar, Toolbar, Typography, Button, Badge, IconButton, Box } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleCart } from '../store/cartSlice'
import { AppDispatch, RootState } from '../store/store'
import { CartItem } from '../common/types/types'

export const Navigation = () => {
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const totalItems = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)

  const handleCartClick = () => {
    dispatch(toggleCart())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          E-Commerce
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/food"
            sx={{ color: location.pathname === '/food' ? '#fff' : 'rgba(255,255,255,0.7)' }}
          >
            Еда
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/clothing"
            sx={{ color: location.pathname === '/clothing' ? '#fff' : 'rgba(255,255,255,0.7)' }}
          >
            Одежда
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/electronics"
            sx={{ color: location.pathname === '/electronics' ? '#fff' : 'rgba(255,255,255,0.7)' }}
          >
            Электроника
          </Button>
          <IconButton color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
