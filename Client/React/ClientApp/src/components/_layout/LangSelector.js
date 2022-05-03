import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';

const languages = [
  { id: 'en', name: 'English' },
  { id: 'de', name: 'Deutsch' },
  { id: 'es', name: 'Español' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function LangSelector () {

  const setLocale = (savingLocale) => {
    localStorage.setItem('i18nextLng', savingLocale);
  }

  const getLocale = () => {
    const storageLocale = localStorage.getItem('i18nextLng');
    return storageLocale != null ? languages.filter(lang => lang.id == storageLocale)[0] : languages[0];
  }

  const changeLocale = (lang) => {
    setSelectedLang(lang.id);
    setLocale(lang.id);
    document.location.reload();
  }

  const [selectedLang, setSelectedLang] = useState(getLocale());
 
  return (
    <Listbox value={selectedLang} onChange={changeLocale}>
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm">
              <span className="block truncate">{selectedLang.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {languages.map((language) => (
                  <Listbox.Option
                    key={language.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-green-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-8 pr-4'
                      )
                    }
                    value={language}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {language.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-green-600',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
    // <button
    //   type="button"
    //   className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    // >
    //   <span className="sr-only">View Internal Messages</span>
    //   <GlobeIcon className="h-6 w-6" aria-hidden="true" />
    // </button>
  )
}
 
export default LangSelector;