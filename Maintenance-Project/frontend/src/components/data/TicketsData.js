const ticketsData = [
  { ticket_id:"1" , ticket_number:"20250922-ELEC-001" , username: 'Samppa Nori', issue_detail:"หลอดไฟไม่ติด" , reported_at_date:"5/10/2025",reported_at_time:"10:00", category: 'ระบบไฟฟ้า', status: 'กำลังดำเนินการ'},
  { ticket_id:"2" , ticket_number:"20250922-ELEC-001" , username: 'Estavan Lykos', issue_detail:"คอมไม่ติด" , reported_at_date:"4/10/2025",reported_at_time:"10:00", category: 'ระบบ IT', status: 'เสร็จสิ้น'},
  { ticket_id:"3" , ticket_number:"20250922-ELEC-001" , username: 'Chetan Mohamed', issue_detail:"น้ำไม่ไหล" , reported_at_date:"3/10/2025",reported_at_time:"10:00", category: 'ระบบประปา', status: 'รับเรื่องแล้ว'},
  { ticket_id:"4" , ticket_number:"20250922-ELEC-001" , username: 'Derick Maximinus', issue_detail:"หลอดไฟไม่ติด" , reported_at_date:"2/10/2025",reported_at_time:"10:00", category: 'ระบบไฟฟ้า', status: 'รอดำเนินการ'},
  { ticket_id:"5" , ticket_number:"20250922-ELEC-001" , username: 'Friderik Dávid', issue_detail:"คอมไม่ติด" , reported_at_date:"1/10/2025",reported_at_time:"10:00", category: 'ระบบ IT', status: 'กำลังดำเนินการ'},
  { ticket_id:"6" , ticket_number:"20250922-ELEC-001" , username: 'Yiorgos Avraamu', issue_detail:"หลอดไฟไม่ติด" , reported_at_date:"5/9/2025",reported_at_time:"10:00", category: 'ระบบไฟฟ้า', status: 'กำลังดำเนินการ'},
  { ticket_id:"7" , ticket_number:"20250922-ELEC-001" , username: 'Avram Tarasios', issue_detail:"คอมไม่ติด" , reported_at_date:"5/10/2024",reported_at_time:"10:00", category: 'ระบบ IT', status: 'เสร็จสิ้น', _classes: 'table-success'},
  { ticket_id:"8" , ticket_number:"20250922-ELEC-001" , username: 'Quintin Ed', issue_detail:"น้ำไม่ไหล" , reported_at_date:"5/10/2025",reported_at_time:"10:00", category: 'ระบบประปา', status: 'รับเรื่องแล้ว'},
  { ticket_id:"9" , ticket_number:"20250922-ELEC-001" , username: 'Enéas Kwadwo', issue_detail:"หลอดไฟไม่ติด" , reported_at_date:"5/10/2025",reported_at_time:"10:00", category: 'ระบบไฟฟ้า', status: 'รอดำเนินการ'},
  { ticket_id:"10" , ticket_number:"20250922-ELEC-001" , username: 'Agapetus Tadeáš', issue_detail:"คอมไม่ติด" , reported_at_date:"5/10/2025",reported_at_time:"10:00", category: 'ระบบ IT', status: 'กำลังดำเนินการ'},
  { ticket_id:"11" , ticket_number:"20250922-ELEC-001" , username: 'Carwyn Fachtna', issue_detail:"หลอดไฟไม่ติด" , reported_at_date:"5/10/2025",reported_at_time:"10:00", category: 'ระบบไฟฟ้า', status: 'กำลังดำเนินการ', _classes: 'table-success'},
  { ticket_id:"12" , ticket_number:"20250922-ELEC-001" , username: 'Nehemiah Tatius', issue_detail:"คอมไม่ติด" , reported_at_date:"5/10/2025",reported_at_time:"10:00", category: 'ระบบ IT', status: 'เสร็จสิ้น'},
  { ticket_id:"13" , ticket_number:"20250922-ELEC-001" , username: 'Ebbe Gemariah', issue_detail:"น้ำไม่ไหล" , reported_at_date:"5/10/2025",reported_at_time:"10:00", category: 'ระบบประปา', status: 'รับเรื่องแล้ว'},
  { ticket_id:"14" , ticket_number:"20250922-ELEC-001" , username: 'Eustorgios Amulius', issue_detail:"หลอดไฟไม่ติด" , reported_at_date:"5/10/2025",reported_at_time:"10:00", category: 'ระบบไฟฟ้า', status: 'รอดำเนินการ'},
  { ticket_id:"15" , ticket_number:"20250922-ELEC-001" , username: 'Leopold Gáspár', issue_detail:"คอมไม่ติด" , reported_at_date:"5/10/2025",reported_at_time:"10:00", category: 'ระบบ IT', status: 'กำลังดำเนินการ'},
  { ticket_id:"16" , ticket_number:"20250922-ELEC-001" , username: 'Pompeius René', issue_detail:"หลอดไฟไม่ติด" , reported_at_date:"5/10/2025",reported_at_time:"10:00", category: 'ระบบไฟฟ้า', status: 'กำลังดำเนินการ'},
  { ticket_id:"17" , ticket_number:"20250922-ELEC-001" , username: 'Paĉjo Jadon', issue_detail:"คอมไม่ติด" , reported_at_date:"5/10/2025",reported_at_time:"10:00", category: 'ระบบ IT', status: 'เสร็จสิ้น'},
  { ticket_id:"18" , ticket_number:"20250922-ELEC-001" , username: 'Micheal Mercurius', issue_detail:"น้ำไม่ไหล" , reported_at_date:"5/10/2025",reported_at_time:"10:00", category: 'ระบบประปา', status: 'รับเรื่องแล้ว'},
  { ticket_id:"19" , ticket_number:"20250922-ELEC-001" , username: 'Ganesha Dubhghall', issue_detail:"หลอดไฟไม่ติด" , reported_at_date:"5/10/2025",reported_at_time:"10:00", category: 'ระบบไฟฟ้า', status: 'รอดำเนินการ'},
  { ticket_id:"20" , ticket_number:"20250922-ELEC-001" , username: 'Hiroto Šimun', issue_detail:"คอมไม่ติด" , reported_at_date:"5/10/2025",reported_at_time:"10:00", category: 'ระบบ IT', status: 'กำลังดำเนินการ'},
  { ticket_id:"21" , ticket_number:"20250922-ELEC-001" , username: 'Vishnu Serghei', issue_detail:"หลอดไฟไม่ติด" , reported_at_date:"5/10/2025",reported_at_time:"10:00", category: 'ระบบไฟฟ้า', status: 'กำลังดำเนินการ'},
  { ticket_id:"22" , ticket_number:"20250922-ELEC-001" , username: 'Zbyněk Phoibos', issue_detail:"คอมไม่ติด" , reported_at_date:"5/10/2025",reported_at_time:"10:00", category: 'ระบบ IT', status: 'เสร็จสิ้น'},
  { ticket_id:"23" , ticket_number:"20250922-ELEC-001" , username: 'Einar Randall', issue_detail:"น้ำไม่ไหล" , reported_at_date:"5/10/2025",reported_at_time:"10:00", category: 'ระบบประปา', status: 'รับเรื่องแล้ว', _classes: 'table-danger'},
  { ticket_id:"24" , ticket_number:"20250922-ELEC-001" , username: 'Félix Troels', issue_detail:"คอมไม่ติด" , reported_at_date:"5/10/2025",reported_at_time:"10:00", category: 'ระบบ IT', status: 'กำลังดำเนินการ'},
  { ticket_id:"25" , ticket_number:"20250922-ELEC-001" , username: 'Aulus Agmundr', issue_detail:"หลอดไฟไม่ติด" , reported_at_date:"5/10/2025",reported_at_time:"10:00", category: 'ระบบไฟฟ้า', status: 'รอดำเนินการ'}
]

export default ticketsData


