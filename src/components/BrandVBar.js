import React, { useContext } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import Form from 'react-bootstrap/esm/Form';
import Card from 'react-bootstrap/esm/Card';

const BrandVBar = observer(() => {
    const { device } = useContext(Context)
    return (
        <Form className='d-flex'>
            {device.brands.map(brand =>
                <Card
                  style={{cursor: "pointer"}}
                  border={brand.id === device.selectedBrand.id ? "danger" : "light" } 
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand.id}
                  className="p-3">
                    {brand.name}
                </Card>
                ) }
        </Form>
    );
});

export default BrandVBar;