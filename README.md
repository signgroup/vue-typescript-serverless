//    "vue-pdf": "^4.0.8",


#### 数据类型
+ 基本数据类型(值类型)
   * Number(ES5): typeof()返回"number"。用于任何类型的数字：整数或者浮点数。
   * String(ES5): typeof()返回"string"。用于字符串。一个字符串可以包含一个或多个字符，所以没有单独的单字符类型。
   * Boolean(ES5): typeof()返回"boolean"。用于 true 和 false。
   * Null(ES5): typeof()返回"object"。用于未知的值 —— 只有一个 null 值的独立类型。
   * Undefined(ES5): typeof()返回"undefined"。用于未定义的值 —— 只有一个 undefined 值的独立类型。
   * Symbol(ES6): typeof()返回"symbol"。用于唯一的标识符。
+ 引用数据类型（Object）
    + Object(ES5): typeof()返回"object"。用于更复杂的数据结构。
    + *Function(ES5): typeof()返回"function"，属于object。
    + Array
    + RegExp
    + Date
+ 判断
    * typeof
        + undefined
        + number
        + string
        + boolean
    * instanceof
        + 判断object的具体类型
    * ===
        + undefined
        + null
