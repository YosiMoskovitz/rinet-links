import { React, useContext } from 'react';
import styles from './home.module.css';
import LinksContext from '../../store/Links-context';
import { CategoriesBlock } from '../../Components/categoriesBlock/CategoriesBlock';


export function Home() {
    const LinksCtx = useContext(LinksContext);

    return (
        <section className={styles.main}>
            <CategoriesBlock categories={LinksCtx.categories} />
        </section>
    );
}


