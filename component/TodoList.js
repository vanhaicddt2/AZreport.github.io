import html from '../core.js'
import { connect } from '../store.js'
import TodoItem from './TodoItem.js'

function TodoList({ sum_lines }){
    // console.log(filters)
    // console.log(filters[filter])
    // filters[filter] => chạy hàm tương ứng của filter vd: all(), active(), completed()

    return html`
        <main>
            <table class="rp table-scoll">
                ${sum_lines.map((sum_line,index) =>
                       TodoItem({ sum_line, index }))}

                <tr>
                    <td class="rp__hi"> </td>
                    <td class="rp__SI"></td>
                    <td class="rp__name"> </td>
                    <td class="rp__room"> </td>
                    <td class="rp__price"> </td>
                    <td class="rp__in"> </td>
                    <td class="rp__out"> </td>
                    <td class="rp__vnd"> </td>
                    <td class="rp__usd"> </td>
                    <td class="rp__yen"> </td>
                    <td class="rp__vcb"> </td>
                    <td class="rp__other-vcb"> </td>
                    <td class="rp__exp-name"> </td>
                    <td class="rp__exp-price"> </td>
                </tr>
        
                <tr>
                    <td class="rp__hi"> </td>
                    <td class="rp__SI"></td>
                    <td class="rp__name"> </td>
                    <td class="rp__room"> </td>
                    <td class="rp__price"> </td>
                    <td class="rp__in"> </td>
                    <td class="rp__out"> </td>
                    <td class="rp__vnd"> </td>
                    <td class="rp__usd"> </td>
                    <td class="rp__yen"> </td>
                    <td class="rp__vcb"> </td>
                    <td class="rp__other-vcb"> </td>
                    <td class="rp__exp-name"> </td>
                    <td class="rp__exp-price"> </td>
                </tr>
            </table>

        <button class="btn btn__add">
            <i class="btn__add-icon  fas fa-plus" onclick="dispatch('add',{'HI':'3300A','SI':'4400A'})"></i>
        </button >

        <div class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Modal body text goes here.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save changes</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>

        </main>    
    `
}
// todo:todo
// ${todos.map(todo => TodoItem({todo}))}   

// line 17: ${todos.every(filters.completed) && 'checked'}  => todos.every duyệt qua tất cả thành phần của todos 
// Sử dụng filter để lọc theo điều kiện all,active,completed và các giá trị được trả về
// sẽ được hàm map tạo thành 1 ocject mới và render qua TodoItem (Module)
// todos.filter(function(){ // vidu chạy hàm filters[filter] = filters.all()
//     return true
// }).map(function(todo, index){
//     return TodoItem({ todo, index })
// }) 


export default connect()(TodoList) // trong hàm có trả về hàm mới.