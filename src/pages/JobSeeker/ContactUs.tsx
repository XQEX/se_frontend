import {
  TextInput,
  Textarea,
  Button,
  Container,
  Title,
  Text,
} from "@mantine/core";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function ContactUs() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Navbar */}
      <Navbar />

      {/* Content Section */}
      <Container size="md" className="flex flex-col items-center px-4 py-12">
        {/* Header */}
        <Title className="text-4xl font-bold text-green-600 mb-10 text-center">
          ติดต่อเรา
        </Title>
        <div className="mt-10">
          <Text className="text-lg text-gray-600 text-center">
            หากมีคำถาม ข้อสงสัย หรือต้องการติดต่อเรา
            สามารถกรอกข้อมูลด้านล่างหรือใช้ช่องทางอื่นได้เลย!
          </Text>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12 mt-10">
          {/* Phone */}
          <div className="flex flex-col items-center">
            <FaPhoneAlt className="text-green-500 text-4xl mb-2" />
            <Text className="text-gray-700 font-semibold">+66 123 456 789</Text>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center">
            <FaEnvelope className="text-green-500 text-4xl mb-2" />
            <Text className="text-gray-700 font-semibold">
              contact@skillbridge.com
            </Text>
          </div>

          {/* Address */}
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-green-500 text-4xl mb-2" />
            <Text className="text-gray-700 font-semibold">
              123 Main Street, Bangkok
            </Text>
          </div>
        </div>

        {/* Contact Form */}
        <form className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <TextInput
              label="ชื่อของคุณ"
              placeholder="กรอกชื่อของคุณ"
              required
              classNames={{ input: "focus:border-green-500" }}
            />
            <TextInput
              label="อีเมล"
              placeholder="กรอกอีเมลของคุณ"
              required
              classNames={{ input: "focus:border-green-500" }}
            />
          </div>
          <TextInput
            label="หัวข้อ"
            placeholder="ระบุหัวข้อ"
            required
            className="mb-4"
          />
          <Textarea
            label="ข้อความ"
            placeholder="กรอกรายละเอียดที่ต้องการติดต่อ"
            required
            minRows={4}
            className="mb-6"
          />
          <Button
            fullWidth
            className="bg-green-500 hover:bg-green-600 text-white text-lg"
            type="submit"
          >
            ส่งข้อความ
          </Button>
        </form>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ContactUs;
