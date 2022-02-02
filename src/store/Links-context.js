import {React, createContext, useState, useEffect } from "react";

import Axios from 'axios'
import { APIconfig } from '../Config'
import { Loading } from '../Pages/Loading';

const LinksContext = createContext({
    categories: [],
    links : [],
    hasChanged: false,
    setCategories: (categories) => [],
    setLinks: (links) => [],
    setChange: (value) => Boolean(),
});

export function LinksContextProvider(props) {
    const [categories, setCategories] = useState({});
    const [links, setLinks] = useState({});
    const [hasChanged, setHasChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect (() => {
        setIsLoading(true);
        Axios.get(`${APIconfig.url}/links/fullData`)
           .then((res) => {
               if (res.status === 200) {
                setCategories(res.data.data.categories);
                setLinks(res.data.data.links);
               }
           }).catch((error)=>{

           }).finally(()=> {
            setIsLoading(false)
            hasChanged && setHasChanged(false)
           })
    }, [hasChanged])
    
    function setCategoriesHandler(categories) {
        setCategories(categories)
    }

    function setLinksHandler(links) {
        setLinks(links)
    }

    function setHasChangedHandler(hasChanged) {
        setHasChanged(hasChanged)
    }


    const context = {
        categories,
        links,
        hasChanged,
        setCategories: setCategoriesHandler,
        setLinks: setLinksHandler,
        setChange: setHasChangedHandler

    };

    if (isLoading) {
        return (<Loading />);
    }
    
    return <LinksContext.Provider value={context}>
        {props.children}
    </LinksContext.Provider>
}

export default LinksContext;