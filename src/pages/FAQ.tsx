"use client";

import { useState } from "react";
import {
  Accordion,
  Tabs,
  TextInput,
  Button,
  Text,
  Title,
  Container,
  Group,
  Box,
  Paper,
} from "@mantine/core";
import { FiSearch, FiX } from "react-icons/fi";
import { Navbar } from "../components/Navbar";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("");

const faqCategories = [
    {
        id: "general",
        label: "คำถามทั่วไป",
        questions: [
            {
                question: "SkillBridge คืออะไร?",
                answer:
                    "SkillBridge เป็นแพลตฟอร์มประกาศรับสมัครงานที่ออกแบบมาเฉพาะสำหรับผู้สูงอายุและผู้พิการ เราเชื่อมโยงผู้สมัครที่มีคุณสมบัติเหมาะสมกับนายจ้างที่ให้คุณค่ากับความหลากหลาย ประสบการณ์ และมุมมองที่เป็นเอกลักษณ์ในแรงงานของพวกเขา",
            },
            {
                question: "บริการนี้ฟรีหรือไม่?",
                answer:
                    "ใช่ แพลตฟอร์มของเราไม่มีค่าใช้จ่ายสำหรับผู้หางาน นายจ้างสามารถเลือกระหว่างตัวเลือกการโพสต์พื้นฐานฟรีหรือคุณสมบัติพรีเมียมเพื่อเพิ่มการมองเห็นและการจับคู่ผู้สมัคร",
            },
            {
                question: "ใครสามารถใช้แพลตฟอร์มนี้ได้บ้าง?",
                answer:
                    "แพลตฟอร์มของเรายินดีต้อนรับผู้หางานทุกวัย โดยเน้นเป็นพิเศษสำหรับผู้สูงอายุและผู้พิการ เราขอเชิญนายจ้างที่มุ่งมั่นในการจ้างงานแบบครอบคลุมให้ประกาศตำแหน่งงาน",
            },
            {
                question: "แตกต่างจากเว็บไซต์หางานอื่นอย่างไร?",
                answer:
                    "ไม่เหมือนกับเว็บบอร์ดงานทั่วไป เราเชี่ยวชาญในการจ้างงานที่เป็นมิตรกับผู้สูงอายุและครอบคลุมผู้พิการ แพลตฟอร์มของเรามีการเข้าถึงที่ดีขึ้น การจับคู่งานตามความสามารถมากกว่าข้อจำกัด และทรัพยากรที่ปรับแต่งเฉพาะสำหรับความต้องการของผู้ใช้",
            },
        ],
    },
    {
        id: "accessibility",
        label: "คุณสมบัติการเข้าถึง",
        questions: [
            {
                question: "แพลตฟอร์มมีคุณสมบัติการเข้าถึงอะไรบ้าง?",
                answer:
                    "ยังไม่มี",
            },
            
        ],
    },
    {
        id: "job-seekers",
        label: "สำหรับผู้หางาน", 
        questions: [
            {
                question: "ฉันจะสร้างโปรไฟล์ได้อย่างไร?",
                answer:
                    "คลิกที่ 'ลงทะเบียน' และเลือก 'ผู้หางาน' คุณจะได้รับการแนะนำผ่านขั้นตอนการสร้างโปรไฟล์ของคุณ รวมถึงทักษะ ประสบการณ์ และสิ่งอำนวยความสะดวกที่คุณอาจต้องการ คุณสามารถบันทึกความคืบหน้าและกลับมาทำให้เสร็จภายหลังได้",
            },
            {
                question: "ฉันสามารถระบุสิ่งอำนวยความสะดวกในที่ทำงานที่ต้องการได้หรือไม่?", 
                answer:
                    "ได้ การตั้งค่าโปรไฟล์ของเรามีส่วนที่เป็นตัวเลือกที่คุณสามารถระบุสิ่งอำนวยความสะดวกที่คุณต้องการ ข้อมูลนี้จะแชร์กับนายจ้างหลังจากที่คุณสมัครงานหรือให้การอนุญาตเฉพาะเท่านั้น",
            },
            {
                question: "ฉันจะค้นหางานที่เหมาะกับความสามารถของฉันได้อย่างไร?",
                answer: 
                    "ตัวกรองการค้นหาขั้นสูงของเราช่วยให้คุณค้นหาตำแหน่งงานตามทักษะ ระดับประสบการณ์ ตำแหน่งที่ตั้ง ความต้องการความยืดหยุ่น และความต้องการสิ่งอำนวยความสะดวก คุณยังสามารถตั้งค่าการแจ้งเตือนงานเพื่อรับการแจ้งเตือนเมื่อมีการโพสต์ตำแหน่งที่ตรงกัน",
            },
            {
                question: "อายุหรือสถานะความพิการของฉันจะปรากฏให้นายจ้างเห็นหรือไม่?",
                answer:
                    "ไม่ แม้ว่าแพลตฟอร์มของเราจะเน้นการจ้างงานแบบครอบคลุม แต่เราปกป้องความเป็นส่วนตัวของคุณ นายจ้างจะเห็นเฉพาะคุณสมบัติและทักษะที่คุณเลือกที่จะเน้น การเปิดเผยอายุหรือสถานะความพิการเป็นทางเลือกของคุณในระหว่างขั้นตอนการสมัคร",
            },
           
        ],
    },
    {
        id: "employers",
        label: "สำหรับนายจ้าง",
        questions: [
            {
                question: "ฉันจะลงประกาศรับสมัครงานได้อย่างไร?",
                answer:
                    "สร้างบัญชีนายจ้าง จากนั้นก็ลงประกาศงาน จากแดชบอร์ดของคุณ แบบฟอร์มที่มีคำแนะนำของเราจะช่วยคุณสร้างคำอธิบายงานแบบครอบคลุมที่เน้นหน้าที่และทักษะที่จำเป็นมากกว่าข้อกำหนดที่อาจกีดกัน",
            },
            {
                question: "อะไรที่ทำให้การประกาศรับสมัครงานมีความครอบคลุม?",
                answer:
                    "การประกาศรับสมัครงานที่ครอบคลุมจะเน้นที่หน้าที่งานที่จำเป็น หลีกเลี่ยงข้อกำหนดทางกายภาพที่ไม่จำเป็น กล่าวถึงตัวเลือกความยืดหยุ่น เน้นย้ำความมุ่งมั่นของบริษัทในการเข้าถึง และใช้ภาษาที่ชัดเจนตรงไปตรงมา ระบบของเราจะแนะนำคุณในการสร้างประกาศดังกล่าว",
            },
            {
                question: "มีประโยชน์อะไรในการจ้างผู้สูงอายุหรือผู้พิการ?",
                answer:
                    "การวิจัยแสดงให้เห็นว่าทีมที่มีความหลากหลายทำงานได้ดีกว่า พนักงานสูงอายุนำประสบการณ์และความน่าเชื่อถือที่มีค่า ในขณะที่ผู้พิการมักแสดงให้เห็นถึงทักษะการแก้ปัญหา ความจงรักภักดี และความทุ่มเทที่โดดเด่น หลายภูมิภาคยังมีแรงจูงใจทางภาษีสำหรับการจ้างงานแบบครอบคลุม",
            },
            {
                question: "เราจะทำให้สถานที่ทำงานของเราเข้าถึงได้มากขึ้นได้อย่างไร?",
                answer:
                    "ส่วนทรัพยากรของเรามีคู่มือเกี่ยวกับการอำนวยความสะดวกที่เหมาะสม การปรับเปลี่ยนสถานที่ทำงาน และการสร้างวัฒนธรรมที่ครอบคลุม การอำนวยความสะดวกหลายอย่างมีต้นทุนต่ำและให้ประโยชน์อย่างมากในด้านผลผลิตและการรักษาพนักงาน เรายังสามารถเชื่อมต่อคุณกับที่ปรึกษาด้านการเข้าถึงได้",
            },
           
        ],
    },
    {
        id: "support",
        label: "การสนับสนุนและทรัพยากร",
        questions: [
            {
                question: "ถ้าฉันพบปัญหาทางเทคนิคจะทำอย่างไร?",
                answer:
                    "ทีมสนับสนุนของเราพร้อมให้บริการวันจันทร์-ศุกร์ เวลา 8.00-20.00 น. ผ่านแชทสด อีเมล หรือโทรศัพท์ สำหรับความช่วยเหลือเร่งด่วนในวันหยุดสุดสัปดาห์ กรุณาใช้แบบฟอร์มติดต่อฉุกเฉินของเรา เรามุ่งมั่นที่จะตอบกลับทุกคำถามภายใน 24 ชั่วโมง",
            },
        
            {
                question: "ฉันจะให้ข้อเสนอแนะเกี่ยวกับแพลตฟอร์มได้อย่างไร?",
                answer:
                    "เรายินดีรับฟังข้อเสนอแนะของคุณ คลิกที่ปุ่ม 'ติดต่อฝ่านสนับสนุน' ที่ด้านล่างของทุกหน้าหรือส่งอีเมลถึงเราโดยตรงที่ support@skillbridge.com เรานำข้อเสนอแนะของผู้ใช้มาปรับปรุงบริการของเราอย่างสม่ำเสมอ",
            },
        ],
    },
];

  const filteredFAQs =
    searchQuery.trim() === ""
      ? faqCategories
      : faqCategories
          .map((category) => ({
            ...category,
            questions: category.questions.filter(
              (q) =>
                q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.answer.toLowerCase().includes(searchQuery.toLowerCase())
            ),
          }))
          .filter((category) => category.questions.length > 0);

  return (
    <div className="h-screen">
        <Navbar user={undefined} isLoading={false} isHaveUser={false} refetchjobseeker={function (): void {
              throw new Error("Function not implemented.");
          } } refetchemployer={function (): void {
              throw new Error("Function not implemented.");
          } } refetchCompany={function (): void {
              throw new Error("Function not implemented.");
          } } isStale={false} setUser={function (value: any): void {
              throw new Error("Function not implemented.");
          } }/  >
            <div className="ml-6 mr-6">
    <div className="mt-4 kanit-bold text-2xl">
      คำถามที่พบบ่อย
    </div>

      <Box mb={32}>
        <Text size="lg" mb={24} className="kanit-regular">
          ค้นหาคำตอบสำหรับคำถามทั่วไปเกี่ยวกับการใช้งานแพลตฟอร์มหางานของเรา หากคุณไม่พบสิ่งที่กำลังค้นหา กรุณาติดต่อทีมสนับสนุนของเรา
        </Text>

        <Box>
          <TextInput
            size="lg"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            rightSection={
              searchQuery ? (
                <Button
                  variant="subtle"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <FiX size={18} />
                </Button>
              ) : null
            }
          />
        </Box>
      </Box>

      {filteredFAQs.length === 0 ? (
        <Box>
          <Title order={3} mb={8}>
            ไม่พบผลลัพธ์
          </Title>
          <Text color="dimmed" mb={16}>
            Try different keywords or browse our categories below.
          </Text>
          <Button
            variant=""
            onClick={() => setSearchQuery("")}
            size="lg"
            className="kanit-regular"
          >
            ดูคำถามทั้งหมด
          </Button>
        </Box>
      ) : (
        <Tabs defaultValue="general" className="kanit-regular">
          <Tabs.List grow mb={24}>
            {filteredFAQs.map((category) => (
              <Tabs.Tab key={category.id} value={category.id}>
                {category.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {filteredFAQs.map((category) => (
            <Tabs.Panel key={category.id} value={category.id} pt={16}>
              <Accordion>
                {category.questions.map((faq, index) => (
                  <Accordion.Item key={index} value={`item-${index}`}>
                    <Accordion.Control>
                      <Text size="xl">{faq.question}</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Text size="lg">{faq.answer}</Text>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Tabs.Panel>
          ))}
        </Tabs>
      )}

      <Paper withBorder p={24} mt={48} radius="md">
        <div className="kanit-regular text-xl">
          มีคำถามเพิ่มเติม?
        </div>
        <Text mb={16} className="kanit-regular">ทีมสนับสนุนของเราพร้อมช่วยเหลือคุณ</Text>
        <Group className="mb-3">
          <motion.button  whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }} className="rounded-lg bg-seagreen p-3 text-white kanit-regular transition-colors duration-500 transform ">
            ติดต่อฝ่ายสนับสนุน
          </motion.button>
         
        </Group>
      </Paper>
      </div>
      <Footer/>
    </div>
  );
}
