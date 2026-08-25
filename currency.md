---
title: "币种及精度定义"
doc_type: static
doc_category: static
doc_version: v20270301
---
# 币种及精度定义
在 MATACART 与支付应用进行数据交互时，币种及精度定义将遵循此表格（本表格遵循 [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html#:~:text=This%20standard%20establishes%20internationally%20recognized,three%20digits%20or%20three%20letters.) 国际标准）。<br />

> **备注**
>
> 金额传参规则与币种精度相关，要求传递的值以该币种下最小货币单位为基准传递，传值中不存在小数位。<br />
> 例如：
> - 1 JPY，由于 JPY 币种精度为 整数，金额传参规则为 x1，则接口传值需要为 1。
> - 1.23 USD，由于 USD 币种精度为 2位小数，金额传参规则为 x100，则接口传值需要为 123。
> - 1.234 BHD，由于 BHD 币种精度为 3位小数，金额传参规则为 x1000，且最后一位必须为 0（SHOPLINE 暂不支持高于 2 位精度的金额处理），则接口传值需要为 1230。

| 国家或地区 | 货币名称 | 货币代码 | 币种精度 | 最小交易金额 | 金额传参规则 |
|------------|----------|----------|-----------|---------------|----------------|
| United Arab Emirates | UAE Dirham | AED | 2 位小数 | 0.1 | x100 |
| Afghanistan | Afghan Afghani | AFN | 2 位小数 | 0.1 | x100 |
| Armenia | Armenian Dram | AMD | 2 位小数 | 0.1 | x100 |
| Curaçao and Sint Maarten | Netherlands Antillean Guilder | ANG | 2 位小数 | 0.1 | x100 |
| Angola | Kwanza | AOA | 2 位小数 | 0.1 | x100 |
| Argentina | Argentine Peso | ARS | 2 位小数 | 0.1 | x100 |
| Australia | Australian Dollar | AUD | 2 位小数 | 0.1 | x100 |
| Aruba | Aruban Florin | AWG | 2 位小数 | 0.1 | x100 |
| Azerbaijan | Azerbaijani Manat | AZN | 2 位小数 | 0.1 | x100 |
| Albania | Lek | ALL | 2 位小数 | 0.1 | x100 |
| Bosnia and Herzegovina | Convertible Marks | BAM | 2 位小数 | 0.1 | x100 |
| Barbados | Barbados Dollar | BBD | 2 位小数 | 0.1 | x100 |
| People's Republic of Bangladesh | Taka | BDT | 2 位小数 | 0.1 | x100 |
| Bulgaria | Bulgarian Lev | BGN | 2 位小数 | 0.1 | x100 |
| Bahrain | Bahraini Dinar | BHD | 3 位小数 | 0.1 | x1000，且最后一位必须为 0。 |
| Burundi | Burundi Franc | BIF | 整数 | 1 | x1 |
| Bermuda | Bermudian Dollar | BMD | 2 位小数 | 0.1 | x100 |
| Brunei | Brunei Dollar | BND | 2 位小数 | 0.1 | x100 |
| Bolivia | Boliviano | BOB | 2 位小数 | 0.1 | x100 |
| Brazil | Brazilian Real | BRL | 2 位小数 | 0.1 | x100 |
| Bahamas | Bahamian Dollar | BSD | 2 位小数 | 0.1 | x100 |
| Kingdom of Bhutan | Ngultrum | BTN | 2 位小数 | 0.1 | x100 |
| Botswana | Pula | BWP | 2 位小数 | 0.1 | x100 |
| Belarus | Belarusian Ruble | BYN | 2 位小数 | 0.1 | x100 |
| Belize | Belize Dollar | BZD | 2 位小数 | 0.1 | x100 |
| Canada | Canadian Dollar | CAD | 2 位小数 | 0.1 | x100 |
| Democratic Republic of the Congo | Congolese Franc | CDF | 2 位小数 | 0.1 | x100 |
| Switzerland and Liechtenstein | Swiss Franc | CHF | 2 位小数 | 0.1 | x100 |
| Chile | Unidad de Fomento | CLF | 整数 | 1 | x1 |
| Chile | Chilean Peso | CLP | 2 位小数 | 0.1 | x100 |
| People's Republic of China | Yuan Renminbi | CNY | 2 位小数 | 0.1 | x100 |
| Colombia | Colombian Peso | COP | 2 位小数 | 0.1 | x100 |
| Costa Rica | Costa Rican Colon | CRC | 2 位小数 | 0.1 | x100 |
| Cuba | Cuban Peso | CUP | 2 位小数 | 0.1 | x100 |
| Cape Verde | Cape Verde Escudo | CVE | 2 位小数 | 0.1 | x100 |
| Czech Republic | Czech Koruna | CZK | 2 位小数 | 0.1 | x100 |
| Djibouti | Djibouti Franc | DJF | 整数 | 1 | x1 |
| Denmark | Danish Krone | DKK | 2 位小数 | 0.1 | x100 |
| Dominican Republic | Dominican Peso | DOP | 2 位小数 | 0.1 | x100 |
| Algeria | Algerian Dinar | DZD | 2 位小数 | 0.1 | x100 |
| Estonia | Kroon | EEK | 2 位小数 | 0.1 | x100 |
| Egypt | Egyptian Pound | EGP | 2 位小数 | 0.1 | x100 |
| Eritrea | Nakfa | ERN | 2 位小数 | 0.1 | x100 |
| Ethiopia | Ethiopian Birr | ETB | 2 位小数 | 0.1 | x100 |
| Eurozone | Euro | EUR | 2 位小数 | 0.1 | x100 |
| Fiji | Fiji Dollar | FJD | 2 位小数 | 0.1 | x100 |
| Falkland Islands | Falkland Islands Pound | FKP | 2 位小数 | 0.1 | x100 |
| United Kingdom, Jersey, Guernsey, the Isle of Man, South Georgia and the South Sandwich Islands, the British Antarctic Territory, Tristan da Cunha | Pound Sterling | GBP | 2 位小数 | 0.1 | x100 |
| Georgia | Lari | GEL | 2 位小数 | 0.1 | x100 |
| Ghana | Cedi | GHS | 2 位小数 | 0.1 | x100 |
| Gibraltar | Gibraltar Pound | GIP | 2 位小数 | 0.1 | x100 |
| Gambia | Dalasi | GMD | 2 位小数 | 0.1 | x100 |
| Guinea | Guinea Franc | GNF | 整数 | 1 | x1 |
| Guatemala | Quetzal | GTQ | 2 位小数 | 0.1 | x100 |
| Guyana | Guyana Dollar | GYD | 2 位小数 | 0.1 | x100 |
| Hong Kong | Hong Kong Dollar | HKD | 2 位小数 | 0.1 | x100 |
| Honduras | Lempira | HNL | 2 位小数 | 0.1 | x100 |
| Croatia | Croatian Kuna | HRK | 2 位小数 | 0.1 | x100 |
| Haiti | Gourde | HTG | 2 位小数 | 0.1 | x100 |
| Hungary | Forint | HUF | 2 位小数 | 0.1 | x100 |
| Indonesia | Rupiah | IDR | 2 位小数 | 0.1 | x100 |
| Israel | New Israeli Sheqel | ILS | 2 位小数 | 0.1 | x100 |
| India | Indian Rupee | INR | 2 位小数 | 0.1 | x100 |
| Iraq | Iraqi Dinar | IQD | 3 位小数 | 0.1 | x1000，且最后一位必须为 0。 |
| Iran | Iranian Rial | IRR | 2 位小数 | 0.1 | x100 |
| Jamaica | Jamaican Dollar | JMD | 2 位小数 | 0.1 | x100 |
| Jordan | Jordanian Dinar | JOD | 3 位小数 | 0.1 | x1000，且最后一位必须为 0。 |
| Japan | Yen | JPY | 整数 | 1 | x1 |
| Kenya | Kenyan Shilling | KES | 2 位小数 | 0.1 | x100 |
| Kyrgyz Republic | Som | KGS | 2 位小数 | 0.1 | x100 |
| Cambodia | Riel | KHR | 2 位小数 | 0.1 | x100 |
| Comoros | Comoro Franc | KMF | 整数 | 1 | x1 |
| North Korea | North Korean Won | KPW | 2 位小数 | 0.1 | x100 |
| South Korea | Won | KRW | 整数 | 1 | x1 |
| Kuwait | Kuwaiti Dinar | KWD | 3 位小数 | 0.1 | x1000，且最后一位必须为 0。 |
| Cayman Islands | Cayman Islands Dollar | KYD | 2 位小数 | 0.1 | x100 |
| Kazakhstan | Tenge | KZT | 2 位小数 | 0.1 | x100 |
| Laos | Kip | LAK | 2 位小数 | 0.1 | x100 |
| Lebanon | Lebanese Pound | LBP | 2 位小数 | 0.1 | x100 |
| Sri Lanka | Sri Lanka Rupee | LKR | 2 位小数 | 0.1 | x100 |
| Liberia | Liberian Dollar | LRD | 2 位小数 | 0.1 | x100 |
| Lesotho | Loti | LSL | 2 位小数 | 0.1 | x100 |
| Lithuania | Lithuanian Litas | LTL | 2 位小数 | 0.1 | x100 |
| Latvia | Latvian Lats | LVL | 2 位小数 | 0.1 | x100 |
| Libya | Libyan Dinar | LYD | 3 位小数 | 0.1 | x1000，且最后一位必须为 0。 |
| Morocco | Moroccan Dirham | MAD | 2 位小数 | 0.1 | x100 |
| Moldova | Moldovan Leu | MDL | 2 位小数 | 0.1 | x100 |
| Madagascar | Malagasy Ariary | MGA | 2 位小数 | 0.1 | x100 |
| North Macedonia | Denar | MKD | 2 位小数 | 0.1 | x100 |
| Myanmar | Kyat | MMK | 2 位小数 | 0.1 | x100 |
| Mongolia | Tugrik | MNT | 2 位小数 | 0.1 | x100 |
| Macau | Pataca | MOP | 2 位小数 | 0.1 | x100 |
| Mauritania | Ouguiya | MRU | 2 位小数 | 0.1 | x100 |
| Mauritius | Mauritius Rupee | MUR | 2 位小数 | 0.1 | x100 |
| Maldives | Rufiyaa | MVR | 2 位小数 | 0.1 | x100 |
| Malawi | Kwacha | MWK | 2 位小数 | 0.1 | x100 |
| Mexico | Mexican Peso | MXN | 2 位小数 | 0.1 | x100 |
| Mexico | Mexican Unidad de Inversion | MXV | 2 位小数 | 0.1 | x100 |
| Malaysia | Malaysian Ringgit | MYR | 2 位小数 | 0.1 | x100 |
| Mozambique | Metical | MZN | 2 位小数 | 0.1 | x100 |
| Namibia | Namibia Dollar | NAD | 2 位小数 | 0.1 | x100 |
| Nigeria | Naira | NGN | 2 位小数 | 0.1 | x100 |
| Nicaragua | Cordoba Oro | NIO | 2 位小数 | 0.1 | x100 |
| Norway | Norwegian Krone | NOK | 2 位小数 | 0.1 | x100 |
| Nepal | Nepalese Rupee | NPR | 2 位小数 | 0.1 | x100 |
| New Zealand | New Zealand Dollar | NZD | 2 位小数 | 0.1 | x100 |
| Oman | Rial Omani | OMR | 3 位小数 | 0.1 | x1000，且最后一位必须为 0。 |
| Panama | Balboa | PAB | 2 位小数 | 0.1 | x100 |
| Peru | Nuevo Sol | PEN | 2 位小数 | 0.1 | x100 |
| Papua New Guinea | Kina | PGK | 2 位小数 | 0.1 | x100 |
| Philippines | Philippine Peso | PHP | 2 位小数 | 0.1 | x100 |
| Pakistan | Pakistan Rupee | PKR | 2 位小数 | 0.1 | x100 |
| Poland | Zloty | PLN | 2 位小数 | 0.1 | x100 |
| Paraguay | Guarani | PYG | 整数 | 1 | x1 |
| State of Qatar | Qatari Rial | QAR | 2 位小数 | 0.1 | x100 |
| Romania | New Leu | RON | 2 位小数 | 0.1 | x100 |
| Serbia | New Serbian Dinar | RSD | 2 位小数 | 0.1 | x100 |
| Russia | Russian Ruble | RUB | 2 位小数 | 0.1 | x100 |
| Rwanda | Rwanda Franc | RWF | 整数 | 1 | x1 |
| Saudi Arabia | Saudi Riyal | SAR | 2 位小数 | 0.1 | x100 |
| Solomon Islands | Solomon Islands Dollar | SBD | 2 位小数 | 0.1 | x100 |
| Seychelles | Seychelles Rupee | SCR | 2 位小数 | 0.1 | x100 |
| Republic of the Sudan | New Sudanese Pound | SDG | 2 位小数 | 0.1 | x100 |
| Republic of South Sudan | South Sudanese pound | SSP | 2 位小数 | 0.1 | x100 |
| Sweden | Swedish Krona | SEK | 2 位小数 | 0.1 | x100 |
| Singapore | Singapore Dollar | SGD | 2 位小数 | 0.1 | x100 |
| Saint Helena and Ascension | Saint Helena Pound | SHP | 2 位小数 | 0.1 | x100 |
| Sierra Leone | Leone | SLL | 2 位小数 | 0.1 | x100 |
| Suriname | Surinamese Dollar | SRD | 2 位小数 | 0.1 | x100 |
| São Tomé and Príncipe | Dobra | STN | 2 位小数 | 0.1 | x100 |
| El Salvador | El Salvador Colon | SVC | 2 位小数 | 0.1 | x100 |
| Syria | Syrian Pound | SYP | 2 位小数 | 0.1 | x100 |
| Eswatini | Lilangeni | SZL | 2 位小数 | 0.1 | x100 |
| Thailand | Baht | THB | 2 位小数 | 0.1 | x100 |
| Tajikistan | Somoni | TJS | 2 位小数 | 0.1 | x100 |
| Turkmenistan | Manat | TMT | 2 位小数 | 0.1 | x100 |
| Tunisia | Tunisian Dinar | TND | 3 位小数 | 0.1 | x1000，且最后一位必须为 0。 |
| Tonga | Paanga | TOP | 2 位小数 | 0.1 | x100 |
| Turkey | Turkish Lira | TRY | 2 位小数 | 0.1 | x100 |
| Trinidad and Tobago | Trinidad and Tobago Dollar | TTD | 2 位小数 | 0.1 | x100 |
| Taiwan, China | New Taiwan Dollar | TWD | 2 位小数 | 0.1 | x100 |
| Tanzania | Tanzanian Shilling | TZS | 2 位小数 | 0.1 | x100 |
| Ukraine | Hryvnia | UAH | 2 位小数 | 0.1 | x100 |
| Uganda | Uganda Shilling | UGX | 整数 | 1 | x1 |
| United States | US Dollar | USD | 2 位小数 | 0.1 | x100 |
| Uruguay | Peso Uruguayo | UYU | 2 位小数 | 0.1 | x100 |
| Uzbekistan | Uzbekistan Sum | UZS | 2 位小数 | 0.1 | x100 |
| Bolivar | Bolivar Fuerte | VES | 2 位小数 | 0.1 | x100 |
| Vietnam | Dong | VND | 整数 | 1 | x1 |
| Vanuatu | Vatu | VUV | 整数 | 1 | x1 |
| Samoa | Tala | WST | 2 位小数 | 0.1 | x100 |
| Cameroon, Central African Republic, Chad, Republic of the Congo, Equatorial Guinea, Gabon | CFA Franc BEAC | XAF | 整数 | 1 | x1 |
| East Caribbean | East Caribbean Dollar | XCD | 2 位小数 | 0.1 | x100 |
| Benin, Burkina Faso, Guinea-Bissau, Ivory Coast, Mali, Niger, Senegal, Togo | CFA Franc BCEAO | XOF | 整数 | 1 | x1 |
| French Polynesia, New Caledonia, Wallis and Futuna | CFP Franc | XPF | 整数 | 1 | x1 |
| Yemen | Yemeni Rial | YER | 2 位小数 | 0.1 | x100 |
| South Africa | Rand | ZAR | 2 位小数 | 0.1 | x100 |
| Zambia | Zambian Kwacha | ZMW | 2 位小数 | 0.1 | x100 |
| Zimbabwe | Zimbabwe Dollar | ZWL | 2 位小数 | 0.1 | x100 |