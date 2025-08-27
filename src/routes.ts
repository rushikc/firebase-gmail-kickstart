/*
Copyright (C) 2025 <rushikc> <rushikc.dev@gmail.com>

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation; version 3 of the License.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details, or get a copy at
<https://www.gnu.org/licenses/gpl-3.0.txt>.
*/

// pages
import Home from "./pages/home/Home";

// other
import {FC} from "react";
import Profile from "./pages/home/Profile";

// interface
interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<{}>,
    isProtected: boolean,
}

export const routes: Array<Route> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/home',
        enabled: true,
        component: Home,
        isProtected: true,
    },
    {
        key: 'profile-route',
        title: 'Profile',
        path: '/profile',
        enabled: true,
        component: Profile,
        isProtected: true,
    }
]
