"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { MultiSelect, RangeSlider, Button, TextInput, Select, Box, Stack, Text, Group, Divider } from "@mantine/core"


// Mocks
const jobCategories = ["ไอที", "การตลาด", "การขาย", "การออกแบบ", "วิศวกรรม"]
const universalDesigns = ["ทางเข้าเข้าถึงได้", "ป้ายอักษรเบรลล์", "รองรับโปรแกรมอ่านหน้าจอ"]
const skills = ["a", "b", "c", "d", "e"]
const locations = ["กรุงเทพมหานคร", "เชียงใหม่", "ภูเก็ต", "พัทยา"]
const workDates = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"]

function Sidebar() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedJobCategories, setSelectedJobCategories] = useState<string[]>([])
  const [selectedUniversalDesigns, setSelectedUniversalDesigns] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 200000])
  const [workHourRange, setWorkHourRange] = useState<[number, number]>([0, 24])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedWorkDates, setSelectedWorkDates] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const handleMultiSelectChange = useCallback((setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    return (value: string[]) => {
      if (value.length === 0) {
        setter(["ทั้งหมด"])
      } else {
        setter(value.filter((item) => item !== "ทั้งหมด"))
      }
    }
  }, [])

  const handleSearch = () => {
    console.log("Searching with filters:", {
      searchTerm,
      selectedJobCategories,
      selectedUniversalDesigns,
      selectedSkills,
      salaryRange,
      workHourRange,
      selectedLocations,
      selectedWorkDates,
      sortBy,
      sortOrder,
    })
  }

  const handleSortChange = (value: string | null) => {
    if (value === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(value)
      setSortOrder("asc")
    }
  }

  const sortOptions = [
    { value: "relevance", label: "ความเกี่ยวข้อง" },
    { value: "salary_asc", label: "เงินเดือน (ต่ำไปสูง)" },
    { value: "salary_desc", label: "เงินเดือน (สูงไปต่ำ)" },
    { value: "date_asc", label: "วันที่ลงประกาศ (เก่าไปใหม่)" },
    { value: "date_desc", label: "วันที่ลงประกาศ (ใหม่ไปเก่า)" },
  ]

  return (
    <Box className="bg-white shadow-md rounded-lg p-6 w-80 hidden md:block">
      <Stack>
        <TextInput
          className="kanit-regular"
          placeholder=""
          label="ค้นหา"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
        />

        <Divider className="kanit-regular" label="ข้อมูลงาน" labelPosition="center" />

        <MultiSelect
          className="kanit-regular"
          data={["ทั้งหมด", ...jobCategories]}
          label="หมวดหมู่งาน"
          placeholder=""
          value={selectedJobCategories.length === 0 ? ["ทั้งหมด"] : selectedJobCategories}
          onChange={handleMultiSelectChange(setSelectedJobCategories)}
          clearable
          searchable
        />

        <MultiSelect
          className="kanit-regular"
          data={["ทั้งหมด", ...universalDesigns]}
          label="Universal Design"
          placeholder=""
          value={selectedUniversalDesigns.length === 0 ? ["ทั้งหมด"] : selectedUniversalDesigns}
          onChange={handleMultiSelectChange(setSelectedUniversalDesigns)}
          clearable
          searchable
        />

        <MultiSelect
          className="kanit-regular"
          data={["ทั้งหมด", ...skills]}
          label="ทักษะ"
          placeholder=""
          value={selectedSkills.length === 0 ? ["ทั้งหมด"] : selectedSkills}
          onChange={handleMultiSelectChange(setSelectedSkills)}
          clearable
          searchable
        />

        <Box>
          <Text size="sm" className="kanit-regular">
            เงินเดือน: ฿{salaryRange[0].toLocaleString()} - ฿{salaryRange[1].toLocaleString()}
          </Text>
          <RangeSlider
            min={0}
            max={200000}
            step={1000}
            value={salaryRange}
            onChange={setSalaryRange}
            label={(value) => `฿${value.toLocaleString()}`}
          />
        </Box>

        <Divider className="kanit-regular" label="เวลาทำงาน" labelPosition="center" />

        <Box>
          <Text size="sm" className="kanit-regular">
            ช่วงเวลาทำงาน: {workHourRange[0]}:00 - {workHourRange[1]}:00
          </Text>
          <RangeSlider
            min={0}
            max={24}
            step={1}
            value={workHourRange}
            onChange={setWorkHourRange}
            label={(value) => `${value}:00`}
          />
        </Box>

        <MultiSelect
          className="kanit-regular"
          data={["ทั้งหมด", ...workDates]}
          label="วันทำงาน"
          placeholder=""
          value={selectedWorkDates.length === 0 ? ["ทั้งหมด"] : selectedWorkDates}
          onChange={handleMultiSelectChange(setSelectedWorkDates)}
          clearable
          searchable
        />

        <Divider className="kanit-regular" label="สถานที่ทำงาน" labelPosition="center" />

        <MultiSelect
          className="kanit-regular"
          data={["ทั้งหมด", ...locations]}
          label="สถานที่ทำงาน"
          placeholder=""
          value={selectedLocations.length === 0 ? ["ทั้งหมด"] : selectedLocations}
          onChange={handleMultiSelectChange(setSelectedLocations)}
          clearable
          searchable
        />

        <Divider />

        <Group grow>
          <Select
            className="kanit-regular"
            label="เรียงตาม"
            placeholder=""
            value={sortBy}
            onChange={(value) => {
              setSortBy(value)
              setSortOrder(value?.endsWith("_desc") ? "desc" : "asc")
            }}
            data={sortOptions}
             rightSection={
              sortBy ? (
                sortOrder === "asc" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-up" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="18" y1="11" x2="12" y2="5" />
                  <line x1="6" y1="11" x2="12" y2="5" />
                </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-down" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="18" y1="13" x2="12" y2="19" />
                    <line x1="6" y1="13" x2="12" y2="19" />
                  </svg>
                )
              ) : null
            }
          />
        </Group>

        <Button className="kanit-regular" onClick={handleSearch} fullWidth>
          ค้นหา
        </Button>
      </Stack>
    </Box>
  )
}

export default Sidebar

