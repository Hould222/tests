import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, fetchProductsByDealers } from '../features/dealersSlice.ts';
import { addToCart } from '../features/cartSlice.ts';
import { Button, Card } from 'antd';
import { AppDispatch } from '../store.ts';
import { CartItem, Product, ProductListProps } from '../types/types.ts';
import { BASE_URL } from '../utils/utils.ts';


const ProductList: React.FC<ProductListProps> = ({ dealerIds }) => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: any) => state.dealers.products);
    const status = useSelector((state: any) => state.dealers.status);

    useEffect(() => {
        // Проверяем, есть ли идентификаторы дилеров
        if (dealerIds) {
            // Если есть идентификаторы дилеров, получаем продукты по ним
            dispatch(fetchProductsByDealers(dealerIds.join(',')));
        } else {
            // В противном случае, получаем все продукты
            dispatch(fetchAllProducts());
        }
    }, [dispatch, dealerIds]); 

    if (status === 'loading') {
        return <div>Загрузка...</div>;
    }

    if (status === 'failed') {
        return <div>Ошибка при загрузке продуктов.</div>;
    }

    const handleAddToCart = (product: Product, quantity: number) => {
        const cartItem: CartItem = {
            id: product.id,
            title: product.name,
            quantity,
            price: product.price,
            image: product.image,
        };
        dispatch(addToCart(cartItem));
    };

    return (
        <div>
            <h2 style={{ padding: '10px' }}>Список товаров</h2>
            <div style={{display: 'flex' , flexWrap: 'wrap' ,alignItems:'center' , justifyContent: 'space-around'}}>
                {products.map((product: Product) => (
                    <Card key={product.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '30px', padding: '30px' }}>
                        <img src={`${BASE_URL}${product.image}`} alt={product.name} width={200} height={200} />
                        <h3>{product.name}</h3>
                        <p>Цена: {product.price}₽</p>
                        <Button onClick={() => handleAddToCart(product, 1)}>Добавить в корзину</Button>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
