import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import Form from 'react-bootstrap/esm/Form';
import { createType } from '../../http/deviceApi';

const CreateType = ({show, onHide}) => {
    //  show  -- отвечает за то виден компонент или нет
    // onHide -- функция которая окно скрывает
    const[value, setValue] = useState('')  
    const [active, setActive] = useState(true)
    
    useEffect(() => {//активирует кнопку только при не пустой строке
        if (value && active) {
            setActive(false)
        } else if (!value && !active) {
            setActive(true)
        }
    }, [value])

    const addType = ()=> {
        createType({name: value}).then(data => setValue('') )
        onHide()
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
                    Добавить новый тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                       value={value}
                       onChange={e => setValue(e.target.value)}
                       placeholder={"Введите название типа"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"}  onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-succes"} disabled={active}  onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;