<template>
    <div class="leaflet-map-wrapper">
        <div id="leafletMap"></div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
let map = ref(null);
onMounted(() => {
    initMap();
});
const initMap = () => {
    map.value = new L.map('leafletMap', {
        crs: L.CRS.Simple,
        preferCanvas: false,
        dragging: true,
        zoomControl: false,
        doubleClickZoom: false,
        inertia: true,
        maxBoundsViscosity: 1,
        maxBounds: [[0, 0], [939, 1920]],
        zoomSnap: 0.1,
        zoom: 1,
        minZoom: 0,
        maxZoom: 3
    });
    var bounds = [[0, 0], [939, 1920]];
    var image = L.imageOverlay('images/map.svg', bounds).addTo(map.value);
    map.value.fitBounds(bounds);
}
</script>
<style lang="scss" scoped>
.leaflet-map-wrapper {
    height: 100%;

    #leafletMap {
        height: 100%;
    }
}
</style>
