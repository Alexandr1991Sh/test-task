import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import {ProductCard} from '../components/ProductCard'
import {Container, Stack, Typography, Pagination, Box} from '@mui/material'
import {Product} from '../common/types/types'
import {useGetCategoryQuery} from "../../src/store/api/api"

const categoryMapping: Record<string, string> = {
    'food': 'Продукты',
    'clothing': 'Одежда',
    'electronics': 'Электроника'
}

const limit = 6

export const CategoryPage = () => {
    const {category} = useParams<{ category: string }>()
    const [page, setPage] = useState(1)

    const {data} = useGetCategoryQuery({page, category, limit})

    const handlePageChange = (event: unknown, value: number) => {
        setPage(value)
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Typography variant="h4" component="h1" gutterBottom textAlign="center">
                {category ? categoryMapping[category] : ''}
            </Typography>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4
            }}>
                <Stack
                    spacing={3}
                    direction="row"
                    flexWrap="wrap"
                    useFlexGap
                    justifyContent="center"
                    sx={{width: '100%'}}
                >
                    {data?.items?.map((product: Product) => (
                        <div key={product.id} style={{flex: '0 1 300px', margin: '8px'}}>
                            <ProductCard product={product}/>
                        </div>
                    ))}
                </Stack>

                {(data?.totalCount ?? 0) > limit && (
                    <Pagination
                        count={Math.ceil((data?.totalCount ?? 0) / limit)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                        sx={{mt: 4, mb: 2}}
                    />
                )}
            </Box>
        </Container>
    )
}

