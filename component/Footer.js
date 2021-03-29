import html from '../core.js'
import { connect } from '../store.js'

function Footer({ sum_lines }) {

    var fitlter_debit = sum_lines.filter(function(sum_line){
            return sum_line.vnd.slice(sum_line.vnd.length -3 ) == '000' || sum_line.vnd == '0'  || sum_line.vnd == '' 
                   || sum_line.vnd.slice(0, 7) == 'Paid wi' || sum_line.vnd.slice(0, 7) == 'paid wi'  || sum_line.vnd.slice(0, 7) == 'PAID WI' // when number
        });
    
    console.log(fitlter_debit)
        
    var sum_vnd =  Number(fitlter_debit.reduce(function(sum,sum_line_sub){
            return sum+=Number(sum_line_sub.vnd.replace(',',''))},0));        
    var sum_usd = Number(fitlter_debit.reduce(function(sum_usd,sum_line){
        return sum_usd+=Number(sum_line.usd)},0));
   var sum_yen = Number(fitlter_debit.reduce(function(sum_yen,sum_line){
        return sum_yen+=Number(sum_line.yen)},0));
    var sum_vcb_other = Number(fitlter_debit.reduce(function(sum_vcb_other,sum_line){
        return sum_vcb_other+=Number(sum_line.vcb_other)},0));
    var sum_vcb = Number(fitlter_debit.reduce(function(sum_vcb,sum_line){
        return sum_vcb+=Number(sum_line.vcb)},0));
    var sum_exp = Number(sum_lines.reduce(function(sum_exp,sum_line){
        return sum_exp+=Number(sum_line.exp_rate)},0));        

    var isNegative = (sum_vnd - sum_exp) < 0  ;
    var total_sum_vnd = (sum_vnd - sum_exp).toLocaleString();

    
    
    return html`
    <footer class="footer">
        <table class="rp total">
            <tr class="">
                <th class="total__title"></th>
                <th class="total__vnd">VND</th>
                <th class="total__usd">USD</th>
                <th class="total__usd">YEN</th>
                <th class="total__vcb">VCB</th>
                <th class="total__bidv">BIDV</th>
            </tr>

            <tr>
                <td class="total__title">SUM</td>
                <td class="total__vnd">${sum_vnd.toLocaleString()}</td>
                <td class="total__usd">${sum_usd.toLocaleString()}</td>
                <td class="total__usd">${sum_yen.toLocaleString()}</td>
                <td class="total__vcb">${sum_vcb.toLocaleString()}</td>
                <td class="total__bidv">${sum_vcb_other.toLocaleString()}</td>
            </tr>
        
            <tr>
                <td class="total__title">EXPENSE</td>
                <td class="total__vnd">${sum_exp.toLocaleString()}</td>
                <td class="total__usd"></td>
                <td class="total__usd"></td>
                <td class="total__vcb"></td>
                <td class="total__bidv"></td>
            </tr>

            <tr>
                <td class="total__title">TOTAL</td>
                <td class="total__vnd ${isNegative && 'op-redcolor op-fontweight600'}">${total_sum_vnd}</td>
                <td class="total__usd">${sum_usd.toLocaleString()}</td>
                <td class="total__usd">${sum_yen.toLocaleString()}</td>
                <td class="total__vcb">${sum_vcb.toLocaleString()}</td>
                <td class="total__bidv">${sum_vcb_other.toLocaleString()}</td>
            </tr>

            <tr>
                <td class="total__title">Input GGD by</td>
                <td class="total__vnd">
                    <input class="total__sign />
                </td>
                <td class="total__usd"></td>
                <td class="total__usd"></td>
                <td class="total__vcb"></td>
                <td class="total__bidv"></td>
            </tr>

        </table>

        <div class ="footer-btn">
            <button class="btn btn_send" onclick="dispatch('saveReport')">
                <i class="fas fa-save"> SAVE REPORT</i>
            </button>

            <button class="btn btn_send">
                <i class="btn_icon-send fas fa-paper-plane"> SEND REPORT</i>
            </button>

            <button class="btn btn_cancel">
                <i class="btn_icon-cancel far fa-window-close"> CANCEL</i>
            </button>
        </div>

    </footer>
    `
}

export default connect()(Footer)

//line 8: todos.filter(filters.active).length
// => todos.filter(function(todo){return !todo.completed}).length

// line 10: {Object.keys(filters).map(type
// => {Object.keys(filters) = Array{"all","active","completed"}
//  => .map lọc qua các phần tử và đẩy vào biến type. 

/* line 12 <a class="${filter === type && 'selected'}" href="#" onclick="dispatch('switchFilter','${type}')"> */
// class="${filter === type && 'selected'}" => nếu init.filter = type thì hiện thị class("selected")
// onclick="dispatch('switchFilter','${type}')" => khi nhấn vào sẽ chuyển gía trị của init.filter