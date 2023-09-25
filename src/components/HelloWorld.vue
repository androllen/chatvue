<template>
  <div>
    <div style="width:100%; height:300px;" ref="myEcharts"></div>
    <el-button @click="sendMessage">Send</el-button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      message: "",
      receivedData: "",
      option: {},
      dataDiagramData: [5, 20, 36, 10, 10, 20],
      chartBar: {},
    };
  },
  mounted() {
    this.connectWebSocket();
    this.initChartsDiagram();
  },
  created() {
    this.option = {};
  },
  methods: {
    connectWebSocket() {
      const webSocketURL = "ws://localhost:8000/ws/chat";
      const webSocket = new WebSocket(webSocketURL);
      webSocket.onmessage = this.handleSocketMessage;
    },
    handleSocketMessage(event) {
      const data = JSON.parse(event.data);
      this.dataDiagramData = data.message;
      this.initChartsDiagram();
    },
    sendMessage() {
      // const webSocket = this.getWebSocket();
      // const data = JSON.stringify({ message: this.message });
      // webSocket.send(data);
      axios
        .get("http://127.0.0.1:8000/api/get/")
        .then(function (response) {
          // 处理返回的数据
          this.$message("这是一条消息提示");
          if (response.message === "ws send ok") {
          }
        })
        .catch(function (error) {
          // 处理错误
          console.log(error);
        });
    },
    initChartsDiagram() {
      this.chartBar = this.$echarts.init(this.$refs.myEcharts);

      this.option = {
        title: {
          text: "Echarts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: this.dataDiagramData,
            smooth: true,
          },
        ],
      };
      this.chartBar.setOption(this.option);
    },
    getWebSocket() {
      const webSocketURL = "ws://localhost:8000/ws/";
      return new WebSocket(webSocketURL);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 300px;
  height: 300px;
  margin-left: 30px;
}
#echart {
  width: 100%;
  height: 100%;
}
</style>
