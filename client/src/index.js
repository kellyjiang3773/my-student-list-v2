import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StudentListBox from './StudentListBox';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<StudentListBox />, document.getElementById('root'));
registerServiceWorker();
