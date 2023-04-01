import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import Row from 'react-bootstrap/esm/Row';
import DeviseItem from './DeviseItem';

const DeviceList = observer(() => {
    const { device } = useContext(Context)

    
    return (
        <Row className='d-flex' >
             {device.devices.map(device =>
                  <DeviseItem key={device.id} device={device} />
                ) }
        </Row>
    );
});

export default DeviceList;