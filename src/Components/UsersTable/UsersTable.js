import { React, useEffect, useState } from 'react'
import { TablePro } from '../TablePro';
import { AddUserReq, EditUserAdminReq, DeleteUserAdminReq } from '../../Api/LoginApi';
import { EditUserForm } from '../EditUserForm';
import { getFormattedDate, getFormattedTime } from '../Utils';
import translate from '../Utils/engToHeb.json';
import { Loading } from '../../Pages/Loading';

import Axios from 'axios'
import { APIconfig } from '../../Config';

const getTitle = (user, prop, titlesArr) => {
    var item = titlesArr.find(item => item.id === user[prop]);
    if (item?.title) return translate[item.title];
}

export function UsersTable() {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState([]);
    const [roles, setRoles] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [titles, setTitles] = useState([]);

    useEffect(() => {
        Axios.all([Axios.get(`${APIconfig.url}/users/all`),
        Axios.get(`${APIconfig.url}/roles`),
        Axios.get(`${APIconfig.url}/statuses`)])
            .then(Axios.spread((usersRes, rolesRes, statusesRes) => {
                setUsers(usersRes.data.users)
                setTitles(Object.keys(usersRes.data.users[0]))
                setRoles(rolesRes.data.roles)
                setStatus(statusesRes.data.statuses)
            }))
            .catch(error => console.log(error))
            .finally(()=> setIsLoading(false));
    }, [refresh])


    const Tds = ({ item }) => {
        return (
            <>
                <td>{item.email}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{getTitle(item, 'role', roles)}</td>
                <td>{getTitle(item, 'status', status)}</td>
                <td>{item.createdVia}</td>
                <td>{translate[item.isEmailVerified.toString()]}</td>
                <td>{getFormattedDate(item.joined)}</td>
                <td>{item.lastLogin === null ? translate.unknown : getFormattedDate(item.lastLogin) + '--' + getFormattedTime(item.lastLogin)}</td>
                <td>{getFormattedDate(item.lastPassChange) + '--' + getFormattedTime(item.lastPassChange)}</td>
            </>
        )
    }
    const userFuncs = {
        add: AddUserReq,
        edit: EditUserAdminReq,
        delete: DeleteUserAdminReq
    }

    //Modal Funcs
    const handleRefreshLinksCTX = () => {
        setRefresh(!refresh);
    }

    if (isLoading) {
        return (<Loading />);
    }

    return (
        <TablePro
            data={users}
            titles={titles}
            type={'משתמש'}
            refreshBtn={handleRefreshLinksCTX}
            TdArr={Tds}
            funcsObj={userFuncs}
            ManegeForm={EditUserForm}
        />
    )
}

