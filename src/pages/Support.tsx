"use client";

import type React from "react";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import {
  Container,
  Title,
  Text,
  Grid,
  Card,
  Button,
  TextInput,
  Textarea,
  Accordion,
  Group,
  Select,
  Divider,
  Box,
} from "@mantine/core";
import {
  FaQuestionCircle,
  FaEnvelope,
  FaPhone,
  FaComments,
  FaBook,
  FaHeadset,
  FaFileAlt,
  FaLightbulb,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

function Support() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleFormChange = (field: string, value: string) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", contactForm);
    // Reset form
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        user={undefined}
        isLoading={false}
        isHaveUser={false}
        refetchjobseeker={() => {}}
        refetchemployer={() => {}}
        refetchCompany={() => {}}
        isStale={false}
        setUser={() => {}}
      />

      <Container size="lg" py={40}>
        {/* Hero Section */}
        <Box className="text-center mb-12">
          <div className="text-4xl mb-4 text-center kanit-bold">
            เราจะช่วยคุณได้อย่างไร?
          </div>
          <div className="max-w-2xl mx-auto text-center flex justify-center kanit-regular">
            ทีมสนับสนุนของเราพร้อมช่วยเหลือคุณในทุกคำถามหรือปัญหาที่คุณอาจมี
          </div>
        </Box>

        {/* Contact Form and Info */}
        <Grid>
          <Grid.Col>
            <div className="mb-6 kanit-regular">ติดต่อเรา</div>
            <form onSubmit={handleSubmit}>
              <TextInput
                label="ชื่อ"
                placeholder="ชื่อ"
                required
                mb="md"
                value={contactForm.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
              />
              <TextInput
                label="Email"
                placeholder="your.email@example.com"
                required
                mb="md"
                type="email"
                value={contactForm.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
              />
              <Select
                label="หัวข้อ"
                placeholder="หัวข้อ"
                required
                mb="md"
                data={[
                  { value: "general", label: "General Inquiry" },
                  { value: "technical", label: "Technical Support" },
                  { value: "billing", label: "Billing Question" },
                  { value: "feedback", label: "Feedback" },
                  { value: "other", label: "Other" },
                ]}
                value={contactForm.subject}
                onChange={(value) => handleFormChange("subject", value || "")}
              />
              <Textarea
                label="ข้อความ"
                placeholder="ข้อความ"
                required
                mb="xl"
                minRows={4}
                value={contactForm.message}
                onChange={(e) => handleFormChange("message", e.target.value)}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-seagreen p-3 kanit-regular text-white"
              >
                ส่งข้อความ
              </motion.button>
            </form>
          </Grid.Col>
        </Grid>
      </Container>
      <Footer/>
    </div>
  );
}

export default Support;
