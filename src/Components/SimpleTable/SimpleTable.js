import React from 'react';
import { Table } from 'react-bootstrap'

export const SimpleTable = ({ data, titles, TdArr }) => {
    return <div>
        <Table striped bordered hover size="sm">
            {/* <thead className={`table-dark ${styles.thead}`}>
                <tr>
                    {titles.map((title) => {
                        return <th key={title} onClick={() => { sorting(title); handelColumClick(title) }} className={orderStyle(title)}>{translate[title]}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {currentItems.map((item, i) => {
                    return (
                        <tr style={{ whiteSpace: "nowrap " }} key={i} onClick={() => { handelRowClick(item.id, i) }} className={activeRow === i ? `${styles.activeRow}` : null}>
                            <td>{i + indexOfFirstItem + 1}</td>
                            <TdArr item={item} />
                        </tr>
                    );
                })}
            </tbody> */}
        </Table>
    </div>;
};

