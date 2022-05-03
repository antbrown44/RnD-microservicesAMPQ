import { useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { MailIcon, XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom';
import { HubConnectionBuilder } from '@microsoft/signalr';
import axios from 'axios';

import { withRouter } from "react-router-dom";

function Banner(props) {

    const [hasNewMessage, setHasNewMessage] = useState({});
    let [isShowing, setIsShowing] = useState(false)

    useEffect(() => {

        const createHubConnection = async () => {
            const hubConnectionbuilder = new HubConnectionBuilder()
            hubConnectionbuilder.withUrl("https://localhost:5001/hub/internalmessages");
            const hubConnection = hubConnectionbuilder.build();
            hubConnection.start();
            
            hubConnection.on("NewMessage", (id) => {
                fetch('https://localhost:5001/api/internalmessages/' + id)
                    .then(response => {
                        if (response.ok) {
                            response.json()
                                .then(json => { setHasNewMessage(json); setIsShowing(true); })
                        }
                        
                    }
                );
            });
        }

        createHubConnection();
    }, [])

    return (
        <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-50">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <Transition
                    show={isShowing}
                    enter="transition-opacity duration-1000"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-1000"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >

                    <div className="p-2 rounded-lg bg-green-600 shadow-lg sm:p-3">
                        <div className="flex items-center justify-between flex-wrap">
                            <div className="w-0 flex-1 flex items-center">
                                <span className="flex p-2 rounded-lg bg-green-800">
                                    <MailIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                </span>
                                <p className="ml-3 font-medium text-white truncate">
                                    <span className="md:hidden">You've received a message!</span>
                                    <span className="hidden md:inline">You've received a message from {hasNewMessage.From || ' your collegue!'} </span>
                                </p>
                            </div>
                            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                                <Link to={`/people/messaging/${hasNewMessage.Id}`}
                                    className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-50"
                                    onClick={() => { setIsShowing(false) }}
                                >
                                    Read now
                                </Link>
                            </div>
                            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                                <button
                                    type="button"
                                    className="-mr-1 flex p-2 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-white"
                                    onClick={() => { setIsShowing(false); props.history.push("/people/messaging/" + hasNewMessage.Id); }}
                                >
                                    <span className="sr-only">Dismiss</span>
                                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    )
}

export default withRouter(Banner);