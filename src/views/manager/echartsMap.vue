<template>
  <div class="echarts-map-wrapper">
    <div class="map-dom" ref="map"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref,getCurrentInstance  } from "vue";
import { mapList } from "@/mock/mapList";
import { getJsonData } from '@/utils/getAssets';
const mapEcharts = ref(null);
const map = ref(null);
const preProvinceName = ref("");
let mapName = ref("china");
const Echarts = (getCurrentInstance().proxy as any).$echarts; 
onMounted(() => {
  initMap();
});
const initMap = async () => {
  if (!mapEcharts.value) {
    mapEcharts.value = Echarts.init(map.value);
  }
  let jsonName = `${mapName.value}.json`;
  let res = await getJsonData(jsonName);
  Echarts.registerMap(mapName.value, JSON.stringify(res));
  var option = {
    tooltip: {
      show: true,
    },
    series: [
      {
        name: "MAP",
        type: "map",
        map: mapName.value,
        selectedMode: "false",
        label: {
          show: true,
          color: "#fff",
        },
        itemStyle: {
          borderColor: "#315283",
          borderWidth: 1,
          areaColor: "#426394",
        },
        emphasis: {
          itemStyle: {
            areaColor: "#5080F3",
            borderWidth: 1,
            color: "#fff",
          },
        },
        data: [],
      },
    ],
  };
  mapEcharts.value.setOption(option);
  mapEcharts.value.on("click", (params) => {
    if (preProvinceName.value == params.name) {
      return;
    } else {
      preProvinceName.value = params.name;
      mapClick(params);
    }
  });
};
const mapClick = (params) => {
  let proName = params.name;
  let pinyinName = mapList[proName];
  mapName.value = pinyinName ? pinyinName : "china";
  initMap();
};
</script>
<style lang="scss" scoped>
.echarts-map-wrapper {
  height: 100%;
  .map-dom {
    height: 100%;
  }
}
</style>
