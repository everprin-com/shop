import React from "react";

const Td = ({size}) => <td style={{textAlign:"center"}}>{size}</td>

const tablesSize = {
  clothes: {
    wooman: <table
    align="center"
    border="2"
    cellpadding="1"
    cellspacing="1"
    className="simpleTableSize"
  >
    <thead>
      <tr>
        <th colspan="8" scope="col" style={{textAlign:"center"}}>
          <strong>Таблица размеров женской одежды</strong>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <strong>&nbsp;Размеры в буквах</strong>
        </td>
        {["XXS", "XS", "S", "M", "L", "XL", "XXL"].map(size =><Td size={size} key={size} />)}
      </tr>
      <tr>
        <td>
          <strong>&nbsp;Размеры в цифрах</strong>
        </td>
        {[38,40,42,44,46,48,50].map(size =><Td size={size} key={size} />)}
      </tr>
      <tr>
        <td>
          <strong>&nbsp;Размеры в римских цифрах</strong>
        </td>
        {["", "I", "II", "III", "", "", ""].map(size =><Td size={size} key={size} />)}     
      </tr>
      <tr>
        <td>&nbsp;Обхват груди (см)</td>
        {["76-79", "80-83", "84-87", "88-91", "92-95","96-99", "100-103",].map(size =><Td size={size} key={size} />)}
      </tr>
      <tr>
        <td>&nbsp;Талия (см)</td>
       {["60-63", "64-67", "68-71", "72-75", "76-79", "80-83", "84-87"].map(size =><Td size={size} key={size} />)}
      </tr>
      <tr>
        <td>&nbsp;Бедра (см)</td>
       {["84-87", "88-91", "92-95", "96-99", "100-103", "104-107", "108-111"].map(size =><Td size={size} key={size} />)}
      </tr>
      <tr>
        <td>
          <strong>&nbsp;Джинсы (дюйм)</strong>
        </td>
       {["W24", "W25", "W26-W27", "W28-W29", "W30-W31", "W32-W33", "W34"].map(size =><Td size={size} key={size} />)}
      </tr>
      <tr>
        <td>
          <strong>&nbsp;Универсальные размеры</strong>
        </td>
        <td colSpan="7" style={{textAlign:"center"}}>
          One size, T.U.
        </td>
      </tr>
    </tbody>
  </table>,
  man:  <table
  align="center"
  border="2"
  cellpadding="1"
  cellspacing="1"
  className="simpleTableSize"
>
  <thead>
    <tr>
      <th colSpan="8" scope="col" style={{textAlign:"center"}}>
        <strong>Таблица размеров мужской одежды</strong>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <strong>&nbsp;Размеры в буквах</strong>
      </td>
      <Td size="XS"  key="XS"/>
      <Td size="S"  key="S" />
      <Td size="M"  key="M" />
      <Td size="L"  key="L" />
      <Td size="XL"  key="XL" />
      <Td size="XXL"  key="XXL" />
      <Td size="XXXL"  key="XXXL" />
    </tr>
    <tr>
      <td>
        <strong>&nbsp;Размеры в цифрах</strong>
      </td>
      <Td size="44"  key="44" />
      <Td size="46"  key="46" />
      <Td size="48"  key="48" />
      <Td size="50"  key="50" />
      <Td size="52"  key="52" />
      <Td size="54/56"  key="54/56" />
      <Td size="58/60"  key="58/60" />
    </tr>
    <tr>
      <td>
        <strong>&nbsp;Наш размер</strong>
      </td>
      <Td size="44"  key="44" />
      <Td size="46"  key="46" />
      <Td size="48"  key="48" />
      <Td size="50"  key="50" />
      <Td size="52"  key="52" />
      <Td size="54/56"  key="54/56" />
      <Td size="58/60"  key="58/60" />
    </tr>
    <tr>
      <td>&nbsp;Обхват груди (см)</td>
      <Td size="86-90"  key="86-90" />
      <Td size="91-95"  key="91-95" />
      <Td size="96-101"  key="96-101" />
      <Td size="102-107"  key="102-107" />
      <Td size="108-111"  key="108-111" />
      <Td size="112-117"  key="112-117" />
      <Td size="118-123"  key="118-123" />
    </tr>
    <tr>
      <td>&nbsp;Талия (см)</td>
      <Td size="75-78"  key="75-78" />
      <Td size="79-83"  key="79-83" />
      <Td size="84-89"  key="84-89" />
      <Td size="90-94"  key="90-94" />
      <Td size="95-99"  key="95-99" />
      <Td size="100-104"  key="100-104" />
      <Td size="105-110"  key="105-110" />
    </tr>
    <tr>
      <td>&nbsp;Бедра (см)</td>
      <Td size="88-91"  key="88-91" />
      <Td size="92-96"  key="92-96" />
      <Td size="97-102"  key="97-102" />
      <Td size="103-107"  key="103-107" />
      <Td size="108-111"  key="108-111" />
      <Td size="112-115"  key="112-115" />
      <Td size="116-119"  key="116-119" />
    </tr>
    <tr>
      <td>
        <strong>&nbsp;Джинсы (дюйм)</strong>
      </td>
      <Td size="W28-W29"  key="W28-W29" />
      <Td size="W30-W31"  key="W30-W31" />
      <Td size="W32-W33"  key="W32-W33" />
      <Td size="W34"  key="W34" />
      <Td size="W36"  key="W36" />
      <Td size="W38"  key="W38" />
      <Td size="W40"  key="W40" />
    </tr>
    <tr>
      <td>
        <strong>&nbsp;Универсальные размеры</strong>
      </td>
      <td colSpan="7" style={{textAlign:"center"}}>
        One size, T.U.
      </td>
    </tr>
  </tbody>
</table>
  },
  footwear: <table
    align="center"
    border="2"
    cellpadding="1"
    cellspacing="1"
    className="simpleTableSize"
  >
    <thead>
      <tr>
        <th colspan="8" scope="col" style={{textAlign:"center"}}>
          <strong>Таблица размеров обуви</strong>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <strong>&nbsp;Размеры </strong>
        </td>
        <td>
          <strong>&nbsp;В сантиметрах</strong>
        </td>
      </tr>
      <tr>
        <Td size="35"  key="35" />
        <Td size="22.5 см"  key="22.5 см" />
      </tr>
      <tr>
        <Td size="36"  key="36" />
        <Td size="23 см"  key="23 см" />
      </tr>
      <tr>
        <Td size="37"  key="37" />
        <Td size="24 см"  key="24 см" />
      </tr>
      <tr>
        <Td size="38"  key="38" />
        <Td size="25 см"  key="25 см" />
      </tr>
      <tr>
        <Td size="39"  key="39" />
        <Td size="25.5 см"  key="25.5 см" />
      </tr>
      <tr>
        <Td size="40"  key="40" />
        <Td size="26.5 см"  key="26.5 см" />
      </tr>
      <tr>
        <Td size="41"  key="41" />
        <Td size="27 см"  key="27 см" />
      </tr>
      <tr>
        <Td size="42"  key="42" />
        <Td size="27.5 см"  key="27.5 см" />
      </tr>
      <tr>
        <Td size="43"  key="43" />
        <Td size="28.5 см"  key="28.5 см" />
      </tr>
      <tr>
        <Td size="44"  key="44" />
        <Td size="29 см"  key="29 см" />
      </tr>
      <tr>
        <Td size="45"  key="45" />
        <Td size="29.5 см"  key="29.5 см" />
      </tr>
      <tr>
        <Td size="46"  key="46" />
        <Td size="30 см"  key="30 см" />
      </tr>
      <tr>
        <Td size="47"  key="47" />
        <Td size="30.5 см"  key="30.5 см" />
      </tr>
      <tr>
        <Td size="48"  key="48" />
        <Td size="31 см"  key="31 см" />
      </tr>
      <tr>
        <Td size="49"  key="49" />
        <Td size="31.5 см"  key="31.5 см" />
      </tr>
      <tr>
        <Td size="50"  key="50" />
        <Td size="32 см"  key="32 см" />
      </tr>
    </tbody>
    </table>
}

export default tablesSize