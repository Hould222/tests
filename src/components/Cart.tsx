import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart, updateQuantity } from '../features/cartSlice.ts';
import { Button } from 'antd';
import
{ Card }
from
"antd"
;
import { BASE_URL } from '../utils/utils.ts';



const Cart: React.FC = () => {

    

    const dispatch = useDispatch();
    const cartItems = useSelector((state: any) => state.cart.items);

    const totalPrice = cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0);

    const handleRemove = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const handleClear = () => {
        dispatch(clearCart());
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        if (quantity >= 0) {
            dispatch(updateQuantity({ id, quantity }));
        }
    };

    return (
        <div>
            <h2>Корзина</h2>
            <div style={{display: 'flex' , flexWrap: 'wrap' ,alignItems:'center' , justifyContent: 'space-around'}}>
                {cartItems.map((item: any) => (
                    <Card key={item.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '30px', padding: '30px' }}>
                        <h3>{item.title}</h3>
                        <img   src={`${BASE_URL}${item.image}`} alt={item.title}  width={200}  height={200} />
                        
                        <p>Цена: {item.price}₽</p>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <Button 
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)} 
                                disabled={item.quantity <= 0}
                            >
                                -
                            </Button>
                            <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                            <Button 
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                                +
                            </Button>
                        </div>
                        <Button style={{marginTop: '30px'}} onClick={() => handleRemove(item.id)}>Удалить</Button>
                    </Card>

                ))}
            </div>
            <h3>Итого: {totalPrice}₽</h3>
            <Button onClick={handleClear}>Очистить корзину</Button>
        </div>
    );
};

export default Cart;
