import { useEffect, useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { useTranslation } from 'react-i18next';


import DataGrid, {
  Column,
  ColumnFixing,
  ColumnChooser,
  Selection,
  GroupPanel
} from 'devextreme-react/data-grid';

import axios from 'axios';

import deMessages from 'devextreme/localization/messages/de.json';
import esMessages from 'devextreme/localization/messages/es.json';

import { locale, loadMessages, formatMessage } from 'devextreme/localization';

export default function CustomersList(props) {
  const { t, i18n } = useTranslation();

  const getLocale = () => {
    const storageLocale = localStorage.getItem('i18nextLng');
    return storageLocale != null ? storageLocale : 'en';
  }

  const [customers, setCustomers] = useState([]);
  const [accNumber, setAccNumber] = useState('');
  
  useEffect(() => {
    console.log(accNumber)
    if (!window.localStorage.getItem("token")) {
      props.history.push("/auth");
    }

    // axios.get('/api/customers')
    //   .then(res => {
    //     setCustomers(res.data.customers)
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
  }, []);

  const [lang, setLang] = useState(getLocale());

  const handleAccountSearch = () => {
    axios.get('http://localhost:27483/api/customer/search?query=' + accNumber)
      .then(res => {
        setCustomers(res.data)
      // console.log(res.data)

      })
      .catch(err => {
        console.log(err);
      })
  }

  const onRowDblClick = (row) => {
    const { history } = props;
    if(history) history.push('/customers/list/' + row.data.accountNo);
  }

  const initMessages = () => {
    loadMessages(deMessages);
    loadMessages(esMessages);
  }

  initMessages();

  locale(lang)

  useEffect(() => {
    // Auth Check
    if (!window.localStorage.getItem("token")) {
      props.history.push("/auth");
    }

    axios.get('/api/customers')
      .then(res => {
        setCustomers(res.data.customers)
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="py-6">
        <div className="flex px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">{t("Customers List")}</h1>
          <div className="ml-auto">
            <div className="mt-1 flex rounded-md shadow-sm">
              <div className="relative flex items-stretch flex-grow focus-within:z-10">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="acc_number"
                  id="acc_number"
                  className="focus:ring-green-500 focus:border-green-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                  placeholder={t("Acc. No./Name/Post Code")}
                  onChange={(e)=>{setAccNumber(e.target.value)}}
                  value={accNumber}
                />
              </div>
              <button
                type="button"
                className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                // disabled={!(accNumber)}
                onClick={handleAccountSearch}
              >
                <span>{t("Search")}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 sm:px-6 md:px-8">
          {/* Replace with the content */}
          <div className="py-4">
            <DataGrid
              id="grid-container"
              className="shadow overflow-hidden sm:rounded-lg"
              dataSource={customers}
              keyExpr="accountNo"
              allowColumnReordering={true}
              allowColumnResizing={true}
              columnResizingMode='widget'
              showBorders={false}
              onRowDblClick={onRowDblClick}
            >
              <Selection mode="multiple" />
              <GroupPanel visible={true} />
              <ColumnChooser enabled={true} />
              <ColumnFixing enabled={true} />
              <Column dataField="accountNo" caption={t("Account/Ref. No.")} alignment="left" width={120}/>
              <Column dataField="name" caption={t("Name")} width={200}/>
              <Column dataField="postCode" caption={t("Postcode")} width={100} />
              <Column dataField="telephone" caption={t("Telephone")} width={150} />
              {/* <Column dataField="Type" width={110} /> */}
              <Column dataField="streetAccess" caption={t("Street Ref.")} width={110} />
              <Column dataField="address1" caption={t("Address")} width={280} />
              <Column dataField="address2" caption={t("Address Line 2")} width={280} />
              <Column dataField="lastDelivery" caption={t("Last Delivery")} width={110} dataType="date" format="dd/MM/yyyy"/>
              {/* <Column dataField="Site" width={100} /> */}
              <Column dataField="accManagerDesc" caption={t("Account Manager")} width={180} />
              <Column dataField="brandDesc" caption={t("Brand")} width={180} />
              <Column dataField="customerGrouping" caption={t("Grouping")} width={120} />
              {/* <Column dataField="SisterGrp" caption="Sister Grp." width={80} /> */}
              <Column dataField="salesManDesc" caption={t("Sales Rep.")} width={180} />
              <Column dataField="depotDesc" caption={t("Depot")} width={180} />
              {/* <Column dataField="ExternalRef" caption="External Ref." width={180} /> */}
              <Column dataField="typeDesc" caption={t("Customer Type")} width={180} />
              {/* <Column dataField="Currency" width={180} /> */}
              {/* <Column dataField="PrevAccNo" caption="Previous Account No." width={80} /> */}
              {/* <Column dataField="ManStopIdicator" caption="Man. Stop Idicator" width={180} /> */}
              {/* <Column dataField="Web" caption="Web" width={180} /> */}
              {/* <Column dataField="EMail" caption="E-mail Address" width={180} /> */}
              {/* <Column dataField="Sync" caption="Sync" width={80} /> */}
              {/* <Column dataField="active" width={80} /> */}
              {/* <Column dataField="corpManager" caption="Corporate Manager" width={120} /> */}
              {/* <Column dataField="Info" caption="Info" width={180} /> */}
              {/* <Column dataField="Point" caption="Point" width={180} /> */}
              <Column dataField="lastQuoteDate" caption={t("Last Quote")} dataType="date" format="dd/MM/yyyy" width={120} />
              {/* <Column dataField="FC" caption="F/C" width={180} /> */}
              <Column dataField="marketCodeDesc" caption={t("Market")} width={180} />
              {/* <Column dataField="NextDelDate" caption="Next Del. Date"  dataType="date" format="dd/MM/yyyy" width={120} /> */}
              {/* <Column dataField="MobileTel" caption="Mobile Telephone" width={180} /> */}
              {/* <Column dataField="MKT" caption="Mkt." width={80} /> */}
              {/* <Column dataField="GPRN" caption="GPRN" width={80} /> */}
              {/* <Column dataField="buyingGroup" caption="Buying Group" width={180} /> */}
              {/* <Column dataField="SiteIdentifier" width={120} /> */}
              <Column dataField="startDate" caption={t("Start Date")} dataType="date" format="dd/MM/yyyy" width={120} />

            </DataGrid>
          </div>
          {/* /End replace */}
        </div>
      </div>
    </main>
  )
}