//凯撒密码;
function Caesar(plaintext, k) {
  return plaintext
    .toLowerCase()
    .split("")
    .map((item) => {
      k = k % 26;
      k = k < 0 ? 26 + k : k;
      return String.fromCharCode(((item.charCodeAt() - 97 + k) % 26) + 97);
    })
    .join("");
}

let plaintext = "Computer";

let ciphertext = Caesar(plaintext, 13);

var str = "monarchyhelloworldcb";

function genKeyMatrix(str) {
  str = str.toUpperCase();
  let letterObj = {};
  for (let i = 0; i < 26; i++) {
    let key = String.fromCharCode(i + 65);
    if (key == "I") {
      // key = "I/J";
      i++;
    }
    letterObj[key] = false;
  }
  let matrix = [[], [], [], [], []];
  var j = 0; //记录完成时的行
  var k = 0; //记录完成时的列
  for (let i = 0; i < str.length; i++) {
    if (!letterObj[str[i]]) {
      letterObj[str[i]] = true;
      matrix[parseInt(k / 5)][k % 5] = str[i];
      k++;
      j = parseInt(k / 5);
    }
    continue;
  }

  k = k % 5;
  for (let key in letterObj) {
    if (!letterObj[key]) {
      if (k >= 5) {
        j++;
        if (j >= 5) {
          break;
        }
        k = k % 5;
      }
      matrix[j][k] = key;
      k++;
    }
  }
  return matrix;
}

function getPosition(matrix, arr) {
  var tempArr = [].concat(arr);
  tempArr.forEach((item, index, tempArr) => {
    var j, k;
    for (let i = 0; i < matrix.length; i++) {
      let str = matrix[i].join("");

      if (str.indexOf(item[0]) !== -1) {
        j = "" + i + str.indexOf(item[0]);
      }
      if (str.indexOf(item[1]) !== -1) {
        k = "" + i + str.indexOf(item[1]);
      }
    }
    tempArr[index] = "" + j + k;
  });
  return tempArr;
}

function playfair(key, cText) {
  let matrix = genKeyMatrix(key);
  cText = cText.toUpperCase().replace(/\s/g, "");
  let cTextArr = [];
  for (var i = 0; i < cText.length; i++) {
    if (cText[i] !== cText[i + 1] && cText[i + 1]) {
      cTextArr.push(cText[i] + cText[i + 1]);
      i = i + 1;
    } else {
      cTextArr.push(cText[i] + "K");
    }
  }
  cTextArr = cTextArr
    .join(",")
    .replace(/J/gi, "I")
    .split(",");
  cTextArr = getPosition(matrix, cTextArr);
  cTextArr.forEach((item, index, cTextArr) => {
    let row1 = +item[0];
    let col1 = +item[1];
    let row2 = +item[2];
    let col2 = +item[3];
    if (row1 == row2) {
      cTextArr[index] =
        matrix[row1][(col1 + 1) % 5] + matrix[row2][(col2 + 1) % 5];
    } else if (col1 == col2) {
      cTextArr[index] =
        matrix[(row1 + 1) % 5][col1] + matrix[(row2 + 1) % 5][col2];
    } else {
      cTextArr[index] = matrix[row1][col2] + matrix[row2][col1];
    }
  });
  return cTextArr.join(" ");
}

function playfairE(key, pText) {
  pText = pText.toUpperCase().replace(/\s/gi, "");
  pText = pText.replace(/(.{2})/g, "$1 ");
  let pTextArr = pText.split(" ");
  pTextArr.pop("");
  let matrix = genKeyMatrix(key);
  pTextArr = getPosition(matrix, pTextArr);
  pTextArr.forEach((item, index, pTextArr) => {
    let row1 = +item[0];
    let col1 = +item[1];
    let row2 = +item[2];
    let col2 = +item[3];
    if (row1 == row2) {
      col1 = col1 - 1 < 0 ? 4 : col1 - 1;
      col2 = col2 - 1 < 0 ? 4 : col2 - 1;
      pTextArr[index] = matrix[row1][col1] + matrix[row2][col2];
    } else if (col1 == col2) {
      row1 = row1 - 1 < 0 ? 4 : row1 - 1;
      row2 = row2 - 1 < 0 ? 4 : row2 - 1;
      pTextArr[index] = matrix[row1][col1] + matrix[row2][col2];
    } else {
      pTextArr[index] = matrix[row1][col2] + matrix[row2][col1];
    }
  });
  // console.log(pTextArr);
  return pTextArr.join(" ");
}

// console.log("凯撒密码");
// var Ckey = 3;
// console.log("k值:", Ckey);
// var ceaCtext = "hello";
// console.log("明文:", ceaCtext);
// var ceaPtext = Caesar(ceaCtext, Ckey);
// console.log("密文:", ceaPtext);
// var ceaCtext = Caesar(ceaPtext, -Ckey);
// console.log("解密后的明文:", ceaCtext);
// console.log("==========================");
// console.log("playfair");
// var ctext = "i am the bone of my sword";
// console.log("明文:", ctext);
// var key = "hello";
// console.log("关键字:", key);
// var mar = genKeyMatrix(key);
// console.log("关键字矩阵:", mar);
// var ptext = playfair(key, ctext);
// console.log(key);
// console.log("密文:", ptext);
// ctext = playfairE(key, ptext);
// console.log("解密后的明文:", ctext);

var str = "pay more monery ";
var matrix = [
  [17, 17, 5],
  [21, 18, 21],
  [2, 2, 19],
];

function hill(ctext, matrix) {
  ctext = ctext.toLowerCase().replace(/\s/g, "");
  if (ctext.length % 3 == 2) {
    ctext += "x";
  } else if (ctext.length % 3 == 1) {
    ctext += "xx";
  }
  let ctextArr = ctext.split("");
  console.log(ctextArr);
  let i = 0;
  let temp = "";
  let newArr = [];
  ctextArr.forEach((item) => {
    temp += item;
    i++;
    if (i == 3) {
      newArr.push(temp);
      temp = "";
      i = 0;
    }
  });
  ctextArr = newArr;
  console.log(ctextArr);
  let result = [];
  ctextArr.forEach((ctext) => {
    for (let i = 0; i < ctext.length; i++) {
      let ctextNum1 = ctext[0].charCodeAt() - 97;
      let ctextNum2 = ctext[1].charCodeAt() - 97;
      let ctextNum3 = ctext[2].charCodeAt() - 97;

      let res =
        (ctextNum1 * matrix[i][0] +
          ctextNum2 * matrix[i][1] +
          ctextNum3 * matrix[i][2]) %
        26;
      result.push(res);
    }
  });
  result.forEach((item, index) => {
    result[index] = String.fromCharCode(item + 97);
  });
  console.log(result);
  return result.join("");
}

// var ptext = hill(str, matrix);
// console.log(ptext);

function exGcd(m, n) {
  let arr = [{ remain: n, d: 0, result: 0 }];

  while (1) {
    let result = parseInt(n / m);
    let remain = n % m;
    let obj = { remain: m, d: 0, result };
    arr.push(obj);
    n = m;
    m = remain;
    if (remain == 0) break;
  }
  arr[1]["d"] = 1;
  for (let i = 2; i < arr.length; i++) {
    arr[i]["d"] = arr[i - 2]["d"] - arr[i - 1]["d"] * arr[i - 1]["result"];
  }
  return arr[arr.length - 1]["d"];
}

function RSA(ctext, p, q, e) {
  var n = p * q;
  console.log("Public Key：");
  console.log("e= " + e + "");
  console.log("n= " + n + "");
  console.log("明文=" + ctext + "");
  var ptext = Math.pow(ctext, e) % n;
  console.log("加密后的内容:" + ptext + "");
  var d = exGcd(e, (p - 1) * (q - 1));
  console.log("Private Key：");
  console.log("p= " + p + "");
  console.log("q= " + q + "");
  console.log("d= " + d + "");
  return { ptext, d };
}

function RSA_E(ptext, n, d) {
  return Math.pow(ptext, d) % n;
}

let result = RSA(20, 5, 13, 7);
let ctext = RSA_E(result.ptext, 5 * 13, result.d);
console.log(result);
console.log(ctext);
