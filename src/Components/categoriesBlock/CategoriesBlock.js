import { React } from 'react';
import { LinkList } from '../links-list/links-list';

import classes from './CategoriesBlock.module.css'


export function CategoriesBlock({ categories }) {
    const Title = (props) => {
        return (
            <div className={classes.category}>
                <h5 className={classes.title}>{props.categoryTitle}</h5>
                {props.children}
            </div>
        )
    }
    return (
        <ul>
            {categories.map((category, i) => (
                <Title categoryTitle={category.title} key={i}>
                    <LinkList
                        key={i}
                        id={category._id}
                        description={category.description}
                    />
                </Title>
            ))}
        </ul>
    );
}
