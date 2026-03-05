# Autonation AI Council

AI Small Council chatbot สำหรับธุรกิจรถยนต์ Autonation

## Deploy บน Vercel (ฟรี)

### ขั้นตอน:

1. **อัปโหลดขึ้น GitHub**
   - สร้าง repo ใหม่ที่ github.com
   - อัปโหลดไฟล์ทั้งหมดนี้

2. **Deploy บน Vercel**
   - ไปที่ vercel.com → Sign up ด้วย GitHub
   - กด "New Project" → เลือก repo นี้
   - กด Deploy

3. **ใส่ API Key**
   - ใน Vercel Dashboard → Settings → Environment Variables
   - เพิ่ม: `ANTHROPIC_API_KEY` = `sk-ant-your-key-here`
   - Redeploy

เสร็จแล้ว! ได้ URL สำหรับใช้งาน เช่น `https://autonation-council.vercel.app`

## วิธีรันในเครื่อง

```bash
npm install
cp .env.example .env.local
# แก้ .env.local ใส่ API key จริง
npm run dev
```

เปิด http://localhost:3000
