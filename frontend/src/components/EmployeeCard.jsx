function EmployeeCard({ data, dltfn, updatefn }) {
  const { name, email, phone, _id, gender, designation, image, course } = data;

  return (
    <div className="flex gap-5 w-fit h-fit items-center shadow-lg border-solid border-slate-500 border-2 rounded p-2 sm;p-3">
      <div>
        <div className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] border-solid border-2 border-slate-500 mx-auto">
          <img
            src={image}
            alt="employee image"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-2">
          <div
            className="font-bold bg-indigo-700 text-white w-fit py-1 px-2 rounded mx-auto cursor-pointer"
            onClick={updatefn}
          >
            Update
          </div>
          <div
            className="font-bold bg-red-700 text-white w-fit py-1 px-2 rounded mx-auto cursor-pointer"
            onClick={dltfn}
          >
            Delete
          </div>
        </div>
      </div>
      <div>
        <div className="text-sm">
          <p>Name - {name}</p>
          <p>Id - {_id}</p>
          <p>Email - {email}</p>
          <p>Phone - {phone}</p>
          <p>Designation - {designation}</p>
          <p>Gender - {gender}</p>
          <p>Courses - {course.toString()}</p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;
