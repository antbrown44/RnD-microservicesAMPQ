import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TextBox from 'devextreme-react/text-box';
import PageTitle from '../_layout/PageTitle';
import SideBar from './Sidebar';
import { CalendarIcon, CreditCardIcon, DotsHorizontalIcon, KeyIcon, UserCircleIcon, UserGroupIcon, ViewGridAddIcon } from '@heroicons/react/outline';
import { useTranslation } from 'react-i18next';

const navigation = [
  { name: 'Account', href: '#', icon: UserCircleIcon, current: true },
  { name: 'Password', href: '#', icon: KeyIcon, current: false },
  { name: 'Plan & Billing', href: '#', icon: CreditCardIcon, current: false },
  { name: 'Team', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Integrations', href: '#', icon: ViewGridAddIcon, current: false },
]

const countries = [
  { name: 'Austria', value: 'AUT', selected: false },
  { name: 'Belgium', value: 'BEL', selected: false },
  { name: 'Channel Islands', value: 'CHA', selected: false },
  { name: 'Cyprus', value: 'CYP', selected: false },
  { name: 'Czech Republic', value: 'CZE', selected: false },
  { name: 'Denmark', value: 'DNK', selected: false },
  { name: 'Estonia', value: 'EST', selected: false },
  { name: 'Finland', value: 'FIN', selected: false },
  { name: 'France', value: 'FRA', selected: false },
  { name: 'Germany', value: 'DEU', selected: false },
  { name: 'Greece', value: 'GRC', selected: false },
  { name: 'Hungary', value: 'HUN', selected: false },
  { name: 'Ireland', value: 'IRL', selected: false },
  { name: 'Isle of Man', value: 'IMN', selected: false },
  { name: 'Italy', value: 'ITA', selected: false },
  { name: 'Latvia', value: 'LVA', selected: false },
  { name: 'Lithuania', value: 'LTU', selected: false },
  { name: 'Luxembourg', value: 'LUX', selected: false },
  { name: 'Malta', value: 'MLT', selected: false },
  { name: 'Netherlands', value: 'NLD', selected: false },
  { name: 'Northern Ireland', value: 'NIR', selected: false },
  { name: 'Poland', value: 'POL', selected: false },
  { name: 'Portugal', value: 'PRT', selected: false },
  { name: 'Spain', value: 'ESP', selected: false },
  { name: 'United Kingdom', value: 'UK', selected: true },
]

const brands = [
  { name: 'Agora', value: '1', selected: false },
  { name: 'Another Fuel Co.', value: '2', selected: false },
  { name: 'Cawoods Fuel', value: '3', selected: false },
  { name: 'CDS', value: '4', selected: false },
  { name: 'CDS Ireland', value: '5', selected: false },
  { name: 'Deviate', value: '6', selected: false },
  { name: 'Emo Fuel', value: '7', selected: false },
  { name: 'Heating Oil', value: '8', selected: false },
  { name: 'Hollands Natural Gas Brand', value: '9', selected: false },
  { name: 'Maxol Direct', value: '10', selected: false },
  { name: 'Mc Fuels', value: '11', selected: false },
  { name: 'Oils & Stuff', value: '12', selected: false },
  { name: 'NatGas', value: '13', selected: false },
  { name: 'TouchStar', value: '14', selected: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CustomersList(props) {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const [AccountNo, setAccountNo] = useState('');
  const [MasterAccountNo, setMasterAccountNo] = useState('');
  const [PrevAccountNo, setPrevAccountNo] = useState('');
  const [Name, setName] = useState('');
  const [AccContact, setAccContact] = useState('');
  const [Company, setCompany] = useState('');
  const [Type, setType] = useState('');
  const [PostCode, setPostCode] = useState('');
  const [Address, setAddress] = useState('');
  const [Country, setCountry] = useState('');
  const [StreetAccess, setStreetAccess] = useState('');
  const [AccManager, setAccManager] = useState('');
  const [AlphaAccess, setAlphaAccess] = useState('');
  const [Brand, setBrand] = useState('');
  const [Grouping, setGrouping] = useState('');
  const [SalesRep, setSalesRep] = useState('');
  const [Depot, setDepot] = useState('');
  const [ExternalRef, setExternalRef] = useState('');
  const [Active, setActive] = useState('');
  const [Verified, setVerified] = useState('');
  const [CorpManager, setCorpManager] = useState('');
  const [LastQuote, setLastQuote] = useState('');
  const [Market, setMarket] = useState('');
  const [StartDate, setStartDate] = useState('');
  const [FinishDate, setFinishDate] = useState('');
  const [FinishReason, setFinishReason] = useState('');
  const [OrderNo, setOrderNo] = useState('');
  const [Remarks, setRemarks] = useState('');
  const [Insight, setInsight] = useState('');

  useEffect(() => {
    axios.get('http://localhost:27483/api/customer/' + id)
      .then(res => {
        const customer = res.data;
        setCustomer(customer)
        setAccountNo(customer.accountNo)
        setMasterAccountNo(customer.masterAccountNo)
        setPrevAccountNo(customer.prevAccountNo)
        setName(customer.name)
        setCompany(customer.companyDesc)
        setType(customer.type)
        setPostCode(customer.postCode)
        setCountry(customer.country)
        setStreetAccess(customer.streetAccess)
        setAccManager(customer.accManager)
        setAlphaAccess(customer.alphaAccess)
        setBrand(customer.brandDesc)
        setGrouping(customer.customerGrouping)
        setSalesRep(customer.salesManDesc)
        setDepot(customer.depot +' - ' + customer.depotDesc)
        setExternalRef(customer.externalRef)
        setActive(customer.active)
        setCorpManager(customer.corpManager)
        setLastQuote(customer.lastQuoteDate)
        setMarket(customer.marketCodeDesc)
        setStartDate(customer.startDate)
        setFinishDate(customer.finishDate)
        setFinishReason(customer.finishReason)
        setOrderNo(customer.orderNo)
        setRemarks(customer.remarks)
        setInsight(customer.insight)
        setAccContact(customer.accountContact);
        setAddress(customer.address);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);


  return (
    //  Main area
    <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex overflow-hidden">
      {/* Primary column */}
      <section
        aria-labelledby="primary-heading"
        className="min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last"
      >
        {/* Your content */}
        <PageTitle text={customer.name} />
        
        <div className="px-4 space-y-6">
          <form action="#" method="POST">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{t('Customer Details')}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>

                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-2">
                    <label htmlFor="accNo" className="block text-sm font-medium text-gray-700">
                      {t('Account No.')}
                    </label>
                    <input
                      type="text"
                      name="accNo"
                      id="accNo"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={AccountNo}
                      onChange={e => {setAccountNo(e.target.value)}}
                      disabled
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="prntAccNo" className="block text-sm font-medium text-gray-700">
                      {t('Parent Acc. No.')}
                    </label>
                    <input
                      type="text"
                      name="prntAccNo"
                      id="prntAccNo"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={MasterAccountNo}
                      onChange={e => {setMasterAccountNo(e.target.value)}}
                      disabled
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="prevAccNo" className="block text-sm font-medium text-gray-700">
                    {t('Previous Acc. No.')}
                    </label>
                    <input
                      type="text"
                      name="prevAccNo"
                      id="prevAccNo"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={PrevAccountNo}
                      onChange={e => {setPrevAccountNo(e.target.value)}}
                      disabled
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="cmrName" className="block text-sm font-medium text-gray-700">
                    {t('Customer Name')}
                      
                    </label>
                    <input
                      type="text"
                      name="cmrName"
                      id="cmrName"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={Name}
                      onChange={e => {setName(e.target.value)}}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    {t('Company Name')}
                      
                    </label>
                    <input
                      type="text"
                      name="Company"
                      id="companyName"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={Company}
                      onChange={e => {setCompany(e.target.value)}}
                      disabled
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="cmrBrand" className="block text-sm font-medium text-gray-700">
                    {t('Brand')}
                      
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex items-stretch flex-grow focus-within:z-10">
                        <input
                          type="text"
                          name="cmrBrand"
                          id="cmrBrand"
                          className="focus:ring-green-500 focus:border-green-500 block w-full rounded-none rounded-l-md px-4 sm:text-sm border-gray-300"
                          value={Brand}
                          onChange={e => {setBrand(e.target.value)}}
                        />
                      </div>
                      <button
                        type="button"
                        className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                      >
                        <DotsHorizontalIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="cmrDepot" className="block text-sm font-medium text-gray-700">
                    {t('Depot')}
                      
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex items-stretch flex-grow focus-within:z-10">
                        <input
                          type="text"
                          name="cmrDepot"
                          id="cmrDepot"
                          className="focus:ring-green-500 focus:border-green-500 block w-full rounded-none rounded-l-md px-4 sm:text-sm border-gray-300"
                          value={Depot}
                          onChange={e => {setDepot(e.target.value)}}

                        />
                      </div>
                      <button
                        type="button"
                        className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                      >
                        <DotsHorizontalIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="marketCode" className="block text-sm font-medium text-gray-700">
                    {t('Market')}
                      
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex items-stretch flex-grow focus-within:z-10">
                        <input
                          type="text"
                          name="marketCode"
                          id="marketCode"
                          className="focus:ring-green-500 focus:border-green-500 block w-full rounded-none rounded-l-md px-4 sm:text-sm border-gray-300"
                          value={Market}
                          onChange={e => {setMarket(e.target.value)}}
                        />
                      </div>
                      <button
                        type="button"
                        className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                      >
                        <DotsHorizontalIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="cmrType" className="block text-sm font-medium text-gray-700">
                    {t('Customer Type')}
                    </label>
                    <select
                      id="cmrType"
                      name="cmrType"
                      className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={Type}
                      onChange={e => {setType(e.target.value)}}
                    >
                      <option value="0">Default</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="bg-green-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    {t('Save')}
                  
                </button>
              </div>
            </div>
          </form>

          <form action="#" method="POST">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{t('Contact Information')}</h3>
                  <p className="mt-1 text-sm text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>

                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      {t('Country')}
                    </label>
                    <select
                      id="country"
                      name="country"
                      className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={Country}
                      onChange={e => {setCountry(e.target.value)}}
                    >
                      <option value="">(None)</option>
                      {countries.map(country => (
                        <option value={country.value}>{country.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                    <label htmlFor="postCode" className="block text-sm font-medium text-gray-700">
                      {t('Postal code')}
                      
                    </label>
                    <input
                      type="text"
                      name="postCode"
                      id="postCode"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={PostCode}
                      onChange={e => {setPostCode(e.target.value)}}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="accContact" className="block text-sm font-medium text-gray-700">
                      {t('Account Contact ')}
                      
                    </label>
                    <textarea 
                      name="accContact" 
                      id="accContact" 
                      cols="30" 
                      rows="6" 
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={AccContact}
                      onChange={e => {setAccContact(e.target.value)}}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="cmrAddress" className="block text-sm font-medium text-gray-700">
                      {t('Address')}
                      
                    </label>
                    <textarea 
                      name="cmrAddress" 
                      id="cmrAddress" 
                      cols="30" 
                      rows="6" 
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={Address}
                      onChange={e => {setAddress(e.target.value)}}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                    <label htmlFor="alphaSort" className="block text-sm font-medium text-gray-700">
                      {t('Alpha Sort')}
                      
                    </label>
                    <input
                      type="text"
                      name="alphaSort"
                      id="alphaSort"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={AlphaAccess}
                      onChange={e => {setAlphaAccess(e.target.value)}}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                    <label htmlFor="streetSort" className="block text-sm font-medium text-gray-700">
                      {t('Street Sort')}
                      
                    </label>
                    <input
                      type="text"
                      name="streetSort"
                      id="streetSort"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={StreetAccess}
                      onChange={e => {setStreetAccess(e.target.value)}}
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="cmrRemarks" className="block text-sm font-medium text-gray-700">
                      {t('Remarks')}
                      
                    </label>
                    <input
                      type="text"
                      name="cmrRemarks"
                      id="cmrRemarks"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={Remarks}
                      onChange={e => {setRemarks(e.target.value)}}
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="cmrInsight" className="block text-sm font-medium text-gray-700">
                      {t('Insight')}
                      
                    </label>
                    <input
                      type="text"
                      name="cmrInsight"
                      id="cmrInsight"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={Insight}
                      onChange={e => {setInsight(e.target.value)}}
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="bg-green-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {t('Save')}
                  
                </button>
              </div>
            </div>
          </form>

          <form action="#" method="POST">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{t('Management')}</h3>
                  <p className="mt-1 text-sm text-gray-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                </div>

                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="salesRep" className="block text-sm font-medium text-gray-700">
                      {t('Sales Rep.')}
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex items-stretch flex-grow focus-within:z-10">
                        <input
                          type="text"
                          name="salesRep"
                          id="salesRep"
                          className="focus:ring-green-500 focus:border-green-500 block w-full rounded-none rounded-l-md px-4 sm:text-sm border-gray-300"
                          value={SalesRep}
                          onChange={e => {setSalesRep(e.target.value)}}
                        />
                      </div>
                      <button
                        type="button"
                        className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                      >
                        <DotsHorizontalIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="accManager" className="block text-sm font-medium text-gray-700">
                      {t('Account Manager')}
                      
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex items-stretch flex-grow focus-within:z-10">
                        <input
                          type="text"
                          name="accManager"
                          id="accManager"
                          className="focus:ring-green-500 focus:border-green-500 block w-full rounded-none rounded-l-md px-4 sm:text-sm border-gray-300"
                          value={AccManager}
                          onChange={e => {setAccManager(e.target.value)}}
                        />
                      </div>
                      <button
                        type="button"
                        className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                      >
                        <DotsHorizontalIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="corpManager" className="block text-sm font-medium text-gray-700">
                      {t('Corp. Manager')}
                      
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex items-stretch flex-grow focus-within:z-10">
                        <input
                          type="text"
                          name="corpManager"
                          id="corpManager"
                          className="focus:ring-green-500 focus:border-green-500 block w-full rounded-none rounded-l-md px-4 sm:text-sm border-gray-300"
                          value={CorpManager}
                          onChange={e => {setCorpManager(e.target.value)}}
                        />
                      </div>
                      <button
                        type="button"
                        className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                      >
                        <DotsHorizontalIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="extSysRef" className="block text-sm font-medium text-gray-700">
                      {t('Ext. Sys. Ref.')}
                      
                    </label>
                    <input
                      type="text"
                      name="extSysRef"
                      id="extSysRef"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={ExternalRef}
                      onChange={e => {setExternalRef(e.target.value)}}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="startDay" className="block text-sm font-medium text-gray-700">
                      {t('Start Day')}
                      
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        name="startDay"
                        id="startDay"
                        className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        value={StartDate}
                        onChange={e => {setStartDate(e.target.value)}}
                      />
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="finishDay" className="block text-sm font-medium text-gray-700">
                      {t('Finish Day')}
                      
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        name="finishDay"
                        id="finishDay"
                        className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        value={FinishDate}
                        onChange={e => {setFinishDate(e.target.value)}}    
                      />
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-6">
                    <label htmlFor="finishReason" className="block text-sm font-medium text-gray-700">
                      {t('Finish Reason')}
                      
                    </label>
                    <input
                      type="text"
                      name="finishReason"
                      id="finishReason"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={FinishReason}
                      onChange={e => {setFinishReason(e.target.value)}}
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="bg-green-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {t('Save')}
                </button>
              </div>
            </div>
          </form>

          <form action="#" method="POST" className="pb-6">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Other Details</h3>
                  <p className="mt-1 text-sm text-gray-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                </div>

                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="orderNo" className="block text-sm font-medium text-gray-700">
                      Order Number
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex items-stretch flex-grow focus-within:z-10">
                        <input
                          type="text"
                          name="orderNo"
                          id="orderNo"
                          className="focus:ring-green-500 focus:border-green-500 block w-full rounded-none rounded-l-md px-4 sm:text-sm border-gray-300"
                          value={OrderNo}
                          onChange={e => {setOrderNo(e.target.value)}}  
                        />
                      </div>
                      <button
                        type="button"
                        className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                      >
                        <DotsHorizontalIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="latestTrDay" className="block text-sm font-medium text-gray-700">
                      Latest Tr. Day
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        name="latestTrDay"
                        id="latestTrDay"
                        className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        value={LastQuote}
                        onChange={e => {setLastQuote(e.target.value)}}
                      />
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-6">
                    <label htmlFor="grouping" className="block text-sm font-medium text-gray-700">
                      Grouping
                    </label>
                    <input
                      type="text"
                      name="grouping"
                      id="grouping"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={Grouping}
                      onChange={e => {setGrouping(e.target.value)}}
                    />
                  </div>
                </div>

                <fieldset>
                  <legend className="text-base font-medium text-gray-900">Account</legend>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="h-5 flex items-center">
                        <input
                          id="activeStatus"
                          name="activeStatus"
                          type="checkbox"
                          className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                          checked={Active}
                          onChange={e => {setActive(e.target.checked)}}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="activeStatus" className="font-medium text-gray-700">
                          Active
                        </label>
                        <p className="text-gray-500">Customer cannot login to Codas when their status is inactive.</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start">
                        <div className="h-5 flex items-center">
                          <input
                            id="verifiedAccount"
                            name="verifiedAccount"
                            type="checkbox"
                            className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                            value={Verified}
                            onChange={e => {setVerified(e.target.checked)}}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="verifiedAccount" className="font-medium text-gray-700">
                            Verified
                          </label>
                          <p className="text-gray-500">Some description here.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
                
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="bg-green-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
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
