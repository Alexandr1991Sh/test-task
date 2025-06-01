import React from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Button,
  Badge,
  Divider,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useSelector } from 'react-redux'
import { removeFromCart, toggleCart } from '../store/cartSlice'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { RootState } from '../store/store'
import { CartItem } from '../common/types/types'

export const Cart = () => {
  const dispatch = useAppDispatch()
  const { items, isOpen } = useSelector((state: RootState) => state.cart)

  const handleClose = () => {
    dispatch(toggleCart())
  }

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id))
  }

  const totalItems = items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 400 } } }}
    >
      <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2 
        }}>
          <Typography variant="h6">
            Корзина
          </Typography>
          <Badge badgeContent={totalItems} color="primary" showZero>
            <Typography variant="body1">
              Товаров
            </Typography>
          </Badge>
        </Box>

        {items.length === 0 ? (
          <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
            Корзина пуста
          </Typography>
        ) : (
          <>
            <List sx={{ flexGrow: 1, overflow: 'auto' }}>
              {items.map((item: CartItem) => (
                <ListItem
                  key={item.id}
                  sx={{
                    bgcolor: 'background.paper',
                    mb: 1,
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveItem(item.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        {item.title}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {formatPrice(item.price)} × {item.quantity}
                        </Typography>
                        <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                          {formatPrice(item.price * item.quantity)}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Box sx={{ 
              mt: 'auto', 
              pt: 2,
              borderTop: 1, 
              borderColor: 'divider',
            }}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Товары ({totalItems}):</Typography>
                  <Typography variant="body1">{formatPrice(totalPrice)}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="h6">Итого:</Typography>
                  <Typography variant="h6" color="primary">{formatPrice(totalPrice)}</Typography>
                </Box>
              </Box>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ 
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 'bold'
                }}
              >
                Оформить заказ
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  )
}
