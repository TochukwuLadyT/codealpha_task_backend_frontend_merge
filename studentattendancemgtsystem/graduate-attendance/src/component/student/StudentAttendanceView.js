import React, {
	useEffect,
	useState,
} from "react";
import axios from "axios";

const StudentAttendanceView = () => {
	const [students, setStudents] = useState([]);

	useEffect(() => {
		loadStudents();
	}, []);

	const loadStudents = async () => {
		const result = await axios.get(
			"http://localhost:8080/attendance",
			{
				validateStatus: () => {
					return true;
				},
			}
		);
		if (result.status === 302) {
			setStudents(result.data);
		}
	};


	return (
		<section>
			<table className="table table-bordered table-hover shadow">
				<thead>
					<tr className="text-center">
						<th>ID</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Department</th>
						<th>Attendance Status</th>
                        <th>Attendance Date</th>
					</tr>
				</thead>

				<tbody className="text-center">
					{students
						
						.map((student, index) => (
							<tr key={student.id}>
								<th scope="row" key={index}>
									{index + 1}
								</th>
								<td>{student.firstName}</td>
								<td>{student.lastName}</td>
								<td>{student.email}</td>
								<td>{student.department}</td>
                                <td>{student.attendanceStatus}</td>
                                <td>{student.attendanceDate}</td>
	
							</tr>
						))}
				</tbody>
			</table>
		</section>
	);
};

export default StudentAttendanceView;
