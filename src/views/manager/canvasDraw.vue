<template>
    <div class="canvas-draw">
        <canvas id="canvas"></canvas>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, getCurrentInstance } from "vue";
interface mouse {
    x: number;
    y: number;
}
let ctx = null;
let activeMouse = { x: 0, y: 0 } as mouse;
onMounted(() => {
    setTimeout(() => {
        initCanvasDraw();
    }, 3000);
});
const initCanvasDraw = () => {
    const canvasEl = document.querySelector('#canvas') as HTMLCanvasElement;
    canvasEl.width = 1667;
    canvasEl.height = 830;
    ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#F44336'
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    canvasEl.addEventListener('mousedown', mouseStart)
    canvasEl.addEventListener('mousemove', mouseMove)
    canvasEl.addEventListener('mouseup', mouseEnd)
}

const mouseStart = (e) => {
    e.preventDefault()
    activeMouse = { x: e.clientX, y: e.clientY }
}

const mouseMove = (e) => {
    e.preventDefault()
    if (!activeMouse.x || !activeMouse.y) return
    ctx.beginPath()
    ctx.moveTo(activeMouse.x - 218, activeMouse.y - 88)
    ctx.lineTo(e.clientX - 218, e.clientY - 88)
    console.log(e.clientX - 218, e.clientY - 88);
    
    ctx.stroke()
    activeMouse = { x: e.clientX, y: e.clientY }
}

const mouseEnd = (e) => {
    e.preventDefault()
    activeMouse = { x: 0, y: 0 }
}
</script>
<style lang="scss" scoped>
.canvas-draw {
    height: 100%;

    #canvas {
        display: block;
        width: 100%;
        height: 100%;
    }
}
</style>
