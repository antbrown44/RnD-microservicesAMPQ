import { NavLink } from 'react-router-dom';
// Import Icons
import {
  InboxIcon,
  PaperAirplaneIcon,
  TrashIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ArrowCircleDownIcon,
} from '@heroicons/react/outline';

const navigation = [
  { name: 'Inbox', href: '/people/messaging', icon: InboxIcon, current: true },
  { name: 'Sent', href: '#', icon: PaperAirplaneIcon, current: false },
  { name: 'Deleted', href: '#', icon: TrashIcon, current: false },
]

const flags = [
  { name: 'Blue', href: '#', bgColorClass: 'bg-blue-500' },
  { name: 'Green', href: '#', bgColorClass: 'bg-green-500' },
  { name: 'Orange', href: '#', bgColorClass: 'bg-orange-500' },
  { name: 'Purple', href: '#', bgColorClass: 'bg-purple-500' },
  { name: 'Red', href: '#', bgColorClass: 'bg-red-500' },
  { name: 'Yellow', href: '#', bgColorClass: 'bg-yellow-500' },
]

const priorities = [
  { name: 'High Priority', href: '#', icon: ExclamationCircleIcon, bgColorClassActive:'text-red-500', bgColorClassInactive:'text-red-400 group-hover:text-red-500', current: false },
  { name: 'Medium Priority', href: '#', icon: CheckCircleIcon,  bgColorClassActive:'text-green-500', bgColorClassInactive:'text-green-400 group-hover:text-green-500', current: false },
  { name: 'Low Priority', href: '#', icon: ArrowCircleDownIcon,  bgColorClassActive:'text-blue-500', bgColorClassInactive:'text-blue-400 group-hover:text-blue-500', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SideBar() {
  return (
    <nav aria-label="Sidebar" className="sticky px-4 py-6">
      <div className="pb-8 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={classNames(
              item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50',
              'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
            )}
            aria-current={item.current ? 'page' : undefined}
          >
            <item.icon
              className={classNames(
                item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
              )}
              aria-hidden="true"
            />
            <span className="truncate">{item.name}</span>
          </NavLink>
        ))}
      </div>
      {/* Priorities Section */}
      <div className="mb-8">
        <h3
          className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
          id="mobile-priorities-headline"
        >
          Priority
        </h3>
        <div className="mt-1 space-y-1" role="group" aria-labelledby="mobile-priorities-headline">
          {priorities.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50',
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              <item.icon
                className={classNames(
                  item.current ? item.bgColorClassActive : item.bgColorClassInactive,
                  'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                )}
                aria-hidden="true"
              />
              <span className="truncate">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
      {/* Flags Section */}
      <div className="mb-8">
        <h3
          className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
          id="mobile-flags-headline"
        >
          Flags
        </h3>
        <div className="mt-1 space-y-1" role="group" aria-labelledby="mobile-flags-headline">
          {flags.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50',
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              <span
                className={classNames(item.bgColorClass, 'w-2.5 h-2.5 mr-4 rounded-full')}
                aria-hidden="true"
              />
              <span className="truncate">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}