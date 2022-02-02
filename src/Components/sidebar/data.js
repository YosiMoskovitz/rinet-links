import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import TocIcon from '@mui/icons-material/Toc';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const data = [
    {
        title: 'דף הבית',
        icon: <HomeIcon />,
        link: '/'
    },
    {
        title: 'דוחות',
        icon: <TocIcon />,
        link: 'reports'
    },
    {
        title: 'ניהול קישורים',
        icon: <EditIcon />,
        link: 'links'
    },
    { 
        title: 'ניהול משתמשים',
        icon: <PeopleIcon />,
        link: 'users'
    }
]


