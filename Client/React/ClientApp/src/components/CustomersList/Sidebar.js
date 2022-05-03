import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Import Icons
import {
  CashIcon,
  FireIcon,
  ScaleIcon,
  TruckIcon,
  PencilIcon,
  BookOpenIcon,
  CalendarIcon,
  PencilAltIcon,
  PlusCircleIcon,
  ReceiptTaxIcon,
  TrendingUpIcon,
  UserCircleIcon,
  ArrowSmLeftIcon,
  CursorClickIcon,
  DocumentAddIcon,
  ExclamationIcon,
  ShieldCheckIcon,
  ViewGridAddIcon,
  DocumentTextIcon,
  SpeakerphoneIcon,
  ClipboardCheckIcon,
  DocumentSearchIcon,
  SwitchVerticalIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';

const navigation = [
  { name: 'General', href: '#', icon: InformationCircleIcon, current: true },
  { name: 'Account', href: '#', icon: CashIcon, current: false },
  { name: 'Product Terms', href: '#', icon: DocumentTextIcon, current: false },
  { name: 'Contact', href: '#', icon: UserCircleIcon, current: false },
  { name: 'Memo Pad', href: '#', icon: PencilAltIcon, current: false },
  { name: 'Document Registry', href: '#', icon: DocumentAddIcon, current: false },
  { name: 'Orders & Quotes', href: '#', icon: CursorClickIcon, current: false },
  { name: 'Delivery History', href: '#', icon: TruckIcon, current: false },
  { name: 'Open Items', href: '#', icon: DocumentSearchIcon, current: false },
  { name: 'Balance', href: '#', icon: ScaleIcon, current: false },
  { name: 'Ledger', href: '#', icon: BookOpenIcon, current: false },
  { name: 'Scheduling', href: '#', icon: CalendarIcon, current: false },
  { name: 'Equipment', href: '#', icon: ViewGridAddIcon, current: false },
  { name: 'Worknotes', href: '#', icon: PencilIcon, current: false },
  { name: 'Tasks', href: '#', icon: ClipboardCheckIcon, current: false },
  { name: 'Fuel Cards', href: '#', icon: FireIcon, current: false },
  { name: 'Returnables', href: '#', icon: SwitchVerticalIcon, current: false },
  { name: 'Use Statements', href: '#', icon: SpeakerphoneIcon, current: false },
  { name: 'Additional Data', href: '#', icon: PlusCircleIcon, current: false },
  { name: 'Incidents', href: '#', icon: ExclamationIcon, current: false },
  { name: 'Credit Note Requisitions', href: '#', icon: ShieldCheckIcon, current: false },
  { name: 'Targets', href: '#', icon: TrendingUpIcon, current: false },
  { name: 'Deferred Rebates', href: '#', icon: ReceiptTaxIcon, current: false },
  
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SideBar(props) {
  const { t, i18n } = useTranslation();
  return (
    <nav aria-label="Sidebar" className="sticky px-4 py-6">
      <div className="pb-8 space-y-1">
        <NavLink
          to="/customers/list"
          className='text-red-500 hover:text-red-600 group flex items-center px-3 py-2 text-sm font-medium rounded-md'
        >
          <ArrowSmLeftIcon
            className='text-red-400 group-hover:text-red-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6'
            aria-hidden="true"
          />
          <span className="truncate">{t('Customers List')}</span>
        </NavLink>
        
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
            <span className="truncate">{t(item.name)}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}