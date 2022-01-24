import { React, useContext } from 'react'
import LinksContext from '../../store/Links-context';
import { TablePro } from '../TablePro';
import { AddLink, EditLink, DeleteLink } from '../../Api/LinksAPI';
import { LinkForm } from '../LinkForm';
import translate from '../Utils/engToHeb.json'

const getCategory = (link, categories) => {
    var category = categories.find(category => category.id === link.categoryId);
    return translate[category.title];
}

export function LinksTable() {
    const LinksCtx = useContext(LinksContext);

    const titles = Object.keys(LinksCtx.links[0]);

    const Tds = ({item}) => {
        return (
            <>
                <td>{item.title}</td>
                <td>{item.path}</td>
                <td>{getCategory(item, LinksCtx.categories)}</td>
                <td>{item.description}</td>
            </>
        )
    }
    const linksFuncs = {
        add: AddLink,
        edit: EditLink,
        delete: DeleteLink
    }

    //Modal Funcs
    const handleRefreshLinksCTX = () => {
        LinksCtx.setChange(true);
    }


    return (
        <TablePro
            data={LinksCtx.links}
            titles={titles}
            type={'קישור'}
            refreshBtn={handleRefreshLinksCTX}
            TdArr={Tds}
            funcsObj={linksFuncs}
            ManegeForm={LinkForm}
        />
    )
}

