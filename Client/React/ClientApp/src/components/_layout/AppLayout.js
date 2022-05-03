import { useEffect, useState } from 'react'
// Layout components
import Header from './Header';
import SideBar from './SideBar';
import Banner from './Banner';
// Page components
import Dashboard from "../Dashboard";
import CustomersList from '../CustomersList/Index';
import CustomerOrder from "../CustomerOrder";
import CustomerDetails from "../CustomersList/CustomerDetails";
import Telephone from '../Telephone';
import Communication from '../Communication';
import Marketing from '../Marketing';
import Sales from '../Sales';
import Purchase from '../Purchase';
import Nominal from '../Nominal';
import CreditControl from '../CreditControl';
import Personnel from '../Personnel';
import Diary from '../Diary';
import Messaging from '../Messaging/';
import MessageDetails from '../Messaging/MessageDetails';
import EmailManagement from '../EmailManagement';
import LoadManager from '../LoadManager';
import Tasks from '../Tasks';
import Calendar from '../Calendar';
import Help from '../Help';
// Router Components
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AppLayout(props) {

  const { match } = props;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
        <SideBar classNames={classNames} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          
          <Header classNames={classNames} setSidebarOpen={setSidebarOpen} />
          
          <Switch>
            <Route exact path="/customers/list" component={CustomersList} />
            <Route exact path="/customers/list/:id" component={CustomerDetails} />
            <Route exact path="/customers/order" component={CustomerOrder} />
            <Route exact path="/customers/telephone" component={Telephone} />
            <Route exact path="/customers/communication" component={Communication} />
            <Route exact path="/customers/marketing" component={Marketing} />
            <Route exact path="/finance/sales" component={Sales} />
            <Route exact path="/finance/purchase" component={Purchase} />
            <Route exact path="/finance/nominal" component={Nominal} />
            <Route exact path="/finance/credit-control" component={CreditControl} />
            <Route exact path="/people/personnel" component={Personnel} />
            <Route exact path="/people/diary" component={Diary} />
            <Route exact path="/people/messaging" component={Messaging} />
            <Route exact path="/people/messaging/:id" component={MessageDetails} />
            <Route exact path="/people/email-management" component={EmailManagement} />
            <Route exact path="/load-manager" component={LoadManager} />
            <Route exact path="/company/tasks" component={Tasks} />
            <Route exact path="/company/calendar" component={Calendar} />
            <Route exact path="/help" component={Help} />
            <Route exact path={`${match.path}`} component={Dashboard} />
          </Switch>
        </div>
        <Banner />
    </div>
  )
}
