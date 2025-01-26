import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.tsx';
import ProductList from './components/ProductList.tsx';
import Cart from './components/Cart.tsx';
import DealerList from './components/DealerList.tsx';


const App: React.FC = () => {
    const [dealerList, setDealerList] = useState<string[]>([]);
    const [filteredDealers, setFilteredDealers] = useState<string[]>([]);

    const fetchDealerList = async () => {
        try {
            const response = await fetch('https://test-frontend.dev.int.perx.ru/api/dealers/');
            if (!response.ok) {
                throw new Error('Ошибка при получении данных');
            }
            const data = await response.json();
          
            setDealerList(data);
            setFilteredDealers(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDealerList();
    }, []);

    // Функция для фильтрации дилеров
    const filterDealers = (condition: string) => {
        switch (condition) {
            case '1и2':
                setFilteredDealers(dealerList.slice(1,2));
                
                break;
            case '2и3':
                setFilteredDealers(dealerList.slice(1,3));
                
                break;
            case 'все':
                setFilteredDealers(dealerList);
                break;
            default:
                setFilteredDealers(dealerList);
        }
    };

    return (
        <Router>
            <Header />
            <DealerList dealerList={filteredDealers} filterDealers={filterDealers} />
            <Routes>
                <Route path="/" element={<ProductList dealerIds={filteredDealers} />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </Router>
    );
};

export default App;

