import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import Form from 'react-bootstrap/esm/Form';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import { Context } from '../../';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { fetchTypes, fetchBrand, fetchDevice, createDevice } from '../../http/deviceApi';
import { observer } from 'mobx-react-lite';

const CreateDevice = observer(({ show, onHide }) => {
     const {device} = useContext(Context)
     const [info, setInfo] = useState([])
     const [name, setName] = useState('')
     const [price, setPrice] = useState()// был 0
     const [file, setFile] = useState(null)
   
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrand().then(data => device.setBrand(data))
    }, [])
    
     const addInfo = ()=> {
        setInfo([...info,{title: '', description: '', number: Date.now()}])
     }
     
     const removeInfo = (number) => {
         setInfo(info.filter(i => i.number !== number))
     }

     /**
      * функция добавления инфо
      * пробегаю по массиву
      * если номер совпадает с номером эллемента итерации  ТО возвращаем новый объект {...i, [key]: value} -
      * - разворачиваю в него характеристику и по ключу заменяю у него поле -
      * - тоесть если ключь был title то заменяю на новое значение
      *  В Ином случае : i - возвращаю объект не изменённым
      */

     const changeInfo = (key, value, number) => {
          setInfo(info.map(i => i.number === number ?  {...i, [key]: value} : i))
     }

     const selectFile = e => { //будет вызываться когда выбрал файл на компе console.log(e.target.files);
         setFile(e.target.files[0])   
     }

     //функция которая отправляет запрос на сервер и добавляет новое устройство
     const addDevice = ()=> { 
        const formData = new FormData()//создал объект форм дата
        // c помшщью функции append по ключу  , 
        formData.append('name', name)  //первым параметром передаю ключь
        formData.append('price', `${price} `)//а вторым параметром значение (должно быть строковым)
        formData.append('img', file)//как img передаю файл
         formData.append('brandId', device.selectedBrand.id)//забираю только id а не целиком объект
         formData.append('typeId', device.selectedType.id)
         //массив нельзя передать .. либо строка либо блопп 
         formData.append('info', JSON.stringify(info))// массив перегоняю в строку, а на сервере будет парсипься обратно в массив

        createDevice(formData).then(data => onHide() )//В ней отправляем запрос на сервер
     } 
     
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новое устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle >{device.selectedType.name || 'Выберите тип'} </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item onClick={() => device.setSelectedType(type) } key={type.id}>{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle >{device.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item onClick={() => device.setSelectedBrand(brand) } key={brand.id}>{brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control className='mt-3' value={name} onChange={e => setName(e.target.value)} placeholder='введите название устройства' />
                    <Form.Control className='mt-3' value={price} onChange={e => setPrice(Number(e.target.value))} placeholder='введите стоимость устройства' type='number' />
                    <Form.Control className='mt-3' onChange={selectFile}  type='file'/>
                    <hr/>
                    <Button variant={"outline-dark"} onClick={addInfo}>Добавить новое свойство</Button>
                    {info.map(i =>
                        <Row className='mt-3' key={i.number}>
                            <Col md={4}>
                                <Form.Control value={i.title} onChange={(e) => changeInfo('title', e.target.value, i.number) } placeholder='Введите название свойства'/>
                            </Col>
                            <Col md={4}>
                                <Form.Control value={i.description} onChange={(e) => changeInfo('description', e.target.value, i.number) } placeholder='Введите описание свойства' />
                            </Col>
                            <Col md={4}>
                                <Button variant={"outline-danger"} onClick={() =>  removeInfo(i.number)} >Удалитиь</Button>
                            </Col>
                        </Row>
                     )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-succes"} onClick={addDevice} >Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;