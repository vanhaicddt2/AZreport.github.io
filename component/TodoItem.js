import html from '../core.js'
import { connect } from '../store.js'

function TodoItem( { sum_line, index } ){
    var list_check = ['debit','Debit','DEBIT','Paid at','PAID AT','paid at','Paid wi','PAID WI','paid wi']; 
    var check = list_check.some(function(kq){
        if ( sum_line.vnd.length > 5) {
            return kq == sum_line.vnd.slice(0, 7) ;
        }else if (sum_line.vnd.length == 5) {
            return kq == sum_line.vnd; 
        }
    });
    
    var isdebit = (sum_line.vnd === 'debit' || sum_line.vnd === 'Debit' || sum_line.vnd === 'DEBIT') ;
    var isPaidWi = ( sum_line.vnd.slice(0, 7) == 'Paid wi' || sum_line.vnd.slice(0, 7) == 'paid wi' 
                    || sum_line.vnd.slice(0, 7) == 'PAID WI' || sum_line.vnd.slice(sum_line.vnd.length -3 ) === '000' 
                    || sum_line.vnd === '0' || sum_line.vnd === '' );
    
    console.log('isPaid with',isPaidWi);

    return html`
    <tr class ="">
        <td class="rp__hi ${isdebit && 'bg_yellow'}">
            <input  class="sub_td1 sub_td1-input-m sub_td1-input-hi ${ sum_line.SI != "" && 'op-hidden'}" 
                value="${sum_line.HI}" 
                onblur="dispatch('endEdit_HI', ${index}, this.value)"
                onkeyup="event.keyCode === 13 && dispatch('endEdit_HI', ${index}, this.value)" >
            <i class="sub_td-track-icon fas fa-trash-alt" onclick="dispatch('destroy',${index})"></i>
        </td>

        <td class="rp__SI ${ isdebit && 'bg_yellow'} ">
            <input  class="sub_td1 sub_td1-input-l ${ sum_line.HI != "" && 'op-hidden'}" 
                value="${sum_line.SI}" 
                onblur="dispatch('endEdit_SI', ${index}, this.value)"
                onkeyup="event.keyCode === 13 && dispatch('endEdit_SI', ${index}, this.value)" />
            </section>      
        </td>

        <td class="rp__name ${ isdebit && 'bg_yellow'}">  
             <input  class="sub_td1 sub_td1-input-xl sub_td1-input-name item--bold" 
                value="${sum_line.name}" 
                title = "${sum_line.name}" 
                onblur="dispatch('endEdit_name', ${index}, this.value)"
                onkeyup="event.keyCode === 13 && dispatch('endEdit_name', ${index}, this.value)" 
                alt ="Hello" />

            <i class="sub_td1-option fas fa-cog" onclick="dispatch('setSub1',${index})"></i>  

            <div class="sub_td2  ${sum_line.sub1 === false && 'op-hidden'}">
                <div class="dropdown">
                     <button class="dropdown-toggle sub_td2-btn " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         * ${sum_line.name_sub1}
                     </button>
                    <div class="dropdown-menu bg_prime_color" aria-labelledby="dropdownMenuButton">
                        <input class="dropdown-item"
                               type="text" 
                               placeholder="Enter here" 
                               value = "${sum_line.name_sub1}"
                               onblur="dispatch('setNameSub1',${index},this.value)"
                               onkeyup="event.keyCode === 13 && dispatch('setNameSub1',${index},this.value)"/>
       
                        <div class="dropdown-divider"></div>
                               <div class = "bg_mate_color">
                                   <a class="dropdown-item " 
                                       onclick="dispatch('setNameSub1',${index},'Late out')">
                                       Late out
                                   </a>
       
                                   <a class="dropdown-item" 
                                      onclick="dispatch('setNameSub1',${index},'Short time')" >
                                       Short time
                                   </a>
       
                                   <a class="dropdown-item" 
                                   onclick="dispatch('setNameSub1',${index},'Early Check in')" >
                                        Early Check in
                                    </a>
                               </div>  
       
                               <div class = "bg_prime_blur_color">
                                    <a class="dropdown-item" 
                                    onclick="dispatch('setNameSub1',${index},'Pick Up')" >
                                         Pick Up
                                     </a>
       
                                   <a class="dropdown-item" 
                                   onclick="dispatch('setNameSub1',${index},'Drop Off')" >
                                       Drop Off
                                   </a>  
       
                                   <a class="dropdown-item" 
                                   onclick="dispatch('setNameSub1',${index},'Minibar')" >
                                       Minibar 
                                   </a>  
       
                                   <a class="dropdown-item" 
                                   onclick="dispatch('setNameSub1',${index},'Massage 40')" >
                                       Massage 40
                                   </a>  
       
                                   <a class="dropdown-item" 
                                   onclick="dispatch('setNameSub1',${index},'Massage 70')" >
                                       Massage 70
                                   </a>  
       
                                   <a class="dropdown-item" 
                                   onclick="dispatch('setNameSub1',${index},'Massage 100')" >
                                       Massage 100
                                   </a>  
       
                               </div>    
                           </div>       

                </div>    

                <div class="sub_td2-option">
                    <i class="sub_td2-option-plus fas fa-plus" onclick="dispatch('setSub2',${index})"></i> 
                    <i class="sub_td2-option-minus fas fa-minus" onclick="dispatch('offSub1',${index})"></i>
                </div>

            </div>

            <div class="sub_td3 ${sum_line.sub2 === false && 'op-hidden'}">
                
                    <div class="dropdown">
                    <button class="dropdown-toggle sub_td2-btn " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        * ${sum_line.name_sub2}
                    </button>

                    <div class="dropdown-menu bg_prime_color" aria-labelledby="dropdownMenuButton">
                        <input class="dropdown-item"
                                type="text" 
                                placeholder="Enter here" 
                                value = "${sum_line.name_sub2}"
                                onblur="dispatch('setNameSub2',${index},this.value)"
                                onkeyup="event.keyCode === 13 && dispatch('setNameSub2',${index},this.value)"/>

                        <div class="dropdown-divider"></div>
                        <div class = "bg_mate_color">
                            <a class="dropdown-item " 
                                onclick="dispatch('setNameSub2',${index},'Late out')">
                                Late out
                            </a>

                            <a class="dropdown-item" 
                               onclick="dispatch('setNameSub2',${index},'Short time')" >
                                Short time
                            </a>

                            <a class="dropdown-item" 
                            onclick="dispatch('setNameSub2',${index},'Early Check in')" >
                                 Early Check in
                             </a>
                        </div>  

                        <div class = "bg_prime_blur_color">
                             <a class="dropdown-item" 
                             onclick="dispatch('setNameSub2',${index},'Pick Up')" >
                                  Pick Up
                              </a>

                            <a class="dropdown-item" 
                            onclick="dispatch('setNameSub2',${index},'Drop Off')" >
                                Drop Off
                            </a>  

                            <a class="dropdown-item" 
                            onclick="dispatch('setNameSub2',${index},'Minibar')" >
                                Minibar 
                            </a>  

                            <a class="dropdown-item" 
                            onclick="dispatch('setNameSub2',${index},'Massage 40')" >
                                Massage 40
                            </a>  

                            <a class="dropdown-item" 
                            onclick="dispatch('setNameSub2',${index},'Massage 70')" >
                                Massage 70
                            </a>  

                            <a class="dropdown-item" 
                            onclick="dispatch('setNameSub2',${index},'Massage 100')" >
                                Massage 100
                            </a>  

                        </div>    
                    </div>
                </div>    

                <div class="sub_td2-option">
                    <i class="sub_td2-option-plus fas fa-plus" onclick="dispatch('setSub3',${index})"></i> 
                    <i class="sub_td2-option-minus fas fa-minus" onclick="dispatch('offSub2',${index})"></i>
                </div>
            </div>          

            <div class="sub_td4  ${sum_line.sub3 === false && 'op-hidden'}">
                
            <div class="dropdown">
            <button class="dropdown-toggle sub_td2-btn " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                * ${sum_line.name_sub3}
            </button>

            <div class="dropdown-menu bg_prime_color" aria-labelledby="dropdownMenuButton">
                <input class="dropdown-item"
                        type="text" 
                        placeholder="Enter here" 
                        value = "${sum_line.name_sub3}"
                        onblur="dispatch('setNameSub3',${index},this.value)"
                        onkeyup="event.keyCode === 13 && dispatch('setNameSub3',${index},this.value)"/>

                <div class="dropdown-divider"></div>
                <div class = "bg_mate_color">
                    <a class="dropdown-item " 
                        onclick="dispatch('setNameSub3',${index},'Late out')">
                        Late out
                    </a>

                    <a class="dropdown-item" 
                       onclick="dispatch('setNameSub3',${index},'Short time')" >
                        Short time
                    </a>

                    <a class="dropdown-item" 
                    onclick="dispatch('setNameSub3',${index},'Early Check in')" >
                         Early Check in
                     </a>
                </div>  

                <div class = "bg_prime_blur_color">
                     <a class="dropdown-item" 
                     onclick="dispatch('setNameSub3',${index},'Pick Up')" >
                          Pick Up
                      </a>

                    <a class="dropdown-item" 
                    onclick="dispatch('setNameSub3',${index},'Drop Off')" >
                        Drop Off
                    </a>  

                    <a class="dropdown-item" 
                    onclick="dispatch('setNameSub3',${index},'Minibar')" >
                        Minibar 
                    </a>  

                    <a class="dropdown-item" 
                    onclick="dispatch('setNameSub3',${index},'Massage 40')" >
                        Massage 40
                    </a>  

                    <a class="dropdown-item" 
                    onclick="dispatch('setNameSub3',${index},'Massage 70')" >
                        Massage 70
                    </a>  

                    <a class="dropdown-item" 
                    onclick="dispatch('setNameSub3',${index},'Massage 100')" >
                        Massage 100
                    </a>  

                    </div>    
                </div>
            </div>    

            <div class="sub_td2-option">
                <i class="sub_td2-option-minus"></i>
                <i class="sub_td2-option-minus fas fa-minus" onclick="dispatch('offSub3',${index})"></i>
            </div>
       </div>          
        </td>

        <td class="rp__room ${ isdebit && 'bg_yellow'}">
            <input  class="sub_td1 sub_td1-input-m" 
                value="${sum_line.room}" 
                onblur="dispatch('endEdit_room', ${index}, this.value)"
                onkeyup="event.keyCode === 13 && dispatch('endEdit_room', ${index}, this.value)" >
        </td>

        <td class="rp__price ${ isdebit && 'bg_yellow'}">
            <input  class="sub_td1 sub_td1-input-m " 
                value="${sum_line.room_rate}" 
                onblur="dispatch('endEdit_room_rate', ${index}, this.value)"
                onkeyup="event.keyCode === 13 && dispatch('endEdit_room_rate', ${index}, this.value)" >
        </td>

        <td class="rp__in ${ isdebit && 'bg_yellow'}">
             <input  type="date" class="rp_in-date sub_td1-input-m sub_td1-input-checkin ${sum_line.checkin === "" && 'op-opacity0_3'}" 
                     value="${sum_line.checkin}" onchange="dispatch('endEdit_checkin', ${index},this.value)"/>   
        </td>

        <td class="rp__out ${ isdebit && 'bg_yellow'}">
            <input  type="date" 
                    class="rp_out-date sub_td1-input-m sub_td1-input-checkout 
                           ${sum_line.checkout === "" && 'op-opacity0_3'}
                           ${sum_line.error_code == "checkout" && 'op-color_red'} " 
                    value="${sum_line.checkout}" onchange="dispatch('endEdit_checkout', ${index},this.value)" />
            <di class="rp_out-message ${sum_line.error_code == "checkout" && 'op-block'}">
                <i class="rp_out-message-icon fas fa-exclamation-circle"></i>
                Select > checkin Date 
            </di>         

        </td>

        <td class="rp__vnd ${ isdebit && 'bg_yellow'}">
            <input   class="sub_td1 sub_td1-input-xxl sub_td1-rp__vnd ${sum_line.vnd.length > 12 && 'op-redcolor'}" 
                     type = "text"
                     value="${ check ? sum_line.vnd : Number(sum_line.vnd ).toLocaleString() }" 
                     onblur="dispatch('endEdit_vnd', ${index}, this.value.replace(',',''))"
                     onkeyup="event.keyCode === 13 && dispatch('endEdit_vnd', ${index}, this.value)"/>       
        </td>

        <td class="rp__usd ${ isdebit && 'bg_yellow'}">
            <input  type="text  " class="sub_td1 sub_td1-input-xl ${ check && 'op-hidden'}" 
                    value="${Number(sum_line.usd).toLocaleString()||sum_line.usd}"
                    onblur="dispatch('endEdit_usd', ${index}, this.value)" /> 
            <input  class="sub_td2 op-hidden"/>
            <input  class="sub_td3 op-hidden"/>
        </td>

        <td class="rp__yen ${ isdebit && 'bg_yellow'}">
            <input  class="sub_td1 sub_td1-input-xl ${ check && 'op-hidden'}" 
                    value="${Number(sum_line.yen).toLocaleString()||sum_line.yen}" 
                    onblur="dispatch('endEdit_yen', ${index}, this.value)"/>
            <input  class="sub_td2 op-hidden"/>
            <input  class="sub_td3 op-hidden"/>
        </td>

        <td class="rp__vcb ${ isdebit && 'bg_yellow'}">
            <input  class="sub_td1 sub_td1-input-xl ${!isPaidWi && 'op-hidden'}" 
                    value="${Number(sum_line.vcb).toLocaleString()}" 
                    onblur="dispatch('endEdit_vcb', ${index}, this.value)"
                    onkeyup="event.keyCode === 13 && dispatch('endEdit_vcb', ${index}, this.value)" />
            <input  class="sub_td2 op-hidden"/>
            <input  class="sub_td3 op-hidden"/>
        </td>

        <td class="rp__other-vcb ${ isdebit && 'bg_yellow'}">
            <input  class="sub_td1 sub_td1-input-xl ${!isPaidWi && 'op-hidden'}" 
                    value="${Number(sum_line.vcb_other).toLocaleString()}" 
                    onblur="dispatch('endEdit_other_vcb', ${index}, this.value)"
                    onkeyup="event.keyCode === 13 && dispatch('endEdit_other_vcb', ${index}, this.value)" />
            <input  class="sub_td2 op-hidden"></input>
            <input  class="sub_td3 op-hidden"></input>
        </td>

        <td class="rp__exp-name">
            <input  class="sub_td1 sub_td1-input-xl" 
            value="${(sum_line.exp)}" 
            onblur="dispatch('endEdit_exp_name', ${index}, this.value)"
            onkeyup="event.keyCode === 13 && dispatch('endEdit_exp_name', ${index}, this.value)" />
        </td>

        <td class="rp__exp-price">
            <input  class="sub_td1 sub_td1-input-xl" 
            value="${Number(sum_line.exp_rate).toLocaleString()}" 
            onblur="dispatch('endEdit_exp_rate', ${index}, this.value)"
            onkeyup="event.keyCode === 13 && dispatch('endEdit_exp_rate', ${index}, this.value)" />      
        </td>
    </tr>
    `
}

{/* <input class="sub_td1  sub_td1-input-m ${sum_line.sub1 === false && 'op-hidden'}"></input>
<input class="sub_td1  sub_td1-input-m ${sum_line.sub2 === false && 'op-hidden'}"></input>
<input class="sub_td1  sub_td1-input-m ${sum_line.sub3 === false && 'op-hidden'}"></input> */}

export default connect()(TodoItem)