import { useForm } from "react-hook-form";
import Input from "../components/FormCmps/Input";
import { useState } from "react";
import axios from "axios"; // Import axios for API calls
import { useSelector } from "react-redux";

function AddEmployee() {
  const { register, handleSubmit, reset } = useForm();
  const [courses, setCourses] = useState([]);
  const [image, setImage] = useState(null);
  const isAdmin = useSelector((state) => state.auth.status);

  // Function to handle form submission
  const addEmployee = async (data) => {
    const formData = new FormData();

    // Append form data
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("designation", data.designation);
    formData.append("gender", data.gender);
    courses.forEach((course) => formData.append("course[]", course));
    if (image) {
      formData.append("image", image); // Append image file
    }

    try {
      // Send the form data to backend using axios
      const response = await axios.post("/api/v1/employee/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success
      alert(response.data.message);
      reset(); // Reset form fields
      setCourses([]); // Reset courses
      setImage(null); // Reset image
    } catch (error) {
      console.error("Error in adding employee: ", error);
      alert("Failed to add employee " + error.response.data.message);
    }
  };

  if (!isAdmin) return <p>You can&apos;t access this page without login</p>;

  return (
    <div className="w-11/12 sm:w-4/5 lg:w-1/2 mx-auto my-10 p-7 box-border bg-gray-100 rounded-md">
      <h1 className="w-full text-center text-2xl font-bold">Add Employee</h1>

      <form
        onSubmit={handleSubmit(addEmployee)}
        encType="multipart/form-data"
        className="mt-3"
      >
        <div className="space-y-5 w-full">
          <Input
            label="Name : "
            placeholder="Enter employee name"
            type="text"
            {...register("name", {
              required: true,
            })}
          />
          <Input
            label="Email: "
            type="email"
            placeholder="Enter employee email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Mobile no : "
            placeholder="Enter employee mobile number"
            type="text"
            {...register("phone", {
              required: true,
            })}
          />
          <div>
            <label htmlFor="des">
              Designation :
              <select
                id="des"
                {...register("designation", {
                  required: true,
                })}
              >
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </label>
          </div>
          <div className="space-x-2">
            <label> Gender : </label>
            <input
              type="radio"
              id="M"
              value="Male"
              {...register("gender", { required: true })}
            />
            <label htmlFor="M">Male</label>
            <input
              type="radio"
              id="F"
              value="Female"
              {...register("gender", { required: true })}
            />
            <label htmlFor="F">Female</label>
            <input
              type="radio"
              id="O"
              value="Other"
              {...register("gender", { required: true })}
            />
            <label htmlFor="O">Other</label>
          </div>

          <div className="space-x-2">
            <label>Courses : </label>
            <input
              type="checkbox"
              id="c1"
              value="MCA"
              onChange={(e) =>
                setCourses((prev) => {
                  if (e.target.checked) {
                    return [...prev, e.target.value];
                  } else {
                    return prev.filter((course) => course !== e.target.value);
                  }
                })
              }
            />
            <label htmlFor="c1">MCA</label>
            <input
              type="checkbox"
              id="c2"
              value="BSC"
              onChange={(e) =>
                setCourses((prev) => {
                  if (e.target.checked) {
                    return [...prev, e.target.value];
                  } else {
                    return prev.filter((course) => course !== e.target.value);
                  }
                })
              }
            />
            <label htmlFor="c2">BSC</label>
            <input
              type="checkbox"
              id="c3"
              value="BCA"
              onChange={(e) =>
                setCourses((prev) => {
                  if (e.target.checked) {
                    return [...prev, e.target.value];
                  } else {
                    return prev.filter((course) => course !== e.target.value);
                  }
                })
              }
            />
            <label htmlFor="c3">BCA</label>
          </div>
          <div>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <button
            type="submit"
            className="w-fit flex mx-auto bg-indigo-700 text-white font-bold px-10 py-2 rounded-md cursor-pointer"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
