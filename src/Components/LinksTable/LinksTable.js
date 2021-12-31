import { React, useContext, useState } from 'react'
import LinksContext from '../../store/Links-context';
import { Table, Pagination, Form, Col, Row, Button, Modal, ModalTitle } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { OutClicker } from '../Utils';
import { AddLink, EditLink, DeleteLink } from '../Utils';
import { FormikLinkForm } from '../LinkForm'
import styles from './LinksTable.module.css'

const getCategory = (link, categories) => {
    var category = categories.find(category => category._id === link.categoryId);
    return category.title;
}

export function LinksTable() {
    const LinksCtx = useContext(LinksContext);

    const [activeRow, setActiveRow] = useState(null);
    const [sortedColum, setSortedColum] = useState(null);
    //for pop up modal
    const [modelInfo, setModelInfo] = useState('');
    const [show, setShow] = useState(false);
    const [modalTitle, setModalTile] = useState('');
    const [isDeleteFunc, setIsDeleteFunc] = useState(false);
    const [deletedRes, setDeletedRes] = useState(null);
    //Fuc state for form submit
    const [formSubmit, setFormSubmit] = useState()
    //for Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState('0');
    //for search
    const [searchTerm, setSearchTerm] = useState('');
    //fro Table ordering
    const [order, setOrder] = useState('ASC');
    //pagination variables 
    const maxPages = Math.ceil(LinksCtx.links.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // eslint-disable-next-line array-callback-return
    var filteredData = searchTerm === '' ? LinksCtx.links : LinksCtx.links.filter((value) => {
        if (
            value.title.includes(searchTerm) ||
            value.description.includes(searchTerm)
        ) {
            return value
        }
    });
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
    const handelRowClick = (linkID, key) => {
        setModelInfo(linkID);
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
    };
    const handleRefreshGlobalCTX = () => {
        LinksCtx.setChange(true);
    }

    const DeleteModal = () => {
        return (
            <div>
                {!deletedRes ?
                    <div className={`d-flex justify-content-center ${styles.deleteContainer}`}>
                        <Button variant='danger' size="lg" onClick={handelDeleteConfirmed} className={styles.deleteBtns}>{'מחק'}</Button>
                        <Button variant='secondary' size="lg" onClick={handelClose} className={styles.deleteBtns}>{'ביטול'}</Button>
                    </div>
                    :
                    <div>
                        <p className={`d-flex justify-content-center ${deletedRes.type === 'success' ? 'text-success' : 'text-danger'}`}>{deletedRes.message}</p>
                    </div>}
            </div>
        )
    }

    const ModalContent = () => {
        return (
            <Modal show={show} onHide={handelClose}>
                <Modal.Header closeButton>
                    <ModalTitle className={styles.modalTitle}>{modalTitle}</ModalTitle>
                </Modal.Header>
                <Modal.Body>
                    {isDeleteFunc ? <DeleteModal /> : <FormikLinkForm linkID={modelInfo} formSubmit={formSubmit} />}
                    <Modal.Footer className="d-flex justify-content-start"><Button variant='success' size="sm" onClick={handleRefreshGlobalCTX}>{'רענן טבלאות'}</Button></Modal.Footer>
                </Modal.Body>
            </Modal>
        )
    }
    //add, edit, delete buttons configuration
    const handelAddBtnClick = () => {
        setIsDeleteFunc(false)
        setModelInfo(null);
        setActiveRow(null);
        setModalTile('הוסף קישור');
        setFormSubmit(() => AddLink)
        handelShow();
    }
    const handelEditBtnClick = () => {
        setIsDeleteFunc(null)
        handelShow();
        setModalTile('ערוך קישור');
        setFormSubmit(() => EditLink)
    }
    const handelDeleteBtnClick = () => {
        setDeletedRes(false)
        setIsDeleteFunc(true);
        handelShow();
        setModalTile('האם אתה בטוח?');
    }
    const handelDeleteConfirmed = async () => {
        DeleteLink(modelInfo).then((res) => {
            setDeletedRes(res)
        })
    }


    return (
        <div>
            {/*gets the clicks outside of the table and resets the activeRow state */}
            <OutClicker onClickOutside={() => { !show && setActiveRow(null) }}>
                <div className={styles.header}>
                    <Row className="align-items-center">
                        <Col xs="auto" className="my-1">
                            <Form.Label>שורות בדף</Form.Label>
                        </Col>
                        <Col xs="auto" className="my-1">
                            <Form.Select className="me-sm-1" id="inlineFormCustomSelect" onChange={(e) => { setItemsPerPage(e.target.value); setCurrentPage(1) }}>
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
                            <Form.Control type="text" placeholder="חיפוש..." onChange={(e) => setSearchTerm(e.target.value)} />
                        </Col>
                    </Row>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th onClick={() => { sorting('_id'); handelColumClick('_id') }} className={orderStyle('_id')}>{`#`}</th>
                            <th onClick={() => { sorting('title'); handelColumClick('title') }} className={orderStyle('title')}>{`שם`}</th>
                            <th onClick={() => { sorting('path'); handelColumClick('path') }} className={orderStyle('path')}>{`כתובת`}</th>
                            <th onClick={() => { sorting('categoryId'); handelColumClick('categoryId') }} className={orderStyle('categoryId')}>{"קטגוריה"}</th>
                            <th onClick={() => { sorting('description'); handelColumClick('description') }} className={orderStyle('description')}>{`תיאור`}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((link, i) => {
                            return (
                                <tr key={i} onClick={() => { handelRowClick(link._id, i) }} className={activeRow === i ? `${styles.activeRow}` : null}>
                                    <td>{i + indexOfFirstItem + 1}</td>
                                    <td>{link.title}</td>
                                    <td>{link.path}</td>
                                    <td>{getCategory(link, LinksCtx.categories)}</td>
                                    <td>{link.description}</td>
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

