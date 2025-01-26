import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header: React.FC = () => {
    const cartItems = useSelector((state: any) => state.cart.items);

    const totalItems = cartItems.reduce((total: number, item: any) => total + item.quantity, 0);

    return (
        <header style={{backgroundColor: 'beige',textAlign:'center'}}>
            <h1>Магазин</h1>
            <nav style={{display: 'flex', justifyContent: 'space-around',}}>
                <Link style={{textDecoration: 'none', fontSize: '2em'}} to="/">Список товаров</Link>
                <Link style={{textDecoration: 'none',fontSize: '2em'}} to="/cart">Корзина ({totalItems})</Link>
            </nav>
        </header>
    );
};

export default Header;