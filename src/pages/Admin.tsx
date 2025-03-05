"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { ClipLoader } from "react-spinners" // You can use any spinner library
import {
  fetchAdminInfo,
  generateAdmin,
  fetchApprovalRequests,
  loginAdmin,
  logoutAdmin,
  approveUser,
} from "../api/Admin"
import { getAllSkills, createSkill, deleteSkill } from "../api/Skills"
import { getAllCategories, createCategory, deleteCategory } from "../api/JobCategories"
import { getAdminMatchingStatus } from "../api/Matching"
import {
  FiUser,
  FiKey,
  FiLogOut,
  FiLogIn,
  FiPlus,
  FiTrash2,
  FiCheck,
  FiX,
  FiSettings,
  FiList,
  FiTag,
  FiPackage,
  FiUserCheck,
  FiUserX,
  FiRefreshCw,
} from "react-icons/fi"

interface ApprovalRequest {
  id: string
  userId: string
  userType: string
  status: string
  adminId: string
  imageUrl?: string // Add this line
}

const Admin: React.FC = () => {
  const queryClient = useQueryClient()
  const [loginLoading, setLoginLoading] = useState<boolean>(false)
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const [skills, setSkills] = useState<any[]>([])
  const [jobCategories, setJobCategories] = useState<any[]>([])
  const [newSkill, setNewSkill] = useState({ name: "", description: "" })
  const [newCategory, setNewCategory] = useState({ name: "", description: "" })

  const fetchSkills = async () => {
    try {
      const response = await getAllSkills()
      setSkills(response.data)
    } catch (error) {
      console.error("Failed to fetch skills:", error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories()
      setJobCategories(response.data)
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    }
  }

  const handleCreateSkill = async () => {
    try {
      await createSkill(newSkill)
      fetchSkills()
      setNewSkill({ name: "", description: "" })
    } catch (error) {
      console.error("Failed to create skill:", error)
    }
  }

  const handleCreateCategory = async () => {
    try {
      await createCategory(newCategory)
      fetchCategories()
      setNewCategory({ name: "", description: "" })
    } catch (error) {
      console.error("Failed to create category:", error)
    }
  }

  const handleDeleteSkill = async (id: string) => {
    try {
      await deleteSkill(id)
      fetchSkills()
    } catch (error) {
      console.error("Failed to delete skill:", error)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id)
      fetchCategories()
    } catch (error) {
      console.error("Failed to delete category:", error)
    }
  }

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn")
    const storedAdminInfo = localStorage.getItem("adminInfo")

    if (storedIsLoggedIn === "true" && storedAdminInfo) {
      setIsLoggedIn(true)
      fetchSkills()
      fetchCategories()
      queryClient.setQueryData("adminInfo", JSON.parse(storedAdminInfo))
    }
  }, [queryClient])

  const { data: Allmatching, isLoading: AllmatchingLoading } = useQuery("Allmatching", getAdminMatchingStatus, {
    enabled: isLoggedIn,
  })

  const { data: adminInfo, isLoading: adminLoading } = useQuery("adminInfo", fetchAdminInfo, { enabled: isLoggedIn })
  const { data: approvalRequests = [], isLoading: approvalLoading } = useQuery(
    "approvalRequests",
    fetchApprovalRequests,
    {
      enabled: isLoggedIn,
    },
  )
  const generateAdminMutation = useMutation(generateAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries("adminInfo")
    },
  })

  const loginAdminMutation = useMutation(
    ({ name, password }: { name: string; password: string }) => loginAdmin(name, password),
    {
      onSuccess: (data) => {
        queryClient.setQueryData("adminInfo", data)
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("adminInfo", JSON.stringify(data))
      },
    },
  )
  const logoutAdminMutation = useMutation(logoutAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries("adminInfo")
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("adminInfo")
      queryClient.setQueryData("adminInfo", null)
    },
  })
  const approveUserMutation = useMutation(
    ({ userId, status }: { userId: string; status: string }) => approveUser(userId, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("approvalRequests")
      },
    },
  )

  const handleGenerateAdmin = () => {
    generateAdminMutation.mutate()
  }

  const handleAdminLogin = (name: string, password: string) => {
    setLoginLoading(true)
    loginAdminMutation.mutate(
      { name, password },
      {
        onSuccess: () => {
          setIsLoggedIn(true)
        },
        onSettled: () => {
          setLoginLoading(false)
        },
      },
    )
  }

  const handleAdminLogout = () => {
    setLogoutLoading(true)
    logoutAdminMutation.mutate(undefined, {
      onSuccess: () => {
        setIsLoggedIn(false)
      },
      onSettled: () => {
        setLogoutLoading(false)
      },
    })
  }

  const handleApproveUser = (userId: string, status: string) => {
    approveUserMutation.mutate({ userId, status })
  }

  return (
    <div className="relative bg-gray-50 min-h-screen kanit-regular">
      {(adminLoading || approvalLoading) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 p-1 rounded-full bg-gray-800 text-white hover:bg-gray-700"
            >
              <FiX className="w-5 h-5" />
            </button>
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Full Screen"
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">ผู้ดูแลระบบ</h1>
          {adminInfo && (
            <div className="flex items-center gap-3 bg-white py-2 px-4 rounded-lg shadow">
              <FiUser className="text-indigo-600 w-5 h-5" />
              <div>
                <p className="font-medium text-gray-900">{adminInfo.username}</p>
                <p className="text-xs text-gray-500">ID: {adminInfo.id}</p>
              </div>
              <button
                onClick={handleAdminLogout}
                className="ml-4 flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                disabled={logoutLoading}
              >
                {logoutLoading ? <ClipLoader color="#dc2626" size={16} /> : <FiLogOut className="w-4 h-4" />}
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Admin Generation and Login Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-seagreen px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <FiSettings className="w-5 h-5" /> การจัดการผู้ดูแลระบบ
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="border-b pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <FiRefreshCw className="w-4 h-4 text-seagreen" /> สร้างผู้ดูแลระบบ
                    </h3>
                  <button
                    onClick={handleGenerateAdmin}
                    className="flex items-center gap-2 px-4 py-2 bg-seagreen text-white rounded-md hover:bg-seagreen/90 transition-colors shadow-sm"
                    disabled={generateAdminMutation.isLoading}
                  >
                    {generateAdminMutation.isLoading ? (
                      <ClipLoader color="#ffffff" size={20} />
                    ) : (
                        <>
                        <FiPlus className="w-4 h-4 bg" /> สร้างผู้ดูแลระบบใหม่
                        </>
                    )}
                  </button>
                </div>

                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <FiLogIn className="w-4 h-4 text-seagreen" /> เข้าสู่ระบบผู้ดูแล
                    </h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      const formData = new FormData(e.currentTarget)
                      const username = formData.get("username") as string
                      const password = formData.get("password") as string
                      handleAdminLogin(username, password)
                    }}
                    className="space-y-4"
                  >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อผู้ใช้</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="username"
                          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">รหัสผ่าน</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiKey className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          name="password"
                          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-4 py-2 bg-seagreen text-white rounded-md hover:bg-seagreen/90 transition-colors shadow-sm"
                        disabled={loginLoading}
                      >
                        {loginLoading ? <ClipLoader color="#ffffff" size={20} /> : <FiLogIn className="w-4 h-4" />}
                        <span>เข้าสู่ระบบ</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Skills Management */}
            {adminInfo && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <FiTag className="w-5 h-5" /> การจัดการทักษะ
                  </h2>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">เพิ่มทักษะ</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        placeholder="Skill Name"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={newSkill.description}
                        onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <button
                        onClick={handleCreateSkill}
                        className="whitespace-nowrap flex items-center justify-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <FiPlus className="w-4 h-4" /> เพิ่มทักษะ
                      </button>
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto pr-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">ทักษะปัจจุบัน</h3>
                    <ul className="divide-y divide-gray-200">
                      {skills.map((skill) => (
                        <li key={skill.id} className="flex justify-between items-center py-3">
                          <div>
                            <p className="font-medium text-gray-900">{skill.name}</p>
                            <p className="text-sm text-gray-500">{skill.description}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteSkill(skill.id)}
                            className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                          >
                            <FiTrash2 className="w-4 h-4" /> ลบ
                          </button>
                        </li>
                      ))}
                      {skills.length === 0 && <li className="py-3 text-center text-gray-500">ไม่พบเจอทักษะ</li>}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Job Categories and Approval Requests */}
          <div className="space-y-6">
            {adminInfo && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <FiPackage className="w-5 h-5" /> หมวดหมู่งาน
                    </h2>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">เพิ่มหมวดหมู่งาน</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        placeholder="Category Name"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={newCategory.description}
                        onChange={(e) =>
                          setNewCategory({
                            ...newCategory,
                            description: e.target.value,
                          })
                        }
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <button
                        onClick={handleCreateCategory}
                        className="whitespace-nowrap flex items-center justify-center gap-1 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                      >
                        <FiPlus className="w-4 h-4" /> เพิ่มหมวดหมู่งาน
                      </button>
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto pr-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">หมวดหมู่งานปัจจุบัน</h3>
                    <ul className="divide-y divide-gray-200">
                      {jobCategories.map((category) => (
                        <li key={category.id} className="flex justify-between items-center py-3">
                          <div>
                            <p className="font-medium text-gray-900">{category.name}</p>
                            <p className="text-sm text-gray-500">{category.description}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                          >
                            <FiTrash2 className="w-4 h-4" /> ลบ
                          </button>
                        </li>
                      ))}
                      {jobCategories.length === 0 && (
                        <li className="py-3 text-center text-gray-500">ไม่พบเจอทักษะ</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Approval Requests */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-seagreen px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <FiUserCheck className="w-5 h-5" /> คำขออนุมัติการลงทะเบียน
                </h2>
              </div>
              <div className="p-6">
                {adminInfo ? (
                  Array.isArray(approvalRequests) && approvalRequests.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {approvalRequests.map((request: ApprovalRequest) => (
                        <li key={request.id} className="py-4">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            {request.imageUrl && (
                              <div className="flex-shrink-0">
                                <img
                                  src={request.imageUrl || "/placeholder.svg"}
                                  alt="User"
                                  className="w-16 h-16 rounded-lg object-cover cursor-pointer border border-gray-200"
                                  onClick={() => setSelectedImage(request.imageUrl || "")}
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">User ID: {request.userId}</p>
                              <div className="mt-1 flex items-center">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {request.userType}
                                </span>
                                <span
                                  className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    request.status === "APPROVED"
                                      ? "bg-green-100 text-green-800"
                                      : request.status === "UNAPPROVED"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {request.status}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleApproveUser(request.id, "APPROVED")}
                                className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors"
                              >
                                <FiCheck className="w-4 h-4" /> ยืนยัน
                              </button>
                                <button
                                onClick={() => handleApproveUser(request.id, "UNAPPROVED")}
                                className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                                >
                                <FiX className="w-4 h-4" /> ปฏิเสธ
                                </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <FiList className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">ไม่มีคำขออนุมัติ</h3>
                        <p className="mt-1 text-sm text-gray-500">ไม่มีคำขอที่รอการอนุมัติในขณะนี้</p>
                    </div>
                  )
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FiUserX className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">ยังไม่ได้เข้าสู่ระบบ</h3>
                    <p className="mt-1 text-sm text-gray-500">กรุณาเข้าสู่ระบบเพื่อดูคำขออนุมัติ</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Matching Status Section */}
        {adminInfo && (
          <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-seagreen px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <FiList className="w-5 h-5" /> สถานะการจับคู่ทั้งหมด
                </h2>
            </div>
            <div className="p-6">
              {AllmatchingLoading ? (
                <div className="flex justify-center items-center py-12">
                  <ClipLoader color="#6366f1" size={40} />
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Finding Matches */}
                  {Allmatching?.data?.findingMatches && Allmatching.data.findingMatches.length > 0 && (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">การจับคู่สำหรับการหางาน</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {Allmatching.data.findingMatches.map((status: any) => (
                          <div key={status.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    status.status === "MATCHED"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {status.status}
                                </span>
                                <p className="text-xs text-gray-500 mt-1">
                                  Created: {new Date(status.createdAt).toLocaleString()}
                                </p>
                              </div>
                              <p className="text-xs text-gray-500">ID: {status.id}</p>
                            </div>
                            <div className="bg-white p-3 rounded border border-gray-200">
                              <h4 className="font-medium text-gray-900">{status.toPost.title}</h4>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{status.toPost.description}</p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                  {status.toPost.jobLocation}
                                </span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                  ${status.toPost.expectedSalary}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hiring Matches */}
                  {Allmatching?.data?.hiringMatches && Allmatching.data.hiringMatches.length > 0 && (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">การจับคู่สำหรับการจ้างงาน</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {Allmatching.data.hiringMatches.map((status: any) => (
                          <div key={status.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    status.status === "MATCHED"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {status.status}
                                </span>
                                <p className="text-xs text-gray-500 mt-1">
                                  Created: {new Date(status.createdAt).toLocaleString()}
                                </p>
                              </div>
                              <p className="text-xs text-gray-500">ID: {status.id}</p>
                            </div>
                            <div className="bg-white p-3 rounded border border-gray-200">
                              <h4 className="font-medium text-gray-900">{status.toPost.title}</h4>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{status.toPost.description}</p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                  {status.toPost.jobLocation}
                                </span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                  ${status.toPost.salary}
                                </span>
                              </div>
                            </div>

                            {status.toMatchSeekers && status.toMatchSeekers.length > 0 && (
                              <div className="mt-3">
                                <h5 className="text-sm font-medium text-gray-900 mb-2">
                                  ผู้หางานที่จับคู่ ({status.toMatchSeekers.length})
                                </h5>
                                <div className="max-h-40 overflow-y-auto pr-1">
                                  <ul className="divide-y divide-gray-200 bg-white rounded border border-gray-200">
                                    {status.toMatchSeekers.map((seeker: any) => (
                                      <li
                                        key={seeker.jobSeekerId || seeker.oauthJobSeekerId}
                                        className="px-3 py-2 text-sm"
                                      >
                                        <p className="font-medium text-gray-900">
                                          ID: {seeker.jobSeekerId || seeker.oauthJobSeekerId}
                                        </p>
                                        <p className="text-xs text-gray-500">สถานะ: {seeker.status}</p>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(!Allmatching?.data?.findingMatches || Allmatching.data.findingMatches.length === 0) &&
                    (!Allmatching?.data?.hiringMatches || Allmatching.data.hiringMatches.length === 0) && (
                      <div className="text-center py-8 text-gray-500">
                        <FiList className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">ไม่พบการจับคู่</h3>
                        <p className="mt-1 text-sm text-gray-500">ไม่พบการจับคู่งานในขณะนี้</p>
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin

