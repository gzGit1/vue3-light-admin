L.AnimatedMarker = L.Marker.extend({
    options: {
        speedList: [],
        // meters（米）
        distance: 100,
        // ms（毫秒）
        interval: 100,
        // animate on add?
        autoStart: false,
        isPlay: false,
        playCall: null
    },

    initialize: function(latlngs, options) {
        this.isZooming = false;
        L.Marker.prototype.initialize.call(this, latlngs[0], options);
        this.setLine(latlngs);
        this.resetIcon(options.icon.options)
    },

    resetIcon: function(options) {
        const v = this
        var Icon = L.DivIcon.extend({
            createIcon: function() {
                // outerDiv.style.transform is updated by Leaflet
                var outerDiv = document.createElement('div');
                outerDiv.style.width = options.iconSize[0] + "px"
                outerDiv.style.height = options.iconSize[1] + "px"
                v.div = document.createElement('div');
                v.div.style.width = options.iconSize[0] + "px"
                v.div.style.height = options.iconSize[1] + "px"
                v.div.style.transition = 'transform linear 100ms'
                v.div.style.transformOrigin = 'center'
                v.div.style.transform = 'translate3d(-' + options.iconAnchor[0] + 'px, -' + options.iconAnchor[0] + 'px, 0) rotate(-' + v._latlngs[0].bearing + 'deg)';
                const img = document.createElement('img');
                img.src = options.iconUrl;
                img.width = options.iconSize[0];
                img.height = options.iconSize[1];
                v.div.appendChild(img);
                outerDiv.appendChild(v.div);
                return outerDiv;
            },
            rotate(deg) {
                if ((v.before && (Math.abs(v.before - deg) >= 180))) {
                    v.div.style.transition = 'none'
                } else {
                    v.div.style.transition = 'transform linear 100ms'
                }
                v.div.style.transform = 'translate3d(-19px, -13px, 0) rotate(-' + deg + 'deg)';
                v.before = deg
            },
            iconSize: options.iconSize,
        })
        this.icon = new Icon()
        this.setIcon(this.icon)
    },

    // Breaks the line up into tiny chunks (see options) ONLY if CSS3 animations
    // are not supported.
    _chunk: function(latlngs) {
        var i,
            len = latlngs.length,
            chunkedLatLngs = [];

        for (i = 1; i < len; i++) {
            var cur = latlngs[i - 1],
                next = latlngs[i],
                dist = cur.distanceTo(next),
                factor = this.options.distance / dist,
                dLat = factor * (next.lat - cur.lat),
                dLng = factor * (next.lng - cur.lng);

            if (dist > this.options.distance) {
                chunkedLatLngs.push(cur);
                while (dist > this.options.distance) {
                    var bearing = cur.bearing
                    var duration = cur.duration
                    cur = new L.LatLng(cur.lat + dLat, cur.lng + dLng);
                    cur.bearing = bearing
                    cur.duration = duration
                    dist = cur.distanceTo(next);
                    chunkedLatLngs.push(cur);
                }
            } else {
                chunkedLatLngs.push(cur);
            }
        }
        chunkedLatLngs.push(latlngs[len - 1]);

        return chunkedLatLngs;
    },

    onAdd: function(map) {
        L.Marker.prototype.onAdd.call(this, map);
        this.animate()
        this.map = map;
        const _this = this
        map.addEventListener('zoomstart', function() {
            _this.isZooming = true;
        });
        map.addEventListener('zoomend', function() {
            _this.isZooming = false;
        });

        // Start animating when added to the map
        if (this.options.autoStart) {
            this.start();
        }
    },

    animate: function() {
        var now = Date.now();
        // console.log(this.duration)
        var end = this.startedAt + this.duration;
        if (now < end) {
            if (this.isPlay) {
                requestAnimationFrame(this.animate.bind(this));
            }
        } else if (this._i < (this._latlngs.length - 1)) {
            this.startedAt = Date.now();
            this.startLatLng = this._latlngs[this._i]
            this.nextLatLng = this._latlngs[this._i + 1]
            this.duration = this.startLatLng.duration
            this.setLatLng(this._latlngs[this._i]);
            this.icon.rotate(this.startLatLng.bearing);
            this._i++;
            if (this.isPlay) {
                requestAnimationFrame(this.animate.bind(this));
            }
        }

        // 解决地图缩放是图标会偏移轨迹线问题
        // 源码改造
        // this.nextLatLng.lat - this.startLatLng.lat 两个点之间的间距
        // this.startLatLng.duration * t 一个时间间隔内分割
        if (!this.isZooming && this.map) {
            var t = now - this.startedAt;
            console.log(this.startLatLng.duration);
            var lat = this.startLatLng.lat + ((this.nextLatLng.lat - this.startLatLng.lat) / this.startLatLng.duration * t);
            var lng = this.startLatLng.lng + ((this.nextLatLng.lng - this.startLatLng.lng) / this.startLatLng.duration * t);
            this.setLatLng({
                lat: lat,
                lng: lng
            });
            // 用于动态轨迹线展示
            if (this.options.playCall) {
                this.options.playCall({
                    lat: lat,
                    lng: lng
                })
            }
        }
    },
    // Start the animation
    start: function() {
        this.isPlay = true
        this.startedAt = Date.now();
        this.animate()
    },

    pause: function() {
        this.isPlay = false
    },

    // Stop the animation in place
    stop: function() {
        // console.log('stop')
        this.isPlay = false
        this.startedAt = NaN
        this._i = 0
        this.animate();
    },
    // 传递的路线数组
    setLine: function(latlngs) {
        
        // console.log('distance' + this.options.distance)
        // console.log('interval' + this.options.interval)
        
        for (var i = 0; i < latlngs.length; i++) {
            // 运动到最后一个
            if (i === latlngs.length - 1) {
                latlngs[i].duration = latlngs[i - 1].duration
                latlngs[i].bearing = latlngs[i - 1].bearing
            } else {
                // 有没有速度配置
                // distanceTo Spherical Law of Cosines. 结算出来距离
                // 直接将运动duration时间固定
                if (this.options.speedList.length > 0 && this.options.speedList[i] !== undefined) {
                    latlngs[i].duration = latlngs[i].distanceTo(latlngs[i + 1]) / this.options.distance * (this.options.interval / this.options.speedList[i])
                } else {
                    latlngs[i].duration = 200
                }
                latlngs[i].bearing = this.getRotation(latlngs[i], latlngs[i + 1])
            }
        }
        this._latlngs = latlngs;
        // this._latlngs = this._chunk(latlngs);
        this._i = 0;
    },

    getRotation: function(start, end) {
        var dx = end.lng - start.lng;
        var dy = end.lat - start.lat;
        var radian = Math.atan2(dy, dx); //弧度值
        var rotation = 180 * radian / Math.PI //转换为角度值
        if (rotation > -180 && rotation < 0) {
            rotation = 360 + rotation;
        }
        return rotation
    }

});

L.animatedMarker = function(latlngs, options) {
    return new L.AnimatedMarker(latlngs, options);
};