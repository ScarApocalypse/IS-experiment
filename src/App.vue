<template>
  <div id="app">
    <h1>playfair</h1>
    <el-input
      v-model="key"
      placeholder="请输入关键字"
      style="max-width:600px"
      @input="handleKeyChange"
    >
      <template slot="prepend">关键字</template>
    </el-input>
    <br />
    <el-input
      v-model="ctext"
      placeholder="请输入明文"
      style="max-width:600px"
      @input="handleCtextChange"
    >
      <template slot="prepend">明文</template>
    </el-input>
    <br />
    <el-input
      v-model="ptext"
      placeholder="请输入密文"
      style="max-width:600px"
      @input="handlePtextChange"
    >
      <template slot="prepend">密文</template>
    </el-input>
    <h3>关键字矩阵</h3>
    <div class="container">
      <el-table
        :data="martix"
        stripe
        size="mini"
        :show-header="false"
        :fit="false"
        align="center"
      >
        <el-table-column prop="0" label="0" align="center" width="40px">
        </el-table-column>
        <el-table-column prop="1" label="1" align="center" width="40px">
        </el-table-column>
        <el-table-column prop="2" label="2" align="center" width="40px">
        </el-table-column>
        <el-table-column prop="3" label="3" align="center" width="40px">
        </el-table-column>
        <el-table-column prop="4" label="4" align="center" width="40px">
        </el-table-column>
      </el-table>
    </div>
    <h2>凯撒密码</h2>
    <el-input
      v-model="Ckey"
      placeholder="请输入关键字"
      style="max-width:600px"
      @input="handleCKeyChange"
    >
      <template slot="prepend">k值</template>
    </el-input>
    <br />
    <el-input
      v-model="Cctext"
      placeholder="请输入明文"
      style="max-width:600px"
      @input="handleCCtextChange"
    >
      <template slot="prepend">明文</template>
    </el-input>
    <br />
    <el-input
      v-model="Cptext"
      placeholder="请输入密文"
      style="max-width:600px"
      @input="handleCPtextChange"
    >
      <template slot="prepend">密文</template>
    </el-input>
    <h2>Hill密码</h2>
    <div class="container">
      <el-table
        :data="hillMar"
        stripe
        size="mini"
        :show-header="false"
        :fit="false"
        align="center"
      >
        <el-table-column prop="0" label="0" align="center" width="40px">
        </el-table-column>
        <el-table-column prop="1" label="1" align="center" width="40px">
        </el-table-column>
        <el-table-column prop="2" label="2" align="center" width="40px">
        </el-table-column>
      </el-table>
      <el-input
        v-model="hillCtext"
        placeholder="请输入明文"
        style="max-width:600px"
        @input="handleHillCtextChange"
      >
        <template slot="prepend">明文</template>
      </el-input>
      <br />
      <el-input v-model="hillPtext" placeholder="密文" style="max-width:600px">
        <template slot="prepend">密文</template>
      </el-input>
    </div>

    <h2>RSA算法</h2>
    <div class="container">
      <el-input
        v-model="p"
        placeholder="请输入p值"
        style="max-width:600px"
        @input="handleCKeyChange"
      >
        <template slot="prepend">p</template>
      </el-input>
      <br />
      <el-input v-model="q" placeholder="请输入q" style="max-width:600px">
        <template slot="prepend">q</template>
      </el-input>
      <br />
      <el-input v-model="e" placeholder="请输入e" style="max-width:600px">
        <template slot="prepend">e</template>
      </el-input>
      <br />
      <el-input v-model="n" placeholder="请输入n" style="max-width:600px">
        <template slot="prepend">n</template>
      </el-input>
      <br />
      <el-input v-model="d" placeholder="请输入d" style="max-width:600px">
        <template slot="prepend">d</template> </el-input
      ><br />
      <el-input
        v-model="RSActext"
        placeholder="请输入明文"
        style="max-width:600px"
        @input="handleRSActextInput"
      >
        <template slot="prepend">明文</template> </el-input
      ><br />
      <el-input
        v-model="RSAptext"
        placeholder="请输入密文"
        style="max-width:600px"
        @input="handleRSAptextInput"
      >
        <template slot="prepend">密文</template>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      key: "monarchy",
      ctext: "",
      ptext: "",
      martix: [],
      Ckey: 3,
      Cctext: "",
      Cptext: "",
      hillMar: [
        [17, 17, 5],
        [21, 18, 21],
        [2, 2, 19],
      ],
      hillCtext: "pay more money",
      hillPtext: "",
      p: 5,
      q: 13,
      e: 7,
      n: 0,
      d: 0,
      RSActext: 20,
      RSAptext: 0,
    };
  },
  computed: {},
  created() {
    this.genM();
    this.hillPtext = this.hill(this.hillCtext, this.hillMar);
    this.n = this.p * this.q;
    this.handleRSActextInput();
  },
  mounted() {},
  watch: {},
  methods: {
    genM() {
      let martix = this.genKeyMatrix(this.key);
      console.log(this.ctext);
      if (this.ctext !== "") {
        this.ptext = this.playfair(this.key, this.ctext);
      }
      for (let i = 1; i < 5; i++) {
        martix[i].forEach((item, index, arr) => {
          if (arr[index] == "I") {
            arr[index] = "I/J";
          }
        });
      }
      console.log(martix);
      this.martix = martix;
    },

    //生成关键字矩阵
    genKeyMatrix(str) {
      str = str.toUpperCase().replace(/\s/gi, "");
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
    },
    //生成位置
    getPosition(matrix, arr) {
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
    },
    playfair(key, cText) {
      let matrix = this.genKeyMatrix(key);
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
      console.log(cTextArr);
      cTextArr = this.getPosition(matrix, cTextArr);
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
    },
    playfairE(key, pText) {
      console.log(key);
      console.log(pText);
      pText = pText.toUpperCase().replace(/\s/gi, "");
      pText = pText.replace(/(.{2})/g, "$1 ");
      let pTextArr = pText.split(" ");
      pTextArr.pop("");
      let matrix = this.genKeyMatrix(key);
      console.log(matrix);
      pTextArr = this.getPosition(matrix, pTextArr);
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
    },
    Caesar(plaintext, k) {
      return plaintext
        .toLowerCase()
        .split("")
        .map((item) => {
          k = k % 26;
          k = k < 0 ? 26 + k : k;
          return String.fromCharCode(((item.charCodeAt() - 97 + k) % 26) + 97);
        })
        .join("");
    },
    hill(ctext, matrix) {
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
    },

    exGcd(m, n) {
      let arr = [{ remain: n, d: 0, result: 0 }];
      let flag = true;
      while (flag) {
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
    },
    RSA(ctext, p, q, e) {
      var n = p * q;
      console.log("Public Key：");
      console.log("e= " + e + "");
      console.log("n= " + n + "");
      console.log("明文=" + ctext + "");
      var ptext = Math.pow(ctext, e) % n;
      console.log("加密后的内容:" + ptext + "");
      var d = this.exGcd(e, (p - 1) * (q - 1));
      console.log("Private Key：");
      console.log("p= " + p + "");
      console.log("q= " + q + "");
      console.log("d= " + d + "");
      return { ptext, d };
    },

    RSA_E(ptext, n, d) {
      return Math.pow(ptext, d) % n;
    },
    handleKeyChange() {
      this.genM();
    },
    handleCtextChange() {
      if (this.ctext == "") {
        this.ptext = "";
      }
      this.ptext = this.playfair(this.key, this.ctext);
    },
    handlePtextChange() {
      if (this.ptext == "") {
        this.ctext = "";
      }
      this.ctext = this.playfairE(this.key, this.ptext);
    },
    handleCCtextChange() {
      this.Cptext = this.Caesar(this.Cctext, this.Ckey);
    },
    handleCPtextChange() {
      this.Cctext = this.Caesar(this.Cptext, -this.Ckey);
    },
    handleCKeyChange() {
      this.Cptext = this.Caesar(this.Cctext, this.Ckey);
    },
    handleHillCtextChange() {
      this.hillPtext = this.hill(this.hillCtext, this.hillMar);
    },
    handleRSActextInput() {
      const result = this.RSA(this.RSActext, this.p, this.q, this.e);
      this.d = result.d;
      this.RSAptext = result.ptext;
    },
    handleRSAptextInput() {
      this.RSActext = this.RSA_E(this.RSAptext, this.n, this.d);
    },
  },
  components: {},
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  text-align: center;
}
.el-input {
  margin-bottom: 20px;
}
</style>
