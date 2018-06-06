import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import StudentListBox from './StudentListBox';
import SideBarExample from './components/SideBar';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SideBarExample />, document.getElementById('root'));
registerServiceWorker();
