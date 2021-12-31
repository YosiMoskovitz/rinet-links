import { React, useState, useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Axios from 'axios'
import { APIconfig } from '../Config'
import LinksContext from '../store/Links-context';
import { Loading } from '../Pages/Loading';

export function LinksCTXUpdate() {
    console.log('LinksCTXUpdate has rendered')
    const LinksCtx = useContext(LinksContext);
    const [categoriesCTX, setCategoriesCTX] = useState([]);
    const [linksCTX, setLinksCTX] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log('LinksCTXUpdate useEffect API rendered');
        setIsLoading(true);
        Axios.get(`${APIconfig.url}/categories `)
            .then((res) => {
                setCategoriesCTX(res.data.categories);
            }).then(() => {
                Axios.get(`${APIconfig.url}/links`)
                    .then((res) => {
                        setLinksCTX(res.data.Links)
                        setIsLoading(false);
                    })
            })
    }, [LinksCtx.hasChanged]);

    useEffect(() => {
        console.log('LinksCtx useEffect render');
        LinksCtx.setCategories(categoriesCTX);
        LinksCtx.setLinks(linksCTX);
        LinksCtx.setChange(false)
    }, [LinksCtx, categoriesCTX, linksCTX])

    
    if (isLoading) {
        return (<Loading />);
    }
    return (
        <Outlet />
    );
}