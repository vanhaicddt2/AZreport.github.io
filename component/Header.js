import html from '../core.js'
import { connect } from '../store.js'

function Header({nav_item}){
    console.log(nav_item);
    return html`
    <header class="nav-fix-top">
    <ul class="nav">
        <li class="nav-item active">
          <a class="nav-link" href="http://system.azumayavietnam.com/">AZ DATABASE</a>
        </li>
        <li class="nav-item ${nav_item == 'sum' && 'active'}" onclick="dispatch('switchNavItem','sum')">
          <a class="nav-link" href="#make-sum">MAKE SUM</a>
        </li>
        <li class="nav-item ${nav_item == 'view' && 'active'}" onclick="dispatch('switchNavItem','view')">
          <a class="nav-link" href="#view-sum">VIEW SUM</a>
        </li>
        <li class="nav-item ${nav_item == 'other' && 'active'}" onclick="dispatch('switchNavItem','other')">
        <a class="nav-link" href="#view-sum">OTHER</a>
      </li>
      </ul>

      <ul class="nav nav-sub">
        <li class="nav-item-sub">
          <p class="nav-link-sub" href="#">Input date</p>
        </li>
        <li class="nav-item-sub">
          <input type="date" class="nav-link-sub" href="#"></a>
        </li>

        <button class="nav-item-sub btn_makesum">OK</button>

      </ul>
      <h1 class="rp__title">
        AZ KIM MA 2 - SUM ON MAR 11TH
        </h1>
    <table class="rp">
        <tr class="rp_row-fix">
            <th class="rp__hi">Hotel Invoice</th>
            <th class="rp__SI">Service Invoice</th>
            <th class="rp__name">Customer Name</th>
            <th class="rp__room">Room Number</th>
            <th class="rp__price">Unit Price</th>
            <th class="rp__in">Check in</th>
            <th class="rp__out">Check out</th>
            <th class="rp__vnd">VND</th>
            <th class="rp__usd">USD</th>
            <th class="rp__yen">YEN</th>
            <th class="rp__vcb">VCB</th>
            <th class="rp__other-vcb">BIDV</th>
            <th class="rp__exp-name">EXP (Name)</th>
            <th class="rp__exp-price">EXP (Price)</th>
        </tr>
    </table>
</header>
    `
}

export default connect()(Header)