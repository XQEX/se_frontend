import React, { useEffect, useState } from "react";
import { NewNav } from "../../components/NewNav";
import { motion } from "framer-motion";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { RiPencilFill } from "react-icons/ri";
import { ImageDropzoneButton } from "../../components/ImageDropzoneButton";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import style from "./ProfileEmployers.module.css";
import { SiGmail } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa6";
import { TextInput } from "@mantine/core";
import { MdWork } from "react-icons/md";
import { RiUserFollowFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa6";
import { BsPostcardHeart } from "react-icons/bs";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdAutoGraph } from "react-icons/md";
import { ArticleCard } from "../../components/ArticleCard";
import { MdWorkspacePremium } from "react-icons/md";
import { updateUserProfile } from "../../api/EmployerAndCompany";
import {
  updateCompanyPassword,
  updateCompanyUsername,
} from "../../api/Company";
import {
  updateEmployerPassword,
  updateEmployerUsername,
} from "../../api/Employer";
import { AxiosError } from "axios";
import { IconPencil } from "@tabler/icons-react";

function Profile() {
  const navigate = useNavigate();
  // Helper function for toast messages
  const notifyError = (message: string) =>
    toast.error(message, { position: "top-center" });
  const notifySuccess = (message: string) =>
    toast.success(message, { position: "top-center" });

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
  // Track which tab is active; default is "work"
  const [activeTab, setActiveTab] = React.useState("work");

  // Function to handle tab changes
  const handleTabClick = (tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName);
  };

  // Common classes for all tabs
  const baseTabClasses = "pb-1 transition";

  // Active vs. inactive styles
  const activeClasses =
    "text-gray-900 font-semibold border-b-2 border-gray-900";
  const inactiveClasses = "text-gray-600 hover:text-gray-900";

  const [
    profileDropzoneOpened,
    { toggle: profileDropzoneToggle, close: profileDropzoneClose },
  ] = useDisclosure(false);
  const [
    editProfileOpened,
    { toggle: editProfileToggle, close: editProfileClose },
  ] = useDisclosure(false);
  const [firstNameValue, setFirstNameValue] = useState<string>("");
  const [lastNameValue, setLastNameValue] = useState<string>("");
  const [aboutMeValue, setAboutMeValue] = useState<string>("");
  const [addressValue, setAddressValue] = useState<string>("");
  const [emailValue, setEmailValue] = useState<string>("");
  const [phoneNumberValue, setPhoneNumberValue] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [aboutMeError, setAboutMeError] = useState<string>("");
  const [addressError, setAddressError] = useState<string>("");

  //editing part
  const [userNameValue, setuserNameValue] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setConfirmPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [confirmpassword2, setConfirmPassword2] = useState<string>("");

  useEffect(() => {
    if (user.type === "COMPANY") {
      setFirstNameValue(user.officialName);
      setLastNameValue("");
      setAboutMeValue(user.aboutUs);
      setAddressValue(user.address);
      setEmailValue(user.email);
      setuserNameValue(user.username);
      setPhoneNumberValue(user.contact);
    } else {
      setFirstNameValue(user.firstName);
      setLastNameValue(user.lastName);
      setAboutMeValue(user.aboutMe);
      setAddressValue(user.address);
      setEmailValue(user.email);
      setuserNameValue(user.username);
      setPhoneNumberValue(user.contact);
    }

    setFirstNameError("");
    setLastNameError("");
    setAboutMeError("");
    setAddressError("");
  }, [editProfileOpened]);

  const validateEditData = () => {
    let isValidateFirstName = true;
    let isValidateLastName = true;
    let isValidateAddress = true;
    let isValidateEmail = true;
    let isValidatePhoneNumber = true;

    setFirstNameError("");
    setLastNameError("");
    setAboutMeError("");
    setAddressError("");

    // first name validation
    if (firstNameValue == "") {
      isValidateFirstName = false;
      setFirstNameError("Please enter your first name");
    }

    // last name validation (only for non-company users)
    if (user.type !== "COMPANY" && lastNameValue == "") {
      isValidateLastName = false;
      setLastNameError("Please enter your last name");
    }

    // address validation
    if (addressValue == "") {
      isValidateAddress = false;
      setAddressError("Please enter your address");
    }

    return (
      isValidateFirstName &&
      isValidateLastName &&
      isValidateAddress &&
      isValidateEmail &&
      isValidatePhoneNumber
    );
  };

  const onUserConfirmEdit = async () => {
    if (validateEditData()) {
      try {
        const updatedUser = {
          firstName: firstNameValue,
          lastName: lastNameValue,
          aboutMe: aboutMeValue,
          address: addressValue,
          email: emailValue,
          contact: phoneNumberValue,
          userType: user.type,
          aboutUs: user.aboutUs,
          officialName: user.officialName,
        };

        if (user.type === "COMPANY") {
          updatedUser.officialName = firstNameValue;
          updatedUser.aboutUs = aboutMeValue;
          updatedUser.address = addressValue;
          updatedUser.email = emailValue;
          updatedUser.contact = phoneNumberValue;
        }

        await updateUserProfile(updatedUser);
        notifySuccess("Profile updated successfully");
        refetchjobseeker();
      } catch (error) {
        notifyError(error as string);
      }
    }
  };

  const onUserConfirmEditUsernameEmp = async () => {
    if (password !== confirmpassword) {
      notifyError("Passwords do not match");
      return;
    }
    try {
      const response = await updateEmployerUsername(userNameValue, password);
      console.log("response:", response);
      // if (response.data.error) {
      //   notifyError(response.data.error);
      //   return;
      // }
      notifySuccess("username updated successfully");

      refetchemployer();
    } catch (error) {
      if (error instanceof AxiosError) {
        notifyError((error as AxiosError).response.data.msg);
      } else {
        notifyError(error as string);
      }
    }
  };

  const onUserConfirmEditPasswordEmp = async () => {
    if (password2 !== confirmpassword2) {
      notifyError("Passwords do not match");
      return;
    }
    try {
      await updateEmployerPassword(newPassword, password2);
      notifySuccess("Passwords updated successfully");

      refetchemployer();
    } catch (error) {
      if (error instanceof AxiosError) {
        notifyError((error as AxiosError).response.data.msg);
      } else {
        notifyError(error as string);
      }
    }
  };

  const onUserConfirmEditUsernameCom = async () => {
    if (password !== confirmpassword) {
      notifyError("Passwords do not match");
      return;
    }
    try {
      const response = await updateCompanyUsername(userNameValue, password);
      console.log("response:", response);
      // if (response.data.error) {
      //   notifyError(response.data.error);
      //   return;
      // }
      notifySuccess("username updated successfully");

      refetchCompany();
    } catch (error) {
      if (error instanceof AxiosError) {
        notifyError((error as AxiosError).response.data.msg);
      } else {
        notifyError(error as string);
      }
    }
  };

  const onUserConfirmEditPasswordCom = async () => {
    if (password2 !== confirmpassword2) {
      notifyError("Passwords do not match");
      return;
    }
    try {
      await updateCompanyPassword(newPassword, password2);
      notifySuccess("Passwords updated successfully");

      refetchCompany();
    } catch (error) {
      if (error instanceof AxiosError) {
        notifyError((error as AxiosError).response.data.msg);
      } else {
        notifyError(error as string);
      }
    }
  };

  return (
    <div>
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

      <header className="bg-gradient-to-r from-seagreen to-amber-200 h-40 w-full relative"></header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 -mt-20 flex flex-col md:flex-row items-center md:items-start">
            <div className="w-48 h-48 rounded-3xl overflow-hidden border-4 border-white shadow-md">
              <img
                src={
                  user.profilePicture !== "UNDEFINED"
                    ? user.profilePicture
                    : "พิการ.jpg"
                }
                alt="Profile photo"
                className="object-cover w-full h-full"
              />

              <div
                className="absolute top-7 left-[202px] rounded-3xl p-[6px] z-10 cursor-pointer"
                onClick={profileDropzoneToggle}
              >
                <div className="absolute text-base rounded-3xl p-[6px] z-10">
                  <span className="absolute left-0 top-0 w-full h-full bg-white rounded-3xl opacity-70"></span>
                  <RiPencilFill className="opacity-0" />
                </div>

                <div className="absolute text-lg rounded-3xl p-[6px] z-30">
                  <RiPencilFill />
                </div>
              </div>
            </div>

            <Modal
              opened={profileDropzoneOpened}
              onClose={profileDropzoneClose}
              title=""
            >
              {user ? (
                <ImageDropzoneButton
                  userId={user.id}
                  bucketName={"employer"}
                  prefixPath={"profile"}
                  userType={user.type}
                />
              ) : (
                <p>Loading...</p>
              )}
            </Modal>

            <div className="mt-4 md:mt-0 md:ml-6 md:mr-3 flex-1">
              <div
                className={`
                    flex items-center rounded-lg
                    ${style["jobseeker-name-container"]}
                  `}
              >
                <h1 className="text-xl md:text-2xl font-semibold mr-2 pl-3">
                  {user.type === "COMPANY" ? user.officialName : user.firstName}{" "}
                  {user.type !== "COMPANY" && user.lastName}
                </h1>

                <p className="text-gray-600 mt-1 text-sm md:text-base">
                  ({user.type === "COMPANY" ? user.aboutUs : user.aboutMe})
                </p>
              </div>

              <div className="relative mt-3 ml-1">
                <div className="flex items-center text-sm md:text-base font-semibold text-amber-400">
                  <span className="mr-[6px] -ml-[2px] pt-[1px] text-xl">
                    <MdWorkspacePremium />
                  </span>
                  : {user.type}
                </div>

                <div className="flex items-center text-sm md:text-base mt-2 text-gray-700">
                  <span className="mr-2">
                    <FaAddressBook color="#4a5568" />
                  </span>
                  : {user.address}
                </div>

                <div className="flex items-center text-sm md:text-base mt-2 text-gray-700">
                  <span className="mr-2 pt-[1px]">
                    <SiGmail color="#4a5568" />
                  </span>
                  : {user.email}
                </div>

                <div className="flex items-center text-sm md:text-base mt-2 text-gray-700">
                  <span className="mr-2">
                    <FaPhoneAlt color="#4a5568" />
                  </span>
                  : {user.contact}
                </div>
              </div>
            </div>

            <div className="h-48">
              <div className="mt-6 md:mt-0 md:ml-auto grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-lg font-semibold">2,985</p>
                  <div className="flex justify-center text-sm font-medium text-orange-400">
                    <span className="pt-[1px] mr-1 text-lg">
                      <MdWork />
                    </span>
                    Work
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold">132</p>
                  <div className="flex justify-center text-sm font-medium text-blue-400">
                    <span className="pt-[1px] mr-1 text-lg">
                      <RiUserFollowFill />
                    </span>
                    Following
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold">548</p>
                  <div className="flex justify-center text-sm font-medium text-pink-400">
                    <span className="pt-[1px] mr-1 text-lg">
                      <FaHeart />
                    </span>
                    Likes
                  </div>
                </div>
              </div>

              <div className="mt-28 w-full flex justify-end">
                <button
                  className="bg-seagreen text-white px-4 py-2 rounded-md hover:bg-green-700 transition flex items-center space-x-2 order-last"
                  onClick={editProfileToggle}
                >
                  <IconPencil className="text-xl" />
                  <span>แก้ไข</span>
                </button>
              </div>

              <Modal
                opened={editProfileOpened}
                onClose={editProfileClose}
                title="Edit Profile"
                styles={{
                  title: {
                    fontWeight: "bold",
                  },
                }}
              >
                <TextInput
                  mt="md"
                  label="username"
                  placeholder="your username"
                  required
                  inputWrapperOrder={["label", "input", "error"]}
                  value={userNameValue}
                  onChange={(event) => setuserNameValue(event.target.value)}
                />

                <TextInput
                  mt="md"
                  label="password"
                  placeholder="password for changing username"
                  required
                  inputWrapperOrder={["label", "input", "error"]}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                <TextInput
                  mt="md"
                  label="confirmpassword"
                  placeholder="confirm your password"
                  required
                  inputWrapperOrder={["label", "input", "error"]}
                  value={confirmpassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <button
                  className="text-base bg-green-600 text-white px-3 py-1 rounded-sm hover:bg-green-500 transition"
                  onClick={
                    user.type === "EMPLOYER"
                      ? onUserConfirmEditUsernameEmp
                      : onUserConfirmEditUsernameCom
                  }
                >
                  update username
                </button>

                <TextInput
                  mt="md"
                  label="new password"
                  placeholder="your new password"
                  required
                  inputWrapperOrder={["label", "input", "error"]}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />

                <TextInput
                  mt="md"
                  label="old password"
                  placeholder="password for changing username"
                  required
                  inputWrapperOrder={["label", "input", "error"]}
                  value={password2}
                  onChange={(event) => setPassword2(event.target.value)}
                />

                <TextInput
                  mt="md"
                  label="confirm old password"
                  placeholder="confirm your old password"
                  required
                  inputWrapperOrder={["label", "input", "error"]}
                  value={confirmpassword2}
                  onChange={(event) => setConfirmPassword2(event.target.value)}
                />
                <button
                  className="text-base bg-green-600 text-white px-3 py-1 rounded-sm hover:bg-green-500 transition"
                  onClick={
                    user.type === "EMPLOYER"
                      ? onUserConfirmEditPasswordEmp
                      : onUserConfirmEditPasswordCom
                  }
                >
                  update password
                </button>

                <TextInput
                  mt="md"
                  label={
                    user.type === "COMPANY" ? "Company Name" : "First Name"
                  }
                  placeholder={
                    user.type === "COMPANY"
                      ? "your company name"
                      : "your first name"
                  }
                  required
                  error={firstNameError}
                  inputWrapperOrder={["label", "input", "error"]}
                  value={firstNameValue}
                  onChange={(event) => setFirstNameValue(event.target.value)}
                />

                {user.type !== "COMPANY" && (
                  <TextInput
                    mt="md"
                    label="Last Name"
                    placeholder="your last name"
                    required
                    error={lastNameError}
                    inputWrapperOrder={["label", "input", "error"]}
                    value={lastNameValue}
                    onChange={(event) => setLastNameValue(event.target.value)}
                  />
                )}

                <TextInput
                  mt="md"
                  label={user.type === "COMPANY" ? "About Company" : "About Me"}
                  placeholder={
                    user.type === "COMPANY"
                      ? "about your company"
                      : "your about me"
                  }
                  error={aboutMeError}
                  inputWrapperOrder={["label", "input", "error"]}
                  value={aboutMeValue}
                  onChange={(event) => setAboutMeValue(event.target.value)}
                />

                <TextInput
                  mt="md"
                  label="Address"
                  placeholder="your address"
                  required
                  error={addressError}
                  inputWrapperOrder={["label", "input", "error"]}
                  value={addressValue}
                  onChange={(event) => setAddressValue(event.target.value)}
                />

                <TextInput
                  mt="md"
                  label="Email"
                  placeholder="your email"
                  required
                  error={""}
                  inputWrapperOrder={["label", "input", "error"]}
                  value={emailValue}
                  onChange={(event) => setEmailValue(event.target.value)}
                />

                <TextInput
                  mt="md"
                  label="Contact"
                  placeholder="your Contact"
                  required
                  error={""}
                  inputWrapperOrder={["label", "input", "error"]}
                  value={phoneNumberValue}
                  onChange={(event) => setPhoneNumberValue(event.target.value)}
                />

                <div className="mt-6 w-full flex justify-end">
                  <button
                    className="text-base bg-green-600 text-white px-3 py-1 rounded-sm hover:bg-green-500 transition"
                    onClick={onUserConfirmEdit}
                  >
                    Confirm
                  </button>

                  <button
                    className="text-base bg-gray-500 text-white px-3 py-1 ml-2 rounded-sm hover:bg-gray-400 transition"
                    onClick={editProfileToggle}
                  >
                    Cancel
                  </button>
                </div>
              </Modal>
            </div>
          </div>

          {/* Add Quick Action Buttons */}
          <div className="bg-white rounded-lg shadow-md p-4 mt-6 flex justify-center space-x-4">
            {/* <Link
              to="/my-posts"
              className="flex-1 bg-seagreen/80 text-white px-4 py-3 rounded-lg hover:bg-seagreen transition text-center font-medium"
            >
              <div className="flex justify-center items-center">
                <span className="mr-2 text-xl">
                  <BsPostcardHeart />
                </span>{" "}
                โพสต์งานของฉัน
              </div>
            </Link> */}
            <Link
              to="/find"
              className="flex-1 bg-seagreen/80 text-white px-4 py-3 rounded-lg hover:bg-seagreen transition text-center font-medium"
            >
              <div className="flex justify-center items-center">
                <span className="mr-2 text-xl">
                  <AiOutlineFileSearch />
                </span>{" "}
                ค้นหางาน
              </div>
            </Link>
            <Link
              to="/trackemp"
              className="flex-1 bg-seagreen/80 text-white px-4 py-3 rounded-lg hover:bg-seagreen transition text-center font-medium"
            >
              <div className="flex justify-center items-center">
                <span className="mr-2 text-xl">
                  <MdAutoGraph />
                </span>{" "}
                ติดตามงาน
              </div>
            </Link>
          </div>

          {/* <div className="mt-8 flex items-center space-x-4 border-b border-gray-200 pb-2">
            <button
              className={
                baseTabClasses +
                " " +
                (activeTab === "work" ? activeClasses : inactiveClasses)
              }
              onClick={() => handleTabClick("work")}
            >
              Work <span className="text-sm text-gray-500">54</span>
            </button>
            <button
              className={
                baseTabClasses +
                " " +
                (activeTab === "about" ? activeClasses : inactiveClasses)
              }
              onClick={() => handleTabClick("about")}
            >
              About
            </button>
          </div> */}
        </section>

        {/* <div className="mb-8">
          {activeTab === "work" && (
            // <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            //   <div className="grid md:grid-cols-3 gap-6">
            //     <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
            //       <img
            //         src="https://via.placeholder.com/400x250?text=VPN+Mobile+App"
            //         alt="VPN Mobile App"
            //         className="w-full rounded-md"
            //       />
            //       <h3 className="mt-4 text-lg font-semibold">VPN Mobile App</h3>
            //       <p className="text-gray-500 text-sm">Mobile UI, Research</p>
            //       <div className="flex items-center justify-between mt-3 text-gray-400 text-xs">
            //         <div>
            //           <span className="font-medium">517</span>
            //           <span className="ml-1">❤️</span>
            //         </div>
            //         <span className="font-medium">9.3k</span>
            //       </div>
            //     </div>

            //     <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
            //       <img
            //         src="https://via.placeholder.com/400x250?text=Property+Dashboard"
            //         alt="Property Dashboard"
            //         className="w-full rounded-md"
            //       />
            //       <h3 className="mt-4 text-lg font-semibold">
            //         Property Dashboard
            //       </h3>
            //       <p className="text-gray-500 text-sm">Web interface</p>
            //       <div className="flex items-center justify-between mt-3 text-gray-400 text-xs">
            //         <div>
            //           <span className="font-medium">983</span>
            //           <span className="ml-1">❤️</span>
            //         </div>
            //         <span className="font-medium">14k</span>
            //       </div>
            //     </div>

            //     <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
            //       <img
            //         src="https://via.placeholder.com/400x250?text=Healthcare+Mobile+App"
            //         alt="Healthcare Mobile App"
            //         className="w-full rounded-md"
            //       />
            //       <h3 className="mt-4 text-lg font-semibold">
            //         Healthcare Mobile App
            //       </h3>
            //       <p className="text-gray-500 text-sm">Mobile UI, Branding</p>
            //       <div className="flex items-center justify-between mt-3 text-gray-400 text-xs">
            //         <div>
            //           <span className="font-medium">875</span>
            //           <span className="ml-1">❤️</span>
            //         </div>
            //         <span className="font-medium">13.5k</span>
            //       </div>
            //     </div>
            //   </div>
            // </section>

            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
              <div className="grid md:grid-cols-3 gap-6">
                <ArticleCard
                  url={
                    "https://d1a2t1aqgesyrk.cloudfront.net/sites/default/files/styles/media_thumbnail/public/field/image/amazon_adobestock_291428005_editorial_use_only.jpeg?itok=6y6WfV1X"
                  }
                  badgeList={["Looking for a job", "Developer", "UX/UI Design"]}
                  title={"Hiring for Mobile/Web Appication developer positions"}
                  description={
                    "Receive 2 people per position, More than 5 years of experience"
                  }
                  profileImage={"พิการ.jpg"}
                  postOwner={"Jane Smith"}
                  postedTime={"23 minutes ago"}
                  liked={1232}
                />

                <ArticleCard
                  url={
                    "https://money.com/wp-content/uploads/2017/03/gettyimages-517862941.jpg?quality=60&w=600"
                  }
                  badgeList={["Easy job", "Cleaning Staff"]}
                  title={"Open recruitment for cleaning staff"}
                  description={`
                    Receive 5 people per position, Completed basic education.
                    Work 8 hours a day. 
                  `}
                  profileImage={"พิการ.jpg"}
                  postOwner={"Charlotte Robinson"}
                  postedTime={"45 minutes ago"}
                  liked={552}
                />

                <ArticleCard
                  url={
                    "https://s.isanook.com/ga/0/ud/236/1180650/hsh-movie-in-production-cover.jpg"
                  }
                  badgeList={["Game Developer", "HSH3", "UX/UI Design"]}
                  title={"Hiring for game developer positions"}
                  description={`
                    Receive 5 people per position, More than 7 years of experience, 
                    We are developing home sweet home ss3 project (PC Game). Come join us!!!
                  `}
                  profileImage={"พิการ.jpg"}
                  postOwner={"Elsa Gardenowl"}
                  postedTime={"1 hours ago"}
                  liked={792}
                />
              </div>
            </section>
          )}

          {activeTab === "about" && (
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
              <div className="grid md:grid-cols-3 gap-6">
                <ArticleCard
                  url={""}
                  badgeList={["TODO", "Somthing", "Here"]}
                  title={"About"}
                  description={
                    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores assumenda omnis sequi eveniet debitis autem at, a iure non beatae molestiae nobis in unde delectus quis reiciendis. Dicta, quidem deleniti!"
                  }
                  profileImage={"พิการ.jpg"}
                  postOwner={"พิการ คุง"}
                  postedTime={"3 minutes ago"}
                  liked={14}
                />
              </div>
            </section>
          )}
        </div> */}
      </motion.div>
    </div>
  );
}

export default Profile;
