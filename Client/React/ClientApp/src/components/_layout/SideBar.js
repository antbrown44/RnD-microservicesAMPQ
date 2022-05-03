// Project Imports
import { Fragment, useState } from 'react'
import { useRouteMatch, Link,NavLink } from "react-router-dom";
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { useTranslation } from 'react-i18next';

// Import Icons
import {
  CurrencyPoundIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  TruckIcon,
  UsersIcon,
  UserGroupIcon,
  XIcon,
} from '@heroicons/react/outline';


const sideNavigation = [
  { name: 'Dashboard', icon: HomeIcon, current: false, href: '/' },
  {
    name: 'Customers',
    icon: UsersIcon,
    href: '/customers',
    current: false,
    children: [
      { name: 'Customers List', href: '/customers/list' },
      { name: 'Customer Order', href: '/customers/order' },
      { name: 'Telephone', href: '/customers/telephone' },
      { name: 'Communication', href: '/customers/communication' },
      { name: 'Marketing', href: '/customers/marketing' },
    ],
  },
  {
    name: 'Finance',
    icon: CurrencyPoundIcon,
    href: '/finance',
    current: false,
    children: [
      { name: 'Sales', href: '/finance/sales' },
      { name: 'Purchase', href: '/finance/purchase' },
      { name: 'Nominal', href: '/finance/nominal' },
      { name: 'Credit Control', href: '/finance/credit-control' },
    ],
  },
  {
    name: 'People',
    icon: UserGroupIcon,
    href: '/people',
    current: false,
    children: [
      { name: 'Personnel', href: '/people/personnel' },
      { name: 'Diary', href: '/people/diary' },
      { name: 'Messaging', href: '/people/messaging' },
      { name: 'Email Management', href: '/people/email-management' },
    ],
  },
  {
    name: 'Load Manager',
    icon: TruckIcon,
    current: false,
    href: '/load-manager',
  },
  {
    name: 'Help',
    icon: QuestionMarkCircleIcon,
    current: false,
    href: '/help',
  },
]

export default function SideBar (props) {
  const { t, i18n } = useTranslation();
  let match = useRouteMatch(['/customers','/finance','/people']);
  const [routeMatch, setRouteMatch] = useState(match);
  
  return (
    <div className="h-screen flex overflow-hidden">
      <Transition.Root show={props.sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={props.setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => props.setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <Link to="/">
                  <img
                    className="h-6 w-auto"
                    src="/img/logos/codas-logo-red-500.svg"
                    alt="Codas7"
                  />
                </Link>
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto sidenav">
                <nav className="px-2 space-y-1">
                  {sideNavigation.map((item) =>
                    !item.children ? (
                      <div key={item.name} className="nav-item">
                        <NavLink to={item.href} exact={true} activeClassName="active" className="nav-link">
                          <item.icon
                            className="icon"
                            aria-hidden="true"
                          />
                          {item.name}
                        </NavLink>
                      </div>
                    ) : (
                      <Disclosure as="div" key={item.name} defaultOpen={routeMatch ? routeMatch.path == item.href : false}  className="nav-item space-y-1">
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={props.classNames(
                                item.current
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-green-700'
                              )}
                            >
                              <item.icon
                                className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              <span className="flex-1">{item.name}</span>
                              <svg
                                className={props.classNames(
                                  open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                                  'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                                )}
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                              </svg>
                            </Disclosure.Button>
                            <Disclosure.Panel className="space-y-1">
                              {item.children.map((subItem) => (
                                <NavLink
                                  to={subItem.href}
                                  exact={true}
                                  key={subItem.name}
                                  activeClassName="active"
                                  className="sub-item"
                                >
                                  {subItem.name}
                                </NavLink>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )
                  )}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <a href="/">
                <img
                  className="h-6 w-auto"
                  src="/img/logos/codas-logo-red-500.svg"
                  alt="Codas7"
                />
              </a>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 bg-white space-y-1 sidenav">
                {sideNavigation.map((item) =>
                  !item.children ? (
                    <div key={item.name} className="nav-item">
                      <NavLink to={item.href} exact={true} activeClassName="active" className="nav-link">
                        <item.icon
                          className="icon"
                          aria-hidden="true"
                        />
                        {t(item.name)}
                      </NavLink>
                    </div>
                  ) : (
                    <Disclosure as="div" key={item.name} defaultOpen={routeMatch ? routeMatch.path == item.href : false}  className="nav-item space-y-1">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={props.classNames(
                              item.current
                                ? 'bg-gray-100 text-gray-900'
                                : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                              'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-green-700'
                            )}
                          >
                            <item.icon
                              className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            <span className="flex-1">{t(item.name)}</span>
                            <svg
                              className={props.classNames(
                                open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                                'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                              )}
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                            </svg>
                          </Disclosure.Button>
                          <Disclosure.Panel className="space-y-1">
                            {item.children.map((subItem) => (
                              <NavLink
                                to={subItem.href}
                                exact={true}
                                key={subItem.name}
                                activeClassName="active"
                                className="sub-item"
                              >
                                {t(subItem.name)}
                              </NavLink>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
