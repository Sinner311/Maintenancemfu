const categoriesData = [{
  "_id": {
    "$oid": "68e6b13b786f2d98589a5856"
  },
  "departmentName": "ไฟฟ้า",
  "subCategories": [
    {
      "name": "หลอดไฟไม่ติด",
      "slaHours": 24
    },
    {
      "name": "ปลั๊กไฟชำรุด",
      "slaHours": 48
    },
    {
      "name": "เบรกเกอร์ตัดบ่อย",
      "slaHours": 72
    }
  ]
},
{
  "_id": {
    "$oid": "68e6b13b786f2d98589a5857"
  },
  "departmentName": "IT",
  "subCategories": [
    {
      "name": "เครื่องคอมไม่ติด",
      "slaHours": 24
    },
    {
      "name": "Wi-Fi ใช้งานไม่ได้",
      "slaHours": 12
    },
    {
      "name": "เครื่องพิมพ์มีปัญหา",
      "slaHours": 36
    }
  ]
},
{
  "_id": {
    "$oid": "68e6b13b786f2d98589a5858"
  },
  "departmentName": "ประปา",
  "subCategories": [
    {
      "name": "น้ำไม่ไหล",
      "slaHours": 24
    },
    {
      "name": "ท่อแตก",
      "slaHours": 12
    },
    {
      "name": "ก๊อกน้ำรั่ว",
      "slaHours": 48
    }
  ]
},
{
  "_id": {
    "$oid": "68e6b13b786f2d98589a5859"
  },
  "departmentName": "อาคาร",
  "subCategories": [
    {
      "name": "ผนังแตกร้าว",
      "slaHours": 72
    },
    {
      "name": "ประตูเสีย",
      "slaHours": 48
    },
    {
      "name": "พื้นหลุดร่อน",
      "slaHours": 72
    }
  ]
}]

export default categoriesData


