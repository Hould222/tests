import React from 'react';
import { DealerListProps } from '../types/types';
import { Button } from 'antd';



const DealerList: React.FC<DealerListProps> = ({ dealerList, filterDealers }) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px'}}>
            <h2>Список дилеров</h2>
            <div style={{ display: 'flex' , gap: '20px', margin: '10px' }}>
                <Button onClick={() => filterDealers('1и2')}>Дилеры 1 и 2</Button>
                <Button onClick={() => filterDealers('2и3')}>Дилеры 2 и 3</Button>
                <Button onClick={() => filterDealers('все')}>Все дилеры</Button>
            
            </div>
           
        </div>
    );
};

export default DealerList;

