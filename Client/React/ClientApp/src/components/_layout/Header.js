// Project Imports
import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';

// Import Icons
import {
  BellIcon,
  MenuAlt2Icon,
  MailIcon,
  GlobeIcon,
} from '@heroicons/react/outline';

// Import Router Components
import { NavLink, Link, withRouter } from "react-router-dom";
import LangSelector from './LangSelector';

const userNavigation = [
  { name: 'Sign out', href: '#' },
]

const topNavigation = [
  { name: 'Diary', href: '/people/diary', current: false },
  { name: 'Tasks', href: '/company/tasks', current: false },
  { name: 'Personnel', href: '/people/personnel', current: false },
  { name: 'Calendar', href: '/company/calendar', current: false },
]

function Header(props) {
  const { t, i18n } = useTranslation();
  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 md:hidden"
        onClick={() => props.setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex">
          <div className="flex ml-6 space-x-8">
            {topNavigation.map((item) => (
              <div key={item.name} className="flex">
                <NavLink to={item.href} className={props.classNames(
                  item.current ? 'border-green-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                )}>
                  {t(item.name)}
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <LangSelector/>
          <Link to="/people/messaging">
            <button
              type="button"
              className="bg-white p-1 ml-3 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <span className="sr-only">View Internal Messages</span>
              <MailIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </Link>
          
          <button
            type="button"
            className="bg-white p-1 ml-3 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Profile dropdown */}
          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                {/* {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={props.classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                ))} */}
                <Menu.Item>
                    {({ active }) => (
                      <button 
                        className="bg-red-50 block w-full text-left px-4 py-2 text-sm text-red-700"
                        onClick={e => {
                          // var data = {};
                          // data.Type = "Logout";
                          // data.Token = window.localStorage.getItem("token");
                          // client.send(JSON.stringify(data));
                          window.localStorage.removeItem("token");
                          window.localStorage.removeItem("username");
                          props.history.push("/auth");
                        }}
                      >
                        {t("Logout")}
                      </button>
                    )}
                  </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header);