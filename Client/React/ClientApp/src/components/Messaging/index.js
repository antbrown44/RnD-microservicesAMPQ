import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import PageTitle from '../_layout/PageTitle';
import SideBar from './SideBar';

import DataGrid, {
    Column,
    ColumnFixing,
    Selection
} from 'devextreme-react/data-grid';

function InboxList(props) {
    let dataGrid = null;

    const [selectedMessagesFrom, setSelectedMessagesFrom] = useState('Nobody has been selected');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch('https://localhost:5001/api/internalmessages?user=ZAN_001')
            .then(response => {
                response.json()
                    .then(json => setMessages(json))
            }
            );

    }, []);

    const onRowPrepared = (info) => {
        if (info.rowType === 'data' && info.cells.length > 2) {
            if (info.data.Status == '1')
                info.rowElement.classList.add('font-bold');
            if (info.cells[1].value === 3) {
                info.cells[1].cellElement.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="text-blue-400 flex-shrink-0 mx-auto h-6 w-6" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"></path></svg>
        `
            } else if (info.cells[1].value === 2) {
                info.cells[1].cellElement.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="text-red-400 flex-shrink-0 mx-auto h-6 w-6" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        `
            } else {
                info.cells[1].cellElement.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="text-green-400 flex-shrink-0 mx-auto h-6 w-6" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        `
            }
            if (info.cells[5].value) {
                info.cells[5].cellElement.innerHTML = `
          <div class="group flex items-center text-sm ml-1 font-medium rounded-md">
            <span class="bg-${info.data.Flag}-500 w-2.5 h-2.5 mr-4 rounded-full" aria-hidden="true"></span>
            <span class="truncate capitalize">${info.data.Flag}</span>
          </div>
        `
            }
        }
    }

    const onSelectionChanged = ({ selectedRowKeys, selectedRowsData }) => {
        setSelectedMessagesFrom(getEmployeeNames(selectedRowsData));
        setSelectedRowKeys(selectedRowKeys)
    }

    const getEmployeeName = (row) => {
        return row.From;
    }

    const getEmployeeNames = (selectedRowsData) => {
        return selectedRowsData.length ? selectedRowsData.map(getEmployeeName).join(', ') : 'Nobody has been selected';
    }

    const onRowDblClick = (row) => {
        const { history } = props;
        if (history) history.push('/people/messaging/' + row.data.Id);

    }

  return (
    //  Main area
    <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex overflow-hidden">
      {/* Primary column */}
      <section
        aria-labelledby="primary-heading"
        className="min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last"
      >
        {/* Your content */}
        <PageTitle text="Inbox" />
        
          <div id="grid" className="px-4 pb-6 sm:px-6 md:px-8">
            <DataGrid
              id="grid-container"
              className="shadow overflow-hidden sm:rounded-lg"
              dataSource={messages}
              keyExpr="ID"
              onSelectionChanged={onSelectionChanged}
              ref={ref => dataGrid = ref}
              selectedRowKeys={selectedRowKeys}
              showBorders={false}
              onRowPrepared={onRowPrepared}
              onRowDblClick={onRowDblClick}
            >
              <Selection mode="multiple" />
              <ColumnFixing enabled={true} />
              <Column dataField="Priority" caption="&#9888;" width={50} />
              <Column dataField="From"  width={200} />
              <Column dataField="Subject" />
              <Column dataField="DateTimeSent" caption="Received" dataType="date" format="dd/MM/yyyy" width={125} />
              <Column dataField="Flag" width={110} />
            </DataGrid>
            {/* <div className="selected-data">
              <span className="caption">Selected Records:</span>{' '}
              <span>
                { selectedMessagesFrom }
              </span>
            </div> */}
          </div>
        
      </section>

      {/* Secondary column (hidden on smaller screens) */}
      <aside className="hidden lg:block lg:flex-shrink-0 lg:order-first">
        <div className="h-full relative flex flex-col w-64 border-r border-gray-200 bg-gray-100 overflow-y-auto">
          <SideBar />
        </div>
      </aside>
    </main>
    
    
  );
}

export default withRouter(InboxList)