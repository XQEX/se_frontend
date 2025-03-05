import { useEffect, useRef, useState } from "react";
import { useForm, UseFormReturnType } from "@mantine/form";
import {
  TextInput,
  Button,
  Container,
  Paper,
  Title,
  Grid,
  Stack,
  Select,
  Switch,
  Checkbox,
} from "@mantine/core";
import { NewNav } from "../../components/NewNav";
import { useUser } from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUserProfile } from "../../api/JobSeeker";
import { useNavigate } from "react-router-dom";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { Group, Text, useMantineTheme, Image } from "@mantine/core";
import { IconCloudUpload, IconDownload, IconX } from "@tabler/icons-react";

// Interface for InputProps
interface InputProps {
  label: string;
  placeholder: string;
  inputProps: ReturnType<UseFormReturnType<any>["getInputProps"]>;
  size: "short" | "medium" | "long";
}

// Interface for Select Props
interface SelectProps {
  monthProp: ReturnType<UseFormReturnType<any>["getInputProps"]>;
  yearProp: ReturnType<UseFormReturnType<any>["getInputProps"]>;
  disabled?: boolean;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 20 }, (_, i) =>
  (currentYear - i).toString()
);

const JobSeekerProfile = () => {
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
  const [resumes, setResumes] = useState<File | null>(null);
  const navigate = useNavigate();
  const openRef = useRef<() => void>(null);
  // Helper function for toast messages
  const notifyError = (message: string) =>
    toast.error(message, { position: "top-center" });
  const notifySuccess = (message: string) =>
    toast.success(message, { position: "top-center" });

  useEffect(() => {
    refetchjobseeker();
    refetchCompany();
    refetchemployer();
    setIsHaveUser(!!user);

    form.setValues({
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.address,
      aboutMe: user.aboutMe,
      email: user.email,
      contact: user.contact,
      jobTitle: "",
      company: "",
      startMonth: "",
      // startYear: "",
      // endMonth: "",
      // endYear: "",
      // currentlyWorking: false,
    });
  }, [user, isLoading, isStale]);

  // const [hasExperience, setHasExperience] = useState<boolean>(true);
  // const [hasDesiredJobCategory, setHasDesiredJobCategory] =
  //   useState<boolean>(true);
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  document.body.style.backgroundColor = "#f7f9fc";

  const form = useForm({
    initialValues: {
      firstName: "John",
      lastName: "Doe",
      location: "123 Main St, Bangkok",
      jobTitle: "",
      contact: "XDDD",
      company: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      currentlyWorking: false,
      aboutMe: "Experienced software developer",
      email: "john.doe@example.com",
      phone: "+66987654321",
      vulnerabilityType: "",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    console.log("Submitted values:", values);

    const formData = new FormData();
    formData.append("image", resumes || new File([], ""));

    try {
      const updatedUser = {
        firstName: form.values.firstName,
        lastName: form.values.lastName,
        aboutMe: form.values.aboutMe,
        address: form.values.location,
        email: form.values.email,
        contact: form.values.contact,
        resumeImage: formData, // Ensure resumeImage is always a File
      };
      await updateUserProfile(updatedUser);
      // await updateJobSeekerUsername(form.values.username, confirmPassword2);
      refetchjobseeker();
      notifySuccess("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      notifyError(error as string);
    }
  };

  const renderTextInput = ({
    label,
    placeholder,
    inputProps,
    size,
  }: InputProps) => (
    <TextInput
      label={label}
      placeholder={placeholder}
      className="font-kanit"
      styles={{
        root: {
          width:
            size === "short" ? "100px" : size === "medium" ? "180px" : "400px",
          maxWidth:
            size === "short" ? "120px" : size === "medium" ? "200px" : "540px",
        },
        label: { color: "#2d3748", fontWeight: 500 },
        input: {
          border: "1.5px solid #e2e8f0",
          padding: "0.4rem 0.6rem",
          borderRadius: "6px",
          "&:focus": { borderColor: "#2E8B57" },
        },
      }}
      {...inputProps}
    />
  );

  // const renderDateGroup = ({
  //   monthProp,
  //   yearProp,
  //   disabled = false,
  // }: SelectProps) => (
  //   <Grid grow className="w-full">
  //     <Grid.Col span={3}>
  //       <Select
  //         placeholder="เดือน"
  //         data={[
  //           "มกราคม",
  //           "กุมภาพันธ์",
  //           "มีนาคม",
  //           "เมษายน",
  //           "พฤษภาคม",
  //           "มิถุนายน",
  //           "กรกฎาคม",
  //           "สิงหาคม",
  //           "กันยายน",
  //           "ตุลาคม",
  //           "พฤศจิกายน",
  //           "ธันวาคม",
  //         ]}
  //         disabled={disabled}
  //         className="w-full"
  //         styles={{
  //           input: {
  //             border: "1.5px solid #e2e8f0",
  //             padding: "0.4rem 0.5rem",
  //             borderRadius: "6px",
  //           },
  //         }}
  //         {...monthProp}
  //       />
  //     </Grid.Col>
  //     <Grid.Col span={3}>
  //       <Select
  //         placeholder="ปี"
  //         data={years}
  //         disabled={disabled}
  //         className="w-full"
  //         styles={{
  //           input: {
  //             border: "1.5px solid #e2e8f0",
  //             padding: "0.4rem 0.5rem",
  //             borderRadius: "6px",
  //           },
  //         }}
  //         {...yearProp}
  //       />
  //     </Grid.Col>
  //   </Grid>
  // );

  return (
    <>
      <ToastContainer />
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
      <Container
        size="md"
        className="mt-11 mb-14"
        styles={{
          root: {
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "2rem",
            backgroundColor: "#f7f9fc",
            borderRadius: "10px",
            padding: "2rem",
          },
        }}
      >
        <Paper
          shadow="lg"
          radius="lg"
          p="xl"
          className="rounded-xl p-6 font-kanit"
          styles={{
            root: {
              backgroundColor: "#ffffff",
              paddingLeft: "7rem",
              paddingRight: "2rem",
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 4px 10px",
              border: "1px solid #e0e0e0",
            },
          }}
        >
          <Title
            order={1}
            className="text-gray-800 mb-4 text-left text-2xl font-bold"
          >
            แก้ไขประวัติ
          </Title>
          <p className="text-left text-gray-600 mb-6 text-md leading-relaxed mt-1">
            ผู้ประกอบการจะได้รับข้อมูลของคุณเพื่อให้คุณได้รับข้อเสนองานที่เหมาะสม
          </p>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="lg">
              {/* ชื่อและนามสกุล */}
              <Grid grow>
                <Grid.Col span={4}>
                  {renderTextInput({
                    label: "ชื่อ",
                    placeholder: "กรอกชื่อ",
                    inputProps: form.getInputProps("firstName"),
                    size: "medium",
                  })}
                </Grid.Col>
                <Grid.Col span={8}>
                  {renderTextInput({
                    label: "นามสกุล",
                    placeholder: "กรอกนามสกุล",
                    inputProps: form.getInputProps("lastName"),
                    size: "medium",
                  })}
                </Grid.Col>
              </Grid>

              {/* ที่อยู่ปัจจุบัน */}
              <Grid grow>
                <Grid.Col span={8}>
                  {renderTextInput({
                    label: "ที่อยู่ปัจจุบัน",
                    placeholder: "ระบุ เขต หรือ จังหวัด",
                    inputProps: form.getInputProps("location"),
                    size: "long",
                  })}
                </Grid.Col>
              </Grid>

              {/* Email and Phone */}
              <Grid grow>
                <Grid.Col span={6}>
                  {renderTextInput({
                    label: "อีเมล",
                    placeholder: "กรอกอีเมล",
                    inputProps: form.getInputProps("email"),
                    size: "long",
                  })}
                </Grid.Col>
                <Grid.Col span={6}>
                  {renderTextInput({
                    label: "เบอร์โทร",
                    placeholder: "กรอกเบอร์โทรศัพท์",
                    inputProps: form.getInputProps("phone"),
                    size: "medium",
                  })}
                </Grid.Col>
              </Grid>

              {/* About Me */}
              <TextInput
                label="เกี่ยวกับฉัน"
                placeholder="บอกเล่าเกี่ยวกับตัวคุณ"
                className="font-kanit"
                styles={{
                  root: { width: "100%" },
                  label: { color: "#2d3748", fontWeight: 500 },
                  input: {
                    border: "1.5px solid #e2e8f0",
                    padding: "0.4rem 0.6rem",
                    borderRadius: "6px",
                    "&:focus": { borderColor: "#2E8B57" },
                  },
                }}
                {...form.getInputProps("aboutMe")}
              />

              {/* Vulnerability Type */}
              <Select
                label="ประเภทความเปราะบาง/ความพิการ (ถ้ามี)"
                placeholder="เลือกประเภท (ถ้ามี)"
                data={[
                  { value: "none", label: "ไม่มี" },
                  { value: "physical", label: "พิการทางร่างกาย" },
                  { value: "visual", label: "พิการทางการมองเห็น" },
                  { value: "hearing", label: "พิการทางการได้ยิน" },
                  { value: "mental", label: "พิการทางจิตใจ" },
                  { value: "other", label: "อื่นๆ" },
                ]}
                className="font-kanit"
                styles={{
                  input: {
                    border: "1.5px solid #e2e8f0",
                    padding: "0.4rem 0.6rem",
                    borderRadius: "6px",
                    "&:focus": { borderColor: "#2E8B57" },
                  },
                }}
                {...form.getInputProps("vulnerabilityType")}
              />

              {/* Resume Upload */}
              <div className="space-y-2">
                <label className="text-gray-700 font-kanit font-medium text-md">
                  อัปโหลดเรซูเม่
                </label>
                <Dropzone
                  openRef={openRef}
                  onDrop={(files) => {
                    setResumes(files[0]); // Store the File object directly
                  }}
                  radius="md"
                  accept={[
                    MIME_TYPES.jpeg,
                    MIME_TYPES.png,
                    "image/svg+xml", // Correct MIME type for SVG
                    MIME_TYPES.gif,
                  ]}
                  maxSize={1.5 * 1024 ** 2} // 1.5MB
                  maxFiles={1}
                >
                  <div style={{ pointerEvents: "none" }}>
                    <Group justify="center">
                      <Dropzone.Accept>
                        <IconDownload size={50} stroke={1.5} />
                      </Dropzone.Accept>
                      <Dropzone.Reject>
                        <IconX size={50} stroke={1.5} />
                      </Dropzone.Reject>
                      <Dropzone.Idle>
                        <IconCloudUpload size={50} stroke={1.5} />
                      </Dropzone.Idle>
                    </Group>

                    <Text ta="center" fw={700} fz="lg" mt="xl">
                      <Dropzone.Accept>Drop image files here</Dropzone.Accept>
                      <Dropzone.Reject>
                        Only images (JPEG, PNG, SVG, GIF) under 1.5MB
                      </Dropzone.Reject>
                      <Dropzone.Idle>Upload an image</Dropzone.Idle>
                    </Text>
                    <Text ta="center" fz="sm" mt="xs" c="dimmed">
                      Drag & drop image files here to upload. We accept only{" "}
                      <i>.jpeg, .png, .svg, .gif</i> files that are less than
                      1.5MB.
                    </Text>
                  </div>
                </Dropzone>
                {resumes && (
                  <p className="text-sm text-gray-600">
                    ไฟล์ที่เลือก: {resumes.name}
                  </p>
                )}
              </div>

              {/* Experience Section */}
              {/* <div className="space-y-4 mt-6">
                <Title
                  order={4}
                  className="text-gray-800 text-lg font-semibold"
                >
                  ประสบการณ์ล่าสุด
                </Title>
                <Switch
                  label="ฉันมีประสบการณ์"
                  checked={hasExperience}
                  onChange={(e) => setHasExperience(e.currentTarget.checked)}
                  color="green"
                  classNames={{ label: "text-gray-700 font-kanit" }}
                />
              </div> */}

              {/* {hasExperience && (
                <div className="space-y-4">
                  {renderTextInput({
                    label: "ตำแหน่งงาน",
                    placeholder: "ระบุตำแหน่งงานของคุณ",
                    inputProps: form.getInputProps("jobTitle"),
                    size: "long",
                  })}
                  {renderTextInput({
                    label: "บริษัท",
                    placeholder: "ชื่อบริษัท",
                    inputProps: form.getInputProps("company"),
                    size: "long",
                  })}

                  <Grid grow>
                    <Grid.Col span={4}>
                      <label className="text-gray-700 font-kanit font-medium text-md">
                        ตั้งแต่
                      </label>
                      {renderDateGroup({
                        monthProp: form.getInputProps("startMonth"),
                        yearProp: form.getInputProps("startYear"),
                      })}
                    </Grid.Col>
                    <Grid.Col span={5} className="flex items-center"></Grid.Col>
                  </Grid>

                  <Grid grow>
                    <Grid.Col>
                      <label className="text-gray-700 font-kanit font-medium text-md">
                        ถึง
                      </label>
                      <Grid grow>
                        <Grid.Col span={4}>
                          {renderDateGroup({
                            monthProp: form.getInputProps("endMonth"),
                            yearProp: form.getInputProps("endYear"),
                            disabled: form.values.currentlyWorking,
                          })}
                        </Grid.Col>
                        <Grid.Col span={5} className="flex items-center">
                          <Checkbox
                            label="ยังอยู่ในตำแหน่งงานนี้"
                            {...form.getInputProps("currentlyWorking", {
                              type: "checkbox",
                            })}
                            color="green"
                            classNames={{ label: "text-gray-700 font-kanit" }}
                          />
                        </Grid.Col>
                      </Grid>
                    </Grid.Col>
                  </Grid>
                </div>
              )} */}

              {/* Desired Job Category */}
              {/* <div className="space-y-4 mt-6"> */}
              {/* <Title
                  order={4}
                  className="text-gray-800 text-lg font-semibold"
                >
                  ประเภทงานที่ต้องการ
                </Title>
                <Switch
                  label="มีประเภทงานที่ต้องการ"
                  checked={hasDesiredJobCategory}
                  onChange={(e) =>
                    setHasDesiredJobCategory(e.currentTarget.checked)
                  }
                  color="green"
                  classNames={{ label: "text-gray-700 font-kanit" }}
                /> */}

              {/* {hasDesiredJobCategory && (
                  <div className="space-y-4">
                    <Select
                      label="เลือกประเภทงานหลัก"
                      placeholder="เลือกประเภทงาน"
                      data={jobCategories}
                      value={selectedCategory}
                      onChange={setSelectedCategory}
                      className="font-kanit"
                      styles={{
                        input: {
                          border: "1.5px solid #e2e8f0",
                          padding: "0.4rem 0.6rem",
                          borderRadius: "6px",
                          "&:focus": { borderColor: "#2E8B57" },
                        },
                      }}
                    />

                    {selectedCategory && (
                      <Select
                        label="เลือกสายงานย่อย"
                        placeholder="เลือกสายงาน"
                        data={
                          subCategories[
                            selectedCategory as keyof typeof subCategories
                          ]
                        }
                        className="font-kanit"
                        styles={{
                          input: {
                            border: "1.5px solid #e2e8f0",
                            padding: "0.4rem 0.6rem",
                            borderRadius: "6px",
                            "&:focus": { borderColor: "#2E8B57" },
                          },
                        }}
                        {...form.getInputProps("desiredSubCategory")}
                      />
                    )}
                  </div>
                )} */}
              {/* </div> */}

              {/* Submit Button */}
              <div className="flex justify-center w-full mt-4">
                <Button
                  type="submit"
                  size="md"
                  fullWidth
                  variant="filled"
                  color="green"
                  className="h-12 text-md font-medium tracking-wide max-w-sm"
                  styles={{
                    root: {
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
                      },
                      "&:active": {
                        transform: "translateY(1px)",
                      },
                    },
                  }}
                >
                  บันทึก
                </Button>
              </div>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default JobSeekerProfile;
