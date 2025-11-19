<template>
  <div style="height: 400px; width: 100%;">
    <GmapMap
      :center="mapCenter"
      :zoom="15"
      map-type-id="roadmap"
      style="width: 100%; height: 100%"
      @click="updateMarker"
    >
      <GmapMarker
        :position="currentMarker"
        :clickable="true"
        :draggable="true"
        @dragend="updateMarkerFromDrag"
      />
    </GmapMap>
  </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyASyYRBZmULmrmw_P9kgr7_266OhFNinPA'
    // key: ''
    // To use the Google Maps JavaScript API, you must register your app project on the Google API Console and get a Google API key which you can add to your app
    // v: 'OPTIONAL VERSION NUMBER',
    // libraries: 'places', //// If you need to use place input
  }
})

export default {
  name: 'GoogleMapsPicker',
  data() {
    // พิกัดมหาวิทยาลัยแม่ฟ้าหลวง (MFU)
    const MFU_LAT = 20.04502266214119; 
    const MFU_LNG = 99.89483339570916; 

    return {
      // 1. จุดศูนย์กลางของแผนที่ (เริ่มต้นที่ MFU)
      mapCenter: { lat: MFU_LAT, lng: MFU_LNG },
      
      // 2. ตำแหน่งหมุดปัจจุบัน (เริ่มต้นที่ MFU)
      currentMarker: { lat: MFU_LAT, lng: MFU_LNG },
    };
  },
  mounted() {
    // ส่งค่าเริ่มต้นออกไปให้ Parent Component ทันทีที่โหลดเสร็จ
    this.emitLocation(this.currentMarker);
  },
  methods: {
    // ส่งค่าพิกัดไปยัง Parent Component (ใช้ Event @input เพื่อรองรับ v-model)
    emitLocation(location) {
      this.$emit('input', {
        lat: location.lat,
        lng: location.lng
      });
    },

    // 3. อัปเดตหมุดเมื่อคลิกบนแผนที่
    updateMarker(event) {
      const newPos = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      this.currentMarker = newPos;
      this.emitLocation(newPos);
    },

    // 4. อัปเดตหมุดเมื่อลากหมุด (Drag)
    updateMarkerFromDrag(event) {
      const newPos = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      this.currentMarker = newPos;
      this.emitLocation(newPos);
    }
  }
};
</script>