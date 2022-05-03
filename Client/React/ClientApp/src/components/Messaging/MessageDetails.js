import { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from '../_layout/PageTitle.js';
import SideBar from './SideBar.js';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import { ArrowSmLeftIcon } from '@heroicons/react/outline';


export default function MessageDetails(props) {
    const { id } = useParams();

    const [message, setMessage] = useState({});

    useEffect(() => {
        fetch('https://localhost:5001/api/internalmessages/' + id)
            .then(response => {
                response.json()
                    .then(json => setMessage(json))
            }
        );
    }, []);

    return (
        //  Main area
        <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex">
            {/* Primary column */}
            <section
                aria-labelledby="primary-heading"
                className="min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last"
            >
                {/* Your content */}
                <PageTitle text={message.Subject} backLink="/people/messaging" />

                <div id="grid" className="px-4 pb-6 sm:px-6 md:px-8">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{message.From}</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                <Moment format="dddd, Do MMMM YYYY - hh:mm">{message.DateTimeSent}</Moment>
                            </p>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl className="sm:divide-y sm:divide-gray-200">
                                <div className="flex py-4 sm:py-2 sm:px-6">
                                    <dt className="mr-2 text-sm font-medium text-gray-500">To:</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-4">{message.To}</dd>
                                </div>
                                {message.CC &&
                                    <div className="flex py-4 sm:py-2 sm:px-6">
                                        <dt className="mr-2 text-sm font-medium text-gray-500">CC:</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-4">{message.CC}</dd>
                                    </div>
                                }
                                <div className="flex py-4 sm:py-5 sm:px-6">
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-6">
                                        {message.Format === 1 ? (<div dangerouslySetInnerHTML={{ __html: message.Message }}></div>) : message.Message}
                                    </dd>
                                </div>
                                <div className="flex py-4 sm:py-3 sm:px-6">
                                    <dd className="flex items-center mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-6">
                                        <button className="px-3 py-2 text-green-600 font-semibold rounded-md hover:bg-green-50 hover:text-green-800">Reply</button>
                                        <div className="border-r border-gray-200 mx-2 h-5"></div>
                                        <button className="px-3 py-2 text-green-600 font-semibold rounded-md hover:bg-green-50 hover:text-green-800">Reply All</button>
                                        <div className="border-r border-gray-200 mx-2 h-5"></div>
                                        <button className="px-3 py-2 text-green-600 font-semibold rounded-md hover:bg-green-50 hover:text-green-800">Forward</button>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

            </section>

            {/* Secondary column (hidden on smaller screens) */}
            <aside className="hidden lg:block lg:flex-shrink-0 lg:order-first">
                <div className="h-full relative flex flex-col w-64 border-r border-gray-200 bg-gray-100 overflow-y-auto">
                    <SideBar />
                </div>
            </aside>
        </main>
    )
}