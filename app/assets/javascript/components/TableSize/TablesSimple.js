import React from "react";

const tablesSize = {
    wooman: <table
    align="center"
    border="2"
    cellpadding="1"
    cellspacing="1"
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
        <td style={{textAlign:"center"}}>XXS</td>
        <td style={{textAlign:"center"}}>XS</td>
        <td style={{textAlign:"center"}}>S</td>
        <td style={{textAlign:"center"}}>M</td>
        <td style={{textAlign:"center"}}>L</td>
        <td style={{textAlign:"center"}}>XL</td>
        <td style={{textAlign:"center"}}>XXL</td>
      </tr>
      <tr>
        <td>
          <strong>&nbsp;Размеры в цифрах</strong>
        </td>
        <td style={{textAlign:"center"}}>38</td>
        <td style={{textAlign:"center"}}>40</td>
        <td style={{textAlign:"center"}}>42</td>
        <td style={{textAlign:"center"}}>44</td>
        <td style={{textAlign:"center"}}>46</td>
        <td style={{textAlign:"center"}}>48</td>
        <td style={{textAlign:"center"}}>50</td>
      </tr>
      <tr>
        <td>
          <strong>&nbsp;Наш размер</strong>
        </td>
        <td style={{textAlign:"center"}}>38</td>
        <td style={{textAlign:"center"}}>40</td>
        <td style={{textAlign:"center"}}>42</td>
        <td style={{textAlign:"center"}}>44</td>
        <td style={{textAlign:"center"}}>46</td>
        <td style={{textAlign:"center"}}>48</td>
        <td style={{textAlign:"center"}}>50</td>
      </tr>
      <tr>
        <td>
          <strong>&nbsp;Размеры в римских цифрах</strong>
        </td>
        <td style={{textAlign:"center"}}>&nbsp;</td>
        <td style={{textAlign:"center"}}>I</td>
        <td style={{textAlign:"center"}}>II</td>
        <td style={{textAlign:"center"}}>III</td>
        <td style={{textAlign:"center"}}>&nbsp;</td>
        <td style={{textAlign:"center"}}>&nbsp;</td>
        <td style={{textAlign:"center"}}>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;Обхват груди (см)</td>
        <td style={{textAlign:"center"}}>76-79</td>
        <td style={{textAlign:"center"}}>80-83</td>
        <td style={{textAlign:"center"}}>84-87</td>
        <td style={{textAlign:"center"}}>88-91</td>
        <td style={{textAlign:"center"}}>92-95</td>
        <td style={{textAlign:"center"}}>96-99</td>
        <td style={{textAlign:"center"}}>100-103</td>
      </tr>
      <tr>
        <td>&nbsp;Талия (см)</td>
        <td style={{textAlign:"center"}}>60-63</td>
        <td style={{textAlign:"center"}}>64-67</td>
        <td style={{textAlign:"center"}}>68-71</td>
        <td style={{textAlign:"center"}}>72-75</td>
        <td style={{textAlign:"center"}}>76-79</td>
        <td style={{textAlign:"center"}}>80-83</td>
        <td style={{textAlign:"center"}}>84-87</td>
      </tr>
      <tr>
        <td>&nbsp;Бедра (см)</td>
        <td style={{textAlign:"center"}}>84-87</td>
        <td style={{textAlign:"center"}}>88-91</td>
        <td style={{textAlign:"center"}}>92-95</td>
        <td style={{textAlign:"center"}}>96-99</td>
        <td style={{textAlign:"center"}}>100-103</td>
        <td style={{textAlign:"center"}}>104-107</td>
        <td style={{textAlign:"center"}}>108-111</td>
      </tr>
      <tr>
        <td>
          <strong>&nbsp;Джинсы (дюйм)</strong>
        </td>
        <td style={{textAlign:"center"}}>W24</td>
        <td style={{textAlign:"center"}}>W25</td>
        <td style={{textAlign:"center"}}>W26-W27</td>
        <td style={{textAlign:"center"}}>W28-W29</td>
        <td style={{textAlign:"center"}}>W30-W31</td>
        <td style={{textAlign:"center"}}>W32-W33</td>
        <td style={{textAlign:"center"}}>W34</td>
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
      <td style={{textAlign:"center"}}>XS</td>
      <td style={{textAlign:"center"}}>S</td>
      <td style={{textAlign:"center"}}>M</td>
      <td style={{textAlign:"center"}}>L</td>
      <td style={{textAlign:"center"}}>XL</td>
      <td style={{textAlign:"center"}}>XXL</td>
      <td style={{textAlign:"center"}}>XXXL</td>
    </tr>
    <tr>
      <td>
        <strong>&nbsp;Размеры в цифрах</strong>
      </td>
      <td style={{textAlign:"center"}}>44</td>
      <td style={{textAlign:"center"}}>46</td>
      <td style={{textAlign:"center"}}>48</td>
      <td style={{textAlign:"center"}}>50</td>
      <td style={{textAlign:"center"}}>52</td>
      <td style={{textAlign:"center"}}>54/56</td>
      <td style={{textAlign:"center"}}>58/60</td>
    </tr>
    <tr>
      <td>
        <strong>&nbsp;Наш размер</strong>
      </td>
      <td style={{textAlign:"center"}}>44</td>
      <td style={{textAlign:"center"}}>46</td>
      <td style={{textAlign:"center"}}>48</td>
      <td style={{textAlign:"center"}}>50</td>
      <td style={{textAlign:"center"}}>52</td>
      <td style={{textAlign:"center"}}>54/56</td>
      <td style={{textAlign:"center"}}>58/60</td>
    </tr>
    <tr>
      <td>&nbsp;Обхват груди (см)</td>
      <td style={{textAlign:"center"}}>86-90</td>
      <td style={{textAlign:"center"}}>91-95</td>
      <td style={{textAlign:"center"}}>96-101</td>
      <td style={{textAlign:"center"}}>102-107</td>
      <td style={{textAlign:"center"}}>108-111</td>
      <td style={{textAlign:"center"}}>112-117</td>
      <td style={{textAlign:"center"}}>118-123</td>
    </tr>
    <tr>
      <td>&nbsp;Талия (см)</td>
      <td style={{textAlign:"center"}}>75-78</td>
      <td style={{textAlign:"center"}}>79-83</td>
      <td style={{textAlign:"center"}}>84-89</td>
      <td style={{textAlign:"center"}}>90-94</td>
      <td style={{textAlign:"center"}}>95-99</td>
      <td style={{textAlign:"center"}}>100-104</td>
      <td style={{textAlign:"center"}}>105-110</td>
    </tr>
    <tr>
      <td>&nbsp;Бедра (см)</td>
      <td style={{textAlign:"center"}}>88-91</td>
      <td style={{textAlign:"center"}}>92-96</td>
      <td style={{textAlign:"center"}}>97-102</td>
      <td style={{textAlign:"center"}}>103-107</td>
      <td style={{textAlign:"center"}}>108-111</td>
      <td style={{textAlign:"center"}}>112-115</td>
      <td style={{textAlign:"center"}}>116-119</td>
    </tr>
    <tr>
      <td>
        <strong>&nbsp;Джинсы (дюйм)</strong>
      </td>
      <td style={{textAlign:"center"}}>W28-W29</td>
      <td style={{textAlign:"center"}}>W30-W31</td>
      <td style={{textAlign:"center"}}>W32-W33</td>
      <td style={{textAlign:"center"}}>W34</td>
      <td style={{textAlign:"center"}}>W36</td>
      <td style={{textAlign:"center"}}>W38</td>
      <td style={{textAlign:"center"}}>W40</td>
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
}

export default tablesSize