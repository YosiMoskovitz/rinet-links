import { React, useState } from 'react'
import { Table, Pagination, Form, Col, Row, Button, Modal, ModalTitle, CloseButton, Alert } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { OutClicker } from '../Utils';

import styles from './TablePro.module.css'
import translate from '../Utils/engToHeb.json'


export function TablePro({ data, titles, type, refreshBtn, TdArr, funcsObj, ManegeForm }) {
    const [activeRow, setActiveRow] = useState(null);
    const [sortedColum, setSortedColum] = useState(null);
    //for pop up modal
    const [modelInfo, setModelInfo] = useState('');
    const [show, setShow] = useState(false);
    const [modalTitle, setModalTile] = useState('');
    const [isDeleteFunc, setIsDeleteFunc] = useState(false);
    const [deletedRes, setDeletedRes] = useState(null);
    //Func state for form submit
    const [formSubmit, setFormSubmit] = useState()
    //for Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState('0');
    //for search
    const [searchTerm, setSearchTerm] = useState('');
    //fro Table ordering
    const [order, setOrder] = useState('ASC');
    //pagination variables 
    const maxPages = Math.ceil(data.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;


    const search = (searchTerm, objectArray) => {
        let result = objectArray.filter(obj => Object.values(obj).some(val => val ? val.toString().toLowerCase().includes(searchTerm) : false));
        return result;
    }
    var filteredData = searchTerm === '' ? data : search(searchTerm, data)

    const currentItems = itemsPerPage === '0' ? filteredData : filteredData.slice(indexOfFirstItem, indexOfLastItem);

    //Pagination Funcs
    const handelNextClick = () => {
        maxPages > currentPage && setCurrentPage((Prev) => Prev + 1)
    }
    const handelPrevClick = () => {
        currentPage > 1 && setCurrentPage((Prev) => Prev - 1)
    }
    const handelFirstClick = () => {
        setCurrentPage(1)
    }
    const handelLastClick = () => {
        setCurrentPage(maxPages)
    }
    //Table ordering Funcs
    const sorting = (col) => {
        if (order === 'ASC') {
            const sorted = filteredData.sort((a, b) =>
            a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            filteredData = sorted;
            setOrder('DSC')
            return
        }
        if (order === 'DSC') {
            const sorted = filteredData.sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
            filteredData = sorted;
            setOrder('ASC')
            return
        }
        // else {
        //     console.log('else',order)
        //     console.log('else',col)
        // }

    }
    //select Funcs
    const handelRowClick = (id, key) => {
        setModelInfo(id);
        setActiveRow(key);

    }
    const handelColumClick = (key) => {
        setSortedColum(key);
    }
    const orderStyle = (colum) => {
        var styled = null
        if (sortedColum === colum) styled = styles.activeColum + ' '
        if (order === 'ASC') styled += styles.ColumUp
        else styled += styles.ColumDown
        return styled
    }
    //Modal Funcs
    const handelShow = () => setShow(true);
    const handelClose = () => {
        setShow(false);
        if (deletedRes) {
            refreshBtn && refreshBtn();
        }
        setDeletedRes(undefined)
    };


    const DeleteModal = () => {
        return (
            <div>
                {!deletedRes ?
                    <div className={`d-flex justify-content-center ${styles.deleteContainer}`}>
                        <Button variant='danger' size="lg" onClick={handelDeleteConfirmed} className={styles.deleteBtns}>{'מחק'}</Button>
                        <Button variant='secondary' size="lg" onClick={handelClose} className={styles.deleteBtns}>{'ביטול'}</Button>
                    </div>
                    :
                    <Alert variant={deletedRes.type === 'success' || deletedRes.status === 'OK' ? 'success' : 'danger'}>
                        {deletedRes.type === 'success' || deletedRes.status === 'OK'? <CheckCircleIcon color='success' fontSize='large' />
                            : <DangerousIcon color='danger' fontSize='large' />} {deletedRes.message ?? deletedRes.data}
                    </Alert>}
            </div>
        )
    }

    const ModalContent = () => {
        return (
            <Modal show={show} onHide={handelClose}>
                <Modal.Header>
                    {!deletedRes ? <ModalTitle>{modalTitle}</ModalTitle> : null}
                    <CloseButton className={styles.closeButton} onClick={handelClose} />
                </Modal.Header>
                <Modal.Body>
                    {isDeleteFunc ? <DeleteModal /> : <ManegeForm id={modelInfo} formSubmit={submitMiddleware} data={data} />}
                    <Modal.Footer className="d-flex justify-content-start"><Button variant='success' size="sm" onClick={() => { setShow(false); refreshBtn() }}>{'רענן טבלה'}</Button></Modal.Footer>
                </Modal.Body>
            </Modal>
        )
    }
    //add, edit, delete buttons configuration
    const handelAddBtnClick = () => {
        setIsDeleteFunc(false)
        setModelInfo(null);
        setActiveRow(null);
        setModalTile(`הוסף ${type}`);
        setFormSubmit(() => funcsObj.add)
        handelShow();
    }
    const handelEditBtnClick = () => {
        setIsDeleteFunc(null)
        handelShow();
        setModalTile(`ערוך ${type}`);
        setFormSubmit(() => funcsObj.edit)
    }
    const handelDeleteBtnClick = () => {
        setDeletedRes(false)
        setIsDeleteFunc(true);
        setModalTile('האם אתה בטוח?');
        handelShow();
    }
    const handelDeleteConfirmed = async () => {
        const res = await funcsObj.delete(modelInfo);
        if (res.handler) setDeletedRes(res.handler);
        else setDeletedRes(res)
    }
    // CRUD funcs manager
    const submitMiddleware = async (values) => {
        const res = await formSubmit(values);
        if (res.handler) return res.handler;
        else return res
    }

    return (
        <div>
            {/*gets the clicks outside of the table and resets the activeRow state */}
            <OutClicker onClickOutside={() => { !show && setActiveRow(null) }}>
                <div className={styles.header}>
                    <Row className="align-items-center">
                        <Col xs="auto" className="my-1">
                            <Form.Label>כמות שורות בדף</Form.Label>
                        </Col>
                        <Col xs="auto" className="my-1">
                            <Form.Select className="ms-1" onChange={(e) => { setItemsPerPage(e.target.value); setCurrentPage(1) }}>
                                <option default value="0">הכל</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                            </Form.Select>
                        </Col>
                        <Col xs="auto" className={`col-auto ${styles.editBtns}`}>
                            <Button className={`${styles.btn} ${styles.Addbtn} shadow-none`}
                                onClick={handelAddBtnClick}>
                                <AddIcon fontSize='small' />
                                {'הוסף'}
                            </Button>
                            <Button variant="secondary" className={styles.btn} disabled={activeRow === null}
                                onClick={handelEditBtnClick}>
                                <EditIcon fontSize='small' />
                                {'ערוך'}
                            </Button>
                            <Button variant="danger" className={styles.btn} disabled={activeRow === null}
                                onClick={handelDeleteBtnClick}>
                                <DeleteIcon fontSize='small' />
                                {'מחק'}
                            </Button>
                        </Col>
                        <Col xs="auto" className="me-auto col-md-3">
                            <Form.Control type="search" placeholder="חיפוש..." onChange={(e) => setSearchTerm(e.target.value)} />
                        </Col>
                    </Row>
                </div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            {titles.map((title) => {
                                return <th key={title} onClick={() => { sorting(title); handelColumClick(title) }} className={orderStyle(title)}>{translate[title]}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, i) => {
                            return (
                                <tr key={i} onClick={() => { handelRowClick(item.id, i) }} className={activeRow === i ? `${styles.activeRow}` : null}>
                                    <td>{i + indexOfFirstItem + 1}</td>
                                    <TdArr item={item} />
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                {itemsPerPage !== '0' &&
                    <Pagination className="justify-content-center">
                        {currentPage > 1 && <Pagination.First onClick={handelFirstClick} className='shadow-none' />}
                        <Pagination.Prev onClick={handelPrevClick} />
                        <Pagination.Item disabled>{`מציג ${indexOfLastItem} - ${indexOfFirstItem + 1} מתוך ${filteredData.length}`}</Pagination.Item>
                        <Pagination.Next onClick={handelNextClick} />
                        {currentPage < maxPages && <Pagination.Last onClick={handelLastClick} />}
                    </Pagination>}
            </OutClicker>
            {show ? <ModalContent /> : null}
        </div>
    )
}

