import React, {
	useEffect,
	useState,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const StudentProfile = () => {
	let navigate = useNavigate();

	useEffect(() => {
		loadStudent();
	});

	const [student, setStudent] = useState({
		firstName: "",
		lastName: "",
		email: "",
		department: "",
		attendanceStatus: "",
		
	});
	
	const { id } = useParams();

	const loadStudent = async () => {
		const result = await axios.get(
			`http://localhost:8080/attendance/getStudentProfileById/${id}`
		);
		setStudent(result.data);
	};


	const updateAttendanceStatusPresent = async () => {
		await axios.put(
			`http://localhost:8080/attendance/updateAttendanceStatusPresent/${id}`,
			student
		);
		navigate("/view-students-attendance");
		
	};

	const updateAttendanceStatusAbsent = async () => {
		await axios.put(
			`http://localhost:8080/attendance/updateAttendanceStatusAbsent/${id}`,
			student
		);
		navigate("/view-students-attendance");
		
	};
	
	const handleClickPresent = () => {
		Swal.fire({
			title: "Are you sure?",
			text: "Confirm",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Proceed"
		  }).then((result) => {
			if (result.isConfirmed) {
				
				updateAttendanceStatusPresent();
				 
				console.log(updateAttendanceStatusPresent)
			}
		  });

	}
	const handleClickAbsent = () => {
		Swal.fire({
			title: "Are you sure?",
			text: "Confirm",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Proceed"
		  }).then((result) => {
			if (result.isConfirmed) {
				updateAttendanceStatusAbsent();
				 
				console.log(updateAttendanceStatusAbsent)
			}
		  });

	}

	return (
		<section
		
			className="shadow"
			style={{ backgroundColor: "whitesmoke" }}>
			<div className="container py-5">
			<div className="input-group mb-5">
				
			</div>

				<div className="row">
										<b className="text-muted mb-0"> Date{" "}{student.attendanceDate}
										</b>
					<div className="col-lg-3">
						<div className="card mb-4">
							<div className="card-body text-center">
								<img
									src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6.webp"
									alt="avatar"
									className="rounded-circle img-fluid"
									style={{ width: 150 }}
								/>
								
								<h5 className="my-3">
									{`${student.firstName} ${student.lastName}`}
									
								</h5>

							</div>
							<div className="d-flex justify-content-center mb-2">
					
						<button		

							onClick={handleClickPresent}
							style={{ backgroundColor: "green" }}
							className="btn btn-outline-success btn-lg">	
						  Present
						</button>
					
						<button
 
							onClick={handleClickAbsent}
							style={{ backgroundColor: "red" }}
							className="btn btn-outline-warning btn-lg">
							
							Absent
						</button>
					
					</div>
						</div>
					</div>
											
									

					<div className="col-lg-9">
						<div className="card mb-4">
							<div className="card-body">
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											First Name
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{student.firstName}
										</p>
									</div>
								</div>

								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Last Name
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{student.lastName}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Email
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{student.email}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Department
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{student.department}
										</p>
									</div>
								</div>
								
						
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default StudentProfile;
