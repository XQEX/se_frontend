import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import {
  TextInput,
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

const ApplicationForm = () => {
  const navigate = useNavigate();

  interface FormData {
    fullName: string;
    phoneNumber: string;
    address: string;
    province: string;
    postalCode: string;
  }

  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const form = useForm({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      address: "",
      province: "",
      postalCode: "",
    },

    validate: {
      fullName: (value) =>
        value.trim().length > 3
          ? null
          : "กรุณากรอกชื่อ-นามสกุลอย่างน้อย 3 ตัวอักษร",
      phoneNumber: (value) =>
        /^\d{10}$/.test(value) ? null : "หมายเลขโทรศัพท์ต้องมี 10 ตัวเลข",
      address: (value) =>
        value.trim().length > 10 ? null : "ที่อยู่อย่างน้อย 10 ตัวอักษร",
      province: (value) =>
        value.trim().length > 0 ? null : "กรุณากรอกชื่อจังหวัด",
      postalCode: (value) =>
        /^\d{5}$/.test(value) ? null : "รหัสไปรษณีย์ต้องมี 5 ตัวเลข",
    },
  });

  const handleSubmit = (values: FormData) => {
    console.log("Form Submitted:", values); // Log ข้อมูลที่กรอกในฟอร์ม
    // ตั้งค่า submittedData
    setSubmittedData(values);
    console.log("Submitted Data Set:", values); // Log หลังจากที่ state ถูกอัปเดต
    // เปิด Modal
    setModalOpen(true);
  };

  const handleConfirm = () => {
    setModalOpen(false); // ปิด Modal
    showNotification({
      title: "สำเร็จ",
      message: "ข้อมูลถูกบันทึกเรียบร้อย",
      color: "teal",
    });
    navigate("/application/JobPosition"); // เปลี่ยนเส้นทางไปยังหน้าถัดไป
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Container size="sm" className="mt-8">
        <Paper shadow="md" radius="md" p="xl" className="bg-white">
          <Title order={2} className="text-gray-800 mb-6 text-center">
            กรอกประวัติ
          </Title>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="ชื่อ-นามสกุล"
                placeholder="ชื่อ-นามสกุล"
                required
                {...form.getInputProps("fullName")}
              />
              <TextInput
                label="หมายเลขโทรศัพท์"
                placeholder="หมายเลขโทรศัพท์"
                maxLength={10}
                required
                {...form.getInputProps("phoneNumber")}
              />
              <TextInput
                label="ที่อยู่"
                placeholder="ระบุที่อยู่ของคุณ"
                required
                {...form.getInputProps("address")}
              />
              <TextInput
                label="จังหวัด"
                placeholder="กรอกจังหวัดที่คุณอาศัยอยู่"
                required
                {...form.getInputProps("province")}
              />
              <TextInput
                label="รหัสไปรษณีย์"
                placeholder="รหัสไปรษณีย์"
                maxLength={5}
                required
                {...form.getInputProps("postalCode")}
              />
              <Group align="center" mt="lg">
                <Button
                  type="submit"
                  size="md"
                  className="bg-green-500 hover:bg-green-600 transition"
                >
                  ถัดไป
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </Container>

      {/* Modal for Submitted Data */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="ข้อมูลที่อยู่"
      >
        {submittedData && (
          <div>
            <p>
              <strong>ชื่อ-นามสกุล:</strong> {submittedData.fullName}
            </p>
            <p>
              <strong>หมายเลขโทรศัพท์:</strong> {submittedData.phoneNumber}
            </p>
            <p>
              <strong>ที่อยู่:</strong> {submittedData.address}
            </p>
            <p>
              <strong>จังหวัด:</strong> {submittedData.province}
            </p>
            <p>
              <strong>รหัสไปรษณีย์:</strong> {submittedData.postalCode}
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

export default ApplicationForm;
