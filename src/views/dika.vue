<template>
  <!--
     @2019.2.15
     @wei
            by -changsha
  -->
  <div class="about">
    <h1 @click="getMessage()">笛卡尔积Demo</h1>
    <el-button type="success" @click="processing()">一键生成</el-button>
    <el-button type="success" @click="setType()">添加商品规格</el-button>
    <div style="margin-top:20px;" v-for="(item,index) in shopType" :key="index">
      <el-form v-model="shopType[index]" :inline="true">
        <el-form-item label="规格名字">
          <el-input v-model="shopType[index].name" placeholder="请输入规格名字"></el-input>
        </el-form-item>

        <el-form-item label="输入规格属性">
          <el-input v-model="shopType[index].input" placeholder="请输入规格属性"></el-input>
        </el-form-item>
        <el-button type="success" @click="create(index)">请输入规格名称</el-button>
        <br>

        <el-form-item label="材料名字">
          <span
            v-for="(item,inde) in shopType[index].typeNames"
            :key="inde"
          >{{shopType[index].typeNames[inde].type}}</span>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <!-- 我记得有个scope属性的 -->
      <el-table
        :data="tableData7"
        :span-method="objectSpanMethod1"
        border
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column prop="color" :label="retName(index)" width="180"></el-table-column>
        <el-table-column prop="cailiao" :label="retName(index)"></el-table-column>
        <el-table-column prop="chima" :label="retName(3)"></el-table-column>
        <el-table-column prop="kucun" label="库存"></el-table-column>
        <el-table-column prop="moany" label="金钱"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import descartes from "../utli/dikaerji";
export default {
  data() {
    return {
      index: "",
      shopType: [
        {
          name: "颜色",
          typeNames: [
            { type: "红色", img: "" },
            { type: "白色", img: "" },
            { type: "蓝色", img: "" },
            { type: "粉色", img: "" }
          ]
        },
        {
          name: "材料",
          typeNames: [
            { type: "棉花", img: "" },
            { type: "纱布", img: "" },
            { type: "蚕丝", img: "" },
            { type: "麻布", img: "" }
          ]
        },
        {
          name: "尺码",
          typeNames: [
            { type: "L", img: "" },
            { type: "XL", img: "" },
            { type: "XXL", img: "" },
            { type: "XXX", img: "" }
          ]
        }
      ],

      form: {
        name: "",
        color: "",
        size: "",
        materials: "",
        weight: ""
      },
      newList: [],
      newData: [],
      tableData7: [],
      spanArr: [],
      pos: "",
      spanArr1: [],
      pos1: ""
    };
  },
  components:{
    'hello':{
        render:function(createElement){
         
          return createElement(
            'h'+this.level,
            this.$se
          )
          
        }
    }
  },
  created() {
    this.getList();
    console.log(this)
    this.$MyMessage()
  },
  methods: {
    descartes,
    //添加规格页
    getMessage(){
      this.$MyMessage()
    },
    setType() {
      this.shopType.push();
    },
     
    //返回所属规格名字
    retName(index) {
      if (index == 1) {
        if (this.shopType.length > 1) {
          return this.shopType[0].name;
        }
      } else if (index == 2) {
        if (this.shopType.length > 1) {
          return this.shopType[1].name;
        }
      } else if (index == 3) {
        if (this.shopType.length > 1) {
          return this.shopType[2].name;
        }
      } else {
        return "";
      }
    },
    //添加小的规格
    create(index) {
      console.log(index);
      if (this.shopType[index].input) {
        this.shopType[index].typeNames.push({
          type: this.shopType[index].input,
          img: ""
        });
      }

      // for (let index = 0; index < this.shopType.length; index++) {
      //     console.log(this.shopType)
      // }
    },
    //处理数据
    processing() {
      this.newData = [];
      for (let i = 0; i < this.shopType.length; i++) {
        var newlist = [];
        for (
          let index = 0;
          index < this.shopType[i].typeNames.length;
          index++
        ) {
          newlist.push(this.shopType[i].typeNames[index].type);
        }
        this.newData.push(newlist);
      }
      console.log(this.newData);
      this.getList();
    },
    //转换数据
    getList() {
      this.tableData7 = [];
      this.newList = this.descartes(this.newData);
      for (let index = 0; index < this.newList.length; index++) {
        this.tableData7.push({
          color: this.newList[index][0],
          cailiao: this.newList[index][1],
          chima: this.newList[index][2],
          kucun: "",
          moany: ""
        });
      }

      this.getSpanArr(this.tableData7);
      console.log(this.tableData7);
    },
    //计算位置的方法
    getSpanArr(data) {
      this.spanArr = [];
      this.pos = "";
      this.spanArr1 = [];
      this.pos1 = "";
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].color === data[i - 1].color) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }

      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr1.push(1);
          this.pos1 = 0;
        } else {
          //如果笛卡尔积一直递增下去的话 这是一个很蠢的方法 由于我的要求层数是已知的 这里偷懒了 不然应该用for循环
          if (data[i].cailiao === data[i - 1].cailiao) {
            this.spanArr1[this.pos1] += 1;
            this.spanArr1.push(0);
          } else {
            this.spanArr1.push(1);
            this.pos1 = i;
          }
        }
      }
      console.log(this.spanArr);
    },

    // 合并行数
    objectSpanMethod1({ row, column, rowIndex, columnIndex }) {
      // columnIndex === 0 找到第一列，实现合并随机出现的行数
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
        // columnIndex === 1 找到第二列，合并他的列数
      } else if (columnIndex === 1) {
        const _row = this.spanArr1[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    }
  }
};
</script>
