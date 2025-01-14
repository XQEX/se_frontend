import { useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  NumberInput,
  Button,
  Container,
  Paper,
  Title,
  Group,
  Stack,
  Modal,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import Navbar from "../components/Navbar";

const JobPositionForm = () => {
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const form = useForm({
    initialValues: {
      jobLevel: "",
      expectedSalary: "",
      experience: "",
      specialSkills: "",
    },
    validate: {
      jobLevel: (value) =>
        value.trim().length > 0 ? null : "กรุณาระบุระดับตำแหน่งงานที่สนใจ",
      expectedSalary: (value) =>
        value && Number(value) > 0 ? null : "กรุณาระบุเงินเดือนที่คาดหวัง",
      experience: (value) =>
        value.trim().length > 0 ? null : "กรุณาระบุประสบการณ์ทำงาน",
      specialSkills: (value) =>
        value.trim().length > 0 ? null : "กรุณาระบุความสามารถพิเศษ",
    },
  });

  const handleSubmit = (values: any) => {
    console.log("Form Submitted:", values); // ตรวจสอบว่าโค้ดนี้ทำงาน
    setSubmittedData(values); // เก็บข้อมูลที่กรอกไว้ใน state
    setModalOpen(true); // เปิด Modal
  };

  const handleConfirm = () => {
    setModalOpen(false); // ปิด Modal
    showNotification({
      title: "สำเร็จ",
      message: "ข้อมูลถูกบันทึกเรียบร้อย",
      color: "teal",
    });
    // สามารถเพิ่ม logic สำหรับส่งข้อมูลไปยัง backend ได้ที่นี่
    console.log("Confirmed Data:", submittedData); // แสดงข้อมูลที่ยืนยันใน Console
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Container size="sm" className="mt-8">
        <Paper shadow="md" radius="md" p="xl" className="bg-white">
          <Title order={2} className="text-gray-800 mb-6 text-center">
            ระบุข้อมูลตำแหน่งงานที่สนใจ
          </Title>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="ระดับตำแหน่งงานที่ท่านสนใจ"
                placeholder="เช่น ผู้จัดการ, นักวิเคราะห์ ฯลฯ"
                required
                {...form.getInputProps("jobLevel")}
              />
              <NumberInput
                label="เงินเดือนที่คาดหวัง (บาท)"
                placeholder="ระบุจำนวนเงินเดือน"
                required
                {...form.getInputProps("expectedSalary")}
              />
              <TextInput
                label="ประสบการณ์ทำงาน"
                placeholder="เช่น 5 ปีในสายงาน IT"
                required
                {...form.getInputProps("experience")}
              />
              <TextInput
                label="ความสามารถพิเศษ"
                placeholder="เช่น การเขียนโปรแกรม, การเจรจาต่อรอง ฯลฯ"
                required
                {...form.getInputProps("specialSkills")}
              />
              <Group align="center" mt="lg">
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 transition"
                >
                  ถัดไป
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </Container>

      {/* Modal for Data Review */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="ข้อมูลที่กรอก"
      >
        {submittedData && (
          <div>
            <p>
              <strong>ระดับตำแหน่งงานที่สนใจ:</strong> {submittedData.jobLevel}
            </p>
            <p>
              <strong>เงินเดือนที่คาดหวัง:</strong>{" "}
              {submittedData.expectedSalary} บาท
            </p>
            <p>
              <strong>ประสบการณ์ทำงาน:</strong> {submittedData.experience}
            </p>
            <p>
              <strong>ความสามารถพิเศษ:</strong> {submittedData.specialSkills}
            </p>
            <Group align="right" mt="lg">
              <Button onClick={() => setModalOpen(false)} color="gray">
                แก้ไข
              </Button>
              <Button onClick={handleConfirm} color="green">
                ยืนยัน
              </Button>
            </Group>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default JobPositionForm;
