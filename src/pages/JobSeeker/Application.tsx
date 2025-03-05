import { useEffect, useState } from "react";
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
import { motion } from "framer-motion";

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

const jobCategories = [
  { value: "it", label: "เทคโนโลยีสารสนเทศ (IT)" },
  { value: "finance", label: "การเงินและการธนาคาร" },
  { value: "marketing", label: "การตลาด" },
  { value: "engineering", label: "วิศวกรรม" },
  { value: "healthcare", label: "สุขภาพและการแพทย์" },
  { value: "education", label: "การศึกษา" },
  { value: "design", label: "ออกแบบและครีเอทีฟ" },
  { value: "hr", label: "ทรัพยากรบุคคล (HR)" },
  { value: "sales", label: "ฝ่ายขาย" },
  { value: "logistics", label: "โลจิสติกส์และซัพพลายเชน" },
];

const subCategories = {
  it: [
    { value: "software_engineer", label: "วิศวกรซอฟต์แวร์" },
    { value: "data_scientist", label: "นักวิทยาศาสตร์ข้อมูล" },
    { value: "network_engineer", label: "วิศวกรเครือข่าย" },
    { value: "cybersecurity", label: "ความปลอดภัยทางไซเบอร์" },
    { value: "web_developer", label: "นักพัฒนเว็บ" },
  ],
  finance: [
    { value: "accountant", label: "นักบัญชี" },
    { value: "financial_analyst", label: "นักวิเคราะห์การเงิน" },
    { value: "investment_banker", label: "นักการธนาคารการลงทุน" },
    { value: "auditor", label: "ผู้ตรวจสอบบัญชี" },
    { value: "tax_consultant", label: "ที่ปรึกษาด้านภาษี" },
  ],
  marketing: [
    { value: "digital_marketing", label: "การตลาดดิจิทัล" },
    { value: "brand_manager", label: "ผู้จัดการแบรนด์" },
    { value: "content_marketing", label: "การตลาดเนื้อหา" },
    { value: "social_media_manager", label: "ผู้จัดการโซเชียลมีเดีย" },
    { value: "seo_specialist", label: "ผู้เชี่ยวชาญ SEO" },
  ],
  engineering: [
    { value: "civil_engineer", label: "วิศวกรโยธา" },
    { value: "mechanical_engineer", label: "วิศวกรเครื่องกล" },
    { value: "electrical_engineer", label: "วิศวกรไฟฟ้า" },
    { value: "chemical_engineer", label: "วิศวกรเคมี" },
    { value: "aerospace_engineer", label: "วิศวกรอากาศยาน" },
  ],
  healthcare: [
    { value: "doctor", label: "แพทย์" },
    { value: "nurse", label: "พยาบาล" },
    { value: "pharmacist", label: "เภสัชกร" },
    { value: "physiotherapist", label: "นักกายภาพบำบัด" },
    { value: "medical_researcher", label: "นักวิจัยทางการแพทย์" },
  ],
  education: [
    { value: "teacher", label: "ครู" },
    { value: "professor", label: "อาจารย์มหาวิทยาลัย" },
    { value: "education_consultant", label: "ที่ปรึกษาด้านการศึกษา" },
    { value: "curriculum_designer", label: "ผู้ออกแบบหลักสูตร" },
    { value: "tutor", label: "ติวเตอร์" },
  ],
  design: [
    { value: "graphic_designer", label: "นักออกแบบกราฟิก" },
    { value: "ui_ux_designer", label: "นักออกแบบ UI/UX" },
    { value: "interior_designer", label: "นักออกแบบภายใน" },
    { value: "fashion_designer", label: "นักออกแบบแฟชั่น" },
    { value: "motion_designer", label: "นักออกแบบโมชั่นกราฟิก" },
  ],
  hr: [
    { value: "recruiter", label: "นักสรรหาบุคลากร" },
    { value: "hr_manager", label: "ผู้จัดการฝ่ายทรัพยากรบุคคล" },
    { value: "training_specialist", label: "ผู้เชี่ยวชาญฝึกอบรม" },
    { value: "compensation_analyst", label: "นักวิเคราะห์ค่าตอบแทน" },
    { value: "hr_consultant", label: "ที่ปรึกษาทรัพยากรบุคคล" },
  ],
  sales: [
    { value: "sales_executive", label: "พนักงานฝ่ายขาย" },
    { value: "account_manager", label: "ผู้จัดการบัญชี" },
    { value: "business_development", label: "พัฒนาธุรกิจ" },
    { value: "sales_engineer", label: "วิศวกรฝ่ายขาย" },
    { value: "retail_sales", label: "ฝ่ายขายปลีก" },
  ],
  logistics: [
    { value: "supply_chain_manager", label: "ผู้จัดการซัพพลายเชน" },
    { value: "logistics_coordinator", label: "ผู้ประสานงานโลจิสติกส์" },
    { value: "warehouse_manager", label: "ผู้จัดการคลังสินค้า" },
    { value: "transportation_manager", label: "ผู้จัดการการขนส่ง" },
    { value: "procurement_specialist", label: "ผู้เชี่ยวชาญจัดซื้อ" },
  ],
};

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
  
  useEffect(() => {
    refetchjobseeker();
    refetchCompany();
    refetchemployer();
    setIsHaveUser(!!user);
  }, [user, isLoading, isStale]);

  const [hasExperience, setHasExperience] = useState<boolean>(true);
  const [hasDesiredJobCategory, setHasDesiredJobCategory] =
    useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  document.body.style.backgroundColor = "#f7f9fc";

  const form = useForm({
    initialValues: {
      firstName: "John",
      lastName: "Doe",
      location: "123 Main St, Bangkok",
      jobTitle: "",
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
      resume: null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log("Submitted values:", values);
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

  const renderDateGroup = ({
    monthProp,
    yearProp,
    disabled = false,
  }: SelectProps) => (
    <Grid grow className="w-full">
      <Grid.Col span={3}>
        <Select
          placeholder="เดือน"
          data={[
            "มกราคม",
            "กุมภาพันธ์",
            "มีนาคม",
            "เมษายน",
            "พฤษภาคม",
            "มิถุนายน",
            "กรกฎาคม",
            "สิงหาคม",
            "กันยายน",
            "ตุลาคม",
            "พฤศจิกายน",
            "ธันวาคม",
          ]}
          disabled={disabled}
          className="w-full"
          styles={{
            input: {
              border: "1.5px solid #e2e8f0",
              padding: "0.4rem 0.5rem",
              borderRadius: "6px",
            },
          }}
          {...monthProp}
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <Select
          placeholder="ปี"
          data={years}
          disabled={disabled}
          className="w-full"
          styles={{
            input: {
              border: "1.5px solid #e2e8f0",
              padding: "0.4rem 0.5rem",
              borderRadius: "6px",
            },
          }}
          {...yearProp}
        />
      </Grid.Col>
    </Grid>
  );

  return (
    <>
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
        className="mt-11 mb-14 kanit-regular"
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
          <div className="text-gray-800 mb-4 text-left text-2xl font-bold kanit-regular ">
            แก้ไขประวัติ
          </div>
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
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      form.setFieldValue("resume", file);
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {form.values.resume && (
                  <p className="text-sm text-gray-600">
                    ไฟล์ที่เลือก: {form.values.resume.name}
                  </p>
                )}
              </div>

              {/* Experience Section */}
              <div className="space-y-4 mt-6">
                <div className="text-gray-800 text-lg font-semibold kanit-regular">
                  ประสบการณ์ล่าสุด
                </div>
                <Switch
                  label="ฉันมีประสบการณ์"
                  checked={hasExperience}
                  onChange={(e) => setHasExperience(e.currentTarget.checked)}
                  color="green"
                  classNames={{ label: "text-gray-700 font-kanit" }}
                />
              </div>

              {hasExperience && (
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
                            className=""
                            label="ยังอยู่ในตำแหน่งงานนี้"
                            {...form.getInputProps("currentlyWorking", {
                              type: "checkbox",
                            })}
                           
                            classNames={{ label: "text-gray-700 font-kanit " }}
                          />
                        </Grid.Col>
                      </Grid>
                    </Grid.Col>
                  </Grid>
                </div>
              )}

              {/* Desired Job Category */}
              <div className="space-y-4 mt-6">
                <div className="text-gray-800 text-lg font-semibold kanit-regular">
                  ประเภทงานที่ต้องการ
                </div>

                <Switch
                  label="มีประเภทงานที่ต้องการ"
                  checked={hasDesiredJobCategory}
                  onChange={(e) =>
                    setHasDesiredJobCategory(e.currentTarget.checked)
                  }
                  color="green"
                  classNames={{ label: "text-gray-700 font-kanit" }}
                />

                {hasDesiredJobCategory && (
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
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center w-full mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-seagreen p-3 text-md font-medium tracking-wide rounded-lg text-white kanit-regular"
                >
                  บันทึก
                </motion.button>
              </div>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default JobSeekerProfile;