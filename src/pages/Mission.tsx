import {
  AppShell,
  Container,
  Title,
  Text,
  Grid,
  Paper,
  ThemeIcon,
  Button,
  Stack,
  Divider,
  Box,
  Image,
} from "@mantine/core";

import { NewNav } from "../components/NewNav";
import { FaArrowRight, FaBriefcase, FaHeart, FaUser } from "react-icons/fa";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

function Mission() {
  const {
    user,
    isLoading,
    refetchjobseeker,
    refetchemployer,
    refetchCompany,
    isStale,
    setUser,
    queryClient,
  } = useUser();
  const [isHaveUser, setIsHaveUser] = useState(false);
  useEffect(() => {
    refetchjobseeker();
    refetchemployer();
    refetchCompany();
    setIsHaveUser(!!user);
  }, [user, isLoading, isStale]);
  return (
    <AppShell>
      <NewNav
        user={user}
        isLoading={isLoading}
        isHaveUser={isHaveUser}
        refetchjobseeker={refetchjobseeker}
        refetchemployer={refetchemployer}
        refetchCompany={refetchCompany}
        isStale={isStale}
        setUser={setUser}
        userType={user?.type}
        queryClient={queryClient}
      />
      <Container size="lg" py="xl">
        <Stack>
          <Box ta="center" mb="xl">
            <div className="kanit-bold text-2xl">ภารกิจของเรา</div>

            <Text
              size="lg"
              className="kanit-regular"
              c="dimmed"
              maw={800}
              mx="auto"
            >
              ภารกิจของเราคือการสร้างแพลตฟอร์มการโพสต์งานที่ครอบคลุมซึ่งช่วยให้ผู้สูงอายุและผู้พิการสามารถเข้าถึงและมีโอกาสในการทำงานที่เหมาะสม
              เรามุ่งมั่นที่จะเชื่อมโยงช่องว่างระหว่างนายจ้างและผู้หางาน
              สร้างสรรค์แรงงานที่หลากหลายและสนับสนุนที่ทุกคนสามารถเติบโตได้
            </Text>
          </Box>

          <Grid mb="xl">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper shadow="md" p="lg" radius="md" withBorder h="100%">
                <ThemeIcon
                  size="xl"
                  radius="xl"
                  color="blue.1"
                  c="green"
                  mb="md"
                >
                  <FaUser />
                </ThemeIcon>
                <div className="kanit-regular text-2xl">การเข้าถึง</div>
                <Text className="kanit-regular" c="dimmed">
                  สร้างโอกาสการทำงานที่เท่าเทียมสำหรับผู้สูงอายุและผู้พิการ
                </Text>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper shadow="md" p="lg" radius="md" withBorder h="100%">
                <ThemeIcon
                  size="xl"
                  radius="xl"
                  color="blue.1"
                  c="green"
                  mb="md"
                >
                  <FaBriefcase />
                </ThemeIcon>
                <div className="kanit-regular text-2xl">การเชื่อมโยง</div>
                <Text className="kanit-regular" c="dimmed">
                  เชื่อมต่อนายจ้างกับผู้หางานที่มีความสามารถหลากหลาย
                </Text>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper shadow="md" p="lg" radius="md" withBorder h="100%">
                <ThemeIcon
                  size="xl"
                  radius="xl"
                  color="blue.1"
                  c="green"
                  mb="md"
                >
                  <FaHeart size={24} />
                </ThemeIcon>
                <div className="kanit-regular text-2xl">การสนับสนุน</div>
                <Text className="kanit-regular" c="dimmed">
                  สร้างสภาพแวดล้อมที่ทุกคนสามารถเติบโตและประสบความสำเร็จได้
                </Text>
              </Paper>
            </Grid.Col>
          </Grid>

          <Paper shadow="lg" p="xl" radius="md" withBorder>
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <div className="kanit-regular text-2xl">
                  ร่วมเป็นส่วนหนึ่งในภารกิจของเรา
                </div>
                <Text className="kanit-regular" c="dimmed" mb="lg">
                  ไม่ว่าคุณจะเป็นนายจ้างที่กำลังมองหาพนักงานที่มีความสามารถ
                  หรือผู้หางานที่กำลังมองหาโอกาสใหม่ๆ เราพร้อมช่วยเหลือคุณ
                </Text>
                <motion.button
                  className={`
               
               kanit-semibold py-2 px-4 rounded-lg border bg-seagreen text-white transition-colors duration-300 w-32`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/select-user-type">เข้าร่วมที่นี่</Link>
                </motion.button>
              </Grid.Col>
              <Grid.Col
                span={{ base: 12, md: 4 }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src="/vite.svg"
                  alt="Mission illustration"
                  radius="md"
                  h={200}
                  w={200}
                />
              </Grid.Col>
            </Grid>
          </Paper>
        </Stack>
      </Container>

      <Footer />
    </AppShell>
  );
}

export default Mission;
