


export const provinces = [
  'กรุงเทพมหานคร',
  'เชียงใหม่',
  'นนทบุรี',
  'ปทุมธานี',
  'ภูเก็ต',
  'สมุทรปราการ',
  'ชลบุรี',
  'ระยอง',
  'เชียงราย',
  'ขอนแก่น'
] as const;


export const citiesByProvince: Record<string, string[]> = {
  'กรุงเทพมหานคร': ['พระนคร', 'ดุสิต', 'หนองจอก', 'บางรัก', 'บางเขน', 'บางกะปิ', 'ปทุมวัน'],
  'เชียงใหม่': ['เมืองเชียงใหม่', 'จอมทอง', 'แม่แตง', 'แม่ริม', 'เชียงดาว', 'ดอยสะเก็ด'],
  'นนทบุรี': ['เมืองนนทบุรี', 'บางกรวย', 'บางใหญ่', 'บางบัวทอง', 'ไทรน้อย', 'ปากเกร็ด'],
  'ปทุมธานี': ['เมืองปทุมธานี', 'คลองหลวง', 'ธัญบุรี', 'ลำลูกกา', 'ลาดหลุมแก้ว', 'สามโคก'],
  'ภูเก็ต': ['เมืองภูเก็ต', 'กะทู้', 'ถลาง'],
  'สมุทรปราการ': ['เมืองสมุทรปราการ', 'บางบ่อ', 'บางพลี', 'พระประแดง', 'พระสมุทรเจดีย์', 'บางเสาธง'],
  'ชลบุรี': ['เมืองชลบุรี', 'บางละมุง', 'พานทอง', 'พนัสนิคม', 'ศรีราชา', 'เกาะสีชัง'],
  'ระยอง': ['เมืองระยอง', 'บ้านฉาง', 'แกลง', 'วังจันทร์', 'บ้านค่าย', 'ปลวกแดง'],
  'เชียงราย': ['เมืองเชียงราย', 'เวียงชัย', 'เชียงของ', 'เทิง', 'พาน', 'ป่าแดด'],
  'ขอนแก่น': ['เมืองขอนแก่น', 'บ้านฝาง', 'พระยืน', 'หนองเรือ', 'ชุมแพ', 'สีชมพู']
};