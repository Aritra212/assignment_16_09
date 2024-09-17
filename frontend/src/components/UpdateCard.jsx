import { FaArrowLeftLong } from "react-icons/fa6";
import { useState, useEffect } from "react";

function UpdateCard({ data, backfn, updatefn }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    gender: "",
    courses: [],
    image: null,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        ...data,
        courses: Array.isArray(data.course) ? data.course : [],
        image: null, // No new image initially
        previousImage: data.image, // Store the previous image in the form data
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => {
      if (e.target.checked) {
        return { ...prev, courses: [...prev.courses, value] };
      } else {
        return {
          ...prev,
          courses: prev.courses.filter((course) => course !== value),
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatefn(formData);
  };

  return (
    <div>
      <p
        className="flex gap-1 items-center text-blue-600 shadow-md w-fit px-3 py-1 rounded-lg cursor-pointer"
        onClick={backfn}
      >
        <FaArrowLeftLong /> Back
      </p>
      <h1 className="text-xl sm:text-3xl font-bold text-center mb-7">
        Update Employee Details
      </h1>

      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="space-y-5 w-full">
          <div>
            <label>Name : </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter employee name"
            />
          </div>
          <div>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter employee email"
            />
          </div>
          <div>
            <label>Mobile no : </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter employee mobile number"
            />
          </div>
          <div>
            <label htmlFor="des">Designation :</label>
            <select
              id="des"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            >
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="space-x-2">
            <label> Gender : </label>
            <input
              type="radio"
              id="M"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            <label htmlFor="M">Male</label>
            <input
              type="radio"
              id="F"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            <label htmlFor="F">Female</label>
            <input
              type="radio"
              id="O"
              name="gender"
              value="Other"
              checked={formData.gender === "Other"}
              onChange={handleChange}
            />
            <label htmlFor="O">Other</label>
          </div>

          <div className="space-x-2">
            <label>Courses : </label>
            <input
              type="checkbox"
              id="c1"
              value="MCA"
              checked={formData.courses.includes("MCA")}
              onChange={handleCourseChange}
            />
            <label htmlFor="c1">MCA</label>
            <input
              type="checkbox"
              id="c2"
              value="BSC"
              checked={formData.courses.includes("BSC")}
              onChange={handleCourseChange}
            />
            <label htmlFor="c2">BSC</label>
            <input
              type="checkbox"
              id="c3"
              value="BCA"
              checked={formData.courses.includes("BCA")}
              onChange={handleCourseChange}
            />
            <label htmlFor="c3">BCA</label>
          </div>
          <div>
            <input
              type="file"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
            />
          </div>
          <button
            type="submit"
            className="w-fit flex mx-auto bg-indigo-700 text-white font-bold px-10 py-2 rounded-md cursor-pointer"
          >
            Update Employee
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCard;
