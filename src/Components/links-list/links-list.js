import { React, useContext } from 'react';
import LinksContext from '../../store/Links-context';

import { LinkButton } from '../link-button/link-button';

import classes from './links-list.module.css'

export function LinkList(category) {
    const LinksCtx = useContext(LinksContext);
    const linkList = LinksCtx.links.filter((link)=> link.categoryId === category.id)

    return (
        <li className={classes.list}>
            {linkList.map((link, i) => (
                <LinkButton
                key={i}
                title={link.title}
                path={link.path}
                des={link.description}
                />
            ))}
        </li>
    )
}
