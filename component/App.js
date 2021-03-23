import html from '../core.js'
import { connect } from '../store.js'  // lấy connect để kết nối với LocalStorage
import Footer from '../component/Footer.js'
import Header from '../component/Header.js'
import TodoList from '../component/TodoList.js'

function App({ todos }){
    start()

    return html`
         <section class="todoapp">
            ${Header()}
            ${TodoList()}
            ${Footer()}
         </section>
    `
}
var reportAPI = 'http://localhost:3000/date' 

function start(){
    getreport(view);
}

function  getreport(callback) {
    fetch(reportAPI)
       .then((response) => response.json)
       .then(callback);
}

function view(reports) {

   console.log('report:',reports)

}

export default connect()(App)