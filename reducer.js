// import Header from './component/Header.js'
import storage from './util/storage.js'  // import lưu file local

const init = {
    sum_lines: storage.get() , // lấy ra localStorage
    filter: 'all',
    nav_item: "sum",
    filters:{  // các function để cho vào các hàm vidu forEach, filter, reduce ...
        all:() => true,  //mặc đinh đúng trả về tất cả giá trị trong mảng 
        active: todo => !todo.completed, 
        // active: function(todo){
        //     return !todo.completed
        // } 
        completed: todo => todo.completed
    },
    editIndex: null
}

const actions = {
    add({ sum_lines }, title){
        if (title){  // nếu có title mới thực hiện logic
            sum_lines.push({ 
                HI: "", 
                SI: "",
                name: "",
                room: "",
                room_rate: "",
                checkin: "",
                checkout: "",
                vnd: "",
                usd: "",
                yen: "",
                vcb: "",
                vcb_other: "",
                name_sub1: "",
                room_sub1: "",
                room_rate_sub1: "",
                checkin_sub1: "",
                checkout_sub1: "",
                vnd_sub1: "",
                usd_sub1: "",
                yen_sub1: "",
                vcb_sub1: "",
                vcb_other_sub1: "",
                name_sub2: "",
                room_sub2: "",
                room_rate_sub2: "",
                checkin_sub2: "",
                checkout_sub2: "",
                vnd_sub2: "",
                usd_sub2: "",
                yen_sub2: "",
                vcb_sub2: "",
                vcb_other_sub2: "",
                sub1: false,
                sub2: false,
                sub3: false,
                name_sub1: "option 1",
                name_sub2: "option 2",
                name_sub3: "option 3",
                exp:"",
                exp_rate: "",
                error_code: ""               
            })
            storage.set(sum_lines)  // lưu vào localStorage
            console.log('check',Object.keys(init.filters))
        }
    },
    destroy({ sum_lines }, index) {
        sum_lines.splice(index,1) // xóa 1 phần tử
        storage.set(sum_lines)  // lưu vào localStorage
    },
    switchNavItem(state, nav_item) {
        state.nav_item = nav_item
    },
    startEdit(state, index){
        state.editIndex = index
    },
    setSub1(state,index){
        state.sum_lines[index].sub1 = true
    },
    setSub2(state,index){
        state.sum_lines[index].sub2 = true
    },
    setSub3(state,index){
        state.sum_lines[index].sub3 = true
    },
    offSub1(state,index){
        state.sum_lines[index].sub1 = false
    },
    offSub2(state,index){
        state.sum_lines[index].sub2 = false
    },
    offSub3(state,index){
        state.sum_lines[index].sub3 = false
    },
    endEdit_HI(state,index,value) {
        state.sum_lines[index].HI = value
        storage.set(state.sum_lines)  // lưu vào localStorage
    },
    endEdit_SI(state,index,value) {
        state.sum_lines[index].SI = value
        storage.set(state.sum_lines)  // lưu vào localStorage
    },
    endEdit_name(state,index,value) {
        state.sum_lines[index].name = value.toUpperCase()
        storage.set(state.sum_lines)  // lưu vào localStorage
    },
    setNameSub1(state,index,value) {
        state.sum_lines[index].name_sub1 = value
        storage.set(state.sum_lines)  // lưu vào localStorage
    },
    setNameSub2(state,index,value) {
        state.sum_lines[index].name_sub2 = value
        storage.set(state.sum_lines)  // lưu vào localStorage
    },
    setNameSub3(state,index,value) {
        state.sum_lines[index].name_sub3 = value
        storage.set(state.sum_lines)  // lưu vào localStorage
    },
    endEdit_room(state,index,value) {
        state.sum_lines[index].room = value
        storage.set(state.sum_lines)  // lưu vào localStorage
    },
    endEdit_room_rate(state,index,value) {
        state.sum_lines[index].room_rate = value
        storage.set(state.sum_lines)  // lưu vào localStorage
    },

    endEdit_checkin(state,index,value) {
        state.sum_lines[index].checkin = value
        storage.set(state.sum_lines)  // lưu vào localStorage
    },
    endEdit_checkout(state,index,value) {   
        if (value >= state.sum_lines[index].checkin) {
            state.sum_lines[index].error_code = ""
            state.sum_lines[index].checkout = value
            storage.set(state.sum_lines)  // lưu vào localStorage
        } else {
            state.sum_lines[index].error_code = "checkout"
        }

    },
    endEdit_usd(state,index,value) {
        state.sum_lines[index].usd = value.replace(',','')
        storage.set(state.sum_lines)  // lưu vào localStorage
    },
    endEdit_vnd(state,index,value) {

        if (value.slice(value.length -3 ) != '000') {
            state.sum_lines[index].vnd = value;
        } else  { 
            state.sum_lines[index].vnd = value.replace(',','')
        }
        storage.set(state.sum_lines)  // lưu vào localStorage
        // check area

    },
    endEdit_yen(state,index,value) {
        state.sum_lines[index].yen = value.replace(',','')
        storage.set(state.sum_lines)  // lưu vào localStorage
    },
    endEdit_vcb(state,index,value) {
        state.sum_lines[index].vcb = value.replace(',','')
        storage.set(state.sum_lines)  // lưu vào localStorage
    },
    endEdit_other_vcb(state,index,value) {
        state.sum_lines[index].vcb_other = value.replace(',','')
        storage.set(state.sum_lines)  // lưu vào localStorage
    },
    endEdit_exp_name(state,index,value) {
        state.sum_lines[index].exp = value
        storage.set(state.sum_lines)  // lưu vào localStorage
    },
    endEdit_exp_rate(state,index,value) {
        state.sum_lines[index].exp_rate = value.replace(',','')
        storage.set(state.sum_lines)  // lưu vào localStorage
    },
    cancelEdit(state){
        state.editIndex = null
    },
    saveReport(state){
        var checkinElement = $(".sub_td1-input-checkin").value;
        console.log(checkinElement)
        state.sum_lines[1].checkin = checkinElement;
        storage.set(state.sum_lines)  // lưu vào localStorage
    }
}

// document.addEventListener('DOMContentLoaded',function() { {
//     var $j = jQuery.noConflict();
//     $j(function() {
//         $j(".datepicker").datepicker({
//             dateFormat: 'dd-MM-yy',
//         })
        
//     }); 

// }});

var dateElement = $(".datepicker").datepicker();
dateElement.change(function(selected){
   console.log(ok)
   $j(this).datepicker('hide');
});

export default function reducer(state = init,action,args){
    actions[action] && actions[action](state, ...args)
    return state

    // Cách 2:
    // switch (action) {
    //     case 'add':

    //     const [title] = args  // args giá trị được input từ bàn phím vào  để dấu [] để nó k thành array
    //         return {
    //             ...state,
    //             sum_lines: [...state.sum_lines, {
    //                 title,
    //                 completed: false
    //             }]  // ...state.sum_lines : Giá trị hiện thị,  { title, completed: false } : giá trị mới đc add vô.
    //         }
    //     default:
    // //         return state
    // }
}